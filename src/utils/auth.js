import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    let num = 7; //失效时间7天
    let time = new Date(new Date().getTime() + num * 24 * 60 * 60 * 1000);
    return Cookies.set(TokenKey, token, {expires: time})
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
