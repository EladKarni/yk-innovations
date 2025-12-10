import { FC } from "react";

export interface FormAlertProps {
  type: "success" | "error";
  message: string;
}

const FormAlert: FC<FormAlertProps> = ({ type, message }) => {
  const isSuccess = type === "success";

  const bgColor = isSuccess ? "bg-success/10" : "bg-error/10";
  const borderColor = isSuccess ? "border-success" : "border-error";
  const textColor = isSuccess ? "text-success" : "text-error";

  return (
    <div className={`${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded-lg`}>
      {message}
    </div>
  );
};

export default FormAlert;
