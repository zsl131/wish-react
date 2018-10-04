import request from '../../../../utils/request';
function list(query){
  return request("scoreRuleService.list",JSON.stringify(query),true);
}

function addOrUpdate(obj){
  return request("scoreRuleService.addOrUpdate",JSON.stringify(obj),true);
}
function deleteObj(id){
  return request("scoreRuleService.delete",JSON.stringify(id),true);
}
export {
  list,
  addOrUpdate,
  deleteObj
}
