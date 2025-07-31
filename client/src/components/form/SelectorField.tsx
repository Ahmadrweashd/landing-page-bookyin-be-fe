import React from "react";
import { Field, ErrorMessage, type FieldProps } from "formik";
import { Form } from "react-bootstrap";
import TextError from "./TextError";
import type { SelectorFieldProps } from "../../misc/types";

const SelectorField: React.FC<SelectorFieldProps> = ({
  name,
  options,
  label,
  styles,
  labelStyle,
  innerDivStyle,
  inputClasses = "form-control",
  Icon,
  iconStyle,
}): JSX.Element => {
  return (
    <Form.Group className={styles}>
      <div className={innerDivStyle}>
        {label && (
          <Form.Label className={labelStyle} htmlFor={name}>
            {Icon && <span className={iconStyle}>{Icon}</span>}
            <span>{label}:</span>
          </Form.Label>
        )}

        <Field name={name}>
          {({ field }: FieldProps) => (
            <Form.Control
              as="select"
              id={name}
              {...field}
              className={inputClasses}
            >
              <option value="">Select</option>
              {options.map((option) => (
                <option key={`${name}-${option.value}`} value={option.value}>
                  {option.key}
                </option>
              ))}
            </Form.Control>
          )}
        </Field>
      </div>

      <ErrorMessage name={name}>
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  );
};

export default SelectorField;
