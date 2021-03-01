import React, { Component } from "react";
import Table from "./common/table";

class CustomerTable extends Component {
  columns = [
    {
      path: "nag",
      label: "nag",
    },
    { path: "nome", label: "nome" },
    { path: "dataNascita", label: "data di nascita" },
    { path: "telefono", label: "numero di telefono" },
    { path: "email", label: "email" },
  ];
  details = (data) => {
    this.props.details(data);
  };

  render() {
    const { customers, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
        details={this.props.details}
      />
    );
  }
}

export default CustomerTable;
