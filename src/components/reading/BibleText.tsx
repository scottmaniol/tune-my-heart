import { Translation } from '../../types/curriculum';
import { expandBookNames } from '../../utils/bibleBooks';

interface BibleTextProps {
  reference: string;
  translation: Translation;
  title?: string;
}

const BibleText = ({ reference, translation, title }: BibleTextProps) => {
  const expandedReference = expandBookNames(reference);
  
  return (
    <div className="card">
      {title && (
        <h2 className="text-2xl font-heading text-primary mb-4">
          {title}
        </h2>
      )}
      <div className="mb-4">
        <h3 className="text-xl font-heading text-primary mb-4">
          {expandedReference}
        </h3>
      </div>

      <div className="bg-background-dark rounded-lg p-6 text-center">
        <p className="font-body text-text-light mb-4">
          Read this passage on Bible Gateway
        </p>
        <a
          href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(reference)}&version=${translation}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-body rounded-lg hover:bg-primary-dark transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Read {expandedReference} in {translation} on Bible Gateway
        </a>
        <p className="text-xs text-text-light mt-4 italic">
          Opens in new tab
        </p>
      </div>
    </div>
  );
};

export default BibleText;
