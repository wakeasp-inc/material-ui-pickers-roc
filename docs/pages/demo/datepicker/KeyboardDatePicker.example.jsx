import React, { Fragment, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

function KeyboardDatePickerExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
  console.log(selectedDate);
  return (
    <Fragment>
      <KeyboardDatePicker
        clearable
        value={selectedDate}
        placeholder="100/01/01"
        onChange={date => handleDateChange(date)}
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
