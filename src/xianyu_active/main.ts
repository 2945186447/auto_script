// import { init } from "../../lib/init";
// const {
//     desktop_coin,
//     red_envelope,
//     release_treasure,
//     treasure_hunting,
//     ant_farm,
//     buy_or_sell_treasure,
//     watch_ad,
//     alipay_farm,
//     ant_forest,
//     kuaishou,
//     baba_farm,
//     mobile_sign,
//     taobao_sign,
//     alipay_points,
//     channel_goods,
//     search_products,
//     like_products,
//     browse_newgoods,
//     sheep_huafei,
//     elema_apple,
//     xianyu_live
// } = hamibot.env;
// import { randomSleep, _click, _swipe } from "../../script_submodule/common";
// let control = true
// let message = {
//     coins_before: 0,
//     coins_after: 0
// }
// const task_map = [
//     {
//         name: "去饿了么果园领水果",
//         run: elema_apple,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 去饿了么果园领水果');
//                     break;
//                 }
//                 if (text("现金提款机").exists()) {
//                     console.log("出现");
//                     randomSleep(3000, 5000);
//                     app.launchApp("闲鱼");
//                     randomSleep();
//                     back();
//                     hamibot.postMessage('执行成功 => 去饿了么果园领水果');
//                     break;
//                 }
//                 randomSleep()
//             }
//         }
//     },
//     {
//         name: "薅羊毛赚话费",
//         run: sheep_huafei,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 薅羊毛赚话费');
//                     break;
//                 }
//                 if (textContains("赚话费").exists() && textContains("薅羊毛").exists()) {
//                     console.log("出现");
//                     randomSleep(3000, 5000);
//                     app.launchApp("闲鱼");
//                     randomSleep();
//                     back();
//                     hamibot.postMessage('执行成功 => 薅羊毛赚话费');
//                     break;
//                 }
//                 randomSleep()
//             }
//         }
//     },
//     {
//         name: "通过桌面访问闲鱼币",
//         run: desktop_coin,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(3000, 5000)
//         }
//     },
//     {
//         name: "参与一次拼手气红包",
//         run: red_envelope,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 参与一次拼手气红包');
//                     break;
//                 }
//                 if (text("做任务参与瓜分").visibleToUser().exists()) {
//                     _click(text("做任务参与瓜分"))
//                 }
//                 if (text("搜索后浏览得奖励").exists()) {
//                     _click(textContains("点击"))
//                 }
//                 if (textContains("滑动浏览").exists()) {
//                     _swipe("up", undefined, '0.2-0.8', 0.3)
//                 }
//                 if (textContains("逛逛宝贝吧~").exists()) {
//                     back()
//                     randomSleep()
//                     back()
//                     randomSleep()
//                     back()
//                     hamibot.postMessage('执行成功 => 参与一次拼手气红包');
//                     break;
//                 }
//                 randomSleep()
//             }
//         }
//     },
//     {
//         name: "发布一件新宝贝",
//         run: release_treasure,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(3000, 5000)
//         }
//     },
//     {
//         name: "好物夺宝试试手气",
//         run: treasure_hunting,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(3000, 5000)
//         }
//     },
//     {
//         name: "去蚂蚁庄园逛一逛",
//         run: ant_farm,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 去蚂蚁庄园逛一逛');
//                     break;
//                 }
//                 if (text("蚂蚁庄园").exists()) {
//                     console.log("出现");
//                     randomSleep(3000, 5000);
//                     app.launchApp("闲鱼");
//                     randomSleep();
//                     back();
//                     hamibot.postMessage('执行成功 => 去蚂蚁庄园逛一逛');
//                     break;
//                 }
//                 randomSleep()
//             }
//         }
//     },
//     {
//         name: "买到或卖出一件宝贝",
//         run: buy_or_sell_treasure,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(3000, 5000)
//         }
//     },
//     {
//         name: "看视频奖励",
//         run: watch_ad,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(3000, 5000)
//         }
//     },
//     {
//         name: "去支付宝农场领水果",
//         run: alipay_farm,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 去支付宝农场领水果');
//                     break;
//                 }
//                 if (text("立即施肥").exists()) {
//                     console.log("出现");
//                     randomSleep(3000, 5000);
//                     app.launchApp("闲鱼");
//                     randomSleep();
//                     back();
//                     hamibot.postMessage('执行成功 => 去支付宝农场领水果');
//                     break;
//                 }
//                 randomSleep()
//             }
//         }
//     },
//     {
//         name: "去支付宝领积分",
//         run: alipay_points,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 去支付宝领积分');
//                     break;
//                 }
//                 if (text("会员签到赚积分").exists()) {
//                     console.log("出现");
//                     randomSleep(3000, 5000);
//                     app.launchApp("闲鱼");
//                     randomSleep();
//                     back();
//                     hamibot.postMessage('执行成功 => 去支付宝领积分');
//                     break;
//                 }
//                 randomSleep()
//             }
//         }
//     },
//     {
//         name: "去蚂蚁森林逛一逛",
//         run: ant_forest,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 去蚂蚁森林逛一逛');
//                     break;
//                 }
//                 if (text("蚂蚁森林").exists()) {
//                     console.log("出现");
//                     randomSleep(3000, 5000);
//                     app.launchApp("闲鱼");
//                     randomSleep();
//                     back();
//                     hamibot.postMessage('执行成功 => 去蚂蚁森林逛一逛');
//                     break;
//                 }
//                 randomSleep()
//             }
//         }
//     },
//     {
//         name: "去快手极速版领红包",
//         run: kuaishou,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(3000, 5000)
//         }
//     },
//     {
//         name: "去逛一逛芭芭农场",
//         run: baba_farm,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 去逛一逛芭芭农场');
//                     break;
//                 }
//                 if (text("找帮手").exists()) {
//                     console.log("出现");
//                     randomSleep(3000, 5000);
//                     app.launchApp("闲鱼");
//                     randomSleep();
//                     back();
//                     hamibot.postMessage('执行成功 => 去逛一逛芭芭农场');
//                     break;
//                 }
//                 randomSleep()
//             }
//         }
//     },
//     {
//         name: "去中国移动领话费",
//         run: mobile_sign,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 去中国移动领话费');
//                     break;
//                 }
//                 if (text("签到有礼").exists()) {
//                     console.log("出现");
//                     randomSleep(3000, 5000);
//                     app.launchApp("闲鱼");
//                     randomSleep();
//                     back();
//                     hamibot.postMessage('执行成功 => 去中国移动领话费');
//                     break;
//                 }
//                 randomSleep()
//             }
//         }
//     },
//     {
//         name: "去淘宝签到领红包",
//         run: taobao_sign,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 去淘宝签到领红包');
//                     break;
//                 }
//                 if (text("立即签到").exists() || text("签到频道红包").exists()) {
//                     console.log("出现");
//                     randomSleep(3000, 5000);
//                     app.launchApp("闲鱼");
//                     randomSleep();
//                     back();
//                     hamibot.postMessage('执行成功 => 去淘宝签到领红包');
//                     break;
//                 }
//                 _swipe("down")
//                 randomSleep()
//             }
//         }
//     },
//     {
//         name: "浏览指定频道好物",
//         run: channel_goods,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 浏览指定频道好物');
//                     break;
//                 }
//                 if (text("点击领取").visibleToUser().exists()) {
//                     randomSleep()
//                     _click(text("点击领取"))
//                     hamibot.postMessage('执行成功 => 浏览指定频道好物');
//                     break
//                 }
//                 _swipe("up", undefined, '0.2-0.8', 0.3)
//                 randomSleep()
//             }

