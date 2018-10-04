import * as scoreRuleService from '../services/scoreRuleService';
import {message} from 'antd';

export default {
  state:{
    configed: [],
    noConfig: [],
    item: "",
    configVisible: false,
  },
  reducers:{
    modifyState(state,{payload:options}){
      return{...state,...options};
    },
  },
  effects:{
    *findData({payload: query}, {call,put}) {
      const data = yield call(scoreRuleService.list, query);
      if(data) {
        yield put({type: "modifyState", payload: {noConfig: data.noConfig || [], configed: data.configed || []}});
      }
    },
    *deleteObj({payload:id},{call}){
      const data = yield call(scoreRuleService.deleteObj,{id});
      if(data){
        message.success(data.message);
      }
    },
    *addOrUpdate({payload:obj},{call,put}){
      const data = yield call(scoreRuleService.addOrUpdate,obj);
      if(data){
        message.success("保存成功");
        yield put({type: 'modifyState', payload:{addVisible:false}});
      }
    }
  },
  subscriptions:{
    setup({history,dispatch}){
      return history.listen((location)=>{
        if(location.pathname==='/admin/scoreRule'){
          dispatch({type:'findData',payload:location.query});
        }
      })
    }
  }
}
