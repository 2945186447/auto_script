interface axios {
    url: string,
    method: 'GET' |
    'POST' |
    'PUT' |
    'DELETE' |
    'PATCH' |
    'OPTIONS' |
    'HEAD' |
    'TRACE' |
    'CONNECT'
    params?: Record<string, any>;
    data?: Record<string, any>;
    headers?: Record<string, any>;
}

interface responseObj {
    data: Record<string, any>;
}