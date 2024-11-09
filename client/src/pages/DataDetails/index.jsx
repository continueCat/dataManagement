import { Form, Input, Select, DatePicker, Button, Table } from "antd";
import "./style.scss";

import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLanguage } from "../../store/modules/language";
const { RangePicker } = DatePicker;

const options = [
  { label: "Tag 1", value: "1" },
  { label: "Tag 2", value: "2" },
  { label: "Tag 3", value: "3" },
];

const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
  },
];

const columns = [
  {
    title: "编号",
    dataIndex: "number",
    key: "number",
    width: "5%",
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    width: "10%",
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description",
    width: "15%",
  },
  {
    title: "添加时间",
    dataIndex: "addTime",
    key: "addTime",
    width: "15%",
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
    width: "25%",
  },
  {
    title: "图片",
    dataIndex: "img",
    key: "img",
    width: "15%",
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "action",
    width: "15%",
    render: (_, record) => (
      <div>
        <Button color="primary" variant="link">
          编辑
        </Button>
        <Button color="danger" variant="link">
          删除
        </Button>
      </div>
    ),
  },
];

const DataDetails = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLanguage());
  }, []);

  return (
    <>
      <div className="data-search">
        <div className="data-search-form">
          <Form layout="inline" onFinish={onFinish}>
            <div className="data-search-detail">
              <Form.Item label="名称" name="username" style={{ width: "30%" }}>
                <Input placeholder="输入名称" />
              </Form.Item>
              <Form.Item label="标签" name="tags" style={{ width: "30%" }}>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="请选择标签"
                  options={options}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="添加时间" name="date" style={{ width: "50%" }}>
                <RangePicker />
              </Form.Item>
            </div>

            <div className="data-search-buttons">
              <Form.Item style={{ width: "30%" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="data-search-button"
                >
                  <SearchOutlined />
                  搜索
                </Button>
              </Form.Item>
              <Form.Item>
                <Button htmlType="reset" className="data-reset-button">
                  <ReloadOutlined />
                  重置
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
      <div className="data-contain">
        <Button type="primary" className="data-add-button">
          <PlusOutlined />
          新增数据
        </Button>
        <Table
          dataSource={dataSource}
          columns={columns}
          className="data-table"
        />
      </div>
    </>
  );
};

export default DataDetails;
