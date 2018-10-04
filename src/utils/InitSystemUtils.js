const APP_CONFIG_SESSION_NAME = "appConfig";
const WX_CONFIG_SESSION_NAME = "wxConfig";

export function setAppConfig(appConfigStr) {
  sessionStorage.setItem(APP_CONFIG_SESSION_NAME, appConfigStr);
}

export function getAppConfig() {
  return sessionStorage.getItem(APP_CONFIG_SESSION_NAME);
}

export function setWxConfig(wxConfigStr) {
  sessionStorage.setItem(WX_CONFIG_SESSION_NAME, wxConfigStr);
}

export function getWxConfig() {
  return sessionStorage.getItem(WX_CONFIG_SESSION_NAME);
}

export function getWxAppID() {
  const wxConfig = JSON.parse(sessionStorage.getItem(WX_CONFIG_SESSION_NAME));
  return wxConfig?wxConfig.appid:"";
}

export function getOpenid() {
  try {
    const loginAccount = JSON.parse(getLoginAccount());
    return loginAccount.openid;
  } catch (e) {
    return '';
  }
}
