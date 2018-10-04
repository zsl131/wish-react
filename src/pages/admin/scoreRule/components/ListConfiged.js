import React from 'react';
import {Button, Popconfirm, Table} from 'antd';

const ListConfiged = ({
  onDelConfirm,
  ...listOpts
}) => {

  const columns = [{
    title: '名称',
    dataIndex: 'name'
  }, {
    title: 'SN',
    dataIndex: "sn"
  }, {
    title: '总得分次数',
    // dataIndex: 'totalAmount',
    render:(record) => {
      return (
        record.totalAmount<0?<span>不限次数</span>:<b>{record.totalAmount}</b>
      );
    }
  }, {
    title: '单日得分次数',
    // dataIndex: 'dayAmount'
    render:(record) => {
      return (
        record.dayAmount<0?<span>不限次数</span>:<b>{record.dayAmount}</b>
      );
    }
  }, {
    title: '单次得分',
    dataIndex: 'score'
  }, {
    title: '操作',
    render: (record) => {
      return (
        <Popconfirm title={`确定删除【${record.name}】吗？`} onConfirm={()=>onDelConfirm(record)}>
          <Button type="danger" icon="close">删除规则</Button>
        </Popconfirm>
      );
    }
  }];

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} />
  );
}

export default ListConfiged;
