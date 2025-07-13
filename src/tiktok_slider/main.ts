
// import { executeShell, randomInteger, randomSleep } from "../../script_submodule/common"
// console.show()
// function runSlide() {
//     //截图
//     const captureImg = idContains("captcha-verify-image").visibleToUser().findOnce();
//     const loading = text("Loading…").visibleToUser().findOnce();
//     if (!captureImg) return false;
//     if (loading) randomSleep(5000, 6000);
//     const x = captureImg.bounds().left;
//     const y = captureImg.bounds().top;
//     const width = captureImg.bounds().width();
//     const height = captureImg.bounds().height();
//     executeShell("screencap /sdcard/Download/captureImg.png");
//     const captureImgData = images.read('/sdcard/Download/captureImg.png');
//     if (!captureImgData) return false;
//     const clip = images.clip(captureImgData, x, y, width, height);
//     captureImgData?.recycle();
//     if (!clip) return false;
//     let slideData = [];
//     const imgBase64 = images.toBase64(clip, 'png', 100);
//     clip?.recycle();
//     const res = http.post("http://2b626c9c.r24.cpolar.top/identify_gap", {
//         image: imgBase64
//     }, { contentType: "application/json" }).body.json()
//     if (!res) return false
//     log(res['gap_coordinates'])
//     slideData = res['gap_coordinates']
//     const slideBnt = idContains("secsdk-captcha-drag-wrapper").visibleToUser().findOnce();
//     const slideImg = idContains("captcha-verify-image").visibleToUser().findOnce();
//     // 相对控件
//     if (!slideBnt || !slideImg) return false;
//     let realtiveX = slideImg.bounds().left;
//     let startX = slideBnt.bounds().right - randomInteger(5, 10);
//     let startY = slideBnt.bounds().centerY();
//     let moveX = Math.abs(slideData[2] + realtiveX);
//     let moveY = startY;
//     // 计算滑动的距离
//     let speed = 80; // 设定一个固定的移动速度
//     let distance = Math.sqrt(Math.pow((moveX - startX), 2) + Math.pow((moveY - startY), 2)); // 计算两点之间的欧几里得距离
//     // 计算滑动的时间
//     let time = distance / speed;
//     console.log("滑动距离:", distance, "滑动时间:", time);
//     // 使用 gestures 执行滑动操作
//     gestures([0, time * 1000, [startX, startY], [moveX, moveY]]);
// }


// runSlide();

























