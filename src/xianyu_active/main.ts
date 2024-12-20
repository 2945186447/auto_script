// import { init } from "../../lib/init";
// const {
//     desktop_coin,
//     red_envelope,
//     release_treasurev,
//     treasure_hunting
// } = hamibot.env;
// import { randomSleep, _click, _swipe } from "../../script_submodule/common";
// let control = true
// let message = {
//     coins_before: 0,
//     coins_after: 0
// }
// const task_map = [{
//     name: "通过桌面访问闲鱼币",
//     run: desktop_coin,
//     callback: (widget: UiObject) => {
//         widget.click()
//     }
// }]
// const dialog_close = () => {
//     if (text("继续寻宝").exists()) {
//         _click(text("继续寻宝"))
//     }
// }
// try {
//     init()
//     app.launchApp("闲鱼")
//     while (true && control) {
//         if (idContains("tab_title").text("我的").exists()) {
//             _click(idContains("tab_title").text("我的"))
//             _swipe("up")
//         }
//         if (descContains("免费加曝光").exists()) {
//             const v1 = descContains("免费加曝光").findOne(1000)
//             const text = v1 && v1.desc()
//             const match = text && text.match(/\d+/);
//             if (match) message.coins_before = Number(match[0])
//             _click(descContains("免费加曝光"))
//         }
//         if (idContains("mapDiceBtn").exists()) {
//             _click(idContains("mapDiceBtn"))
//         }
//         if (textContains("提醒签到").exists()) {
//             text("去完成").visibleToUser().find().map((v) => {
//                 const task_title = v.parent()?.children()[v.indexInParent() - 8]?.text()
//                 if (task_title) {
//                     const obj = task_map.find((item) => item.name === task_title)
//                     if (obj && obj?.run) {
//                         obj.callback(v)
//                     }
//                 }
//             })
//             _swipe("up", undefined, '0.6-0.8', 0.5)
//             if (!text("去完成").visibleToUser().findOne(1000)) {
//                 break;
//             }
//         }
//         dialog_close()
//         randomSleep()
//     }
// } catch (error) {
//     control = false
//     console.log(error);
// }

text("去完成").visibleToUser().find().map((v) => {
    const task_title = v.parent()?.children()[v.indexInParent() - 8]?.text()
    console.log(task_title);

})