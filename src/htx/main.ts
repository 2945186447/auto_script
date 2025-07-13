import { querySelector, clickIfWidgetExists, executeShell, clickIfWidgetClickable, randomSleep } from "@script_submodule/common";
import { SysStorage } from "@script_submodule/SysStorage";





function initPhone() {
    try {
        console.log(new SysStorage().get("slogan_device_id"));
        //开启代理 美国
        const res = http.get(
            'http://103.5.126.219:8080/resource/vpn/country/VN?provider=Moyu',
            {
                headers: {
                    Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VyX2tleSI6ImI5NzgxZDMzLTQ5NDYtNDQwMS05ZDQ3LTM2ZTUyNjkxNWJlNSIsInVzZXJuYW1lIjoiYXV0b2pzIn0.lXojZRlOhVBvk4HK6FbnjMawaIN6t3-uoqRzxo9Vord_dxviLXX3h-K4521PJzz8tVtfguvq7BBBu_w442qidw"
                }
            }
        )
        if (res.statusCode != 200) throw new Error("获取代理失败");
        const data: any = res.body.json()
        const [host, port, user, pass] = data.data.content.split(":")

        executeShell([
            `pm clear pro.huobi`,
            `dg config -r proxy -a proxy.enabled=true -a proxy.protocol=socks5 -a proxy.host=${host} -a proxy.port=${port} -a proxy.user=${user} -a proxy.pass=${pass} -a proxy.dns=8.8.8.8 -a proxy.dnsType=tcp -a proxy.pkgMode=deny -a proxy.pkgs=com.hamibot.hamibot`,
            `dg mock update`,
            `dg mock ip`,
            `dg config -a prop.ro.serialno=${new SysStorage().get("slogan_device_id")}`,
            `am broadcast -a update.default.setting --ei option 1 --es language en_US`,
            `setprop persist.sys.timezone America/Los_Angeles; settings put global auto_time_zone 0; am broadcast -a android.intent.action.TIMEZONE_CHANGED --es time-zone $(getprop persist.sys.timezone)`
        ])
        app.launch('pro.huobi')
    } catch (error) {
        console.log(error);

    }


}
function generateRandomString(minLength: number = 5, maxLength: number = 12) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
const createMail = () => {
    const start = generateRandomString()
    const end = ['mailto.plus', 'fexpost.com', 'mailbox.in.ua', 'chitthi.in']
    return `${start}@${end[Math.floor(Math.random() * end.length)]}`
}

const getMail = (retry: number = 5): any => {
    try {
        const res = http.get(`https://fex.plus/api/mails?email=${mail}&limit=20&epin=`);
        if (res.statusCode == 200) {
            const json: any = res.body.json(); // ✅ 缓存第一次读取的结果
            console.log(json);
            let htxData = json.mail_list.filter((i: any) =>
                i.subject.includes('Registration') || i.subject.includes('Security')
            );
            return htxData;
        }
        throw new Error('获取邮箱失败');
    } catch (error) {
        console.log(error);
        sleep(2000);
        return retry ? getMail(retry - 1) : [];
    }
};

const getCode = (type: 'login' | 'register', retry: number = 5): any => {
    try {
        const mails = getMail();
        if (mails.length > 0) {
            if (type === 'register') {
                const reg = mails.find((i: any) => i.subject.includes('Registration') || i.subject.includes('注册验证'));
                if (reg) {
                    let ids = reg.mail_id;
                    console.log("注册邮件ID为：", ids);
                    const res = http.get(`https://fex.plus/api/mails/${ids}?email=${mail}`);
                    if (res.statusCode == 200) {
                        const data: any = res.body.json();
                        if (!data.result) throw new Error("请求失败")
                        const regex = /Your code is[:：]?\s*([\d]{4,8})/i;
                        const match = data.text.match(regex);
                        return match ? match[1] : null;
                    }
                }
            }
        }
        else {
            throw new Error("邮件未到达")
        }
    } catch (error) {
        console.log(error);
        sleep(2000)
        return retry ? getCode(type, retry - 1) : []
    }
}

