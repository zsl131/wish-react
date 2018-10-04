import * as accountService from '../services/wxAccountService';
import {message} from 'antd';

export default {
  namespace: 'wxAccount',
  state: {
    datas:[],
    totalElements: 0,
    item: {},
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    /*updateTypePage(state, { payload: obj }) {
      console.log(obj);
      const datas = state.datas.map((item)=> {
        // console.log(item.id, obj.record);
        if(item.id === obj.record.id) {
          item.type = obj.type;
        }
        return item;
      })
      return {...state, datas: datas};
    },*/
    onSynchPage (state, { payload: obj }) {
      const datas = state.datas.map((item)=> {
        if(item.id === obj.id) {
          item = obj;
        }
        return item;
      })
      return {...state, datas: datas};
    }
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      const data = yield call(accountService.list, query);
      yield put({ type: 'modifyState', payload: { datas: data.datas, totalElements: data.size } });
    },
    *updateType ({ payload: obj }, { call, put }) {
      const record = obj.record; const type = obj.type;
      const data = yield call(accountService.updateType, {id: record.id, type: type});
      // yield put({ type: 'updateTypePage', payload: obj });
      if(data) {message.success(data.message);}
    },
    *onSynch ({ payload: obj }, { call, put }) {
      const data = yield call(accountService.onSynch, {id: obj.id});
      if(data) { message.success("同步成功"); }
      yield put({ type: 'onSynchPage', payload: data.datas });
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(( location ) => {
        if(location.pathname === "/admin/wxAccount") {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
