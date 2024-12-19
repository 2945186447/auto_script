

const defaultContentType = "application/json";
const baseUrl = ''


function serializeParams(params: Record<string, any>): string {
    var queryString: string[] = [];

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var value = params[key];

            if (value === void 0 || value === null) continue;

            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
                queryString.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
            } else if (Array.isArray(value)) {
                queryString.push(encodeURIComponent(key) + "=" + encodeURIComponent(value.join(",")));
            } else if (typeof value === "object") {
                queryString.push(encodeURIComponent(key) + "=" + encodeURIComponent(JSON.stringify(value)));
            }
        }
    }

    return queryString.join("&");
}

const axios = ({ url, method, data, params, headers }: axios) => {
    const _headers = {
        ...{
            "Content-Type": defaultContentType,
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/237.84.2.178 Safari/537.36"
        },
        ...headers
    }
    const _params_data = params && serializeParams(params)
    const options = {
        method,
        headers: _headers
    }
    const _url = _params_data ? url + '?' + _params_data : url
    // 根据 Content-Type 动态处理 body 数据
    if (method === 'POST' || method === 'PUT') {
        if (_headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            options['body'] = data && serializeParams(data);
        } else {
            options['body'] = JSON.stringify(data);
        }
    }
    // const res = http.request(_url, options)

    const responseObj = {
        data: { a: '123' },
    }
    console.log(responseObj);

}



export default axios 