//@ts-nocheck
function randomInteger(min: number = 1000, max: number = 3000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function clickIfWidgetExists(widget: UiObject, sleep: number = 1000): boolean {
    try {
        if (widget.visibleToUser()) {
            let x = randomInteger(widget.bounds().centerX() - 3, widget.bounds().centerX() + 3)
            let y = randomInteger(widget.bounds().centerY() - 3, widget.bounds().centerY() + 3)
            if (widget.clickable() && widget.click()) {
                return true
            }
            if (click(x, y)) {
                console.log("坐标点击", x, y);

                return true
            }
        }
    }
    catch (error) { }
    return false;
}

if (clickIfWidgetExists(desc("Attach").visibleToUser().findOne(5000))) {
    clickIfWidgetExists(text("Gallery").visibleToUser().findOne(10000))
    clickIfWidgetExists(descContains("Photo, date").visibleToUser().findOne(10000))
    clickIfWidgetExists(desc("Confirm selection").visibleToUser().findOne(10000))
}