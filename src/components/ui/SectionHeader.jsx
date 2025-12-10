import React from 'react';

const SectionHeader = ({ title, subtitle = '', badgeText = '', className = '' }) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {badgeText && (
        <span className="inline-block bg-sampay-green-light text-sampay-black text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {badgeText}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-sampay-black mb-4">{title}</h2>
      {subtitle && <p className="text-sampay-black text-opacity-80 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;