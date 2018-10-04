import React from 'react';
import {Button, Form, Input, Select, Spin} from 'antd';
import request from "../../../../utils/request";

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class Filter extends React.Component {

  state = {
    cateList: [],
    fetching: true,
  }

  fetchCate = ()=> {
    if(this.state.cateList<=0) {
      request("noticeCategoryService.list", {}, true).then((response) => {
        let data = [{value: "*", text: "==所有分类=="}];
        data.push( ...response.data.map((item) => ({
          value: ""+item.id,
          text: item.name,
        })));

        this.setState({cateList: data, fetching: false});
      });
    }
  }

  render() {
    const {getFieldDecorator,validateFields} = this.props.form;
    const {fetching, cateList} = this.state;
    const handleSubmit = (e) => {
      e.preventDefault();
      validateFields((errors, values) => {
        // console.log("filter", errors, values);
        this.props.onFilter(values);
      });
    }

    return (
      <Form layout="inline" onSubmit={handleSubmit}>
        <FormItem>
          {getFieldDecorator("cateId")(
            <Select
              placeholder="所在分类"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              onFocus={this.fetchCate}
              style={{ width: '120px' }}
            >
              {cateList.map(d => <Option key={d.value}>{d.text}</Option>)}
            </Select>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("title_like")(<Input placeholder="标题"/>)}
        </FormItem>
        <FormItem>
        {getFieldDecorator("status")(
          <Select placeholder="状态" style={{ width: '100px' }}>
          <Option key="*">=全部=</Option>
          <Option key="1">显示</Option>
          <Option key="0">隐藏</Option>
          </Select>
          )}
          </FormItem>
          <FormItem>
          {getFieldDecorator("isTop")(
            <Select placeholder="是否置顶" style={{ width: '100px' }}>
              <Option key="*">=全部=</Option>
              <Option key="1">置顶</Option>
              <Option key="0">未置顶</Option>
            </Select>
          )}
          </FormItem>
          <FormItem>
          {getFieldDecorator("needSend")(
            <Select placeholder="关注推送" style={{ width: '100px' }}>
              <Option key="*">=全部=</Option>
              <Option key="1">推送</Option>
              <Option key="0">不推送</Option>
            </Select>
          )}
          </FormItem>
          <FormItem>
            <Button type="dashed" htmlType="submit">筛选</Button>
          </FormItem>
        </Form>
    );
  }
}
