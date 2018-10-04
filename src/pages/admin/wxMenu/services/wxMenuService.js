import request from '../../../../utils/request';

function listRoot(query) {
  return request("wxMenuService.listRoot", JSON.stringify(query), true);
}

function listChildren(pid) {
  return request("wxMenuService.listChildren", JSON.stringify(pid), true);
}

function update(obj) {
  return request("wxMenuService.update", JSON.stringify(obj), true);
}

function deleteMenu(id) {
  return request("wxMenuService.delete", JSON.stringify(id), true);
}

function add(obj) {
  return request("wxMenuService.add", obj, true);
}

function synchMenu() {
  return request("wxMenuService.synchMenu", {}, true);
}

export {
  listRoot,
  listChildren,
  update,
  deleteMenu,
  add,
  synchMenu,
}
