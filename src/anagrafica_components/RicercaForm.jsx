import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import DatePickerCont from "./common/datePicker";
import moment from "moment";
class RicercaForm extends Form {
  state = {
    data: {
      filialeId: "",
      nag: "",
      nome: "",
      dataNascita: "",
    },
    dataNotFormatted: null,
    errors: {},
  };

  schema = {
    filialeId: Joi.required().label("filiale"),
    nag: Joi.number().required().label("nag"),
    nome: Joi.string()
      .regex(/^[A-Z]+$/)
      .allow(null, "")
      .label("nome"),
    dataNascita: Joi.string().allow(null, "").label("data di nascita"),
  };
  doSubmit = () => {
    this.props.dataCustomers(this.state.data);
  };

  handleDatePicker = async (date) => {
    const dataFormattata = moment(date).format("YYYY/MM/DD");
    const data = { ...this.state.data };
    data.dataNascita = dataFormattata;
    await this.setState({ data });
    await this.setState({ dataNotFormatted: date });
  };
  render() {
    return (
      <React.Fragment>
        <form
          className="jumbotron py-1"
          style={{ backgroundColor: "#adc8234a" }}
          onSubmit={this.handleSubmit}
        >
          <div className="row my-1">
            <div className="col-md">
              {this.renderSelect(
                "filialeId",
                "Filiale",
                this.props.filialiNome
              )}
            </div>
            <div className="col-md">{this.renderInput("nag", "Nag")}</div>
            <div className="col-md">{this.renderInput("nome", "Nome")}</div>
            <div className="col-md">
              {
                <div className="form-group">
                  <label htmlFor="data">Data di nascita</label>
                  <DatePickerCont
                    dataNascita={this.state.dataNotFormatted}
                    handledatapicker={this.handleDatePicker}
                  ></DatePickerCont>
                </div>
              }
            </div>
            <div className="col-md-auto">{this.renderButton("cerca")}</div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default RicercaForm;
