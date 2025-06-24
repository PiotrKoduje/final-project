import React from 'react';

const AmountWidget = ({ quantity, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(-1)}
        className="w-[24px] py-1 bg-accent text-white rounded disabled:opacity-40"
        disabled={quantity <= 1}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => onChange(1)}
        className="w-[24px] py-1 bg-accent text-white rounded disabled:opacity-40"
        disabled={quantity >= 10}
      >
        +
      </button>
    </div>
  );
};

export default AmountWidget;
