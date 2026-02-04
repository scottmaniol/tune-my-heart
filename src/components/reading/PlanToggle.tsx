import { useState } from 'react';
import { Info, X } from 'lucide-react';
import { PlanType } from '../../types/curriculum';
import { useUserPreferences } from '../../contexts/UserPreferencesContext';

const PlanToggle = () => {
  const { preferences, updatePreferences } = useUserPreferences();
  const currentPlan = preferences?.readingPlan || 'narrative';
  const [showNarrativeModal, setShowNarrativeModal] = useState(false);
  const [showWholeBibleModal, setShowWholeBibleModal] = useState(false);

  const handleToggle = async (plan: PlanType) => {
    await updatePreferences({ readingPlan: plan });
  };

  return (
    <>
      <div className="flex items-center space-x-2 bg-background-dark p-1 rounded-lg">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleToggle('narrative')}
            className={`px-4 py-2 rounded-md font-body font-semibold text-sm transition-colors ${
              currentPlan === 'narrative'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text hover:bg-white'
            }`}
          >
            5-Day Narrative
          </button>
          <button
            onClick={() => setShowNarrativeModal(true)}
            className="p-1.5 text-text-light hover:text-primary transition-colors"
            title="About Narrative Plan"
            aria-label="About Narrative Plan"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleToggle('wholeBible')}
            className={`px-4 py-2 rounded-md font-body font-semibold text-sm transition-colors ${
              currentPlan === 'wholeBible'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text hover:bg-white'
            }`}
          >
            5-Day Whole Bible
          </button>
          <button
            onClick={() => setShowWholeBibleModal(true)}
            className="p-1.5 text-text-light hover:text-primary transition-colors"
            title="About Whole Bible Plan"
            aria-label="About Whole Bible Plan"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Narrative Plan Modal */}
      {showNarrativeModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50" 
            onClick={() => setShowNarrativeModal(false)}
          />
          <div className="fixed inset-4 sm:inset-8 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:inset-auto z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="bg-primary px-6 py-4 flex items-center justify-between border-b border-primary-dark">
                <h2 className="text-xl font-heading text-white font-bold">About 5-Day Bible Narratives Plan</h2>
                <button
                  onClick={() => setShowNarrativeModal(false)}
                  className="text-white hover:text-gray-200 transition"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h3 className="font-heading text-lg text-primary mb-3">Features of the 5 Day Bible Narratives Reading Plan:</h3>
                <ul className="list-disc list-outside ml-5 space-y-2 text-text font-body leading-relaxed">
                  <li>Read through all of the major narratives of Scripture, plus Psalm and Proverbs, in a year.</li>
                  <li>Read only 5 days per week.</li>
                  <li>Perfect especially for children, families, or individuals who wish to focus a year's reading only on the Bible's narratives.</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Whole Bible Plan Modal */}
      {showWholeBibleModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50" 
            onClick={() => setShowWholeBibleModal(false)}
          />
          <div className="fixed inset-4 sm:inset-8 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:inset-auto z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="bg-primary px-6 py-4 flex items-center justify-between border-b border-primary-dark">
                <h2 className="text-xl font-heading text-white font-bold">About 5-Day Whole Bible Plan</h2>
                <button
                  onClick={() => setShowWholeBibleModal(false)}
                  className="text-white hover:text-gray-200 transition"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-text font-body leading-relaxed">
                  The 5 day whole Bible reading plan parallels the Bible Narrative reading plan. The plan covers the whole Bible chronologically, with Psalms and Proverbs sprinkled in. The readings parallel those in the Narrative plan most weeks, with some weeks slightly ahead or behind. This plan can be used for older children who are ready to start reading the whole Bible or parents who want to read the whole Bible in parallel with their younger children who are using the Narrative plan.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PlanToggle;