//         }
//     },
//     {
//         name: "搜一搜推荐商品",
//         run: search_products,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 搜一搜推荐商品');
//                     break;
//                 }
//                 if (text("搜索后浏览得奖励").exists()) {
//                     _click(textContains("点击"))
//                 }
//                 if (textContains("滑动浏览").exists()) {
//                     _swipe("up", undefined, '0.2-0.8', 0.3)
//                 }
//                 if (textContains("逛逛宝贝吧~").exists()) {
//                     back()
//                     randomSleep()
//                     back()
//                     hamibot.postMessage('执行成功 => 搜一搜推荐商品');
//                     break;
//                 }

//                 randomSleep()
//             }

//         }
//     },
//     {
//         name: "搜一搜喜欢的商品",
//         run: like_products,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 搜一搜喜欢的商品');
//                     break;
//                 }
//                 if (textContains("滑动浏览").exists()) {
//                     _swipe("up", undefined, '0.2-0.8', 0.3)
//                 }
//                 else {
//                     back()
//                     hamibot.postMessage('执行成功 => 搜一搜喜欢的商品');
//                     break;
//                 }
//                 randomSleep()
//             }

//         }
//     },
//     {
//         name: "去浏览全新好物",
//         run: browse_newgoods,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 去浏览全新好物');
//                     break;
//                 }
//                 if (textContains("滑动浏览").exists()) {
//                     _swipe("up", undefined, '0.2-0.8', 0.3)
//                 }
//                 else {
//                     back()
//                     hamibot.postMessage('执行成功 => 去浏览全新好物');
//                     break;
//                 }
//                 randomSleep()
//             }

