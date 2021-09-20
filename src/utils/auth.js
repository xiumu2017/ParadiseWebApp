import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    let num = 7; //失效时间7天
    return Cookies.set(TokenKey, token, {expires: num})
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
