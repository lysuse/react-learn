import React from 'react';
import './index.scss';

const DataTable = props => {

  const { fields, datas } = props

  return (
    <div className="data-table">
      <div className="data-table-filter">
      </div>
      <table border="0" >
        <thead>
          <tr>
            {fields.map((field, index) => (
              <td key={'thead_' + index}>{field.title}</td>
            ))}
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, row) => (
            <tr key={'tbody_row_' + row}>
              {fields.map((field, column) => (
                <td key={'tbody_row_col_' + row + '_' + column}>{data[field.name]}</td>
              ))}
              <td>
                <a href="#">删除</a>
                <a href="#">编辑</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable;