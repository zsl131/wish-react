import React from 'react';
import {connect} from 'dva';
import {Button, Col, Icon, Popconfirm, Row} from 'antd';
import LeftTree from './components/LeftTree';
import List from './components/List';
import {routerRedux} from 'dva/router'
import UpdateModal from './components/UpdateModal';
import AddModal from './components/AddModal';

const WxMenu = ({
  loading,
  wxMenu,
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

  const treeOpts = {
    menuTree: wxMenu.menuTree,
    onSelect: (key, title) => {
      let selectKey = key[0];
      if(!selectKey) {title = "根目录"; selectKey = 0;}
      handleRefresh({"pid": selectKey});
      // console.log(key[0]);
      dispatch({ type: 'wxMenu/setState', payload: {pid: selectKey, pname: title} });
    }
  }

  const listOpts = {
    dataSource: wxMenu.datas,
    rowKey: 'id',
    totalElements: wxMenu.totalElements,
    loading: loading.models.wxMenu,
    onUpdate: (item) => {
      dispatch({ type: 'wxMenu/setState', payload: { item: item, updateVisible: true } });
    },
    onDelete: (id) => {
      dispatch({ type: "wxMenu/deleteMenu", payload: id }).then(() => {handleRefresh()});
    }
  }

  const updateOpts = {
    visible: wxMenu.updateVisible,
    title: `修改菜单【${wxMenu.item.name}】`,
    item: wxMenu.item,
    okText: '确定修改',
    cancelText: '取消',
    onCancel:() => {
      dispatch({ type: 'wxMenu/setState', payload: { updateVisible: false } });
    },
    onOk:(obj) => {
      // console.log("onOk::"+obj,"string::"+ JSON.stringify(obj));
      dispatch({ type: 'wxMenu/update', payload: obj }).then(() => {
        dispatch({ type: 'wxMenu/setState', payload: { updateVisible: false } });
        handleRefresh();
      });
    }
  }

  const addOpts = {
    visible: wxMenu.addVisible,
    title: `添加微信菜单到【${wxMenu.pname}】`,
    okText: "确定添加",
    cancelText: "取消",
    pid: wxMenu.pid,
    // pname: wxMenu.pname,
    onCancel: () => {
      dispatch({ type: 'wxMenu/setState', payload: { addVisible: false } });
    },
    onOk : (obj) => {
      dispatch({type:'wxMenu/add', payload: obj}).then(() => {
        dispatch({ type: 'wxMenu/setState', payload: { addVisible: false } });
        handleRefresh();
      });
    }
  }

  const handlerConfirm = () => {
    dispatch({ type: 'wxMenu/synchMenu' });
  }

  const handleAdd = () => {
    dispatch({ type: 'wxMenu/setState', payload: { addVisible: true } });
  }

  return(
    <div style={{"height":"100%", "overflowY": 'hidden'}}>
      <Row style={{"height":"100%"}}>
        <Col span={5} style={{"height":"100%"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={19}>
          <div className="listHeader">
            <h3><Icon type="bars"/> 微信菜单管理<b>（{wxMenu.pname}：{wxMenu.totalElements}）</b></h3>
            <div className="listOperator">
              <Popconfirm title="确定发布菜单到微信平台吗？" placement="bottom" cancelText="取消" okText="确定" onConfirm={handlerConfirm}>
                <Button type="dashed" icon="cloud-upload-o">发布菜单</Button>
              </Popconfirm>
                <Button type="primary" icon="plus" onClick={handleAdd}>添加菜单</Button>
            </div>
          </div>
          <List {...listOpts}/>
          {wxMenu.updateVisible && <UpdateModal {...updateOpts}/>}
          {wxMenu.addVisible && <AddModal {...addOpts}/>}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({loading, wxMenu}) => ({loading, wxMenu}))(WxMenu);
