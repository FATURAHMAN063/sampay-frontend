import React from 'react';

const IconBox = ({ icon, title, description = '', number = '', className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      {number && (
        <div className="bg-sampay-yellow text-sampay-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
          {number}
        </div>
      )}
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-sampay-black mb-2">{title}</h3>
      {description && <p className="text-sampay-black text-opacity-70">{description}</p>}
    </div>
  );
};

export default IconBox;