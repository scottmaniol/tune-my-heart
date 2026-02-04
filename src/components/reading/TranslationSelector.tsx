import { Translation } from '../../types/curriculum';
import { useUserPreferences } from '../../contexts/UserPreferencesContext';

const TRANSLATIONS: { value: Translation; label: string }[] = [
  { value: 'ESV', label: 'ESV - English Standard Version' },
  { value: 'KJV', label: 'KJV - King James Version' },
  { value: 'NKJV', label: 'NKJV - New King James Version' },
  { value: 'NASB', label: 'NASB - New American Standard Bible' },
  { value: 'LSB', label: 'LSB - Legacy Standard Bible' },
];

const TranslationSelector = () => {
  const { preferences, updatePreferences } = useUserPreferences();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTranslation = e.target.value as Translation;
    await updatePreferences({ bibleTranslation: newTranslation });
  };

  return (
    <div className="flex items-center space-x-3">
      <label htmlFor="translation" className="text-sm font-body text-text-light whitespace-nowrap">
        Translation:
      </label>
      <select
        id="translation"
        value={preferences?.bibleTranslation || 'ESV'}
        onChange={handleChange}
        className="input-field py-2 text-sm"
      >
        {TRANSLATIONS.map((trans) => (
          <option key={trans.value} value={trans.value}>
            {trans.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TranslationSelector;
