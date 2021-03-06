import React, { Fragment, useState } from 'react';
import { KeyboardDatePicker } from '@wakeasp_tw/material-ui-roc-pickers';

function KeyboardDatePickerExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <KeyboardDatePicker
        clearable
        value={selectedDate}
        placeholder="100/01/01"
        onChange={function(date, value) {
          handleDateChange(date);
        }}
        format={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD',
          dateFns: 'yyyy/MM/dd',
        })}
      />

      <KeyboardDatePicker
        placeholder="100/10/10"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        format={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD',
          dateFns: 'yyyy/MM/dd',
        })}
      />
    </Fragment>
  );
}

export default KeyboardDatePickerExample;
