// <<<<<<< HEAD
// import { _click, _ubclick, randomSleep, } from "../../script_submodule/common";

// //请求横屏截图
// requestScreenCapture(true);

// randomSleep(3000)

// // app.launch("com.hero.sm.m4399")

// files.create("/sdcard/czymf/");


// while (true) {
//     //截图
//     const img = captureScreen();
//     const homesetting = images.read("/sdcard/czymf/homesetting.png")
//     if (homesetting) {
//         const res = images.findImage(img, homesetting)
//         console.log(res);
//         if (res) {
//             click(res.x, res.y)
// =======
// import { clickIfWidgetExists, querySelector, randomSleep } from "@script_submodule/common";
// import ksmx from "@/assets/ksmx.png";
// import setting from "@/assets/setting.png";
// import close from "@/assets/close.png";
// import djjx from "@/assets/djjx.png";
// import startgame from "@/assets/startgame.png";
// import createuser from "@/assets/createuser.png";
// import launchgame from "@/assets/launchgame.png";
// import launchgame2 from "@/assets/launchgame2.png";
// import chat from "@/assets/chat.png";
// import dialog from "@/assets/dialog.png";
// import close_dia from "@/assets/close_dia.png";
// import confirm_auth from "@/assets/confirm_auth.png";
// import input_phone from "@/assets/input_phone.png";
// import input_code from "@/assets/input_code.png";
// import send_code from "@/assets/send_code.png";
// import g_setting from "@/assets/g_setting.png";
// import back from "@/assets/back.png";
// import logout from "@/assets/logout.png";
// requestScreenCapture(true);
// const apiBaseUrl = 'http://175.178.41.25:3000'
// const jm_Api = 'http://api.sqhyw.net:90/api';
// const jm_account = 'yang2945186447';
// const jn_pwd = 'yyyyyyy7'
// const jm_project_id = "890302----B9Q300"
// let account_id: any = null

// app.launch("com.hero.sm.m4399")

// const getAccount = () => {
//     try {
//         const res = http.get(`${apiBaseUrl}/getAccount`);
//         let data: {
//             createTime: string,
//             id: string,
//             account: string,
//             password: string,
//             status: number,
//             use_status: number
//         } | null = null
//         if (res.statusCode == 200) {
//             const d = res.body.json()
//             data = d['data'];
//             account_id = data?.id
//             if (data) {
//                 return data
//             }
// >>>>>>> d0cb9801b334531b7d894311455afc086695db83
//         }
//     } catch (error) {
//         return null
//     }
// <<<<<<< HEAD
//     //首页设置
//     const homelogout = images.read("/sdcard/czymf/homelogout.png");
//     if (homelogout) {
//         const res = images.findImage(img, homelogout)
//         console.log(res);
//         if (res) {
//             click(res.x, res.y)
//         }
//     }
//     //登录页
//     const homestart = images.read("/sdcard/czymf/homestart.png")
//     if (homestart) {
//         const res = images.findImage(img, homestart)
//         console.log(res);
//         if (res) {
//             click(res.x, res.y)
//         }
//     }
//     //已阅读并同意

//     const continueBtn = text("已阅读并同意").visibleToUser().findOne(1000);
//     if (continueBtn) {
//         _ubclick(continueBtn)
//         randomSleep(2000)
//     }
//     //授权并且登录
//     const login4399 = text("切换其他账号").visibleToUser().findOne(1000);
//     if (login4399) {
//         _ubclick(login4399)
//     }

//     //添加账号
//     const addAcc4399 = text("添加账号").visibleToUser().findOne(1000);
//     if (addAcc4399) {
//         _ubclick(addAcc4399)
//     }
//     //账号登录
//     const loginAcc = text("账号登录").visibleToUser().findOne(1000);
//     if (loginAcc) {
//         _ubclick(loginAcc)
//     }
//     //输入账号密码
//     const inputAcc = text("账号密码登录").visibleToUser().exists();

