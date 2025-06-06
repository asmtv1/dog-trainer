// components/ui/FormInput.tsx
import { InputHTMLAttributes, FC } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const FormInput: FC<Props> = ({ error, ...rest }) => (
  <>
    <input {...rest} />
    {error && <p style={{ color: "crimson" }}>{error}</p>}
  </>
);
