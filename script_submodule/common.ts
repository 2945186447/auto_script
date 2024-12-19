export function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function clickWidget(
    {
        type,
        widget,
        timeout
    }: clickWidget) {

    return new Promise<boolean>((resolve, reject) => {
        try {
            const _type = type || 'coordinate'
            const _timeout = timeout || 1000
            const _widget = widget.visibleToUser().findOne(_timeout)
            console.log(_widget);

            if (_widget) {
                if (_type === 'coordinate') {
                    const x = randomInteger(_widget.bounds().centerX() - 3, _widget.bounds().centerX() + 3)
                    const y = randomInteger(_widget.bounds().centerY() - 3, _widget.bounds().centerY() + 3)
                    return resolve(click(x, y))
                }
                else {
                    return resolve(_widget.click())
                }
            }
            return resolve(false)
        } catch (error) {
            reject(error)
        }
    })



}

