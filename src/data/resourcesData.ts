export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'book' | 'pdf' | 'csv' | 'link';
  price?: string;
  coverImage?: string;
  link: string;
  category: 'print' | 'download' | 'web';
  order?: number;
}

export const resources: Resource[] = [
  // Introduction Book
  {
    id: 'let-little-children-come',
    title: 'Let the Little Children Come: Family Worship on Sunday (and the Other Six Days Too)',
    description: 'Why is family worship important? Read Scott Aniol\'s explanation in this book. This book contains biblical rationale and practical tips and resources.',
    type: 'book',
    coverImage: 'https://g3min.org/wp-content/uploads/2024/11/Screenshot-2024-11-18-at-10.27.51%E2%80%AFAM.png',
    link: 'https://g3min.org/tune-my-heart/',
    category: 'print',
  },

  // Print Resources
  {
    id: 'devotional-guide',
    title: 'Tune My Heart: Bible Narratives Devotional Guide for Families or Individuals',
    description: 'The goal of this Bible narratives reading guide is to provide a resource that focuses on the narratives and poetry of Scripture. Scott Aniol has created a 52-week Bible reading plan that focuses only on the narratives of Scripture, along with all of the psalms and proverbs. Further, the plan schedules readings for five days per week, giving readers the weekend to catch up if they fall behind. This guide includes notes, summaries, and questions for personal reflection or group discussion for each day\'s readings. It also includes a 52-week catechism and a passage of Scripture to memorize and a hymn to sing each week. This resource could be used in a number of ways for personal Bible study, family worship, or group discussion.',
    type: 'book',
    price: '$23.00',
    coverImage: 'https://g3min.org/wp-content/uploads/2024/11/tmh-cov-final-scaled.jpg',
    link: 'https://g3min.org/product/tune-my-heart-bible-narratives-devotional-guide-for-families-or-individuals/',
    category: 'print',
  },
  {
    id: 'worship-guide',
    title: 'Tune My Heart Worship Guide',
    description: 'The Tune My Heart Worship Guide includes the 5 Day Bible Narratives Reading Plan, 52-Weekly Catechism, bible memory, and weekly hymns that correspond with the larger Devotional Guide. It does not include the study guide notes.',
    type: 'book',
    price: '$13.00',
    coverImage: 'https://g3min.org/wp-content/uploads/2024/11/Screenshot-2024-11-18-at-10.29.03%E2%80%AFAM.png',
    link: 'https://g3min.org/product/tune-my-heart-worship-guide/',
    category: 'print',
  },
  {
    id: 'personal-journal',
    title: 'Tune My Heart: Bible Narratives Personal Devotional Guide',
    description: 'This resource is intended for use by each member of a family during family worship or for personal worship. This spiral bound volume contains the reading plan, catechism, and Bible memory, along with the three reflection questions for each day\'s reading and room to write responses. This is ideal for personal devotion, or for children as they prepare answers for later family discussion.',
    type: 'book',
    price: '$22.00',
    coverImage: 'https://g3min.org/wp-content/uploads/2024/11/Screenshot-2024-11-18-at-10.29.18%E2%80%AFAM.png',
    link: 'https://g3min.org/product/tune-my-heart-bible-narratives-personal-devotional-guide/',
    category: 'print',
  },
  {
    id: 'psalms-hymns',
    title: 'Psalms and Hymns to the Living God',
    description: 'A comprehensive hymnal with psalms and hymns for worship.',
    type: 'book',
    coverImage: 'https://g3min.org/wp-content/uploads/2024/11/Psalms-and-Hymns-to-the-Living-God-Cover-scaled.jpg',
    link: 'https://g3min.org/product/psalms-and-hymns-to-the-living-god/',
    category: 'print',
  },

  // Free Downloads
  {
    id: '5-day-narrative-plan',
    title: '5 Day Bible Narrative Reading Plan',
    description: 'A 52-week Bible reading plan focusing on the narratives of Scripture, along with all the psalms and proverbs. Read only 5 days per week, giving you the weekend to catch up.',
    type: 'pdf',
    coverImage: '',
    link: 'https://g3min.org/wp-content/uploads/2024/11/5-Day-Bible-Narratives-Reading-Plan.pdf',
    category: 'download',
  },
  {
    id: '52-week-catechism',
    title: '52 Week Religious Affections Catechism',
    description: 'A year-long catechism covering key theological concepts and religious affections.',
    type: 'pdf',
    coverImage: '',
    link: 'https://g3min.org/wp-content/uploads/2024/11/52-Week-Religious-Affections-Catechism.pdf',
    category: 'download',
  },
  {
    id: 'journal-pdf',
    title: 'Personal Journal',
    description: 'A downloadable journal template for personal reflection and family worship.',
    type: 'pdf',
    coverImage: '',
    link: 'https://g3min.org/wp-content/uploads/2024/11/Personal-Journal.pdf',
    category: 'download',
  },
  {
    id: '2025-narrative-csv',
    title: '2025 Reading Plan CSV',
    description: 'Import the 5 Day Bible Narrative Reading Plan into your calendar or scheduling app.',
    type: 'csv',
    coverImage: '',
    link: 'https://g3min.org/wp-content/uploads/2024/11/2025-Reading-Plan.csv',
    category: 'download',
  },
  {
    id: '5-day-whole-bible',
    title: '5 Day Whole Bible Reading Plan',
    description: 'A 5 day whole Bible reading plan that parallels the Bible Narrative reading plan. The plan covers the whole Bible chronologically, with Psalms and Proverbs sprinkled in.',
    type: 'pdf',
    coverImage: '',
    link: 'https://g3min.org/wp-content/uploads/2024/11/5-Day-Whole-Bible-Reading-Plan.pdf',
    category: 'download',
  },
  {
    id: '2025-whole-bible-csv',
    title: '2025 Whole Bible Reading Plan CSV',
    description: 'Import the 5 Day Whole Bible Reading Plan into your calendar or scheduling app.',
    type: 'csv',
    coverImage: '',
    link: 'https://g3min.org/wp-content/uploads/2024/11/2025-Whole-Bible-Reading-Plan.csv',
    category: 'download',
  },

  // Web Links
  {
    id: 'google-calendar',
    title: 'Reading Plan on Google Calendar',
    description: 'Subscribe to the reading plan calendar in your Google account to receive daily reminders and notifications.',
    type: 'link',
    coverImage: '',
    link: 'https://calendar.google.com/calendar/u/0?cid=ZmQzZjdmZDM3YzA1YzgzNzBmMjI1YTc2ZWU1ZTFhMzM5YWU5MzNlNjQ3ZGIzNjhhMTc5NGZlNWU4ZmUyMGVmYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t',
    category: 'web',
  },
];
