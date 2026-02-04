import { useState, useRef } from 'react';
import { useCurrentWeek } from '../hooks/useCurrentWeek';
import { useAuth } from '../contexts/AuthContext';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { getHymn, getAllHymns } from '../data/hymnsData';
import PremiumContentOverlay from '../components/auth/PremiumContentOverlay';
import { hasPremiumAccess } from '../types/user';
import { Music, FileText, Headphones, Mic, Download } from 'lucide-react';

const Hymnal = () => {
  const { week: currentWeek } = useCurrentWeek();
  const { currentUser } = useAuth();
  const { selectedWeek, setSelectedWeek } = useUserPreferences();
  const [showAllHymns, setShowAllHymns] = useState(false);
  const pianoAudioRef = useRef<HTMLAudioElement>(null);
  const vocalAudioRef = useRef<HTMLAudioElement>(null);

  const hymn = getHymn(selectedWeek);
  const allHymns = getAllHymns();

  if (!hymn) {
    return (
      <div className="card">
        <p className="text-text-light font-body">Hymn not found for this week.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-heading text-primary mb-2 flex items-center gap-3">
              <div className="bg-accent text-white rounded-lg p-2">
                <Music className="w-6 h-6" />
              </div>
              Hymn of the Week
            </h1>
            <p className="text-text-light font-body">
              Week {selectedWeek} of 52 {selectedWeek === currentWeek && '• Current Week'}
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => setShowAllHymns(!showAllHymns)}
              className="btn-secondary text-sm"
            >
              {showAllHymns ? 'Hide List' : 'All Hymns'}
            </button>
          </div>
        </div>
      </div>

      {/* All Hymns List */}
      {showAllHymns && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-primary">All 52 Hymns</h2>
            <button
              onClick={() => setShowAllHymns(false)}
              className="text-text-light hover:text-text"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {allHymns.map((h) => (
              <button
                key={h.week}
                onClick={() => {
                  setSelectedWeek(h.week);
                  setShowAllHymns(false);
                }}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedWeek === h.week
                    ? 'bg-primary text-white'
                    : 'bg-background-dark hover:bg-gray-200'
                }`}
              >
                <span className="font-body font-semibold">Week {h.week}:</span>{' '}
                <span className="font-body">{h.title}</span>
                {h.author && (
                  <span className="text-sm opacity-75"> • {h.author}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hymn Title and Lyrics */}
      <div className="card">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-heading text-primary mb-3">
            {hymn.title}
          </h2>
          
          {hymn.author && (
            <p className="text-text-light font-body mb-1">
              <span className="font-semibold">Author:</span> {hymn.author}
            </p>
          )}
          
          {hymn.tuneNote && (
            <p className="text-text-light font-body italic">
              Tune: {hymn.tuneNote}
            </p>
          )}
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-primary" size={24} />
            <h3 className="text-xl font-heading text-primary">Lyrics</h3>
          </div>
          
          {hymn.lyrics ? (
            <div className="bg-gray-50 p-6 rounded-lg">
              <pre className="font-body text-text whitespace-pre-wrap leading-relaxed">
                {hymn.lyrics}
              </pre>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-sm text-yellow-800 font-body flex items-center gap-2">
                <FileText className="w-4 h-4 flex-shrink-0" />
                Lyrics will be added soon. You can find this hymn in most traditional hymnals.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Premium Content - Single Overlay for all premium sections */}
      <PremiumContentOverlay>
        <div className="space-y-6">
          {/* Sheet Music PDF Section */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-primary" size={24} />
              <h3 className="text-xl font-heading text-primary">Sheet Music</h3>
            </div>
            
            <div className={!currentUser ? "blur-sm" : ""}>
              {hymn.pdfUrl ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <iframe
                      src={hymn.pdfUrl}
                      className="w-full h-96 border border-gray-300 rounded"
                      title={`${hymn.title} Sheet Music`}
                    />
                  </div>
                  <a
                    href={hymn.pdfUrl}
                    download
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-full md:w-auto"
                  >
                    <Download size={20} />
                    Download PDF
                  </a>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 font-body flex items-center gap-2">
                    <Music className="w-4 h-4 flex-shrink-0" />
                    Sheet music PDF will be available soon. Check back later.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Piano Accompaniment Section */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Headphones className="text-primary" size={24} />
              <h3 className="text-xl font-heading text-primary">Piano Accompaniment</h3>
            </div>
            
            <div className={!hasPremiumAccess(currentUser) ? "blur-sm" : ""}>
              {hymn.pianoAudioUrl ? (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <audio
                    ref={pianoAudioRef}
                    controls
                    className="w-full"
                    src={hymn.pianoAudioUrl}
                  >
                    Your browser does not support the audio element.
                  </audio>
                  <p className="text-sm text-text-light font-body mt-2">
                    Practice singing along with piano accompaniment
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 font-body flex items-center gap-2">
                    <Headphones className="w-4 h-4 flex-shrink-0" />
                    Piano accompaniment audio will be available soon.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Vocal Performance Section */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Mic className="text-primary" size={24} />
              <h3 className="text-xl font-heading text-primary">Vocal Performance</h3>
            </div>
            
            <div className={!hasPremiumAccess(currentUser) ? "blur-sm" : ""}>
              {hymn.vocalAudioUrl ? (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <audio
                    ref={vocalAudioRef}
                    controls
                    className="w-full"
                    src={hymn.vocalAudioUrl}
                  >
                    Your browser does not support the audio element.
                  </audio>
                  <p className="text-sm text-text-light font-body mt-2">
                    Listen to a full vocal performance to learn the melody
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 font-body flex items-center gap-2">
                    <Mic className="w-4 h-4 flex-shrink-0" />
                    Vocal performance audio will be available soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </PremiumContentOverlay>

    </div>
  );
};

export default Hymnal;
