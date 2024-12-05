import { FC } from "react";
import Image from "next/image";

type InputProps = {
  type: string;
  fieldName: string;
  isShownIcon?: boolean;
  placeholder: string;
  className?: string;
  value: string | undefined;
  onChange: () => void;
};

export const Input: FC<InputProps> = ({
  type,
  fieldName,
  isShownIcon,
  placeholder,
  className,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="relative mb-2">
        {fieldName}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
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
