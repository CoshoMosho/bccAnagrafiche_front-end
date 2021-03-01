import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class DatePickerCont extends Component {
  render() {
    return (
      <div>
        {
          <DatePicker
            className="form-control pl-5"
            //dateFormat="yyyy/MM/dd"
            id="datePicker"
            selected={this.props.dataNascita}
            onSelect={this.props.handledatapicker}
            onChange={this.props.handledatapicker}
          />
        }
      </div>
    );
  }
}

export default DatePickerCont;
