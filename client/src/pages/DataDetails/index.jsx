import { Form, Input, Select, DatePicker, Button, Table, Tag } from "antd";
import "./style.scss";
import dayjs from "dayjs";
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLanguage } from "../../store/modules/language";
import { DataListAPI } from "../../apis/data";

const { RangePicker } = DatePicker;

const options = [
  { label: "Tag 1", value: "1" },
  { label: "Tag 2", value: "2" },
  { label: "Tag 3", value: "3" },
];

const DataDetails = () => {
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // Table columns
  const columns = [
    {
      title: "编号",
      dataIndex: "number",
      key: "number",
      width: "5%",
      render: (_, __, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
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
    },
    {
      title: "添加时间",
      dataIndex: "time",
      key: "addTime",
      width: "15%",
      render: (time) => dayjs(time).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      width: "15%",
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "图片",
      dataIndex: "url",
      key: "img",
      width: "10%",
      render: (url) => <img src={url} alt="图片" style={{ width: "50px" }} />,
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      width: "12%",
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

  // Handle table pagination change
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const dispatch = useDispatch();

  // Fetch language data on mount
  useEffect(() => {
    dispatch(fetchLanguage());
  }, [dispatch]);

  // Fetch data on mount
  useEffect(() => {
    DataListAPI().then((res) => {
      const formattedData = res.data.data.dataInfo.map((item) => ({
        ...item,
        key: item.id,
      }));
      setDataSource(formattedData);
    });
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
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default DataDetails;
