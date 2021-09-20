import { Table } from 'antd';

const AntTable = ({ columns, data, ...otherProps }) => {
  const tableColumns = columns.map((col) => ({
    ...col,
    dataIndex: col.key,
  }));

  return (
    <div>
      <Table columns={tableColumns} dataSource={data} {...otherProps} />
    </div>
  );
};

AntTable.defaultProps = {
  rowKey: 'id',
};

export default AntTable;
