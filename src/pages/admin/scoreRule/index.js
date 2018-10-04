import React from 'react';
import {connect} from 'dva';
import {Icon, Tabs,Badge} from 'antd';
import {routerRedux} from 'dva/router'
import ListNoConfig from "./components/ListNoConfig";
import ConfigModal from './components/ConfigModal';
import ListConfiged from './components/ListConfiged';

const TabPane = Tabs.TabPane;

const ScoreRule = ({
dispatch,
loading,
scoreRule,
location
}) => {

  const { query, pathname } = location;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        ...newQuery,
      },
    }));
  };

  const listConfigedOpts = {
    dataSource: scoreRule.configed,
    loading: loading.models.templateMessageRelation,
    location,
    onDelConfirm: (record) => {
      console.log(record);
      dispatch({type: "scoreRule/deleteObj", payload: record.id}).then(()=>handleRefresh());
    }
  }

  const listNoConfigOpts = {
    dataSource: scoreRule.noConfig,
    loading: loading.models.scoreRule,
    location,
    onConfig: (record) => {
      dispatch({type: "scoreRule/modifyState", payload: {configVisible: true, item: record}});
    }
  }

  const modalProps = {
    visible: scoreRule.configVisible,
    title: '配置积分规则【'+scoreRule.item+'】',
    item: scoreRule.item,
    onCancel: () => {dispatch({type: "scoreRule/modifyState", payload: {configVisible: false}})},
    onOk: (values) => {
      dispatch({type: "scoreRule/addOrUpdate", payload: values}).then(()=>{dispatch({type: "scoreRule/modifyState", payload: {configVisible: false}}); handleRefresh()});
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 积分规则管理<b></b></h3>
      </div>
      <div className="listContent">
        <div className="card-container">
          <Tabs type="card" style={{"padding":"10px"}}>
            <TabPane tab={<Badge count={scoreRule.configed.length} showZero>已配置规则&nbsp;&nbsp;&nbsp;</Badge>} key="1">
              <ListConfiged {...listConfigedOpts}/>
            </TabPane>
            <TabPane tab={<Badge count={scoreRule.noConfig.length} showZero>未配置规则&nbsp;&nbsp;&nbsp;</Badge>} key="2">
              <ListNoConfig {...listNoConfigOpts}/>
              {scoreRule.configVisible && <ConfigModal {...modalProps}/>}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default connect(({ loading, scoreRule }) => ({ loading, scoreRule }))(ScoreRule);
