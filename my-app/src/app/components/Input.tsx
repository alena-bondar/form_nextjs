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
  className?: string;
};

export const Input: FC<InputProps> = ({
  register,
  type,
  fieldName,
  isShownIcon,
  placeholder,
  className,
}) => {
  return (
    <div>
      <label className="relative mb-2">
        {fieldName}
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className={`border rounded-md w-full border-blue-gray-200 text-blue-gray-600 py-2 text-base my-2 ${className}`}
        />
        {isShownIcon && (
          <Image
            src="/assets/search-icon.svg"
            alt="search"
            width="19"
            height="19"
            className="absolute top-[38px] mx-3"
          />
        )}
      </label>
    </div>
  );
};
