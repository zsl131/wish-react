import request from '../../../../utils/request';

function list(query) {
  return request("wxAccountService.list", JSON.stringify(query), true);
}

/**
 * 修改微信用户类型
 * @param obj 包含：id、type
 * @returns {Object}
 */
function updateType(obj) {
  return request("wxAccountService.updateType", JSON.stringify(obj), true);
}

function onSynch(id) {
  return request("wxAccountService.updateAccount", JSON.stringify(id), true);
}

export {
  list,
  updateType,
  onSynch,
}
