import { UseFormRegister } from "react-hook-form";
import { FC } from "react";
import Image from "next/image";

interface IFormValues {
  name: string;
}

type InputProps = {
  register?: UseFormRegister<IFormValues>;
  type: string;
  fieldName: string;
  isShownIcon?: boolean;
  placeholder: string;
};

export const Input: FC<InputProps> = ({ register, type, fieldName, isShownIcon, placeholder }) => {
  return (
    <div>
        {isShownIcon && <Image src={""} alt={""} />}
      <label className="mb-2">
        {fieldName}
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className="border rounded-md w-full border-blue-gray-200 text-blue-gray-600 px-3 py-2 text-base my-2"
        />
      </label>
    </div>
  );
};
