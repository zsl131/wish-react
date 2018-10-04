import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Filter from './components/Filter';
import List from './components/List';
import UpdateModal from './components/UpdateModal';

const NoticeComment = ({
dispatch,
loading,
noticeComment,
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
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: noticeComment.datas,
    loading: loading.models.noticeComment,
    location,
    totalElement: noticeComment.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'noticeComment/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'noticeComment/onUpdate', payload: id });
    },
    onUpdateStatus:(id, status) => {
      dispatch({type: 'noticeComment/onUpdateStatus', payload: {id: id, status: status}}).then(()=>handleRefresh());
    }
  }

  const updateOpts = {
    visible: noticeComment.updateVisible,
    title: `修改数据`,
    okText:'确认提交',
    item: noticeComment.item,
    confirmLoading: loading.effects['noticeComment/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'noticeComment/update', payload: datas }).then(() => {
        handleRefresh();
      });
    },
    onCancel: () => {
      dispatch({ type: 'noticeComment/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 通知公告评论管理<b>（{noticeComment.totalElements}）</b></h3>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {noticeComment.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, noticeComment }) => ({ loading, noticeComment }))(NoticeComment);
