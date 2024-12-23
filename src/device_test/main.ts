import { init } from "../../lib/init";
import { randomSleep, wx_push } from "../../script_submodule/common";

init();

wx_push(
    'autoscript',
    `
    <h5>执行成功</h5>
    <p>去中国移动领话费</p>
    
    `
)

randomSleep(6000, 8000)

