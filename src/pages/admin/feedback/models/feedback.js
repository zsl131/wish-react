import * as feedbackService from '../services/feedbackService';
import {message} from 'antd';

export default {
  namespace: 'feedback',
  state: {
    datas: [],
    totalElements: 0,
    item:{},
    replyVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      const data = yield call(feedbackService.list, query);
      yield put({ type: 'modifyState', payload: { datas: data.datas, totalElements: data.size } });
    },
    *setStatus({payload: record}, { call }) {
      const status = record.status === '1'?'0':'1';
      const data = yield call(feedbackService.updateStatus, {id: record.id, status: status});
      if(data) {message.success(data.message);}
    },
    *onReply({payload: values}, { call }) {
      const data = yield call(feedbackService.reply, values);
      if(data) {
        message.success("回复成功");
      }
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === "/admin/feedback") {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
