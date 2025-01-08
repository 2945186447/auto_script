import { randomSleep, _swipe, findNext, _click, _ubclick, randomInteger } from "../../script_submodule/common";
const dragonRead = "com.dragon.read";


//番茄小说
function zhuanMi_dragonRead() {
    if (!packageName(dragonRead).exists()) {
        app.launch(dragonRead);
    }
    let firstLaunch: boolean = true;
    let taskStop = false;
    let runListenAndRead = false;
    let newUser = true;
    let quickChallenge = true
    events.observeToast();
    events.onToast(function (toast) {
        const toastText = toast.getText();
        if (toastText.match(/逛.*(频道|分类).*秒获得.*金币/)) {
            console.log(toastText);
            randomSleep(35 * 1000, 40 * 1000)
        }
        if (toastText.match(/.*逛.*(频道|分类).*秒任务/)) {
            console.log(toastText);
            taskStop = false
            back();
        }
        console.log(toastText);
    });
    function detectPopups() {
        if (text("恭喜你获得惊喜奖励").visibleToUser().exists()) {
            _click(text("明日看视频奖励加倍"))
        }
    }
    while (!taskStop) {
        if (text("书城").selected(true).exists() && firstLaunch) {
            log("书城")
            _click(text("福利"))
        }
        if (text("福利").selected(true).exists()) {
            firstLaunch = false
            log("福利")
        }
        if (desc("今日签到领").visibleToUser().exists()) {
            _click(textStartsWith("立即签到"))
        }
        if (textStartsWith("看视频最高再领").visibleToUser().exists()) {
            _click(idContains("cli"))
        }
        if (quickChallenge && text("快速赚钱挑战(6/6)").visibleToUser().exists()) {
            quickChallenge = false
            console.log("快速赚钱挑战 ---> 已完成");
        }
        if (textMatches(/快速赚钱挑战\((?!6\/6)\d+\/6\)/).visibleToUser().exists()) {
            _click(textContains("快速赚钱挑战"))
            taskStop = true
        }
        if (text("后台听书也能赚金币").visibleToUser().exists()) {
            _click(text("立即听书"))
        }
        if (newUser && text("新用户1元见面礼").visibleToUser().exists()) {
            const btn = findNext(text("新用户1元见面礼"), '已完成')
            console.log("新用户1元见面礼 ---> 已完成");
            if (btn) newUser = false;
        }
        if (text("连续听读福利").visibleToUser().exists() && runListenAndRead) {
            _click(text("连续听读福利"))
            console.log("连续听读福利");
            const endTime = new Date().getTime() + 15 * 60 * 1000
            while (true) {
                if (new Date().getTime() > endTime) {
                    back()
                    randomSleep(500, 1000)
                    _click(text("暂不加入"))
                    break;
                }

                _swipe("left", undefined, '0.1-0.8', 0.4)
                randomSleep(1000, 2000)
            }
        }
        if (textMatches(/看听读赚.*金币/).visibleToUser().exists() && text("积攒中").visibleToUser().exists()) {
            log("看听读赚金币")
            const lq = text("领取").visibleToUser().find()
            for (let index = 0; index < lq.length; index++) {
                _ubclick(lq[index])
                randomSleep(1000, 1500)
                if (textContains("看视频最高再领").visibleToUser().exists()) {
                    _click(idContains("cli"))
                }
            }
        }
        if (text("选择阅读偏好").visibleToUser().exists()) {
            const btn = findNext(text("选择阅读偏好"), '去完成')
            if (!btn) {
                console.log("选择阅读偏好 ---> 已完成");
            }
            _ubclick(btn)
        }
        if (text("选择你的兴趣偏好").visibleToUser().exists()) {
            console.log('选择你的兴趣偏好');
            _click(text("男生小说"))
            randomSleep(1000, 1500)
            _click(text("保存"))
            back()
        }
        if (text("加入书架").visibleToUser().exists()) {
            const btn = findNext(text("加入书架"), '去书城')
            if (!btn) {
                console.log("加入书架 ---> 已完成");
            }
            _ubclick(btn)
            randomSleep(1000, 1500)
            _click(text("完整榜单"))
        }
        if (textMatches(/番茄推荐榜|番茄完本榜/).visibleToUser().exists()) {
            _click(text("完本榜"))
            randomSleep(1000, 1500)
            const book = textMatches(/.*万字.*/).visibleToUser().find();
            const index = randomInteger(1, book.length)
            _ubclick(book[index])
            randomSleep(1000, 1500)
            _swipe("left", undefined, '0.1-0.8', 0.4)
            _swipe("left", undefined, '0.1-0.8', 0.4)
            _swipe("left", undefined, '0.1-0.8', 0.4)
            click(540, 800)
            if (!text("加入书架").visibleToUser().exists()) {
                _swipe("left", undefined, '0.1-0.8', 0.4)
                _swipe("left", undefined, '0.1-0.8', 0.4)
                _swipe("left", undefined, '0.1-0.8', 0.4)
            }
            click(540, 800)
            _click(text("加入书架"))
            back()
            randomSleep(1000, 1500)
            back()
        }
        _swipe("up")

        detectPopups()
        randomSleep(1000, 2000)
    }

}




zhuanMi_dragonRead()
