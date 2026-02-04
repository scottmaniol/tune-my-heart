/**
 * Curriculum Service
 * 
 * Fetches curriculum data from Firestore with caching
 */

import { collection, doc, getDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { DailyReading } from '../types/curriculum';

// In-memory cache
const cache = new Map<string, DailyReading>();
let allDataCached = false;

/**
 * Get a single day's curriculum from Firestore
 */
export async function getCurriculumDay(week: number, day: number): Promise<DailyReading | null> {
  const cacheKey = `week${week}-day${day}`;
  
  // Check cache first
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  try {
    const docRef = doc(db, 'curriculum', cacheKey);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as DailyReading;
      cache.set(cacheKey, data);
      return data;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching curriculum for week ${week}, day ${day}:`, error);
    return null;
  }
}

/**
 * Prefetch all curriculum data (optional optimization)
 */
export async function prefetchAllCurriculum(): Promise<void> {
  if (allDataCached) {
    return; // Already loaded
  }

  try {
    if (import.meta.env.DEV) {
      console.log('Prefetching all curriculum data...');
    }
    const q = query(collection(db, 'curriculum'), orderBy('week'), orderBy('day'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as DailyReading;
      const cacheKey = `week${data.week}-day${data.day}`;
      cache.set(cacheKey, data);
    });

    allDataCached = true;
    if (import.meta.env.DEV) {
      console.log(`Cached ${cache.size} curriculum items`);
    }
  } catch (error) {
    console.error('Error prefetching curriculum:', error);
  }
}

/**
 * Get all readings for a specific week
 */
export async function getCurriculumWeek(week: number): Promise<DailyReading[]> {
  const readings: DailyReading[] = [];

  for (let day = 1; day <= 5; day++) {
    const reading = await getCurriculumDay(week, day);
    if (reading) {
      readings.push(reading);
    }
  }

  return readings;
}

/**
 * Clear the cache (useful for development/testing)
 */
export function clearCurriculumCache(): void {
  cache.clear();
  allDataCached = false;
  if (import.meta.env.DEV) {
    console.log('Curriculum cache cleared');
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: cache.size,
    allCached: allDataCached
  };
}
