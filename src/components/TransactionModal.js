import React from 'react';
import { Modal, Descriptions, Timeline } from 'antd';

const TransactionModal = ({ visible, onClose, transaction }) => {
  if (!transaction) return null;

  return (
    <Modal
      title="Transaction Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Descriptions bordered>
        <Descriptions.Item label="Transaction ID">{transaction.id}</Descriptions.Item>
        <Descriptions.Item label="Amount">${transaction.amount.toFixed(2)}</Descriptions.Item>
        <Descriptions.Item label="Status">{transaction.status}</Descriptions.Item>
        <Descriptions.Item label="Date">{transaction.date}</Descriptions.Item>
        <Descriptions.Item label="Customer Name">
          {transaction.customerName}
        </Descriptions.Item>
        <Descriptions.Item label="Transaction Type">
          {transaction.transactionType}
        </Descriptions.Item>
      </Descriptions>
      <h3>Status History</h3>
      <Timeline>
        <Timeline.Item>Status Created: {transaction.date}</Timeline.Item>
        <Timeline.Item>Status Updated: Processing</Timeline.Item>
        <Timeline.Item>Status Updated: {transaction.status}</Timeline.Item>
      </Timeline>
    </Modal>
  );
};

export default TransactionModal;
