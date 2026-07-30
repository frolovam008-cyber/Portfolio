import type { HTMLInputTypeAttribute, TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import styles from "./FormField.module.css";

type CommonProps = {
  id: string;
  label: string;
  placeholder?: string;
  error?: string;
  registration: UseFormRegisterReturn;
  autoComplete?: string;
  disabled?: boolean;
};

type InputFieldProps = CommonProps & {
  as?: "input";
  type?: HTMLInputTypeAttribute;
};

type TextareaFieldProps = CommonProps & {
  as: "textarea";
  rows?: TextareaHTMLAttributes<HTMLTextAreaElement>["rows"];
};

type FormFieldProps = InputFieldProps | TextareaFieldProps;

export default function FormField(props: FormFieldProps) {
  const {
    id,
    label,
    placeholder,
    error,
    registration,
    autoComplete,
    disabled,
  } = props;

  const errorId = `${id}-error`;

  const fieldClassName = `${styles.control} ${
    error ? styles.controlError : ""
  }`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      {props.as === "textarea" ? (
        <textarea
          id={id}
          rows={props.rows ?? 6}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldClassName} ${styles.textarea}`}
          {...registration}
        />
      ) : (
        <input
          id={id}
          type={props.type ?? "text"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldClassName} ${styles.input}`}
          {...registration}
        />
      )}

      <p
        id={errorId}
        className={styles.error}
        role={error ? "alert" : undefined}
      >
        {error ?? ""}
      </p>
    </div>
  );
}
