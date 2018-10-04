import React from 'react';
import {Popconfirm, Pagination, Table, Button} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  onUpdateStatus,
  totalElement,
  ...listOpts
}) => {
  const delOpts = {
    okText: '确定删除',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '头像',
    render: (record) => {
      return (
        <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer"><img src={record.avatarUrl} alt={record.nickname} style={{"width":"60px"}}/></a>
      )
    }
  }, {
    title: '昵称',
    dataIndex:'nickname'
  }, {
    title: '标题',
    dataIndex: 'noticeTitle'
  }, {
    title: '评论内容',
    render:(record) => {
      return (
        <div>
          <p><Button title={`点赞 ${record.goodCount} 次`} icon="like-o" type="dashed"> {record.goodCount}</Button> {record.content}</p>
          <p>{record.createTime}</p>
        </div>
      );
    }
  }, {
    title: '状态',
    render:(record) => {
      return (
        <div>
          <Popconfirm title={`确定将状态修改为：${record.status === '0'?'显示':'隐藏'} 吗？`} onConfirm={()=>onUpdateStatus(record.id, record.status === '0'?'1':'0')}>{record.status === '0'?<Button type="dashed">隐藏</Button>:<Button type="primary">显示</Button>}</Popconfirm>
        </div>
      );
    }
  }, {
    title: '回复内容',
    render:(record) => {
      return (
        <div>{record.reply?
          <div><p>{record.reply}</p>
          <p>{record.replyTime}</p>
          </div>
          :<Button icon="warning" onClick={()=>onUpdate(record.id)} type="dashed">未回复</Button>
          }
        </div>
      );
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.content} {...delOpts}/>
      );
    }
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  }

  return (
    <div>
      <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
    </div>
  );
}

export default List;
