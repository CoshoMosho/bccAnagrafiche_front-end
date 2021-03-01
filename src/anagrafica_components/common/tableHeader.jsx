import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    return (
      <thead style={{ backgroundColor: "#adc8234a" }}>
        <tr>
          {this.props.columns.map((column) => {
            if (column.path === "nag" || column.path === "nome") {
              return (
                <th
                  className="clickable"
                  key={column.path || column.key}
                  onClick={() => this.raiseSort(column.path)}
                >
                  {column.label} {this.renderSortIcon(column)}
                </th>
              );
            } else {
              return <th key={column.path || column.key}>{column.label}</th>;
            }
          })}
          <th></th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
