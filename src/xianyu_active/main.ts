import { init } from "../../lib/init";
const {
    desktop_coin,
    red_envelope,
    release_treasure,
    treasure_hunting,
    ant_farm,
    buy_or_sell_treasure,
    watch_ad,
    alipay_farm,
    ant_forest,
    kuaishou,
    baba_farm,
    mobile_sign,
    taobao_sign,
    alipay_points
} = hamibot.env;
import { randomSleep, _click, _swipe } from "../../script_submodule/common";
let control = true
let message = {
    coins_before: 0,
    coins_after: 0
}
const task_map = [
    {
        name: "通过桌面访问闲鱼币",
        run: desktop_coin,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(3000, 5000)
        }
    },
    {
        name: "参与一次拼手气红包",
        run: red_envelope,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(3000, 5000)
        }
    },
    {
        name: "发布一件新宝贝",
        run: release_treasure,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(3000, 5000)
        }
    },
    {
        name: "好物夺宝试试手气",
        run: treasure_hunting,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(3000, 5000)
        }
    },
    {
        name: "去蚂蚁庄园逛一逛",
        run: ant_farm,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(8000, 9000)
            while (true) {
                if (text("蚂蚁庄园").exists()) {
                    console.log("出现");
                    randomSleep(3000, 5000);
                    app.launchApp("闲鱼");
                    randomSleep();
                    back();
                    break;
                }
                randomSleep()
            }
        }
    },
    {
        name: "买到或卖出一件宝贝",
        run: buy_or_sell_treasure,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(3000, 5000)
        }
    },
    {
        name: "+",
        run: watch_ad,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(3000, 5000)
        }
    },
    {
        name: "去支付宝农场领水果",
        run: alipay_farm,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(3000, 5000)
        }
    },
    {
        name: "去支付宝领积分",
        run: alipay_points,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(8000, 9000)
            while (true) {
                if (text("会员签到赚积分").exists()) {
                    console.log("出现");
                    randomSleep(3000, 5000);
                    app.launchApp("闲鱼");
                    randomSleep();
                    back();
                    break;
                }
                randomSleep()
            }
        }
    },
    {
        name: "去蚂蚁森林逛一逛",
        run: ant_forest,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(8000, 9000)
            while (true) {
                if (text("蚂蚁森林").exists()) {
                    console.log("出现");
                    randomSleep(3000, 5000);
                    app.launchApp("闲鱼");
                    randomSleep();
                    back();
                    break;
                }
                randomSleep()
            }
        }
    },
    {
        name: "去快手极速版领红包",
        run: kuaishou,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(3000, 5000)
        }
    },
    {
        name: "去逛一逛芭芭农场",
        run: baba_farm,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(3000, 5000)
        }
    },
    {
        name: "去中国移动领话费",
        run: mobile_sign,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(8000, 9000)
            while (true) {
                if (text("签到有礼").exists()) {
                    console.log("出现");
                    randomSleep(3000, 5000);
                    app.launchApp("闲鱼");
                    randomSleep();
                    back();
                    break;
                }
                randomSleep()
            }
        }
    },
    {
        name: "去淘宝签到领红包",
        run: taobao_sign,
        callback: (widget: UiObject) => {
            widget.click()
            randomSleep(8000, 9000)
            while (true) {
                if (text("立即提现").exists()) {
                    console.log("出现");
                    randomSleep(3000, 5000);
                    app.launchApp("闲鱼");
                    randomSleep();
                    back();
                    break;
                }
                randomSleep()
            }
        }
    }
]
const dialog_close = () => {
    if (text("继续寻宝").exists()) {
        _click(text("继续寻宝"))
    }
}
try {
    init()
    app.launchApp("闲鱼")
    while (true && control) {
        if (idContains("tab_title").text("我的").exists()) {
            _click(idContains("tab_title").text("我的"))
            _swipe("up")
        }
        if (descContains("免费加曝光").exists()) {
            const v1 = descContains("免费加曝光").findOne(1000)
            const text = v1 && v1.desc()
            const match = text && text.match(/\d+/);
            if (match) message.coins_before = Number(match[0])
            _click(descContains("免费加曝光"))
        }
        if (idContains("mapDiceBtn").exists()) {
            _click(idContains("mapDiceBtn"))
        }
        if (textContains("提醒签到").exists()) {
            text("领取奖励").find().map((v) => {
                v.click()
                randomSleep(3000, 5000)
            })
            _swipe("up", undefined, '0.6-0.8', 0.5)
            randomSleep()
            text("去完成").find().map((v) => {
                const task_title = v.parent()?.children()[v.indexInParent() - 8]?.text()
                if (task_title) {
                    const obj = task_map.find((item) => item.name === task_title)
                    if (obj && obj?.run) {
                        obj.callback(v)
                        randomSleep(3000, 5000)
                    }
                }
            })
            randomSleep(3000, 5000)
            if (!text("去完成").visibleToUser().findOne(1000)) {
                break;
            }
        }
        dialog_close()
        randomSleep()
    }
} catch (error) {
    control = false
    console.log(error);
}
