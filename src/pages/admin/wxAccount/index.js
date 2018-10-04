import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import { routerRedux } from 'dva/router'

import Filter from './components/Filter';
import List from './components/List';

const WxAccount = ({
  wxAccount,
  loading,
  location,
  dispatch
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
  }

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  }

  const listOpts = {
    dataSource: wxAccount.datas,
    loading: loading.models.wxAccount,
    location,
    totalElement: wxAccount.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdateType: (record, newType) => {
      dispatch({ type: 'wxAccount/updateType', payload: { record: record, type: newType } }).then(()=>{handleRefresh()});
    },
    onSynch: (record) => {
      dispatch({ type: 'wxAccount/onSynch', payload: record });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 微信用户管理<b>（{wxAccount.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
    </div>
  );
}

export default connect(({ loading, wxAccount }) => ({ loading, wxAccount }))(WxAccount);
