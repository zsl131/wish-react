import request from '../../../utils/request';

export function remoteCheckLogin(values) {
  const valStr = JSON.stringify(values);
  return request("userService.login", valStr, true);
}
