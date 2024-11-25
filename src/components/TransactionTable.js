import React, { useState } from "react";
import { Table, Tag, Button, Input, Space, Select, DatePicker } from "antd";
import { transactions } from "../data/mockData";
import { CopyOutlined, ReloadOutlined, DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { RangePicker } = DatePicker;

const TransactionTable = () => {
  const [data, setData] = useState(transactions);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleStatusFilter = (value) => {
    setSelectedStatus(value);
    applyFilters(value, dateRange, searchText);
  };

  const handleDateRangeFilter = (dates) => {
    setDateRange(dates);
    applyFilters(selectedStatus, dates, searchText);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    applyFilters(selectedStatus, dateRange, value);
  };

  const applyFilters = (status, range, text) => {
    let filteredData = transactions;

    if (status) {
      filteredData = filteredData.filter((t) => t.status === status);
    }

    if (range && range.length === 2) {
      const [start, end] = range.map((date) => dayjs(date).startOf("day"));
      filteredData = filteredData.filter((t) => {
        const transactionDate = dayjs(t.date).startOf("day");
        return (
          transactionDate.isSameOrAfter(start) &&
          transactionDate.isSameOrBefore(end)
        );
      });
    }

    if (text) {
      filteredData = filteredData.filter((t) => t.id.includes(text));
    }

    setData(filteredData);
  };

  const exportToCSV = () => {
    const headers = [
      "Transaction ID",
      "Amount",
      "Status",
      "Date",
      "Customer",
      "Type",
    ];
    const csvData = data.map((t) => [
      t.id,
      t.amount,
      t.status,
      t.date,
      t.customerName,
      t.transactionType,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "id",
      render: (id) => (
        <Space>
          <span>{id}</span>
          <Button
            icon={<CopyOutlined />}
            size="small"
            onClick={() => navigator.clipboard.writeText(id)}
          />
        </Space>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const color = {
          completed: "green",
          failed: "red",
          processing: "blue",
        }[status];
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
  ];

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData(transactions);
      setSelectedStatus(null);
      setDateRange([]);
      setSearchText("");
    }, 1000);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }} wrap>
        <Input.Search
          placeholder="Search by Transaction ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearch}
          enterButton
        />
        <Select
          style={{ width: 200 }}
          placeholder="Filter by Status"
          allowClear
          value={selectedStatus}
          onChange={handleStatusFilter}
        >
          <Select.Option value="completed">Completed</Select.Option>
          <Select.Option value="failed">Failed</Select.Option>
          <Select.Option value="processing">Processing</Select.Option>
        </Select>
        <RangePicker
          onChange={handleDateRangeFilter}
          value={dateRange}
          format="YYYY-MM-DD"
        />
        <Button icon={<DownloadOutlined />} onClick={exportToCSV}>
          Export CSV
        </Button>
        <Button icon={<ReloadOutlined />} onClick={refreshData}>
          Refresh
        </Button>
      </Space>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default TransactionTable;
