import React, { Component } from "react";
import CustomerTable from "./CustomerTable";
import RicercaForm from "./RicercaForm";
import NavbarDetailed from "./NavbarDetailed";
import { ToastContainer } from "react-toastify";
import _ from "lodash";

import "react-toastify/dist/ReactToastify.css";
import http from "./ApiCalls";

import ModalDetails from "./ModalDetails";
class RicercaUtente extends Component {
  state = {
    sortColumn: { path: "nag", order: "asc" },
    customers: [],
    filiali: [],
    data: {
      filialeId: "",
      nag: "",
      nome: "",
      dataNascita: "",
    },
    modalFlag: false,
    modalData: {},
    postData: {},
  };

  async componentDidMount() {
    const response = await http.getFiliali();
    const filiali = [...response.data];
    filiali.forEach((el) => {
      delete el.lastModify;
      delete el.codice;
      delete el.cab;
    });
    this.setState({ filiali });
  }

  populateCustomers = async (data) => {
    await this.setState({ data });
    const customersNotSorted = await this.axiosSearchClienti();
    const customers = this.sortCustomers(customersNotSorted);
    await this.setState({ customers });
  };

  async axiosSearchClienti() {
    const {
      filialeId: branch,
      nag,
      nome: customerName,
      dataNascita: birthDate,
    } = this.state.data;
    const response = await http.getCustomers(
      branch,
      nag,
      customerName,
      birthDate
    );
    return response.data;
  }
  sortCustomers = (customers) => {
    const { path, order } = this.state.sortColumn;
    return _.orderBy(customers, path, order);
  };

  handleSort = async (sortColumn) => {
    await this.setState({ sortColumn });
    const customers = this.sortCustomers(this.state.customers);
    await this.setState({ customers });
  };

  setDetailsFlag = async (modalData) => {
    await this.setState({ modalFlag: true });
    await this.setState({ modalData });
  };

  setPostData = async (postData) => {
    await this.setState({ postData });
    this.setFlag();
    await http.postConfermed(this.state.postData);
    this.populateCustomers(this.state.data);
  };

  setFlag = () => {
    const modalFlag = !this.state.modalFlag;
    this.setState({ modalFlag });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavbarDetailed />
        <div className="mx-3 my-4">
          <RicercaForm
            filialiNome={this.state.filiali}
            dataCustomers={this.populateCustomers}
          />
          {this.state.modalFlag && this.state.modalData && (
            <ModalDetails
              modalFlag={this.state.modalFlag}
              setFlag={this.setFlag}
              modalData={this.state.modalData}
              setPostData={this.setPostData}
            ></ModalDetails>
          )}
          {this.state.customers.length === 0 ? (
            <p>nessun dato da visualizzare</p>
          ) : (
            <CustomerTable
              customers={this.state.customers}
              sortColumn={this.state.sortColumn}
              onSort={this.handleSort}
              details={this.setDetailsFlag}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default RicercaUtente;
