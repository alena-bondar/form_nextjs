import {FC} from "react";

type ButtonProps = {
    name: string;
    type: 'submit' | 'reset' | 'button';
    className: string;
}

export const Button:FC<ButtonProps> = ({name, type, className}) => {
    return (
        <div>
            <button type={type} className={`px-4 py-2 rounded-md border text-sm font-semibold ${className}`}>
                {name}
            </button>
        </div>
    )
}