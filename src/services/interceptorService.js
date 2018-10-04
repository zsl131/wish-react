import request from '../utils/request';

function loadWebBaseConfig() {
  return request("webInterceptorService.loadWebBase",{},true);
}

function queryLoginAccount(code) {
  return request("wxAccountService.queryAccountByCode", code, true);
}

export {
  /*loadAppConfig,
  loadWxConfig,*/
  queryLoginAccount,
  loadWebBaseConfig,
}
