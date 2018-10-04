import request from "../../../utils/request";

const wxLoginService = "wxLoginService";
function queryWxLogin(query) {
  return request(wxLoginService+".buildQr", query, true);
}

export {
  queryWxLogin,
}
