import React from "react";
import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import type { DatePickerFieldProps } from "../../misc/types";

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  label,
  styles,
  labelStyle,
  placeholder,
  dir,
  innerDivStyle,
  Icon,
  iconStyle,
}): React.ReactNode => {
  return (
    <Form.Group className={styles}>
      <div className={innerDivStyle}>
        {label && (
          <Form.Label className={labelStyle} htmlFor={name}>
            {Icon && <span className={`flex-center ${iconStyle}`}>{Icon}</span>}
            <span>{label}:</span>
          </Form.Label>
        )}

        <Field name={name}
          type="date"
          id={name}
          className="form-control"
          placeholder={placeholder}
          dir={dir}
        >
        </Field>
      </div>

      <ErrorMessage name={name}>
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  );
};

export default DatePickerField;