//         }
//     },
//     {
//         name: "去看一看闲鱼直播",
//         run: xianyu_live,
//         callback: (widget: UiObject) => {
//             widget.click()
//             randomSleep(8000, 9000)
//             // 设置超时时间（毫秒）
//             const timeout = 3 * 60 * 1000;
//             const startTime = Date.now();
//             while (true) {
//                 // 检查是否超时
//                 if (Date.now() - startTime > timeout) {
//                     hamibot.postMessage('执行超时 => 去看一看闲鱼直播');
//                     break;
//                 }
//                 break;
//             }

//         }
//     }
// ]
// const dialog_close = () => {
//     if (text("继续寻宝").exists()) {
//         _click(text("继续寻宝"))
//     }
// }
// try {
//     init()
//     app.launchApp("闲鱼")
//     let sNum = 0
//     while (true && control) {
//         if (sNum >= 10) {
//             hamibot.postMessage('执行结束');
//             hamibot.exit()
//             break;
//         }
//         if (idContains("tab_title").text("我的").exists()) {
//             _click(idContains("tab_title").text("我的"))
//             _swipe("up", undefined, '0.2-0.8', 0.3)
//         }
//         if (descContains("免费加曝光").exists()) {
//             const v1 = descContains("免费加曝光").findOne(1000)
//             const text = v1 && v1.desc()
//             const match = text && text.match(/\d+/);
//             if (match) message.coins_before = Number(match[0])
//             _click(descContains("免费加曝光"))
//         }
//         if (text("本次获得").exists() && textContains("夏日").exists()) {
//             back()
//         }
//         if (idContains("mapDiceBtn").exists()) {
//             if (text("领取酬金").visibleToUser().exists()) {
//                 _click(text("领取酬金"))
//             }
//             _click(idContains("mapDiceBtn"))
//         }
//         if (textContains("提醒签到").exists()) {
//             if (text("签到").visibleToUser().exists()) {
//                 _click(text("签到"))
//             }
//             text("领取奖励").find().map((v) => {
//                 v.click()
//                 randomSleep(3000, 5000)
//             })
//             _swipe("up", undefined, '0.6-0.8', 0.5)
//             sNum++
//             randomSleep()
//             text("去完成").find().map((v) => {
//                 let task_title = v.parent()?.children()[v.indexInParent() - 8]?.text()
//                 console.log(task_title);

//                 if (task_title == "+") task_title = v.parent()?.children()[v.indexInParent() - 13]?.text()
//                 if (task_title) {
//                     const obj = task_map.find((item) => item.name === task_title)
//                     if (obj && obj?.run) {
//                         obj.callback(v)
//                         randomSleep(3000, 5000)
//                     }
//                 }
//             })
//             randomSleep(3000, 5000)
//         }
//         dialog_close()
//         randomSleep()
//     }
// } catch (error) {
//     control = false
//     console.log(error);
// }
