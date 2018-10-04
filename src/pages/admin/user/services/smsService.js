import request from "../../../../utils/request";

const serviceName = "smsService";
function sendCode(query) {
  return request(serviceName+".sendCode", query, true);
}
export  {
  sendCode,
}
