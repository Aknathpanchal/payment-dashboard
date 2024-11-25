import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { dashboardStats, transactions } from "../data/mockData";

const dailyData = transactions.reduce((acc, t) => {
  const date = t.date;
  acc[date] = acc[date] || { date, count: 0, volume: 0 };
  acc[date].count += 1;
  acc[date].volume += t.amount; 
  return acc;
}, {});

const statusDistribution = transactions.reduce(
  (acc, t) => {
    acc[t.status] += 1;
    return acc;
  },
  { completed: 0, failed: 0, processing: 0 }
);

const statusData = Object.entries(statusDistribution).map(([status, value]) => ({
  name: status,
  value,
}));

const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

const AnalyticsDashboard = () => (
  <div style={{ marginBottom: 32 }}>
    <Row gutter={16}>
      <Col span={6}>
        <Card>
          <Statistic title="Total Volume" value={`$${dashboardStats.totalVolume}`} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Success Rate"
            value={`${dashboardStats.successRate.toFixed(2)}%`}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="Failed Transactions" value={dashboardStats.failedCount} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Processing Transactions"
            value={dashboardStats.processingCount}
          />
        </Card>
      </Col>
    </Row>

    <Row gutter={16} style={{ marginTop: 32 }}>
      <Col span={12}>
        <Card title="Transaction Trend Chart">
          <ResponsiveContainer height={300}>
            <LineChart data={Object.values(dailyData)}>
              <XAxis dataKey="date" />
              <YAxis label={{ value: "Transactions", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="Transactions" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Status Distribution">
          <ResponsiveContainer height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>

    <Row style={{ marginTop: 32 }}>
      <Col span={24}>
        <Card title="Daily Volume Chart">
          <ResponsiveContainer height={300}>
            <LineChart data={Object.values(dailyData)}>
              <XAxis dataKey="date" />
              <YAxis label={{ value: "Volume", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="volume" stroke="#82ca9d" name="Volume" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  </div>
);

export default AnalyticsDashboard;

