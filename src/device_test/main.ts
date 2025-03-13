import { _click, randomSleep, } from "../../script_submodule/common";

//请求横屏截图
requestScreenCapture(true);

randomSleep(3000)

// app.launch("com.hero.sm.m4399")

files.create("/sdcard/czymf/");


while (true) {
    //截图
    const img = captureScreen();
    const homesetting = images.read("/sdcard/czymf/homesetting.png")
    if (homesetting) {
        const res = images.findImage(img, homesetting)
        console.log(res);
        if (res) {
            click(res.x, res.y)
        }
    }
    //首页设置
    const homelogout = images.read("/sdcard/czymf/homelogout.png");
    if (homelogout) {
        const res = images.findImage(img, homelogout)
        console.log(res);
        if (res) {
            click(res.x, res.y)
        }
    }
    //登录页
    const homestart = images.read("/sdcard/czymf/homestart.png")
    if (homestart) {
        const res = images.findImage(img, homestart)
        console.log(res);
        if (res) {
            click(res.x, res.y)
        }
    }
    //已阅读并同意

    const continueBtn = text("已阅读并同意").visibleToUser().findOne(1000);
    if (continueBtn) {

    }



    randomSleep(2000, 3000)
}






