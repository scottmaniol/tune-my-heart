import { ExternalLink } from 'lucide-react';
import { Translation } from '../../types/curriculum';

interface BibleGatewayLinkProps {
  reference: string;
  translation: Translation;
}

const BibleGatewayLink = ({ reference, translation }: BibleGatewayLinkProps) => {
  // Generate Bible Gateway URL
  const bibleGatewayUrl = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(reference)}&version=${translation}`;

  return (
    <div className="bg-background-dark rounded-lg p-6 text-center">
      <p className="text-text-light font-body text-sm mb-3">
        Read this passage on Bible Gateway
      </p>
      <a
        href={bibleGatewayUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-body font-semibold rounded-lg transition-colors duration-200"
      >
        <ExternalLink className="w-4 h-4" />
        Read {reference} in {translation} on Bible Gateway
      </a>
      <p className="text-text-light font-body text-xs mt-2 italic">
        Opens in new tab
      </p>
    </div>
  );
};

export default BibleGatewayLink;
