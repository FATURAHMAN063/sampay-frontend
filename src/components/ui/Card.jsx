import React from 'react';

const Card = ({ children, className = '', hoverable = true }) => {
  const baseClasses = 'bg-sampay-white p-6 rounded-xl shadow-md shadow-[0_8px_20px_rgba(0,0,0,0.12)] text-sampay-black';
  const hoverClass = hoverable ? 'hover:shadow-xl transition' : '';

  return (
    <div className={`${baseClasses} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;