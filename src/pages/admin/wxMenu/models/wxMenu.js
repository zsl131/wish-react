import * as menuService from '../services/wxMenuService';
import {message} from 'antd';

export default {
  namespace: 'wxMenu',
  state: {
    data:[],
    item:{},
    menuTree:[],
    totalElements: 0,
    updateVisible: false,
    addVisible: false,
    pid:0,
    pname:'根目录',
  },
  reducers: {
    indexPage(state, { payload: data }) {
      return {...state, menuTree: data.treeList, totalElements: data.menuList.length, datas: data.menuList};
    },
    setState(state, {payload: datas}) {
      return {...state, ...datas};
    },
  },
  effects: {
    *index({ payload: query }, { put, call }) {
      const data = yield call(menuService.listRoot, query);
      yield put({ type: 'indexPage', payload: data.datas });
    },
    *showChildren({ payload: pid }, { put, call }) {
      const data = yield call(menuService.listChildren, {pid});
      yield put({ type: 'setState', payload: { datas: data.datas, totalElements: data.size } });
    },
    *update({ payload: obj }, { call, put }) {
      const data = yield call(menuService.update, obj);
      console.log("update", data);
      if(data) { message.success("保存成功"); }
    },
    *add({ payload: obj }, {call}) {
      const data = yield call(menuService.add, obj);
      if(data) { message.success("保存成功"); }
    },
    *deleteMenu({ payload: id }, { call }) {
      const data = yield call(menuService.deleteMenu, {id});
      if(data) { message.success(data.datas); }
    },
    *synchMenu({ payload }, {call}) {
      const data = yield call(menuService.synchMenu);
      if(data) { message.success(data.message); }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/wxMenu') {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
