import {updatePwd} from "../services/users";
import { message } from "antd";
import {sendCode} from "../services/smsService";
export default {
  namespace: 'userPwd',
  state: {
    phone:null
  },
  reducers: {

  },
  effects: {
    *updatePwd({ payload: values }, { call }) {
      const data = yield call(updatePwd, values);
      // console.log(data);
      if(data) {
        message.success(data.message);
      }
    },
    *sendCode({payload: phone}, {call,put}) {
      const data = call(sendCode, {phone});
      console.log(data);
    }
  },
  subscriptions: {

  }
}
