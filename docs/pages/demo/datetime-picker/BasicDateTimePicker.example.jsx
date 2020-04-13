import React, { Fragment, useState } from 'react';
import { DateTimePicker } from '@wakeasp_tw/material-ui-roc-pickers';

function BasicDateTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DateTimePicker
        label="DateTimePicker"
        inputVariant="outlined"
        value={selectedDate}
        onChange={handleDateChange}
      />

      <DateTimePicker
        autoOk
        ampm={false}
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
        label="24h clock"
      />

      <DateTimePicker
        value={selectedDate}
        disablePast
        onChange={handleDateChange}
        label="With Today Button"
        showTodayButton
      />
    </Fragment>
  );
}

export default BasicDateTimePicker;
