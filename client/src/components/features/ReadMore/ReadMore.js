import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

const ReadMore = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => setExpanded(prev => !prev);

  if (text.length <= 250) {
    return <p>{ text }</p>;
  }

  return (
    <div className="my-10 border border-muted rounded p-4">
      <p className="xs:text-sm lg:text-base leading-normal">
        { expanded ? text : text.slice(0, 250) + '...' }
      </p>
      <button 
        onClick={ toggleExpanded } 
        className="mt-2 block mx-auto border border-transparent text-muted font-semibold px-3 py-1 rounded transition-all duration-200 hover:border-secondary hover:text-secondary">
        { expanded ? (
          <>
           <LuChevronUp className="w-6 h-6 translate-x-5" /> Schowaj
          </>
        ) : (
          <>
            Czytaj dalej <LuChevronDown className="w-6 h-6 translate-x-8"/>
          </>
        ) }
      </button>
    </div>
  );
};

export default ReadMore;