//     if (inputAcc) {
//         idContains("et_first").visibleToUser().findOne(1000)?.setText("34yryr6ud");
//         randomSleep(1000);
//         idContains("et_second").visibleToUser().findOne(1000)?.setText("123456");
//         randomSleep(1000);
//         idContains("cb_user_agreement").visibleToUser().findOne(1000)?.click();
//         break;
//     }


//     randomSleep(2000, 3000)
// }




// =======
// }
// const reportAccount = () => {
//     try {
//         const res = http.get(`${apiBaseUrl}/updateAccount?id=${account_id}`);
//         console.log("上报");

//         console.log(res.body.string());

//     } catch (error) {

//     }
// }
// let token = null;
// let phone_num = null;
// let phone_num_use_num = 0;
// let code = null;
// let no_code = false;
// const login_yezi = () => {
//     try {
//         const res = http.get(`${jm_Api}/logins?username=${jm_account}&password=${jn_pwd}`);
//         if (res.statusCode == 200) {
//             toast("登录成功")
//             const d = res.body.json();
//             console.log("登录成功");
//             return d['token']
//         }
//         return null
//     } catch (error) {
//         console.log(error);
//         return null
//     }
// }
// token = login_yezi();

// if (!token) {
//     toast("token不存在")
// }

// const black_list = () => {
//     try {
//         toast("拉黑号码")
//         let reqUrl = `${jm_Api}/free_mobile?token=${token}&?project_id=${jm_project_id}&phone_num=${phone_num}`;
//         const res = http.get(reqUrl);
//         phone_num = null;
//         phone_num_use_num = 0;
//     } catch (error) {

//     }

// }

// const release = () => {
//     try {
//         toast("释放号码")
//         let reqUrl = `${jm_Api}/add_blacklist?token=${token}&?project_id=${jm_project_id}&phone_num=${phone_num}`;
//         const res = http.get(reqUrl);
//         if (phone_num_use_num >= 2) {
//             black_list();
//         }
//     } catch (error) {

//     }
// }

// const getMobile = (recursion: number = 2) => {
//     console.log("token" + token);
//     try {
//         let reqUrl = `${jm_Api}/get_mobile?token=${token}&?project_id=${jm_project_id}`;
//         if (phone_num) reqUrl += `&phone_num=${phone_num}`
//         const res = http.get(reqUrl);
//         if (res.statusCode == 200) {
//             const data: any = res.body.json();
//             if (data.message == "ok") {
//                 phone_num = data.mobile
//                 return data.mobile
//             }
//         }
//         else {
//             toast("获取手机号失败,重新获取")
//             throw '获取手机号失败'
//         }

//     } catch (error) {
//         console.log(error);
//         randomSleep(5000, 6000);
//         return recursion ? getMobile(recursion - 1) : null
//     }
// }
// const getCode = (recursion: number = 10) => {
//     try {
//         let reqUrl = `${jm_Api}/get_message?token=${token}&?project_id=${jm_project_id}&phone_num=${phone_num}`;
//         const res = http.get(reqUrl);
//         if (res.statusCode == 200) {
//             const data: any = res.body.json();
//             if (data.data.length > 0) {
//                 code = data.code;
//                 toast(String(code))
//                 return data.code
//             }
//             else {
//                 toast(data.message);
//                 throw data.message
//             }
//         }
//         else {
//             throw '请求失败'
//         }
//     } catch (error) {
//         sleep(5000)
//         return recursion ? getCode(recursion - 1) : null
//     }
// }

