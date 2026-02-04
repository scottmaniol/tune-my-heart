/**
 * ReviewCard Component
 * Displays a verse for review with options to reveal and mark correct/incorrect
 */

import { useState } from 'react';
import { BookOpen, Eye, Check, X, Flame } from 'lucide-react';
import { MemoryBoxVerse, BOX_NAMES, BOX_COLORS } from '../../types/memoryBox';

interface ReviewCardProps {
  verse: MemoryBoxVerse;
  verseText: string;
  isCurrentWeek?: boolean;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  verse,
  verseText,
  isCurrentWeek = false,
  onCorrect,
  onIncorrect,
}) => {
  const [revealed, setRevealed] = useState(false);
  const [answered, setAnswered] = useState(false);

  const boxColors = BOX_COLORS[verse.box];

  const handleCorrect = () => {
    setAnswered(true);
    onCorrect();
  };

  const handleIncorrect = () => {
    setAnswered(true);
    onIncorrect();
  };

  return (
    <div className={`border-2 rounded-lg p-6 ${boxColors.border} ${boxColors.bg}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-heading text-primary font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {verse.reference}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-body ${boxColors.text} font-semibold`}>
              {BOX_NAMES[verse.box]}
            </span>
            {isCurrentWeek && (
              <span className="text-xs font-body bg-primary text-white px-2 py-0.5 rounded">
                Current Week
              </span>
            )}
            <span className="text-xs font-body text-text-light">
              Week {verse.week}
            </span>
          </div>
        </div>
        <div className="text-right text-xs text-text-light">
          <div className="flex items-center gap-1 justify-end">
            <Check className="w-3 h-3 text-green-600" />
            {verse.correctCount} correct
          </div>
          <div className="flex items-center gap-1 justify-end">
            <X className="w-3 h-3 text-red-600" />
            {verse.incorrectCount} incorrect
          </div>
        </div>
      </div>

      {/* Verse Text */}
      <div className="bg-white rounded-lg p-4 mb-4 min-h-[120px] flex items-center justify-center">
        {!revealed ? (
          <div className="text-center">
            <p className="text-text-light font-body italic mb-4">
              Try to recite this verse from memory
            </p>
            <button
              onClick={() => setRevealed(true)}
              className="btn-secondary flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Reveal Verse
            </button>
          </div>
        ) : (
          <div className="text-lg font-body text-text leading-relaxed">
            {verseText.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-2 last:mb-0">{paragraph}</p>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {revealed && !answered && (
        <div className="flex gap-3">
          <button
            onClick={handleCorrect}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-body font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Got It Right
          </button>
          <button
            onClick={handleIncorrect}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-body font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Need More Practice
          </button>
        </div>
      )}

      {/* Answered Feedback */}
      {answered && (
        <div className="text-center">
          <p className="text-sm font-body text-text-light italic">
            Review recorded! Continue to next verse...
          </p>
        </div>
      )}

      {/* Stats */}
      {verse.consecutiveCorrect > 0 && (
        <div className="mt-3 text-center">
          <span className="text-xs font-body bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1 justify-center inline-flex">
            <Flame className="w-3 h-3" />
            {verse.consecutiveCorrect} consecutive correct
          </span>
        </div>
      )}
    </div>
  );
};
