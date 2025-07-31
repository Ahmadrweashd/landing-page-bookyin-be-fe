import React from "react";
import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import type { InputFieldProps } from "../../misc/types";

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type,
  styles,
  labelStyle,
  placeholder,
  dir,
  innerDivStyle,
  inputMode,
  Icon,
  iconStyle,
  autoComplete = "on",
  disabled = false
}): React.ReactNode => {
  return (
    <Form.Group className={styles}>
      <div className={innerDivStyle}>
        {label && (
          <Form.Label className={labelStyle}>
            {Icon && <span className={`flex-center ${iconStyle}`}>{Icon}</span>}
            <span>{label}:</span>
          </Form.Label>
        )}

        <Field
          type={type}
          name={name}
          inputMode={inputMode}
          className="form-control"
          placeholder={placeholder}
          dir={dir}
          autoComplete={autoComplete}
          disabled={disabled}
        />
      </div>

      <ErrorMessage name={name}>
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  );
};

export default InputField;
