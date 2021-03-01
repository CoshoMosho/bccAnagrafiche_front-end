import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  clickDet(item) {
    this.props.details(item);
  }

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
            {!item.confermato && (
              <td>
                <button
                  className="btn btn-outline-success"
                  onClick={() => this.clickDet(item)}
                >
                  dettagli
                </button>
              </td>
            )}
            {item.confermato && (
              <td>
                <button
                  className="btn btn-outline-info"
                  onClick={() => this.clickDet(item)}
                >
                  <i className="fa fa-check" aria-hidden="true"></i>
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
