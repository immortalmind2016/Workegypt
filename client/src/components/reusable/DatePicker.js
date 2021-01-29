import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import uuid from "uuid";
export default class DatePicker extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null
  };

  render() {
    const {
      updateCallerState,
      startDateId = uuid(),
      endDateId = uuid()
    } = this.props;
    return (
      <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        startDateId={startDateId} // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        endDateId={endDateId} // PropTypes.string.isRequired,
        isOutsideRange={() => false}
        onDatesChange={({ startDate, endDate }) => {
          this.setState({ startDate, endDate });
          updateCallerState(startDate, endDate);
        }} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
      />
    );
  }
}
