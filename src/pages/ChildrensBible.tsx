import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Library, X, Star, BookOpen, Users, MessageCircle, Baby } from 'lucide-react';
import PremiumContentOverlay from '../components/auth/PremiumContentOverlay';
import { getAllStories, getStoryByNumber, getTotalStories } from '../data/childrensBibleData';

const ChildrensBible = () => {
  const { currentUser } = useAuth();
  const [currentStoryNumber, setCurrentStoryNumber] = useState(1);
  const [readingMode, setReadingMode] = useState<'simple' | 'full'>('simple');
  const [showAllStories, setShowAllStories] = useState(false);
  
  const currentStory = getStoryByNumber(currentStoryNumber);
  const allStories = getAllStories();
  const totalStories = getTotalStories();

  const goToNextStory = () => {
    if (currentStoryNumber < totalStories) {
      setCurrentStoryNumber(currentStoryNumber + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousStory = () => {
    if (currentStoryNumber > 1) {
      setCurrentStoryNumber(currentStoryNumber - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const selectStory = (number: number) => {
    setCurrentStoryNumber(number);
    setShowAllStories(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentStory) {
    return (
      <div className="space-y-6">
        <div className="card">
          <h1 className="text-3xl font-heading text-primary mb-2">
            Children's Story Bible
          </h1>
          <p className="text-text-light font-body">
            Story not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header - Single Line */}
      <div className="card py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-heading text-primary whitespace-nowrap flex items-center gap-3">
            <div className="bg-accent text-white rounded-lg p-2">
              <Baby className="w-6 h-6" />
            </div>
            Children's Story Bible
          </h1>
          
          <button
            onClick={goToPreviousStory}
            disabled={currentStoryNumber === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            ← Previous
          </button>
          
          <div className="flex-1 font-body text-text">
            <select
              value={currentStoryNumber}
              onChange={(e) => selectStory(Number(e.target.value))}
              className="input-field py-2 px-3 w-full"
            >
              {allStories.map((story) => (
                <option key={story.number} value={story.number}>
                  {story.number}. {story.title}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={goToNextStory}
            disabled={currentStoryNumber === totalStories}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Next →
          </button>
          
          <button
            onClick={() => setShowAllStories(!showAllStories)}
            className="btn-primary whitespace-nowrap flex items-center gap-2"
          >
            {showAllStories ? (
              <>
                <X className="w-4 h-4" />
                Close
              </>
            ) : (
              <>
                <Library className="w-4 h-4" />
                All Stories
              </>
            )}
          </button>
        </div>
      </div>

      {/* All Stories Grid */}
      {showAllStories && (
        <div className="card">
          <h2 className="text-xl font-heading text-primary mb-4">Browse All Stories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {allStories.map((story) => (
              <button
                key={story.number}
                onClick={() => selectStory(story.number)}
                className={`text-left p-2 rounded transition-all ${
                  currentStoryNumber === story.number
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-background-dark hover:bg-gray-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className={`text-lg font-bold flex-shrink-0 ${
                    currentStoryNumber === story.number ? 'text-white' : 'text-primary'
                  }`}>
                    {story.number}.
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading font-semibold text-sm leading-tight truncate">{story.title}</h3>
                    <p className={`text-xs font-body mt-0.5 ${
                      currentStoryNumber === story.number ? 'text-white opacity-80' : 'text-text-light'
                    }`}>
                      {story.reference}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Story Title & Reference */}
      <div className="card bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="flex items-start gap-4 mb-4">
          <div className="text-5xl font-bold opacity-50">{currentStoryNumber}</div>
          <div className="flex-1">
            <h2 className="text-3xl font-heading mb-2">{currentStory.title}</h2>
            <p className="text-lg font-body opacity-90">{currentStory.reference}</p>
          </div>
        </div>
        
        {/* Key Verse */}
        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Star className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-heading mb-1 opacity-90">Key Verse</h3>
              <p className="text-base font-body italic mb-1">
                "{currentStory.keyVerse}"
              </p>
              <p className="text-xs font-body opacity-75">
                — {currentStory.keyVerseReference}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image and Reading Content Side by Side */}
      <PremiumContentOverlay>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Story Image - Left Side */}
          {currentStory.imageUrl && (
            <div className="lg:w-1/3 flex-shrink-0">
              <img
                src={currentStory.imageUrl}
                alt={currentStory.title}
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  // Hide image if it fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Story Content - Right Side */}
          <div className="flex-1">
        <div className="card">
          {/* Reading Mode Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setReadingMode('simple')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-heading text-lg transition-all ${
                readingMode === 'simple'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-background-dark text-text hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-6 h-6" />
              I Can Read
            </button>
            <button
              onClick={() => setReadingMode('full')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-heading text-lg transition-all ${
                readingMode === 'full'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-background-dark text-text hover:bg-gray-200'
              }`}
            >
              <Users className="w-6 h-6" />
              Read to Me
            </button>
          </div>

          {/* Story Content */}
          <div className={!currentUser ? 'blur-sm' : ''}>
            {readingMode === 'simple' ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-7 h-7 text-primary" />
                  <h3 className="text-2xl font-heading text-primary">For Young Readers</h3>
                </div>
                <p className="text-2xl font-body text-text leading-relaxed">
                  {currentStory.simpleSummary}
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-7 h-7 text-primary" />
                  <h3 className="text-2xl font-heading text-primary">The Full Story</h3>
                </div>
                <div className="prose max-w-none">
                  {currentStory.fullStory.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-lg font-body text-text leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

          </div>
        </div>

        {/* Discussion Questions - Full Width */}
        <div className="card">
          <div className={!currentUser ? 'blur-sm' : ''}>
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-heading text-primary">Talk About It</h3>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-gray-200">
              {currentStory.talkAboutIt.map((question, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg">{index + 1}.</span>
                  <p className="text-lg font-body text-text flex-1">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PremiumContentOverlay>

      {/* About Section */}
      <div className="card bg-background-dark">
        <h3 className="text-lg font-heading text-primary mb-3">
          About the Children's Story Bible
        </h3>
        <p className="text-sm text-text-light font-body mb-3">
          The Tune My Heart Children's Story Bible contains 53 stories that follow the great narrative 
          of Scripture from Genesis to Revelation. Each story is designed to help families worship 
          together, with simple summaries for beginning readers and full narratives for parents to read aloud.
        </p>
        <p className="text-sm text-text-light font-body">
          Written by Scott Aniol • Published by G3 Press • Copyright © 2025
        </p>
      </div>
    </div>
  );
};

export default ChildrensBible;