// let isInputAccount = false;
// let isOauth = false;
// while (true) {
//     const img = captureScreen();
//     const close_btn = images.fromBase64(close);
//     const close_point = images.findImage(img, close_btn);
//     if (close_point) {
//         console.log("关闭公告");
//         click(close_point.x + 30, close_point?.y + 30);
//     }
//     const djjx_btn = images.fromBase64(djjx);
//     const djjx_point = images.findImage(img, djjx_btn);
//     if (djjx_point) {
//         console.log("启动页");
//         click(djjx_point.x + 30, djjx_point?.y + 30);
//     }
//     const tv_positive = querySelector("id=m4399_id_tv_positive")
//     if (tv_positive) {
//         console.log("tv_positive");
//         clickIfWidgetExists(tv_positive);
//         randomSleep(3000, 4000);
//     }
//     const change_account = querySelector("id=change_account")
//     if (change_account && !isInputAccount) {
//         console.log("change_account");
//         clickIfWidgetExists(change_account);
//         isInputAccount = true;
//     }
//     const account_limit = querySelector("id=tv_max_count_tip");

//     if (account_limit) {
//         clickIfWidgetExists(querySelector("管理"));
//         randomSleep(800, 1000);
//         clickIfWidgetExists(querySelector("删除"));
//         randomSleep(800, 1000);
//         clickIfWidgetExists(querySelector("id=btn_dialog_horizontal_left"));
//         randomSleep(800, 1000);
//         clickIfWidgetExists(querySelector("id=account_manager"));
//     }
//     const add_account_btn = querySelector("添加帐号")
//     if (add_account_btn) {
//         console.log("添加帐号");
//         clickIfWidgetExists(add_account_btn)
//     }

//     //账号登录
//     const second_entrance = querySelector("id=tv_second_entrance")
//     if (second_entrance) {
//         console.log("账号登录");
//         clickIfWidgetExists(second_entrance)
//     }
//     //输入账号密码
//     //同意协议
//     const et_first = querySelector("id=et_first")
//     const et_second = querySelector("id=et_second")
//     if (et_first && et_second) {
//         console.log("输入账号密码");
//         const data = getAccount();
//         if (data) {
//             toast("取号成功");
//             et_first.setText(data.account);
//             randomSleep(500, 1000);
//             et_second.setText(data.password);
//             randomSleep(500, 1000);
//             clickIfWidgetExists(querySelector("id=cb_user_agreement"));
//             randomSleep(500, 1000);
//             clickIfWidgetExists(querySelector("id=tv_action"));
//         }
//     }
//     //登录
//     const btn_oauth = querySelector("id=btn_oauth")
//     if (btn_oauth && isInputAccount) {
//         console.log("登录");
//         clickIfWidgetExists(btn_oauth);
//         isInputAccount = false;
//     }

//     //选区
//     const startgame_btn = images.fromBase64(startgame);
//     const startgame_point = images.findImage(img, startgame_btn);
//     if (startgame_point) {
//         console.log("选区");
//         click(startgame_point.x + 30, startgame_point?.y + 30);
//     }

//     //创建角色
//     const createuser_btn = images.fromBase64(createuser);
//     const createuser_point = images.findImage(img, createuser_btn);
//     if (createuser_point) {
//         console.log("创建角色");
//         click(createuser_point.x + 30, createuser_point?.y + 30);
//     }
//     //开始冒险
//     const launchgame_btn = images.fromBase64(launchgame);
//     const launchgame_point = images.findImage(img, launchgame_btn);
//     if (launchgame_point && !isOauth) {
//         console.log("开始冒险");

//         click(launchgame_point.x + 30, launchgame_point?.y + 30);
//     }
//     //开始冒险2
//     const launchgame2_btn = images.fromBase64(launchgame2);
//     const launchgame2_point = images.findImage(img, launchgame2_btn);
//     if (launchgame2_point && !isOauth) {
//         console.log("开始冒险2");
//         click(launchgame2_point.x + 30, launchgame2_point?.y + 30);
//     }
//     //
//     const chat_btn = images.fromBase64(chat);
//     const chat_point = images.findImage(img, chat_btn);
//     if (chat_point && !isOauth) {
//         console.log("聊天");
//         click(chat_point.x + 10, chat_point?.y + 10);
//     }

