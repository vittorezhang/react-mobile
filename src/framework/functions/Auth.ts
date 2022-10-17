import { authConfig } from '@/app/config';
import { apiEnum } from '@/app/enums';
import { query } from '@/framework/functions/Data';
import { request } from 'umi';
import { message, Modal } from 'antd';
const { confirm } = Modal;

export async function token({
    username = String,
    password = String,
    code = String,
    cacheMark = String,
    smsCode = String,
}) {
    return await query(
        `${apiEnum.auth}/oauth/token?grant_type=captcha&client_id=${authConfig.clientId}&client_secret=${authConfig.clientSecret}&username=${username}&password=${password}&code=${code}&cacheMark=${cacheMark}&smsCode=${smsCode}`,
    );
}

export async function oauthToken({ mobile = String, captcha = String }) {
    return await query(
        `${apiEnum.auth}/oauth/token?grant_type=admin_sms_code&client_id=${authConfig.clientId}&client_secret=${authConfig.clientSecret}&mobile=${mobile}&code=${captcha}`,
    );
}

export async function dingdingAuth(authCode: string) {
    return await query(
        `${apiEnum.auth}/oauth/token?grant_type=dingding&client_id=${authConfig.clientId}&client_secret=${authConfig.clientSecret}&dingdingCode=${authCode}`,
    );
}

export async function refreshToken() {
    return await query(
        `${apiEnum.auth}/oauth/token?grant_type=refresh_token&client_id=${
            authConfig.clientId
        }&client_secret=${
            authConfig.clientSecret
        }&refresh_token=${localStorage.getItem('refreshToken-zmp')}`,
    );
}

export async function getClientSecret() {
    const res = await query(
        `${apiEnum.auth}/clientDetails/loadClientByClientId`,
        {
            clientId: authConfig.clientId,
        },
    );
    if (res) {
        localStorage.setItem('clientSecret-zmp', res.clientSecret);
        authConfig.clientSecret = res.clientSecret;
    }
    return res;
}
