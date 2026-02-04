import { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
}

const ExpandableSection = ({ title, icon, children, defaultExpanded = false }: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-background-dark hover:bg-gray-200 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="text-primary">
            {icon}
          </div>
          <h4 className="font-heading text-lg text-primary">{title}</h4>
        </div>
        <div className="text-primary">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-white border-t border-gray-300 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;
