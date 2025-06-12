import React from "react";
import { UseFormReturn, RegisterOptions } from "react-hook-form";

type FormFieldProps = {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  as?: "input" | "textarea";
  rules?: RegisterOptions;
  form: UseFormReturn<any>;
};

export function FormField({
  id,
  label,
  name,
  type = "text",
  placeholder,
  as = "input",
  rules,
  form,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {as === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={4}
          aria-invalid={!!error}
          {...register(name, rules)}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error}
          {...register(name, rules)}
        />
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
