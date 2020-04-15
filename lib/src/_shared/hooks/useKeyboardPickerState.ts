import { useUtils } from './useUtils';
import { Omit } from '../../_helpers/utils';
import { IUtils } from '@date-io/core/IUtils';
import { BasePickerProps } from '../../typings/BasePicker';
import { MaterialUiPickersDate } from '../../typings/date';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getDisplayDate } from '../../_helpers/text-field-helper';
import { StateHookOptions, usePickerState } from './usePickerState';

export interface BaseKeyboardPickerProps extends Omit<BasePickerProps, 'onChange'> {
  /** String value for controlling value with pure input string. Overrides value prop */
  inputValue?: string;
  /** Keyboard onChange callback @DateIOType */
  onChange: (date: MaterialUiPickersDate | null, value?: string | null) => void;
}

function parseInputString(value: string, utils: IUtils<any>, format: string) {
  try {
    return utils.parse(value, format);
  } catch {
    return null;
  }
}

function padStart(targetString: string, targetLength: number, padString: string): string {
  while (targetString.length < targetLength) {
    targetString = padString + targetString;
  }
  return targetString;
}

export function useKeyboardPickerState(props: BaseKeyboardPickerProps, options: StateHookOptions) {
  const { format = options.getDefaultFormat(), inputValue, onChange, value } = props;
  const utils = useUtils();
  const displayDate = getDisplayDate(value, format, utils, value === null, props);
  const [innerInputValue, setInnerInputValue] = useState(displayDate);
  const dateValue = inputValue ? parseInputString(inputValue, utils, format) : value;

  useEffect(() => {
    if (value === null || utils.isValid(value)) {
      let displayDateRoc = displayDate.replace(/[0-9]{4}/i, function(match: string): string {
        return padStart((parseInt(match) - 1911).toString(), 3, '0');
      });

      setInnerInputValue(displayDateRoc);
    }
  }, [displayDate, setInnerInputValue, utils, value]);

  const handleKeyboardChange = useCallback(
    (date: MaterialUiPickersDate) => {
      let dateString = date === null ? null : utils.format(date, format);
      let displayDateRoc = dateString
        ? dateString.replace(/[0-9]{4}/i, function(match: string): string {
            return padStart((parseInt(match) - 1911).toString(), 3, '0');
          })
        : null;

      onChange(date, displayDateRoc);
    },
    [format, onChange, utils]
  );

  const { inputProps: innerInputProps, wrapperProps, pickerProps } = usePickerState(
    // Extend props interface
    { ...props, value: dateValue, onChange: handleKeyboardChange },
    options
  );

  const inputProps = useMemo(
    () => ({
      ...innerInputProps, // reuse validation and open/close logic
      format: wrapperProps.format,
      inputValue: inputValue || innerInputValue,
      onChange: (value: string | null) => {
        let valueAdd1911 = value
          ? value.replace(/[0-9]{3}/i, function(match: string): string {
              return (parseInt(match) + 1911).toString();
            })
          : null;

        setInnerInputValue(value || '');
        const date = valueAdd1911 === null ? null : utils.parse(valueAdd1911, wrapperProps.format);

        onChange(date, value);
      },
    }),
    [innerInputProps, innerInputValue, inputValue, onChange, utils, wrapperProps.format]
  );

  return {
    inputProps,
    wrapperProps,
    pickerProps,
  };
}
