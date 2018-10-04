import request from '../../../../utils/request';

function loadOne() {
  return request("wxConfigService.loadOne", JSON.stringify({}), true);
}

function save(obj) {
  return request("wxConfigService.save", JSON.stringify(obj), true);
}

export {
  loadOne,
  save,
}
