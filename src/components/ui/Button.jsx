import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', as: Component = 'button', ...props }) => {
  const baseClasses = 'font-bold py-2 px-4 rounded transition';

  const variants = {
    primary: 'bg-sampay-green hover:bg-sampay-green-dark text-sampay-white',
    secondary: 'bg-sampay-white hover:bg-sampay-gray-light text-sampay-black border border-sampay-green',
    outline: 'border border-sampay-green text-sampay-green hover:bg-sampay-green-light',
    danger: 'bg-red-600 hover:bg-red-700 text-sampay-white',
    success: 'bg-blue-600 hover:bg-blue-700 text-sampay-white'
  };

  const sizes = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg'
  };

  return (
    <Component
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;