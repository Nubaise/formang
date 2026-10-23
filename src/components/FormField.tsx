
import type { ReactNode } from 'react';

type FormFieldProps = {
  label: string;
  error?: string;
  invalid?: boolean;
  children: ReactNode;
};

export default function FormField({
  label,
  error,
  invalid = false,
  children,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label className="field-label">{label}</label>

      <div className={`field-control ${invalid ? 'invalid' : ''}`}>
        {children}
      </div>

      {invalid && error && (
        <small className="error-message" role="alert">
          {error}
        </small>
      )}
    </div>
  );
}