function dragSlider(startX: number, startY: number, endX: number, endY: number, speed = 0.1) {
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = Math.max(800, Math.floor(distance / speed)); // 最短 800ms，让滑动更顺畅
    if (isNaN(distance.toFixed(2) as any)) {
        clickIfWidgetExists(querySelector("Refresh"));
        back()
    }
    console.log(`拖动距离: ${distance.toFixed(2)} px, 时长: ${duration} ms`);
    // 添加中间点防止直线太“死板”
    const midX = startX + dx * 0.6 + random(-5, 5); // 加点偏移
    const midY = startY + dy * 0.6 + random(-5, 5);

    gesture(duration,
        [startX, startY],
        [midX, midY],
        [endX, endY]
    );
    sleep(3000);
    if (querySelector("Slide to complete the puzzle")) {
        clickIfWidgetExists(querySelector("Close"))
    }
}

function ds(offset: number = 0) {
    try {
        sleep(3000)
        executeShell('screencap -p /sdcard/screen.png')
        const p: any = images.read('/sdcard/screen.png')
        const cp = images.clip(p, 58, 450, 600, 395);
        images.save(cp, '/sdcard/Download/screen.png');
        const imagesCp: any = images.read('/sdcard/Download/screen.png')
        const res = http.postJson(
            'http://192.168.3.177:5555/angle',
            {

                image: images.toBase64(imagesCp)
            },

        )
        const data: any = res.body.json()
        const pointX = data.angle[0];
        dragSlider(60, 841 + offset, pointX + 25, 841 + offset)
        sleep(3000);

    } catch (error) {
        clickIfWidgetExists(querySelector("Refresh"))
        back()
    }

}



let mail = '';
let code = '';
let password = 'vB0hTQx76V';
const inviteCode = 'ey5hc223';

initPhone();


let toastText = ''

threads.start(function () {
    events.observeToast();
    events.onToast(function (toast) {
        toastText = toast.getText() || ''
    });
})

let startTime = Date.now();
while (true) {
    if (Date.now() - startTime > 4 * 60 * 1000) {
        console.log("超时重开");
        mail = '';
        code = '';
        initPhone();
        startTime = Date.now(); // 只在超时后更新
    }
    if (toastText.includes("Server Error")) {
        console.log("服务器错误");
        mail = '';
        code = '';
        initPhone();
        startTime = Date.now(); // 服务器错误也算重试
    }


    if (!mail) {
        mail = createMail()
    }
    let isoffset = 0
    if (querySelector("id=guide_btn_register_now")) {
        clickIfWidgetExists(querySelector("id=guide_btn_register_now"));
    }
    if (querySelector("Allow HTX to")) {
        clickIfWidgetExists(querySelector("ALLOW"));
    }
    if (querySelector("id=ll_account_root")) {
        querySelector("id=login_account_edit")?.setText(mail);
        sleep(1000);
        let reg_next = querySelector("id=register_btn_next")
        if (reg_next) clickIfWidgetClickable(reg_next)
    }
    if (querySelector("Security Verification") && isoffset == 0) {
        clickIfWidgetExists(querySelector("Click to verify"))
        isoffset = 68
    }
    if (querySelector("images with")) {
        executeShell('pm clear pro.huobi')
        app.launch('pro.huobi')
    }
    if (querySelector("Slide to complete the puzzle")) {
        ds(isoffset)
    }
    if (querySelector("Enter verification code")) {
        code = getCode('register', 3);
        console.log(code);
        for (let index = 0; index < 6; index++) {
            querySelector(`id=captchaText${index + 1}`)?.setText(code[index])
        }
        sleep(1000);
    }
    if (querySelector("Welcome Bonus Up to")) {
        clickIfWidgetExists(querySelector("Welcome Bonus Up to"))
    }
    if (querySelector("Set Password")) {
        querySelector("id=set_psw_edit")?.setText(password);
        sleep(500);
        querySelector("id=cet_invite")?.setText(inviteCode);
        sleep(500);
        clickIfWidgetClickable(querySelector("id=register_btn_next"));
    }
    if (querySelector("id=tv_gesture_tips")) {
        gesture(
            3000,
            [166, 296], // 1
            [358, 296], // 2
            [553, 296], // 3
            [553, 488], // 6
            [553, 682], // 9
            [358, 682], // 7
            [166, 682]  // 8
        )
    }
    if (querySelector("Deposit Now") || querySelector("Link Google")) {
        console.log("注册成功");
        mail = '';
        code = '';
        initPhone();
        startTime = Date.now();
    }
    randomSleep(500, 1000)
}
