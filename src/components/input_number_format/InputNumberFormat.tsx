import * as React from 'react'
import NumberFormat, { InputAttributes } from 'react-number-format'
import { DECIMAL_SEPARATOR, THOUSAND_SEPARATOR } from '../../constants/Parameter'
import { InputNumberFormatProps } from './interfaces'

const InputNumberFormat = React.forwardRef<NumberFormat<InputAttributes>, InputNumberFormatProps>(
  function InputNumberFormat(props, ref) {
    const { onChange, name, ...other } = props

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: name,
              value: values.value,
            },
          })
        }}
        decimalSeparator={DECIMAL_SEPARATOR}
        thousandSeparator={THOUSAND_SEPARATOR}
        isNumericString
      />
    )
  },
)

export default InputNumberFormat
