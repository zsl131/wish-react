import React from 'react';
import {Col, Form, Input, Modal, Row, Select, Switch} from 'antd';
import MyEditor from "../../../../components/Editor/MyEditor";
import PictureWall from '../../../../components/PictureWall';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    fileList : [],
    status: false,
    isTop: false,
    needSend:false,
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue(this.props.item);
    const curItem = this.props.item;
    setFieldsValue({cateId:''+curItem.cateId})
    this.setState({status: curItem.status === '1', isTop: curItem.isTop==='1', needSend: curItem.needSend==='1'})
    if(curItem.picPath) {
      const fileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: curItem.picPath,
        // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }]
      this.setState({fileList: fileList});
    }
  }

  render() {

    const { getFieldDecorator, setFieldsValue, validateFieldsAndScroll} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        // console.log(values);
        values.isTop = values.isTop ? "1":"0";
        values.status = values.status ? "1":"0";
        values.needSend = values.needSend ? "1":"0";
        // console.log(values)
        if(!errors) {
         this.props.onOk(values);
        }
      });
    }

    const handleChangeContent = (html) => {
      // console.log("add===", html);
      const reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
      let arr = [];
      let tem = ''
      while( tem = reg.exec(html)) {
        arr.push(tem[2])
      }

      if(arr) {
        for (let url of arr) {
          // console.log(url+"-----")
        }
      }
      setFieldsValue({"content": html});
    }

    const onFileChange = (file) => {
      // console.log("onFileChange", file);
      if(file.status === 'done') {
        setFieldsValue({"picPath": file.response});
      }
    }

    const onCateChange = (value, e) => {
      // console.log(value, e.props.children)
      setFieldsValue({"cateName": e.props.children});
    }

    const modalOpts = {
      ...this.props,
      onOk: handleOk
    }

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator('picPath')(<Input type="hidden" />)}
          {getFieldDecorator('id')(<Input type="hidden" />)}
          {getFieldDecorator('cateName')(<Input type="hidden" />)}
          <FormItem>
            <Row>
              <Col span={4}>
                {getFieldDecorator('cateId', {rules: [{required: true, message: '请选择所在分类'}]})(
                  <Select
                    placeholder="选择分类"
                    style={{ width: '100%' }}
                    onChange={onCateChange}
                  >
                    {this.props.cateList.map(d => <Option key={d.id} initialValue={d.id===2}>{d.name}</Option>)}
                  </Select>
                )}
              </Col>
              <Col span={20}>
                {getFieldDecorator('title', {rules: [{required: true, message: '通知公告标题不能为空'}]})(<Input placeholder="输入通知公告标题"/>)}
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            <Row>
              <Col span={4}>
                <PictureWall showMsg="封面图片" fileList={this.state.fileList} accept="image/png, image/jpeg, image/gif" data={{'path':'abcdef'}} onFileChange={onFileChange}/>
              </Col>
              <Col span={20}>
                {getFieldDecorator('guide', {rules: [{required: true, message: '通知公告导读不能为空'}]})(<TextArea placeholder="输入通知公告导读" autosize={{ minRows: 4, maxRows: 4 }}/>)}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            {getFieldDecorator("content", {rules: [{required: true, message: '通知公告内容不能为空'}]})(<MyEditor content={this.props.item.content} placeholder="通知公告内容" onChangeContent={handleChangeContent}/>)}
          </FormItem>
          <FormItem>
            <Row>
              <Col span={8}>
                状态：{getFieldDecorator("status")(<Switch defaultChecked={this.state.status} checkedChildren="显示" unCheckedChildren="隐藏"/>)}
              </Col>
              <Col span={8}>
                是否置顶：{getFieldDecorator("isTop")(<Switch defaultChecked={this.state.isTop} checkedChildren="置顶" unCheckedChildren="不置顶"/>)}
              </Col>
              <Col span={8}>
                关注推送：{getFieldDecorator("needSend")(<Switch defaultChecked={this.state.needSend} checkedChildren="推送" unCheckedChildren="不推送"/>)}
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
