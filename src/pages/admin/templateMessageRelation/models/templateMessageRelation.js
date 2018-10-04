import * as objectService from '../services/objectService';
import {message} from 'antd';

export default {
  namespace: 'templateMessageRelation',
  state: {
    configed: [],
    noConfig: [],
    item: {},
    configVisible: false,
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *findData({payload: query}, {call,put}) {
      const data = yield call(objectService.findAllConfig, query);
      if(data) {
        yield put({type: "modifyState", payload: {noConfig: data.noConfig || [], configed: data.configed || []}});
      }
    },
    *config({payload: obj}, {call}) {
      const data = yield call(objectService.config, obj);
      if(data) {
        message.success(data.message);
      }
    },
    *deleteObj({payload: id}, {call}) {
      const data = yield call(objectService.deleteObj, {id});
      if(data) {message.success(data.message);}
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        if(location.pathname === "/admin/templateMessageRelation") {
          dispatch({type: "findData", payload: location.query});
        }
      });
    }
  }
}
