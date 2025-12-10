import { FC } from "react";

export interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

const FormField: FC<FormFieldProps> = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  rows = 5,
}) => {
  const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-base-content mb-2">
        {label} {required && <span className="text-error">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className={`${inputClasses} resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClasses}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;
