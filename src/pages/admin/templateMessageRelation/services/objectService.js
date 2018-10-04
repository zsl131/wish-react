import request from "../../../../utils/request";

function findAllConfig(query) {
  return request("templateMessageRelationService.list", query, true);
}

function config(obj) {
  return request("templateMessageRelationService.add", obj, true);
}

function deleteObj(id) {
  return request("templateMessageRelationService.delete", id, true);
}

export {
  findAllConfig,
  config,
  deleteObj,
}
