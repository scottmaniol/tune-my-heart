/**
 * BoxContainer Component
 * Displays verses in a specific box with visual styling
 */

import { BookMarked, BookOpen, Book, BookText, Star, Check, X, Flame } from 'lucide-react';
import { MemoryBoxVerse, BoxLevel, BOX_NAMES, BOX_COLORS } from '../../types/memoryBox';

interface BoxContainerProps {
  box: BoxLevel;
  verses: MemoryBoxVerse[];
  onVerseClick?: (verse: MemoryBoxVerse) => void;
}

export const BoxContainer: React.FC<BoxContainerProps> = ({
  box,
  verses,
  onVerseClick,
}) => {
  const boxColors = BOX_COLORS[box];
  const boxName = BOX_NAMES[box];

  const getBoxIcon = (box: BoxLevel) => {
    const iconClass = "w-6 h-6";
    switch (box) {
      case 1: return <BookMarked className={iconClass} />;
      case 2: return <BookOpen className={iconClass} />;
      case 3: return <Book className={iconClass} />;
      case 4: return <BookText className={iconClass} />;
      case 5: return <Star className={iconClass} />;
    }
  };

  const getBoxDescription = (box: BoxLevel): string => {
    switch (box) {
      case 1: return 'Review daily';
      case 2: return 'Review every 3 days';
      case 3: return 'Review weekly';
      case 4: return 'Review bi-weekly';
      case 5: return 'Review monthly';
    }
  };

  return (
    <div className={`border-2 rounded-lg ${boxColors.border} ${boxColors.bg} overflow-hidden`}>
      {/* Header */}
      <div className={`${boxColors.bg} border-b-2 ${boxColors.border} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={boxColors.text}>{getBoxIcon(box)}</span>
            <div>
              <h3 className={`font-heading font-semibold ${boxColors.text}`}>
                Box {box}: {boxName}
              </h3>
              <p className="text-xs text-text-light font-body">
                {getBoxDescription(box)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-heading font-bold ${boxColors.text}`}>
              {verses.length}
            </div>
            <div className="text-xs text-text-light font-body">
              {verses.length === 1 ? 'verse' : 'verses'}
            </div>
          </div>
        </div>
      </div>

      {/* Verses List */}
      <div className="bg-white">
        {verses.length === 0 ? (
          <div className="p-6 text-center text-text-light font-body italic">
            No verses in this box yet
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {verses.map((verse) => {
              const nextReview = new Date(verse.nextReviewDate);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              nextReview.setHours(0, 0, 0, 0);
              const isDue = nextReview <= today;

              return (
                <div
                  key={verse.week}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    onVerseClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onVerseClick?.(verse)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-body font-semibold text-primary">
                          Week {verse.week}
                        </span>
                        <span className="text-sm font-body text-text-light">
                          {verse.reference}
                        </span>
                        {isDue && (
                          <span className="text-xs bg-gold text-white px-2 py-0.5 rounded font-body">
                            Due
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-text-light font-body">
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-green-600" />
                          {verse.correctCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <X className="w-3 h-3 text-red-600" />
                          {verse.incorrectCount}
                        </span>
                        {verse.consecutiveCorrect > 0 && (
                          <span className="text-green-600 flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            {verse.consecutiveCorrect} streak
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-xs text-text-light font-body">
                      <div>Next review:</div>
                      <div className={isDue ? 'text-gold font-semibold' : ''}>
                        {nextReview.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
