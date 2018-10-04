import { remoteCheckLogin } from '../services/login';
import * as objService from '../services/objectService';
import router from 'umi/router';
import {checkLogin, setLoginUser} from '../../../utils/authUtils';

export default {
  namespace: 'login',
  state:{
    wxLogin:{}
  },
  reducers: {
    'cacheLogin'(state, { payload: datas }) {
      setLoginUser(datas.obj);
      router.push("/admin/index");
    },
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *login({ payload: values }, { put, call }) {
      const data = yield call(remoteCheckLogin, values);
      if(data) {
        setLoginUser(data.obj);
        router.push("/admin/index");
      }
    },
    *onQrScene({payload: query}, {call,put}) {
      const data = yield call(objService.queryWxLogin, {});
      yield put({type: 'modifyState', payload: {wxLogin: data.obj}});
    }
  },
  subscriptions: {
    setup({history}) {
      return history.listen((location) => {
        // console.log(location.pathname)
        if(location.pathname === "/login") {
          if(checkLogin()) {
            router.push("/admin/index");
          }
        }
      });
    }
  }
}
