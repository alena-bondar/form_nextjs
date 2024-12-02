import {FC, ReactNode} from "react";

type ButtonProps = {
    child?: ReactNode;
    name?: string;
    type: 'submit' | 'reset' | 'button';
    className: string;
}

export const Button:FC<ButtonProps> = ({child, name, type, className}) => {
    return (
            <button type={type} className={`block px-4 py-2.5 rounded-md border text-sm font-semibold h-10 ${className}`}>
                {child || name}
            </button>
    )
}