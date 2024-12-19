import { init } from "../../lib/init";
import axios from "../../script_submodule/axios"
init()

axios({
    url: 'https://www.baidu.com',
    method: 'GET',
    headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/237.84.2.178 Safari/537.36'
    }
})


