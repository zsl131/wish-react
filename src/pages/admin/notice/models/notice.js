import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    totalElements: 0,
    item:{},
    addVisible: false,
    updateVisible: false,
    categoryList:[],
    playVideoVisible:false,
    video:{},
    showCategory: false,
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
    addCategory(state,{payload: obj}) {
      if(obj.isAdd) {
        state.categoryList.push(obj.obj);
      } else {
        state.categoryList.map((item) => {
          if(item.id === obj.obj.id) {item.name = obj.obj.name}
        })
      }
      message.success("数据保存成功");
      return {...state}
    },
    deleteCatePage(state, {payload: id}) {
      const list = state.categoryList.filter((item) => {
        if(item.id !== id.id) {
          return item;
        }
      })
      return {...state, categoryList: list};
    }
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      yield put({type: 'modifyState', payload: {data: data.data, totalElements: data.size}})
    },
    *onAdd({payload: query}, {put}) {
      yield put({type: "modifyState", payload: {addVisible: true}});
    },
    *addOrUpdate({payload: obj}, {call}) {
      const data = yield call(objService.addOrUpdate, obj);
      if(data) {message.success("数据保存成功");}
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(objService.loadOne, {id: id, isUpdate: '1'})
      yield put({type: 'modifyState', payload: {item: data.obj, updateVisible: true, categoryList: data.cateList}})
    },
    *updateProperty({payload: obj}, {call}) {
      const data = yield call(objService.updateProperty, obj);
      message.success(data.message);
    },
    *deleteObj({payload: id}, {call}) {
      const data = yield call(objService.deleteObj, {id});
      if(data) {message.success(data.message)}
    },
    *onCategory({payload: obj}, {call,put}) {
      const data = yield call(objService.listCategory, obj);
      yield put({type: "modifyState", payload: {categoryList: data.data, showCategory: true}})
    },
    *onSaveCategory({payload: obj}, {call,put}) {
      const data = yield call(objService.saveCategory, obj);
      yield put({type: 'addCategory', payload: {obj: data.obj, isAdd: obj.id?false: true}});
      // message.success(data.message);
    },
    *onPlayVideo({payload: id}, {call,put}) {
      const data = yield call(objService.loadAttachment, {id});
      yield put({type: "modifyState", payload: {video: data.obj, playVideoVisible: true}});
    },
    *deleteCate({payload: id}, {call,put}) {
      const data = yield call(objService.deleteCate, id);
      message.success(data.message);
      yield put({type:"deleteCatePage", payload: id});
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/notice') {
          dispatch({type: 'list', payload: location.query});
        }
      })
    }
  }
}
