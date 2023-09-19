import { InputChangeEvent } from "@/hooks/useInputChange";
import { FC } from "react";

type TProps = {
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "checkbox"
    | "textarea";
  name: string;
  id?: string;
  label: string;
  required?: boolean;
  onChange: (e: InputChangeEvent) => void;
  placeholder?: string;
  value?: string | number;
  checked?: boolean;
  maxLength?: number;
  error?: string | null;
  rows?: number;
};

export const Input: FC<TProps> = ({
  type,
  name,
  id,
  label,
  onChange,
  required,
  placeholder,
  value,
  error,
  checked,
  rows,
}) => {
  // checkboxes are a special case
  if (type === "checkbox")
    return (
      <div className="input-group">
        <label>
          <input
            type={type}
            name={name}
            id={id ?? name}
            onChange={onChange}
            checked={checked}
          />
          {label}
        </label>
        <p className="error">{error ?? ""}</p>
      </div>
    );

  // textarea is a special case
  if (type === "textarea")
    return (
      <div className="input-group">
        <label htmlFor={name}>{label}</label>
        <textarea
          name={name}
          rows={rows ?? 5}
          id={id ?? name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          required={required}
        />
        <p className="error">{error ?? ""}</p>
      </div>
    );

  // all other inputs
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={id ?? name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
      />
      <p className="error">{error ?? ""}</p>
    </div>
  );
};
