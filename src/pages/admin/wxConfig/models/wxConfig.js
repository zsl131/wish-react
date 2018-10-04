import * as wxConfigService from '../services/wxConfigService';
import { message } from 'antd';

export default {
  namespace: 'wxConfig',
  state: {
    item:{}
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    }
  },
  effects: {
    *index({ payload }, { call, put }) {
      const data = yield call(wxConfigService.loadOne);
      // console.log("wxConfig::", data);
      yield put({ type: 'modifyState', payload: { item: data.obj } });
    },
    *save({ payload: obj }, { call }) {
      const data = yield call(wxConfigService.save, obj);
      if(data) {
        message.success("保存数据成功");
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/wxConfig') {
          dispatch({ type: 'index' });
        }
      });
    }
  }
}
