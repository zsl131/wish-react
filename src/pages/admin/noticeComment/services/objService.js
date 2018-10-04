import request from '../../../../utils/request';

const baseService = "noticeCommentService";
function list(query) {
  return request(baseService+".list", query, true);
}

function update(comment) {
  return request(baseService+".update", comment, true);
}

function updateStatus(obj) {
  return request(baseService+".updateStatus", obj, true);
}

function deleteObj(id) {
  return request(baseService+".delete", id, true);
}

function loadOne(id) {
  return request(baseService+".loadOne", id, true);
}

export {
  list,
  update,
  updateStatus,
  deleteObj,
  loadOne,
}
