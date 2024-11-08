import { Form, Input, Select, DatePicker, Button } from "antd";
import "./style.scss";

import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

const options = [
  { label: "Tag 1", value: "1" },
  { label: "Tag 2", value: "2" },
  { label: "Tag 3", value: "3" },
];

const DataDetails = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="data-search">
      <div className="data-search-form">
        <Form layout="inline" onFinish={onFinish}>
          <div className="data-search-detail">
            <Form.Item label="名称" name="username">
              <Input placeholder="输入名称" />
            </Form.Item>
            <Form.Item label="标签" name="tags" style={{ width: 400 }}>
              <Select
                mode="multiple"
                allowClear
                placeholder="请选择标签"
                options={options}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="添加时间" name="date">
              <RangePicker />
            </Form.Item>
          </div>

          <div className="data-search-buttons">
            <Form.Item>
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
  );
};

export default DataDetails;
