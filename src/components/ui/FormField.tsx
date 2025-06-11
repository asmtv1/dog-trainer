import React from "react";
//import styles from "./FormField.module.css";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  as?: "input" | "textarea";
  register: any;
  error?: string;
};

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  as = "input",
  register,
  error,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {as === "textarea" ? (
        <textarea id={id} placeholder={placeholder} rows={4} {...register} />
      ) : (
        <input id={id} type={type} placeholder={placeholder} {...register} />
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
