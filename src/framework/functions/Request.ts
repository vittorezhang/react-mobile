import { notification } from 'antd';
// notification
import { history } from 'umi';

import { extend } from 'umi-request';

// 错误提示配置
notification.config({
    duration: 2,
    maxCount: 1,
});

const codeMessage: Record<string, string> = {
    200: '执行成功',
    400: '请求无法解析',
    401: '认证失败，账号信息有误。',
    403: '无权限，请申请相应授权。',
    404: '接口不存在，请检查请求接口。',
    408: '请求超时，请稍后再试。',
    409: '登录过期，请重新登录。',
    410: '访问的资源已经不存在',
    500: '服务器发生错误，请检查服务器。',
    501: '该功能暂未上线，敬请期待。',
    502: '网关错误',
    503: '服务器资源尚未准备好处理当前请求，请稍后再试。',
    504: '网关超时',
    506: '参数错误',
    507: '记录不存在，请核对数据。',
    508: '用户操作超出限制',
    509: '数据加载失败，请稍后重试。',
    510: 'IP鉴权不通过',
    555: '未知错误',
    560: '数据重复',
    580: '系统功能降级',
};

export function requestInterceptor(url: any, { data, ...options }: any) {
    console.log(121212);
    const accessToken = localStorage.getItem('accessToken-bend') || '';
    const headers = {};
    if (options.requestType === 'form') {
        Object.assign(headers, {
            Authorization: `bearer ${accessToken}`,
            // ignoreTenant: 1,
        });
    } else {
        Object.assign(headers, {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `bearer ${accessToken}`,
            // ignoreTenant: 1,
        });
    }
    return {
        url: `/api${url}`,
        options: { ...options, data, method: 'POST', headers },
    };
}

export async function responseInterceptor(response: any) {
    const { code, msg, status, ...rest } = await response.clone().json();
    if (code === '200') {
        const { data } = rest;
        if (data) {
            const { accessToken, refreshToken, userId, username, avatar } =
                data;
            if (accessToken) {
                localStorage.setItem('accessToken-bend', accessToken);
                localStorage.setItem('refreshToken-bend', refreshToken);
                localStorage.setItem('userId-bend', userId);
                localStorage.setItem('username-bend', username);
                localStorage.setItem('avatar', avatar ? avatar : '');
            }
        }
        return { ...rest };
    }
    if (
        code == 409 ||
        (code == 506 && response.url.indexOf('getAccountInformation') !== -1)
    ) {
        // 清空本地存储 跳转登录
        localStorage.removeItem('clientSecret-bend');
        localStorage.removeItem('accessToken-bend');
        localStorage.removeItem('refreshToken-bend');
        localStorage.removeItem('userId-bend');
        localStorage.removeItem('username-bend');
        localStorage.removeItem('avatar');
        history.replace('/');
    }
    notification.error({
        message:
            `${codeMessage[code]}` != 'undefined'
                ? `${codeMessage[code]}`
                : msg,
        description: msg,
    });
    return false;
}

const request = extend({
    prefix: '', // 路径前缀
    //errorHandler, // 默认错误处理
    credentials: 'include', // 默认请求是否带上cookie
    timeout: 6000,
});

request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(responseInterceptor);

export default request;
