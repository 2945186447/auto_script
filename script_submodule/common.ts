

export function randomInteger(min: number = 1000, max: number = 3000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clickIfWidgetExists(widget: UiObject | null, sleep: number = 1000): boolean {
    try {
        if (!widget) return false
        if (widget.visibleToUser()) {
            let x = randomInteger(widget.bounds().centerX() - 3, widget.bounds().centerX() + 3)
            let y = randomInteger(widget.bounds().centerY() - 3, widget.bounds().centerY() + 3)
            if (widget.text() || widget.desc()) {
                console.log("点击" + widget.text() || widget.desc());
            }
            if (widget.clickable && widget.click()) {
                return true
            }
            if (click(x, y)) {
                console.log("坐标点击", x, y);
                randomSleep(sleep)
                return true
            }
            else {
                executeShell('input tap ' + x + ' ' + y)
                console.log("shell点击");
                randomSleep(sleep)
                return true
            }
        }
    }
    catch (error) { }
    randomSleep(sleep)
    return false;
}

export function _swipe(
    direction: 'up' | 'down' | 'left' | 'right',
    rect: string = '0.45-0.55',
    range: string = '0.3-0.7',
    speed: number = 1
) {
    const rangeArr = range.split('-')
    const rectArr = rect.split('-')
    const xWidth = randomInteger(device.width * Number(rectArr[0]), device.width * Number(rectArr[1]))
    const yHeight = randomInteger(device.height * Number(rectArr[0]), device.height * Number(rectArr[1]))
    const bottomY = randomInteger(device.height * (Number(rangeArr[1]) - 0.1), device.height * (Number(rangeArr[1])))
    const topY = randomInteger(device.height * (Number(rangeArr[0]) - 0.1), device.height * (Number(rangeArr[0])))
    const rightX = randomInteger(device.width * (Number(rangeArr[1]) - 0.05), device.width * (Number(rangeArr[1])))
    const leftX = randomInteger(device.width * (Number(rangeArr[0])), device.width * (Number(rangeArr[0]) + 0.05))
    const move_dis_x = Math.abs(rightX - leftX)
    const move_dis_y = Math.abs(bottomY - topY)
    const move_time_x = move_dis_x / speed
    const move_time_y = move_dis_y / speed
    if (direction === 'up') {
        gesture(move_time_y, [xWidth, bottomY], [xWidth, topY])
    }
    else if (direction === 'down') {
        gesture(move_time_y, [xWidth, topY], [xWidth, bottomY])
    }
    else if (direction === 'left') {
        gesture(move_time_x, [rightX, yHeight], [leftX, yHeight])
    }
    else if (direction === 'right') {
        gesture(move_time_x, [leftX, yHeight], [rightX, yHeight])
    }
    randomSleep(1000, 2000)
}

export function randomSleep(min: number = 1000, max: number = 3000): void {
    return sleep(randomInteger(min, max))
}

export function wakeUpHonor(password: string): boolean {
    if (device.isScreenOn()) return true
    device.wakeUpIfNeeded()
    const clock = textMatches(/([01]?\d|2[0-3]):([0-5]\d)/).visibleToUser().findOne(30 * 1000)
    if (clock) {
        randomSleep()
        _swipe("up", undefined, '0.3-0.7', 1)
        if (text("紧急呼叫").visibleToUser().findOne(30 * 1000)) {
            for (let i = 0; i < password.split("").length; i++) {
                clickIfWidgetExists(querySelector(password[i]));
            }
            return true
        }
        return false
    }
    return false
}

export function clearRecent(): boolean {
    recents()
    const clearbox = idContains("clearbox").visibleToUser().findOne(30 * 1000)
    if (clearbox) {
        randomSleep(1000, 1500)
        return clickIfWidgetExists(querySelector("id=clearbox")) || false
    }
    return false && randomSleep(1000, 1500)
}

export function stopApp(packageName: string) {
    app.openAppSetting(packageName);
    const stopBnt = text("强行停止").visibleToUser().findOne(30 * 1000)
    if (!stopBnt) return false;
    randomSleep(500, 1000)
    stopBnt.click()
    const confirmStopMsg = textContains("导致异常").visibleToUser().findOne(30 * 1000)
    if (!confirmStopMsg) return true;
    randomSleep(500, 1000)
    const res = text("强行停止").visibleToUser().findOne(30 * 1000)?.click() || false
    clearRecent()
    return res
}

export function wx_push(title: string, content: string) {
    try {
        const token = "YFQjdi/0R49GneQCyGSKkiMHfbsAXfhRIcZfSEjaczbQmfaaoxy+v23UnZXoqTpbJ1J06cYy1/3/1vWl8BvS/ZDCtSGoWG8koaFxwrgkmU+v8ofPjdIcpuivMmx4LG4V+6fE9BZtrVQgl9uN/mH7+MwhTE/3MenwPhievdwe0PY="
        const res: any = http.postJson("http://175.178.41.25:9317/message_push", {
            content,
            title,
            token
        }).body.json()
        toast(res.msg)
        if (res.code == 200) {
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

export function forceStopApp(pkgName: string) {
    return executeShell("am force-stop " + pkgName);
}

export function executeShell(cmd: string | string[], rest: number = 100) {
    if (rest === void 0) { rest = 100; }
    try {
        if (!cmd) {
            return false;
        }
        if (typeof (cmd) == "string") {
            var res = shell(cmd, true);
            console.log("shell", cmd, String(res.result).replace(/[\r\n\s]/g, ""));
            sleep(rest);
            return res;
        }
        else if (typeof (cmd) == "object") {
            cmd.forEach(function (item) {
                var res = shell(item, true);
                console.log("shell", item, String(res.result).replace(/[\r\n\s]/g, ""));
                sleep(rest);
            });
            console.log("");
            return true;
        }
    }
    catch (error) {
        console.log("executeShell:", JSON.stringify(error));
    }
    return false;
}

export function clearAppCache(pkgName: string) {
    executeShell("rm -rf /data/data/" + pkgName + "/cache/*");
    return true;
}

export function findNext(
    currentSelector: UiSelector,
    target: string
) {
    const current = currentSelector.visibleToUser().findOnce()
    if (!current) return null
    const pUiobject = current.parent()
    if (!pUiobject) return null;
    const pUiobjectList = pUiobject.children()
    const currentIndex = current.indexInParent() + 1;
    let targetUiobject: UiObject | null = null
    for (let index = currentIndex; index < pUiobjectList.length; index++) {
        if (pUiobjectList[index].getText() === target) {
            targetUiobject = pUiobjectList[index];
            break;
        }
    }
    return targetUiobject;
}




export function querySelector(selector: string, args?: UiObject_attribute, mode: 'strict' | 'normal' | 'regular' = 'normal', timeout: number = 1, visibleToUser: boolean = true): UiObject | null {
    let widget: UiObject | null = null
    let widget_selector: UiSelector | null = null
    if (selector.startsWith("id=")) {
        const ids = selector.replace(/^id=/, '')
        widget_selector = mode === "strict" ? id(ids) : idContains(ids)
    }
    else if (selector.startsWith("className=")) {
        const classNames = selector.replace(/^className=/, '')
        widget_selector = className(classNames)
    }
    else if (selector.startsWith("desc=")) {
        const descs = selector.replace(/^desc=/, '')
        widget_selector = mode === "strict" ? desc(descs) : descContains(descs)
    }
    else {
        const textordesc = selector;
        widget_selector = mode === "strict" ? text(textordesc) : textContains(textordesc)
    }
    for (const key in args) {
        //@ts-ignore
        widget = widget_selector[key](args[key]);
    }
    if (!widget_selector) return null;
    widget = widget_selector.findOne(timeout)
    if (visibleToUser) {
        widget = widget_selector.visibleToUser().findOne(timeout)
    }
    return widget
}
export function querySelectorAll(selector: string, args?: UiObject_attribute, mode: 'strict' | 'normal' | 'regular' = 'normal', visibleToUser: boolean = true,): UiCollection | null {
    let widget: UiCollection | null = null
    let widget_selector: UiSelector | null = null
    if (selector.startsWith("id=")) {
        const ids = selector.replace(/^id=/, '')
        widget_selector = mode === "strict" ? id(ids) : idContains(ids)
    }
    else if (selector.startsWith("className=")) {
        const classNames = selector.replace(/^className=/, '')
        widget_selector = className(classNames)
    }
    else if (selector.startsWith("desc=")) {
        const descs = selector.replace(/^desc=/, '')
        widget_selector = mode === "strict" ? desc(descs) : descContains(descs)
    }
    else {
        const textordesc = selector;
        widget_selector = mode === "strict" ? text(textordesc) : textContains(textordesc)
    }
    for (const key in args) {
        //@ts-ignore
        widget = widget_selector[key](args[key]);
    }
    if (!widget_selector) return null;
    widget = widget_selector.find()
    if (visibleToUser) {
        widget = widget_selector.visibleToUser().find()
    }
    return widget
}

export function clickIfWidgetClickable(widget: UiObject | null): boolean {
    try {
        if (!widget) return false
        return widget.click();
    } catch (error) { }
    return false;
}

