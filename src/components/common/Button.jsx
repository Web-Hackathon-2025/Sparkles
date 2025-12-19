import React from 'react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    className = '',
    type = 'button',
    disabled = false
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';

    const variants = {
        primary: 'bg-[#F97B27] text-white hover:bg-[#e66a16] focus:ring-[#F97B27] shadow-sm hover:shadow-md',
        secondary: 'bg-white text-[#2C475C] border border-[#2C475C]/20 hover:bg-[#F8F5F0] focus:ring-[#2C475C] shadow-sm',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
        ghost: 'bg-transparent text-[#2C475C] hover:bg-[#2C475C]/5 hover:text-[#2C475C] focus:ring-[#2C475C]',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
