import { useState } from 'react';
import style from './inputField.module.css';
import { Eye } from '../Icons';

// type, label and constraints
type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  showLabel?: true;
  error?: string;
};

export default function InputField({
  id,
  type,
  label,
  showLabel = true,
  error,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={style.inputGroup}>
      <label htmlFor={id} className={style.label} hidden={showLabel}>
        {label}
      </label>

      <div style={{ position: 'relative' }}>
        <input {...props} type={inputType} id={id} className={style.input} />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            className={style.showBtn}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Eye />
          </button>
        )}
      </div>

      {/* Error message */}
      <p className={style.error}>{error}</p>
    </div>
  );
}