//     const dialog_btn = images.fromBase64(dialog);
//     const dialog_point = images.findImage(img, dialog_btn);

//     if (dialog_point) {
//         isOauth = false;
//         console.log("对话");
//         const input_phone_btn = images.fromBase64(input_phone);
//         const input_phone_point = images.findImage(img, input_phone_btn);
//         if (input_phone_point) {
//             const res = getMobile();
//             if (!res) {
//                 toast("取手机号失败退出");
//                 break;
//             }
//             click(input_phone_point.x + 30, input_phone_point?.y + 10);
//             randomSleep(500, 1000);
//             setText(String(phone_num))
//             randomSleep(500, 1000);
//             clickIfWidgetExists(querySelector("确定"))
//         }
//         const send_code_btn = images.fromBase64(send_code);
//         const send_code_point = images.findImage(img, send_code_btn);
//         if (send_code_point) {
//             click(send_code_point.x + 30, send_code_point?.y + 10);
//             randomSleep(500, 1000);
//         }
//         const input_code_btn = images.fromBase64(input_code);
//         const input_code_point = images.findImage(img, input_code_btn);
//         if (input_code_point) {
//             const res = getCode();
//             if (!res) {
//                 console.log("没有取到码");
//                 phone_num_use_num++
//                 no_code = true;
//                 black_list();
//                 const close_dia_btn = images.fromBase64(close_dia);
//                 const close_dia_point = images.findImage(img, close_dia_btn);
//                 if (close_dia_point) {
//                     click(close_dia_point.x + 30, close_dia_point?.y + 10);
//                     randomSleep(500, 1000);
//                 }
//             }
//             else {
//                 no_code = false;
//                 release();
//                 click(input_code_point.x + 30, input_code_point?.y + 10);
//                 randomSleep(500, 1000);
//                 setText(String(code))
//                 randomSleep(500, 1000);
//                 clickIfWidgetExists(querySelector("确定"))
//             }

//         }
//         //确定认证
//         const confirm_auth_btn = images.fromBase64(confirm_auth);
//         const confirm_auth_point = images.findImage(img, confirm_auth_btn);
//         if (confirm_auth_point && !no_code) {
//             console.log("确定认证");
//             click(confirm_auth_point.x + 30, confirm_auth_point?.y + 10);
//             isOauth = true;
//             randomSleep(1000, 1500)
//         }

//     }
//     const g_setting_btn = images.fromBase64(g_setting);
//     const g_setting_point = images.findImage(img, g_setting_btn);
//     if (isOauth && !g_setting_point) {
//         click(2207, 291);
//         randomSleep(1000, 2000);
//     }

//     if (isOauth && g_setting_point) {
//         const g_setting_btn = images.fromBase64(g_setting);
//         const g_setting_point = images.findImage(img, g_setting_btn);
//         if (g_setting_point) {
//             click(g_setting_point.x + 10, g_setting_point?.y + 10);
//             randomSleep(500, 1000);
//         }
//     }
//     const back_btn = images.fromBase64(back);
//     const back_point = images.findImage(img, back_btn);
//     if (back_point) {
//         click(back_point.x + 10, back_point?.y + 10);
//         randomSleep(500, 1000);
//         //释放账号
//         reportAccount()
//     }
//     const ksmx_btn = images.fromBase64(ksmx);
//     const res = images.findImage(img, ksmx_btn);
//     const setting_btn = images.fromBase64(setting);
//     const setting_point = images.findImage(img, setting_btn);
//     if (res && setting_point) {
//         click(setting_point.x, setting_point?.y);
//     }
//     const logout_btn = images.fromBase64(logout);
//     const logout_point = images.findImage(img, logout_btn);
//     if (logout_point) {
//         click(logout_point.x + 10, logout_point?.y + 10);
//         randomSleep(500, 1000);
//         isOauth = false;
//     }
//     randomSleep(1000, 2000)
// }
// >>>>>>> d0cb9801b334531b7d894311455afc086695db83


