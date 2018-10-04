import React from 'react';
import {Button, Col, Input, message, Modal, Popconfirm, Row, Tooltip} from 'antd';
import styles from './category.css';

let curId = 0, curName = '';
export default class Categorys extends React.Component {

  state = {
    isAdd: false,
    curName: '',
    id:0,
    name:'',
  }

  setIsAdd = (val) => {
    this.setState({isAdd:val});
  }

  onAddSave = () => {
    const val = this.state.curName;
    if(!val) {
      message.warn("请输入分类名称");
    } else {
      // console.log(val);
      this.props.saveCategory({name: val})
      this.setState({isAdd: false, curName: ''})
    }
  }

  onInputFocus = (e, item) => {
    curId = item.id; curName = item.name;
  }

  onChange = (e) => {
    curName = e.target.value
  }
  onAddChange = (e) => {
    this.setState({curName: e.target.value});
  }

  onSave = (item) => {
    // const id = this.state.id; const name = this.state.name;
    const id = curId; const name = curName;
    if(name==null || name==='') {
      message.warn("名称不能为空");
    } else if(item.id !== id) {
      message.warn("当前修改的是【"+name+"】");
    } else if(name===item.name) {
      message.warn("没有修改不用保存");
    } else {
      // console.log(name, item);
      this.props.saveCategory({id: id, name: name});
    }
  }

  onDelete = (item) => {
    this.props.deleteCate(item.id);
  }

  render() {

    const SingleCate = (item) => {
      return (
        <Col span={12}><p className={styles.singleCate}><Input onChange={this.onChange} onFocus={(e)=>this.onInputFocus(e, item)} defaultValue={item.name} style={{"width":"140px"}}/>
          <Tooltip placement="top" title="修改保存"><Button type="primary" icon="save" onClick={()=>this.onSave(item)}/></Tooltip>
          <Tooltip placement="top" title="删除分类"><Popconfirm okType="danger" onConfirm={()=>this.onDelete(item)} title={`确定删除[${item.name}]吗？此操作不可逆！`} ><Button type="danger" icon="delete"/></Popconfirm></Tooltip>
        </p></Col>
      )
    }

    const modalOpts = {
      ...this.props,
    }

    return (
      <Modal {...modalOpts}>
        <div className={styles.main}>
          <Row>
        {this.props.categoryList && this.props.categoryList.map((item) => {return <SingleCate {...item}/>})}
          </Row>
          <Row>
        <Col span={24}>
        <div className={styles.addBtn}>
        { this.state.isAdd &&
          <div>
            <Input onChange={this.onAddChange} placeholder="输入分类名称" style={{"width": "240px", "marginRight": "10px"}}/>
            <Button type="primary" icon="save" onClick={this.onAddSave}>保存</Button>
            <Button onClick={()=>this.setIsAdd(false)}>取消</Button>
          </div>
        }
        { !this.state.isAdd && <Tooltip placement="right" title="添加新分类" defaultVisible="true"><Button size="large" onClick={()=>this.setIsAdd(true)} type="dashed" icon="plus"></Button></Tooltip>}
        </div>
        </Col>
          </Row>
        </div>
      </Modal>
    )
  }
}

