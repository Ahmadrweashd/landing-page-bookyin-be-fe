import React from "react";
import { Form } from "react-bootstrap";
import { ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";
import type { FileInputFieldProps } from "../../misc/types";

const FileInputField: React.FC<FileInputFieldProps> = ({
  name,
  label,
  accept,
  styles,
  labelStyle,
  innerDivStyle,
  iconStyle,
  Icon,
}): React.ReactNode => {
  const { setFieldValue } = useFormikContext();

  return (
    <Form.Group className={styles}>
      <div className={innerDivStyle}>
        {label && (
          <Form.Label className={labelStyle}>
            {Icon && <span className={iconStyle}>{Icon}</span>}
            <span>{label}</span>
          </Form.Label>
        )}
        <Form.Control
          name={name}
          type="file"
          accept={accept}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.currentTarget.files?.[0] || null;
            setFieldValue(name, file);
          }}
        />
      </div>

      <ErrorMessage name={name}>
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  );
};

export default FileInputField;
