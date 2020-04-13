import React, { Fragment, useState } from 'react';
import { DatePicker } from '@wakeasp_tw/material-ui-roc-pickers';

function BasicDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DatePicker
        format={'yyyy/MM/dd'}
        label="日期"
        views={['year', 'month', 'date']}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </Fragment>
  );
}

export default BasicDatePicker;
