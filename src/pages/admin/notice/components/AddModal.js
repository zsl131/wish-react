import React from 'react';
import {Button, Col, Form, Icon, Input, Modal, Row, Select, Spin, Switch, Upload} from 'antd';
import MyEditor from "../../../../components/Editor/MyEditor";
import PictureWall from '../../../../components/PictureWall';
import request from "../../../../utils/request";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

@Form.create()
export default class AddModal extends React.Component {

  state = {
    cateList: [],
    fetching: true,
  }

  fetchCate = ()=> {
    if(this.state.cateList<=0) {
      request("noticeCategoryService.list", {}, true).then((response) => {
        let data = [];
        data.push( ...response.data.map((item) => ({
          value: ""+item.id,
          text: item.name,
        })));

        this.setState({cateList: data, fetching: false});
      });
    }
  }

  render() {
    const {getFieldDecorator, setFieldsValue, validateFieldsAndScroll} = this.props.form;
    const {cateList, fetching} = this.state;

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
        values.isTop = values.isTop ? "1":"0";
        values.status = values.status ? "1":"0";
        values.needSend = values.needSend ? "1":"0";
        // console.log(values)
        if(!errors) {
          this.props.onOk(values);
        }
      });
    }

    const modalOpts = {
      ...this.props,
      onOk: handleOk
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

    const handleChange = (file) => {
      if(file.file.status==='done') {
        setFieldsValue({"videoId": file.file.response.result.obj.id});
        this.setState({videoList: 1})
      } else if(file.file.status ==='removed' && file.file.response) {
        const attId = file.file.response.result.obj.id;
        request("attachmentService.delete", {id:attId}, true);
        setFieldsValue({"videoId": ''});
        this.setState({videoList: 0})
      }
    }

    return(
      <Modal {...modalOpts} style={{ "minWidth": '80%', top: 20 }}>
        <Form layout="horizontal">
          {getFieldDecorator('picPath')(<Input type="hidden" />)}
          {getFieldDecorator('cateName')(<Input type="hidden" />)}
          <FormItem>
            <Row>
              <Col span={4}>
                {getFieldDecorator('cateId', {rules: [{required: true, message: '请选择所在分类'}]})(
                  <Select
                    placeholder="选择分类"
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    onFocus={this.fetchCate}
                    style={{ width: '100%' }}
                    onChange={onCateChange}
                  >
                    {cateList.map(d => <Option key={d.value}>{d.text}</Option>)}
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
                <PictureWall showMsg="封面图片" accept="image/png, image/jpeg, image/gif" data={{'path':'abcdef'}} onFileChange={onFileChange}/>
              </Col>
              <Col span={5} style={{"paddingRight":"10px"}}>
                {getFieldDecorator('videoId')(<Input type="hidden"/>)}
                <Upload
                  action="/api/yardUpload/uploadFile"
                  data={{'path':'video'}}
                  onChange={handleChange}
                  accept="video/*"
                >
                  { this.state.videoList>0?null:
                    <Button type="primary">
                      <Icon type='upload'/>
                      选择视频文件上传
                    </Button>
                  }
                </Upload>
              </Col>
              <Col span={15}>
                {getFieldDecorator('guide', {rules: [{required: true, message: '通知公告导读不能为空'}]})(<TextArea placeholder="输入通知公告导读" autosize={{ minRows: 4, maxRows: 4 }}/>)}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            {getFieldDecorator("content", {rules: [{required: true, message: '通知公告内容不能为空'}]})(<MyEditor placeholder="通知公告内容" onChangeContent={handleChangeContent}/>)}
          </FormItem>
          <FormItem>
            <Row>
              <Col span={8}>
                状态：{getFieldDecorator("status")(<Switch checkedChildren="显示" unCheckedChildren="隐藏"/>)}
              </Col>
              <Col span={8}>
                是否置顶：{getFieldDecorator("isTop")(<Switch checkedChildren="置顶" unCheckedChildren="不置顶"/>)}
              </Col>
              <Col span={8}>
                关注推送：{getFieldDecorator("needSend")(<Switch checkedChildren="推送" unCheckedChildren="不推送"/>)}
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
