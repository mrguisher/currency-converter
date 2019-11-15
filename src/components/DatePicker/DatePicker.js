import React from 'react';
import PropTypes from 'prop-types';

import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = props => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="yyyy-MM-dd"
        id="date-picker-inline"
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;

DatePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
}