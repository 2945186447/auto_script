export class SysStorage {
	private dataPath: string = "/system/Storage/data.dat";
	private isSystemRw: boolean = false; // 标记系统分区挂载状态
	constructor() {
		this.checkAvailable();
	}
	/**
	 * 检查系统分区是否可读写
	 */
	checkAvailable(): boolean {
		return this.remountSystemRW();
	}
	/**
	 * 挂载系统分区为读写模式
	 */
	private remountSystemRW(): boolean {
		try {
			const cmd = "mount -o remount,rw /system";
			const result = shell(cmd, true);
			this.isSystemRw = result.code === 0 && result.error === "";
			return this.isSystemRw;
		} catch (error) {
			console.error("挂载系统分区为读写失败:", error);
			return false;
		}
	}
	/**
	 * 恢复系统分区为只读模式
	 */
	private remountSystemRO(): void {
		if (!this.isSystemRw) return;

		try {
			const cmd = "mount -o remount,ro /system";
			shell(cmd, true);
			this.isSystemRw = false;
		} catch (error) {
			console.error("恢复系统分区为只读失败:", error);
		}
	}
	/**
	 * 存储数据（支持深层对象）
	 * @param key 键
	 * @param value 值（支持对象/数组/基本类型）
	 */
	set(key: string, value: any): boolean {
		const success = this.savePersistentData(key, value);
		this.remountSystemRO(); // 操作完成后恢复只读
		return success;
	}

	/**
	 * 读取数据
	 * @param key 键
	 * @returns 存储的值（自动解析为对象）
	 */
	get(key: string): any {
		const value = this.getPersistentData(key);
		this.remountSystemRO(); // 操作完成后恢复只读
		return value;
	}
	/**
	 * 持久化存储核心方法
	 */
	private savePersistentData(key: string, value: any): boolean {
		if (!this.isSystemRw && !this.remountSystemRW()) {
			console.error("获取系统读写权限失败");
			return false;
		}
		// 初始化数据对象
		let data: any = {};
		const dirPath = this.dataPath.substring(0, this.dataPath.lastIndexOf('/'));

		// 1. 检查并创建目录
		if (!this.checkAndCreateDirectory(dirPath)) {
			return false;
		}

		// 2. 读取现有数据
		if (this.fileExists(this.dataPath)) {
			const readResult = this.readFile(this.dataPath);
			if (readResult) {
				try {
					data = JSON.parse(readResult);
				} catch (e) {
					console.error("解析数据失败，重置为默认对象:", e);
					data = {};
				}
			}

			// 临时设置文件可写
			if (!this.setFileWritable(this.dataPath)) {
				return false;
			}
		}

		// 3. 深度处理特殊类型（关键修复：处理嵌套数组和对象）
		data[key] = this.handleSpecialTypes(value);

		// 4. 写入文件
		const content = JSON.stringify(data, null, 2);
		const writeCmd = `echo '${this.escapeShellArg(content)}' > ${this.dataPath}`;
		const writeResult = shell(writeCmd, true);
		if (writeResult.code !== 0) {
			console.error("写入文件失败:", writeResult.error);
			return false;
		}

		// 5. 设置文件只读
		return this.setFileReadOnly(this.dataPath);
	}
	/**
	 * 读取持久化数据
	 */
	private getPersistentData(key: string): any {
		if (!this.isSystemRw && !this.remountSystemRW()) {
			console.error("获取系统读写权限失败");
			return null;
		}

		if (!this.fileExists(this.dataPath)) {
			return null;
		}

		const readResult = this.readFile(this.dataPath);
		if (!readResult) {
			return null;
		}

		try {
			const data = JSON.parse(readResult);
			return this.restoreSpecialTypes(data[key]); // 还原特殊类型
		} catch (e) {
			console.error("解析数据失败:", e);
			return null;
		}
	}
	// ====================== 工具方法 ======================
	/**
	 * 检查并创建目录
	 */
	private checkAndCreateDirectory(dirPath: string): boolean {
		const cmd = `test -d ${dirPath} && echo exists || echo not_exists`;
		const result = shell(cmd, true);

		if (result.code !== 0) {
			console.error("检查目录失败:", result.error);
			return false;
		}
		if (result.result.trim() === "not_exists") {
			const createCmd = `mkdir -p ${dirPath} && chmod 755 ${dirPath}`;
			const createResult = shell(createCmd, true);
			if (createResult.code !== 0) {
				console.error("创建目录失败:", createResult.error);
				return false;
			}
		}
		return true;
	}
	/**
	 * 检查文件是否存在
	 */
	private fileExists(filePath: string): boolean {
		const cmd = `test -f ${filePath} && echo exists || echo not_exists`;
		const result = shell(cmd, true);
		return result.code === 0 && result.result.trim() === "exists";
	}
	/**
	 * 读取文件内容
	 */
	private readFile(filePath: string): string | null {
		const result = shell(`cat ${filePath}`, true);
		return result.code === 0 ? result.result.trim() : null;
	}
	/**
	 * 设置文件可写
	 */
	private setFileWritable(filePath: string): boolean {
		const result = shell(`chmod 666 ${filePath}`, true);
		if (result.code !== 0) {
			console.error("设置文件可写失败:", result.error);
		}
		return result.code === 0;
	}
	/**
	 * 设置文件只读
	 */
	private setFileReadOnly(filePath: string): boolean {
		const result = shell(`chmod 444 ${filePath}`, true);
		if (result.code !== 0) {
			console.error("设置文件只读失败:", result.error);
		}
		return result.code === 0;
	}
	// ====================== 特殊类型处理 ======================
	/**
	 * 深度处理对象，确保所有嵌套对象和数组正确序列化
	 */
	private handleSpecialTypes(obj: any): any {
		// 处理 Date 对象
		if (obj instanceof Date) {
			return { __type: "date", value: obj.getTime() };
		}
		// 处理 Function（谨慎使用，可能存在安全风险）
		if (typeof obj === "function") {
			return { __type: "function", value: obj.toString() };
		}
		// 递归处理数组（关键修复：处理嵌套数组）
		if (Array.isArray(obj)) {
			return obj.map(item => this.handleSpecialTypes(item));
		}
		// 递归处理普通对象
		if (typeof obj === "object" && obj !== null) {
			const result: any = {};
			for (const key in obj) {
				result[key] = this.handleSpecialTypes(obj[key]);
			}
			return result;
		}
		// 基本类型直接返回
		return obj;
	}

	/**
	 * 还原特殊类型
	 */
	private restoreSpecialTypes(obj: any): any {
		// 还原 Date 对象
		if (obj && typeof obj === "object" && obj.__type === "date") {
			return new Date(obj.value);
		}

		// 还原 Function（谨慎使用）
		if (obj && typeof obj === "object" && obj.__type === "function") {
			try {
				return new Function(`return ${obj.value}`)();
			} catch (e) {
				console.error("还原函数失败:", e);
				return null;
			}
		}

		// 递归处理数组
		if (Array.isArray(obj)) {
			return obj.map(item => this.restoreSpecialTypes(item));
		}

		// 递归处理普通对象
		if (typeof obj === "object" && obj !== null) {
			const result: any = {};
			for (const key in obj) {
				result[key] = this.restoreSpecialTypes(obj[key]);
			}
			return result;
		}

		// 基本类型直接返回
		return obj;
	}

	/**
	 * 安全转义Shell参数（防止命令注入）
	 */
	private escapeShellArg(arg: string): string {
		return arg.replace(/'/g, "'\\''");
	}
}
