

export function randomInteger(min: number = 1000, max: number = 3000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function _click(
    widget: UiSelector,
    type: 'clickable' | 'coordinate' = 'coordinate',
    timeout: number = 1000
) {
    try {
        const _type = type || 'coordinate'
        const _timeout = timeout || 1000
        const _widget = widget.findOne(_timeout)
        if (_widget) {
            if (_type === 'coordinate') {
                const x = randomInteger(_widget.bounds().centerX() - 3, _widget.bounds().centerX() + 3)
                const y = randomInteger(_widget.bounds().centerY() - 3, _widget.bounds().centerY() + 3)
                return click(x, y) && randomSleep()
            }
            else {

                return _widget.click() && randomSleep()
            }
        }
    } catch (error) {
        console.log(error);
    }
    return false && randomSleep()
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
                _click(text(password[i]));
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
        return _click(idContains("clearbox")) || false
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