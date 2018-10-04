import React from 'react';
import {Pagination, Table, Button,Popconfirm,Tooltip} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import styles from "./list.css";

const List = ({
                onDelConfirm,
                onUpdate,
                updateProperty,
                onPlayVideo,
                onPageChange,
                totalElement,
                ...listOpts
              }) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const handleProperty = (id, field, value) => {
    updateProperty(id, field, value);
  }

  const columns = [{
    title: '图片',
    render: (text, record) => {
      return (
        <a key={record.id} href={record.picPath} target="_blank" rel="noopener noreferrer"><img src={record.picPath} alt={record.title} className={styles.avatarImg}/></a>
      )
    }
  }, {
    title: '标题',
    // dataIndex: 'title'
    render:(record) => {
      return (
        <div key={record.id}>
          <p>
            {record.videoId && <Tooltip placement="top" title="播放视频"><Button onClick={()=>onPlayVideo(record.videoId)} size="small" icon="play-circle"/></Tooltip>}
            [{record.cateName}]{record.title}
            </p>
          <p>{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: '属性',
    render:(record) => {
      return (
        <p key={record.id}>
          <Popconfirm okType="danger" onConfirm={()=>handleProperty(record.id, "status", record.status==='1'?"0":"1")} title={`确定设置状态为[${record.status==='1'?"隐藏":"显示"}]吗？`}>
            {/*{record.status==='1'?<Button type="primary">显示</Button>:<Button>隐藏</Button>}*/}
            <Tooltip title={record.status==='1'?"显示":"隐藏"}><Button type={record.status==='1'?'primary':null} shape="circle" icon="eye"/></Tooltip>
          </Popconfirm>
          <Popconfirm okType="danger" onConfirm={()=>handleProperty(record.id, "isTop", record.isTop==='1'?"0":"1")} title={`确定设置为[${record.isTop==='1'?"不置顶":"置顶"}]吗？`}>
            <Tooltip title={record.isTop==='1'?"置顶":"未置顶"}><Button type={record.isTop==='1'?'primary':null} shape="circle" icon="to-top"/></Tooltip>
          </Popconfirm>
          <Popconfirm okType="danger" onConfirm={()=>handleProperty(record.id, "needSend", record.needSend==='1'?"0":"1")} title={`确定设置为[${record.needSend==='1'?"关注不推送":"关注推送"}]吗？`}>
            <Tooltip title={record.needSend==='1'?"关注时推送":"关注时不推送"}><Button type={record.needSend==='1'?'primary':null} shape="circle" icon="arrow-up"/></Tooltip>
          </Popconfirm>
          <Popconfirm okType="danger" onConfirm={()=>handleProperty(record.id, "canComment", record.canComment==='1'?"0":"1")} title={`确定设置为[${record.canComment==='1'?"不可评论":"可评论"}]吗？`}>
            <Tooltip title={record.canComment==='1'?"可评论":"不可评论"}><Button type={record.canComment==='1'?'primary':null} shape="circle" icon="message"/></Tooltip>
          </Popconfirm>
        </p>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator key={record.id} id={record.id} delName={record.title} {...delOpts}/>
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
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
}

export default List;
