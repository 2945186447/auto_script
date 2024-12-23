

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
        console.log(_widget);
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

export function wakeUpHonor(timeout = 30000): void {
    device.wakeUpIfNeeded()
    device.keepScreenOn(timeout)
    textMatches(/([01]?\d|2[0-3]):([0-5]\d)/).visibleToUser().waitFor()
    randomSleep()
    _swipe("up", undefined, '0.2-0.8', 0.6)
    text("紧急呼叫").visibleToUser().waitFor()
    _click(text("1")); _click(text("3")); _click(text("4"));
    _click(text("6")); _click(text("7")); _click(text("9"))
}

