import React from 'react';
import {Button, Table} from 'antd';

const ListNoConfig = ({
  onConfig,
  ...listOpts
}) => {
  const columns = [{
    title: '名称',
    // dataIndex: 'name'
    render:(record) => {
      return (record);
    }
  }, {
    title: '操作',
    render: (record) => {
      return (
        <Button type="primary" icon="setting" onClick={()=>onConfig(record)}>配置规则</Button>
      );
    }
  }];

  return (
    <Table {...listOpts} columns={columns} rowKey={(record)=>(record)} pagination={false} />
  );
}

export default ListNoConfig;
