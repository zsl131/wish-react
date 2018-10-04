import React from 'react';
import {Pagination, Table, Menu, Dropdown, Icon, Popconfirm} from 'antd';
import styles from "./list.css";

const List = ({
  onPageChange,
  onUpdateType,
  onSynch,
  totalElement,
  ...listOpts
}) => {

  const columns = [{
    title: '头像',
    render: (text, record) => {
      return (
        <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer"><img src={record.avatarUrl} alt={record.nickname} className={styles.avatarImg}/></a>
      )
    }
  }, {
    title: '昵称',
    dataIndex: 'nickname'
  }, {
    title: '性别',
    render: (text, record) => {
      return (<span>{record.sex === '1'?"男":"女"}</span>)
    }
  }, {
    title: '类型',
    render: (text, record) => {
      return dropdownCon(record);
    }
  }, {
    title: '状态',
    render: (text, record) => {
      return (<span>{record.status === '1'?"关注":<span><b className={styles.cancelStatus}>取消</b>：{record.cancelDatetime}</span>}</span>)
    }
  }, {
    title: '关注日期',
    dataIndex: 'createTime'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <Popconfirm title={`确定将[${record.nickname}]与微信端同步吗？`} onConfirm={() => handleSynch(record)} cancelText="取消" okText="确定">
          <a href="###"><Icon type="reload"/> 同步</a>
        </Popconfirm>
      );
    }
  }];

  const handleSynch = (record) => {
    onSynch(record);
  }

  const dropdownCon = (record) => {
    const menus = menu(record);
    return (
      <Dropdown overlay={menus}>
        <a className="ant-dropdown-link" href="###">
          {typeStr(record.type)}
           <Icon type="down" />
        </a>
      </Dropdown>
    );
  }

  const typeStr = (type) => {
    switch(type) {
      case "1" : return "学生"; break;
      case "2" : return "学生家长"; break;
      case "5" : return "公司员工"; break;
      case "10" : return "管理员"; break;
      default: return "游客";
    }
  }

  const confirmOpts = {
    okText: '确定设置',
    cancelText: '取消',
    placement: 'bottom'
  }

  const menu = (record) => {
    const type = record.type;
    const nickname = record.nickname;
    return (
      <Menu key="key">
        {type === '0'?'':
          <Menu.Item key="0">
            <Popconfirm title={`确定设置[${nickname}]为：游客 吗？`}
                        onConfirm={() => handleSetType(record, "0")} {...confirmOpts}>设置为：游客</Popconfirm>
          </Menu.Item>
        }
        {type === '1'?'':
          <Menu.Item key="1">
            <Popconfirm title={`确定设置[${nickname}]为：学生 吗？`}
                        onConfirm={() => handleSetType(record, "1")} {...confirmOpts}>设置为：学生</Popconfirm>
          </Menu.Item>
        }
        {type === '2' ? '' :
          <Menu.Item key="2">
            <Popconfirm title={`确定设置[${nickname}]为：学生家长 吗？`}
                        onConfirm={() => handleSetType(record, "2")} {...confirmOpts}>设置为：学生家长</Popconfirm>
          </Menu.Item>
        }
        {type === '5' ? '' :
          <Menu.Item key="5">
            <Popconfirm title={`确定设置[${nickname}]为：公司员工 吗？`}
                        onConfirm={() => handleSetType(record, "5")} {...confirmOpts}>设置为：公司员工</Popconfirm>
          </Menu.Item>
        }
        {type === '10' ? '' :
          <Menu.Item key="10">
            <Popconfirm title={`确定设置[${nickname}]为：管理员 吗？`}
                        onConfirm={() => handleSetType(record, "10")} {...confirmOpts}>设置为：管理员</Popconfirm>
          </Menu.Item>
        }
      </Menu>
    );
  }

  const handleSetType = (record, newType) => {
    onUpdateType(record, newType);
  }

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  }

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
}

export default List;
