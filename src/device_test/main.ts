import { _click, _ubclick, randomSleep, } from "../../script_submodule/common";

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
        _ubclick(continueBtn)
        randomSleep(2000)
    }
    //授权并且登录
    const login4399 = text("切换其他账号").visibleToUser().findOne(1000);
    if (login4399) {
        _ubclick(login4399)
    }

    //添加账号
    const addAcc4399 = text("添加账号").visibleToUser().findOne(1000);
    if (addAcc4399) {
        _ubclick(addAcc4399)
    }
    //账号登录
    const loginAcc = text("账号登录").visibleToUser().findOne(1000);
    if (loginAcc) {
        _ubclick(loginAcc)
    }
    //输入账号密码
    const inputAcc = text("账号密码登录").visibleToUser().exists();

    if (inputAcc) {
        idContains("et_first").visibleToUser().findOne(1000)?.setText("34yryr6ud");
        randomSleep(1000);
        idContains("et_second").visibleToUser().findOne(1000)?.setText("123456");
        randomSleep(1000);
        idContains("cb_user_agreement").visibleToUser().findOne(1000)?.click();
        break;
    }


    randomSleep(2000, 3000)
}






