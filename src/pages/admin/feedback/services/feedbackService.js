import request from '../../../../utils/request';

function list(query) {
  return request("feedbackService.list", query, true);
}

/**
 * 修改显示状态
 * @param param {id:1, status:0}
 * @returns {Object}
 */
function updateStatus(param) {
  return request("feedbackService.updateStatus", param, true);
}

function reply(values) {
  return request("feedbackService.reply", values, true);
}

export {
  list,
  updateStatus,
  reply,
}
