/**
 * 260-Day Whole Bible Reading Schedule
 * 52 weeks × 5 days per week
 * Based on Tune My Heart curriculum by Scott Aniol
 */

import { DailyReading } from './readingSchedule';

export const wholeBibleSchedule: DailyReading[] = [
  // Week 1
  { week: 1, day: 1, reference: "Gen 1-2", title: "Creation" },
  { week: 1, day: 2, reference: "Gen 3-4", title: "Fall & Cain" },
  { week: 1, day: 3, reference: "Gen 5-7", title: "Noah" },
  { week: 1, day: 4, reference: "Gen 8-11", title: "Flood & Babel" },
  { week: 1, day: 5, reference: "Gen 12-15", title: "Abraham's Call" },

  // Week 2
  { week: 2, day: 1, reference: "Gen 16-18", title: "Hagar & Sodom" },
  { week: 2, day: 2, reference: "Gen 19-21", title: "Lot & Isaac" },
  { week: 2, day: 3, reference: "Gen 22-24", title: "Abraham Tested" },
  { week: 2, day: 4, reference: "Gen 25-26", title: "Isaac & Esau" },
  { week: 2, day: 5, reference: "Gen 27-29", title: "Jacob & Leah" },

  // Week 3
  { week: 3, day: 1, reference: "Gen 30-31", title: "Jacob's Flocks" },
  { week: 3, day: 2, reference: "Gen 32-34", title: "Wrestling God" },
  { week: 3, day: 3, reference: "Gen 35-37", title: "Joseph's Dreams" },
  { week: 3, day: 4, reference: "Gen 38-40", title: "Joseph in Prison" },
  { week: 3, day: 5, reference: "Gen 41-42", title: "Pharaoh's Dream" },

  // Week 4
  { week: 4, day: 1, reference: "Gen 43-45", title: "Joseph Revealed" },
  { week: 4, day: 2, reference: "Gen 46-48", title: "Jacob in Egypt" },
  { week: 4, day: 3, reference: "Gen 49-50", title: "Jacob's Blessing" },
  { week: 4, day: 4, reference: "Ex 1-3", title: "Moses Called" },
  { week: 4, day: 5, reference: "Ex 4-6", title: "Return to Egypt" },

  // Week 5
  { week: 5, day: 1, reference: "Ex 7-9", title: "First Plagues" },
  { week: 5, day: 2, reference: "Ex 10-12", title: "Passover" },
  { week: 5, day: 3, reference: "Ex 13-15", title: "Red Sea" },
  { week: 5, day: 4, reference: "Ex 16-18", title: "Manna & Jethro" },
  { week: 5, day: 5, reference: "Ex 19-21", title: "Ten Commandments" },

  // Week 6
  { week: 6, day: 1, reference: "Ex 22-24", title: "Laws & Covenant" },
  { week: 6, day: 2, reference: "Ex 25-27", title: "Tabernacle Plans" },
  { week: 6, day: 3, reference: "Ex 28-29", title: "Priestly Garments" },
  { week: 6, day: 4, reference: "Ex 30-32", title: "Golden Calf" },
  { week: 6, day: 5, reference: "Ex 33-35", title: "Moses' Face Shines" },

  // Week 7
  { week: 7, day: 1, reference: "Ex 36-38", title: "Building Tabernacle" },
  { week: 7, day: 2, reference: "Ex 39-40", title: "Glory Fills Tabernacle" },
  { week: 7, day: 3, reference: "Lev 1-4", title: "Offerings" },
  { week: 7, day: 4, reference: "Lev 5-7", title: "Guilt Offerings" },
  { week: 7, day: 5, reference: "Lev 8-10", title: "Priests Consecrated" },

  // Week 8
  { week: 8, day: 1, reference: "Lev 11-13", title: "Clean & Unclean" },
  { week: 8, day: 2, reference: "Lev 14-15", title: "Purification" },
  { week: 8, day: 3, reference: "Lev 16-18", title: "Day of Atonement" },
  { week: 8, day: 4, reference: "Lev 19-21", title: "Holiness Code" },
  { week: 8, day: 5, reference: "Lev 22-23", title: "Feasts" },

  // Week 9
  { week: 9, day: 1, reference: "Lev 24-25", title: "Sabbath Year" },
  { week: 9, day: 2, reference: "Lev 26-27", title: "Blessings & Curses" },
  { week: 9, day: 3, reference: "Num 1-2", title: "Census" },
  { week: 9, day: 4, reference: "Num 3-4", title: "Levites' Duties" },
  { week: 9, day: 5, reference: "Num 5-6", title: "Nazirite Vow" },

  // Week 10
  { week: 10, day: 1, reference: "Num 7-8", title: "Tabernacle Dedicated" },
  { week: 10, day: 2, reference: "Num 9-11", title: "Cloud & Fire" },
  { week: 10, day: 3, reference: "Num 12-14", title: "Spying Canaan" },
  { week: 10, day: 4, reference: "Num 15-17", title: "Korah's Rebellion" },
  { week: 10, day: 5, reference: "Num 18-20", title: "Aaron's Rod" },

  // Week 11
  { week: 11, day: 1, reference: "Num 21-22", title: "Bronze Serpent" },
  { week: 11, day: 2, reference: "Num 23-25", title: "Balaam" },
  { week: 11, day: 3, reference: "Num 26-27", title: "Second Census" },
  { week: 11, day: 4, reference: "Num 28-30", title: "Offerings & Vows" },
  { week: 11, day: 5, reference: "Num 31-32", title: "Dividing Land" },

  // Week 12
  { week: 12, day: 1, reference: "Num 33-34", title: "Journey Stages" },
  { week: 12, day: 2, reference: "Num 35-36", title: "Cities of Refuge" },
  { week: 12, day: 3, reference: "Deut 1-2", title: "Moses Recounts" },
  { week: 12, day: 4, reference: "Deut 3-4", title: "Obey the Lord" },
  { week: 12, day: 5, reference: "Deut 5-7", title: "Ten Commandments" },

  // Week 13
  { week: 13, day: 1, reference: "Deut 8-10", title: "Remember the Lord" },
  { week: 13, day: 2, reference: "Deut 11-13", title: "Blessings & Curses" },
  { week: 13, day: 3, reference: "Deut 14-16", title: "Feasts" },
  { week: 13, day: 4, reference: "Deut 17-20", title: "Laws for Kings" },
  { week: 13, day: 5, reference: "Deut 21-23", title: "Various Laws" },

  // Week 14
  { week: 14, day: 1, reference: "Deut 24-27", title: "Laws & Covenant" },
  { week: 14, day: 2, reference: "Deut 28-29", title: "Covenant Renewed" },
  { week: 14, day: 3, reference: "Deut 30-31", title: "Choose Life" },
  { week: 14, day: 4, reference: "Deut 32-34", title: "Moses' Death" },
  { week: 14, day: 5, reference: "Josh 1-3", title: "Crossing Jordan" },

  // Week 15
  { week: 15, day: 1, reference: "Josh 4-6", title: "Jericho Falls" },
  { week: 15, day: 2, reference: "Josh 7-9", title: "Achan's Sin" },
  { week: 15, day: 3, reference: "Josh 10-12", title: "Conquering Canaan" },
  { week: 15, day: 4, reference: "Josh 13-15", title: "Dividing Land" },
  { week: 15, day: 5, reference: "Josh 16-18", title: "Tribal Allotments" },

  // Week 16
  { week: 16, day: 1, reference: "Josh 19-21", title: "Cities Given" },
  { week: 16, day: 2, reference: "Josh 22-24", title: "Joshua's Farewell" },
  { week: 16, day: 3, reference: "Judg 1-2", title: "After Joshua" },
  { week: 16, day: 4, reference: "Judg 3-5", title: "Deborah" },
  { week: 16, day: 5, reference: "Judg 6-7", title: "Gideon" },

  // Week 17
  { week: 17, day: 1, reference: "Judg 8-9", title: "Abimelech" },
  { week: 17, day: 2, reference: "Judg 10-12", title: "Jephthah" },
  { week: 17, day: 3, reference: "Judg 13-15", title: "Samson" },
  { week: 17, day: 4, reference: "Judg 16-18", title: "Samson's Death" },
  { week: 17, day: 5, reference: "Judg 19-21", title: "Civil War" },

  // Week 18
  { week: 18, day: 1, reference: "Ruth 1-4", title: "Ruth & Boaz" },
  { week: 18, day: 2, reference: "1 Sam 1-3", title: "Samuel Born" },
  { week: 18, day: 3, reference: "1 Sam 4-8", title: "Ark Captured" },
  { week: 18, day: 4, reference: "1 Sam 9-12", title: "Saul Made King" },
  { week: 18, day: 5, reference: "1 Sam 13-14", title: "Saul's Disobedience" },

  // Week 19
  { week: 19, day: 1, reference: "1 Sam 15-17", title: "David & Goliath" },
  { week: 19, day: 2, reference: "1 Sam 18-20", title: "David & Jonathan" },
  { week: 19, day: 3, reference: "1 Sam 21-24", title: "David Flees Saul" },
  { week: 19, day: 4, reference: "1 Sam 25-27", title: "Abigail" },
  { week: 19, day: 5, reference: "1 Sam 28-31", title: "Saul's Death" },

  // Week 20
  { week: 20, day: 1, reference: "2 Sam 1-3", title: "David Made King" },
  { week: 20, day: 2, reference: "2 Sam 4-6", title: "Ark to Jerusalem" },
  { week: 20, day: 3, reference: "2 Sam 7-10", title: "Davidic Covenant" },
  { week: 20, day: 4, reference: "2 Sam 11-12", title: "David & Bathsheba" },
  { week: 20, day: 5, reference: "2 Sam 13-15", title: "Absalom's Rebellion" },

  // Week 21
  { week: 21, day: 1, reference: "2 Sam 16-18", title: "Absalom's Death" },
  { week: 21, day: 2, reference: "2 Sam 19-21", title: "David Returns" },
  { week: 21, day: 3, reference: "2 Sam 22-24", title: "David's Song" },
  { week: 21, day: 4, reference: "1 Kings 1-2", title: "Solomon's Reign" },
  { week: 21, day: 5, reference: "1 Kings 3-5", title: "Solomon's Wisdom" },

  // Week 22
  { week: 22, day: 1, reference: "1 Kings 6-7", title: "Building Temple" },
  { week: 22, day: 2, reference: "1 Kings 8-9", title: "Temple Dedicated" },
  { week: 22, day: 3, reference: "1 Kings 10-11", title: "Queen of Sheba" },
  { week: 22, day: 4, reference: "1 Kings 12-14", title: "Kingdom Divided" },
  { week: 22, day: 5, reference: "1 Kings 15-17", title: "Elijah" },

  // Week 23
  { week: 23, day: 1, reference: "1 Kings 18-19", title: "Elijah at Carmel" },
  { week: 23, day: 2, reference: "1 Kings 20-22", title: "Ahab's Wars" },
  { week: 23, day: 3, reference: "2 Kings 1-3", title: "Elisha" },
  { week: 23, day: 4, reference: "2 Kings 4-5", title: "Elisha's Miracles" },
  { week: 23, day: 5, reference: "2 Kings 6-8", title: "Siege of Samaria" },

  // Week 24
  { week: 24, day: 1, reference: "2 Kings 9-11", title: "Jehu's Reign" },
  { week: 24, day: 2, reference: "2 Kings 12-14", title: "Kings of Israel" },
  { week: 24, day: 3, reference: "2 Kings 15-17", title: "Fall of Israel" },
  { week: 24, day: 4, reference: "2 Kings 18-19", title: "Hezekiah" },
  { week: 24, day: 5, reference: "2 Kings 20-22", title: "Josiah's Reforms" },

  // Week 25
  { week: 25, day: 1, reference: "2 Kings 23-25", title: "Fall of Jerusalem" },
  { week: 25, day: 2, reference: "1 Chr 1-2", title: "Genealogies" },
  { week: 25, day: 3, reference: "1 Chr 3-5", title: "Descendants" },
  { week: 25, day: 4, reference: "1 Chr 6-7", title: "Levites" },
  { week: 25, day: 5, reference: "1 Chr 8-10", title: "Saul's Line" },

  // Week 26
  { week: 26, day: 1, reference: "1 Chr 11-12", title: "David's Mighty Men" },
  { week: 26, day: 2, reference: "1 Chr 13-16", title: "Ark Brought Home" },
  { week: 26, day: 3, reference: "1 Chr 17-19", title: "God's Covenant" },
  { week: 26, day: 4, reference: "1 Chr 20-23", title: "David's Census" },
  { week: 26, day: 5, reference: "1 Chr 24-26", title: "Divisions of Levites" },

  // Week 27
  { week: 27, day: 1, reference: "1 Chr 27-29", title: "Temple Plans" },
  { week: 27, day: 2, reference: "2 Chr 1-5", title: "Solomon's Temple" },
  { week: 27, day: 3, reference: "2 Chr 6-7", title: "Temple Dedicated" },
  { week: 27, day: 4, reference: "2 Chr 8-11", title: "Solomon's Legacy" },
  { week: 27, day: 5, reference: "2 Chr 12-16", title: "Rehoboam & Asa" },

  // Week 28
  { week: 28, day: 1, reference: "2 Chr 17-20", title: "Jehoshaphat" },
  { week: 28, day: 2, reference: "2 Chr 21-24", title: "Joash" },
  { week: 28, day: 3, reference: "2 Chr 25-27", title: "Uzziah" },
  { week: 28, day: 4, reference: "2 Chr 28-31", title: "Hezekiah's Reforms" },
  { week: 28, day: 5, reference: "2 Chr 32-34", title: "Josiah" },

  // Week 29
  { week: 29, day: 1, reference: "2 Chr 35-36", title: "Fall of Judah" },
  { week: 29, day: 2, reference: "Ezra 1-3", title: "Return from Exile" },
  { week: 29, day: 3, reference: "Ezra 4-6", title: "Rebuilding Temple" },
  { week: 29, day: 4, reference: "Ezra 7-10", title: "Ezra's Reforms" },
  { week: 29, day: 5, reference: "Neh 1-3", title: "Rebuilding Walls" },

  // Week 30
  { week: 30, day: 1, reference: "Neh 4-6", title: "Opposition" },
  { week: 30, day: 2, reference: "Neh 7-9", title: "Reading the Law" },
  { week: 30, day: 3, reference: "Neh 10-13", title: "Covenant Renewed" },
  { week: 30, day: 4, reference: "Esth 1-5", title: "Esther Made Queen" },
  { week: 30, day: 5, reference: "Esth 6-10", title: "Jews Delivered" },

  // Week 31
  { week: 31, day: 1, reference: "Job 1-5", title: "Job's Suffering" },
  { week: 31, day: 2, reference: "Job 6-10", title: "Job's Complaint" },
  { week: 31, day: 3, reference: "Job 11-15", title: "Friends Speak" },
  { week: 31, day: 4, reference: "Job 16-20", title: "Job Responds" },
  { week: 31, day: 5, reference: "Job 21-25", title: "Debate Continues" },

  // Week 32
  { week: 32, day: 1, reference: "Job 26-31", title: "Job's Defense" },
  { week: 32, day: 2, reference: "Job 32-37", title: "Elihu Speaks" },
  { week: 32, day: 3, reference: "Job 38-42", title: "God Answers Job" },
  { week: 32, day: 4, reference: "Ps 1-18", title: "Psalms of David" },
  { week: 32, day: 5, reference: "Ps 19-35", title: "Songs of Praise" },

  // Week 33
  { week: 33, day: 1, reference: "Ps 36-52", title: "Trusting God" },
  { week: 33, day: 2, reference: "Ps 53-70", title: "Cries for Help" },
  { week: 33, day: 3, reference: "Ps 71-88", title: "God's Faithfulness" },
  { week: 33, day: 4, reference: "Ps 89-106", title: "Worship & Praise" },
  { week: 33, day: 5, reference: "Ps 107-125", title: "Songs of Ascent" },

  // Week 34
  { week: 34, day: 1, reference: "Ps 126-145", title: "Hallelujah Psalms" },
  { week: 34, day: 2, reference: "Ps 146-150", title: "Praise the Lord" },
  { week: 34, day: 3, reference: "Prov 1-6", title: "Wisdom's Call" },
  { week: 34, day: 4, reference: "Prov 7-12", title: "Path of Wisdom" },
  { week: 34, day: 5, reference: "Prov 13-18", title: "Wise Sayings" },

  // Week 35
  { week: 35, day: 1, reference: "Prov 19-24", title: "Proverbs of Solomon" },
  { week: 35, day: 2, reference: "Prov 25-31", title: "Virtuous Woman" },
  { week: 35, day: 3, reference: "Eccl 1-6", title: "Meaningless?" },
  { week: 35, day: 4, reference: "Eccl 7-12", title: "Fear God" },
  { week: 35, day: 5, reference: "Song 1-8", title: "Song of Songs" },

  // Week 36
  { week: 36, day: 1, reference: "Isa 1-6", title: "Isaiah's Vision" },
  { week: 36, day: 2, reference: "Isa 7-12", title: "Immanuel" },
  { week: 36, day: 3, reference: "Isa 13-20", title: "Oracles Against Nations" },
  { week: 36, day: 4, reference: "Isa 21-27", title: "Judgment & Salvation" },
  { week: 36, day: 5, reference: "Isa 28-33", title: "Woe to Israel" },

  // Week 37
  { week: 37, day: 1, reference: "Isa 34-40", title: "Comfort My People" },
  { week: 37, day: 2, reference: "Isa 41-46", title: "Servant of the Lord" },
  { week: 37, day: 3, reference: "Isa 47-53", title: "Suffering Servant" },
  { week: 37, day: 4, reference: "Isa 54-60", title: "Zion Restored" },
  { week: 37, day: 5, reference: "Isa 61-66", title: "New Heavens & Earth" },

  // Week 38
  { week: 38, day: 1, reference: "Jer 1-6", title: "Jeremiah's Call" },
  { week: 38, day: 2, reference: "Jer 7-12", title: "False Religion" },
  { week: 38, day: 3, reference: "Jer 13-18", title: "Potter's House" },
  { week: 38, day: 4, reference: "Jer 19-24", title: "Figs & Captivity" },
  { week: 38, day: 5, reference: "Jer 25-30", title: "Judgments Coming" },

  // Week 39
  { week: 39, day: 1, reference: "Jer 31-36", title: "New Covenant" },
  { week: 39, day: 2, reference: "Jer 37-42", title: "Jerusalem Falls" },
  { week: 39, day: 3, reference: "Jer 43-48", title: "Oracles to Nations" },
  { week: 39, day: 4, reference: "Jer 49-52", title: "Fall of Babylon" },
  { week: 39, day: 5, reference: "Lam 1-5", title: "Lamentations" },

  // Week 40
  { week: 40, day: 1, reference: "Ezek 1-7", title: "Ezekiel's Vision" },
  { week: 40, day: 2, reference: "Ezek 8-14", title: "Idolatry Condemned" },
  { week: 40, day: 3, reference: "Ezek 15-20", title: "Rebellious Israel" },
  { week: 40, day: 4, reference: "Ezek 21-26", title: "Sword of Judgment" },
  { week: 40, day: 5, reference: "Ezek 27-32", title: "Lament for Tyre" },

  // Week 41
  { week: 41, day: 1, reference: "Ezek 33-38", title: "Watchman & Gog" },
  { week: 41, day: 2, reference: "Ezek 39-44", title: "New Temple" },
  { week: 41, day: 3, reference: "Ezek 45-48", title: "River from Temple" },
  { week: 41, day: 4, reference: "Dan 1-3", title: "Daniel & Friends" },
  { week: 41, day: 5, reference: "Dan 4-6", title: "Lions' Den" },

  // Week 42
  { week: 42, day: 1, reference: "Dan 7-9", title: "Visions & Prayers" },
  { week: 42, day: 2, reference: "Dan 10-12", title: "Final Vision" },
  { week: 42, day: 3, reference: "Hos 1-7", title: "Hosea & Gomer" },
  { week: 42, day: 4, reference: "Hos 8-14", title: "Return to the Lord" },
  { week: 42, day: 5, reference: "Joel 1-3", title: "Day of the Lord" },

  // Week 43
  { week: 43, day: 1, reference: "Amos 1-5", title: "Roaring Lion" },
  { week: 43, day: 2, reference: "Amos 6-9", title: "Plumb Line" },
  { week: 43, day: 3, reference: "Obad 1; Jon 1-4", title: "Jonah" },
  { week: 43, day: 4, reference: "Mic 1-7", title: "Micah" },
  { week: 43, day: 5, reference: "Nah 1-3; Hab 1-3", title: "Nahum & Habakkuk" },

  // Week 44
  { week: 44, day: 1, reference: "Zeph 1-3; Hag 1-2", title: "Zephaniah & Haggai" },
  { week: 44, day: 2, reference: "Zech 1-7", title: "Zechariah's Visions" },
  { week: 44, day: 3, reference: "Zech 8-14", title: "Coming King" },
  { week: 44, day: 4, reference: "Mal 1-4", title: "Malachi" },
  { week: 44, day: 5, reference: "Matt 1-4", title: "Birth of Jesus" },

  // Week 45
  { week: 45, day: 1, reference: "Matt 5-7", title: "Sermon on Mount" },
  { week: 45, day: 2, reference: "Matt 8-10", title: "Miracles & Mission" },
  { week: 45, day: 3, reference: "Matt 11-13", title: "Parables" },
  { week: 45, day: 4, reference: "Matt 14-17", title: "Feeding 5000" },
  { week: 45, day: 5, reference: "Matt 18-20", title: "Greatest in Kingdom" },

  // Week 46
  { week: 46, day: 1, reference: "Matt 21-23", title: "Triumphal Entry" },
  { week: 46, day: 2, reference: "Matt 24-26", title: "Last Supper" },
  { week: 46, day: 3, reference: "Matt 27-28", title: "Resurrection" },
  { week: 46, day: 4, reference: "Mark 1-4", title: "Kingdom of God" },
  { week: 46, day: 5, reference: "Mark 5-8", title: "Who Is Jesus?" },

  // Week 47
  { week: 47, day: 1, reference: "Mark 9-12", title: "Teachings of Jesus" },
  { week: 47, day: 2, reference: "Mark 13-16", title: "Empty Tomb" },
  { week: 47, day: 3, reference: "Luke 1-3", title: "Birth & Baptism" },
  { week: 47, day: 4, reference: "Luke 4-6", title: "Sermon on Plain" },
  { week: 47, day: 5, reference: "Luke 7-9", title: "Faith of Centurion" },

  // Week 48
  { week: 48, day: 1, reference: "Luke 10-12", title: "Good Samaritan" },
  { week: 48, day: 2, reference: "Luke 13-15", title: "Lost & Found" },
  { week: 48, day: 3, reference: "Luke 16-18", title: "Rich Man & Lazarus" },
  { week: 48, day: 4, reference: "Luke 19-21", title: "Zacchaeus" },
  { week: 48, day: 5, reference: "Luke 22-24", title: "Road to Emmaus" },

  // Week 49
  { week: 49, day: 1, reference: "John 1-3", title: "Word Made Flesh" },
  { week: 49, day: 2, reference: "John 4-6", title: "Bread of Life" },
  { week: 49, day: 3, reference: "John 7-9", title: "Light of World" },
  { week: 49, day: 4, reference: "John 10-12", title: "Good Shepherd" },
  { week: 49, day: 5, reference: "John 13-15", title: "I Am the Vine" },

  // Week 50
  { week: 50, day: 1, reference: "John 16-18", title: "High Priestly Prayer" },
  { week: 50, day: 2, reference: "John 19-21", title: "It Is Finished" },
  { week: 50, day: 3, reference: "Acts 1-3", title: "Pentecost" },
  { week: 50, day: 4, reference: "Acts 4-6", title: "Church Grows" },
  { week: 50, day: 5, reference: "Acts 7-9", title: "Saul's Conversion" },

  // Week 51
  { week: 51, day: 1, reference: "Acts 10-12", title: "Peter & Cornelius" },
  { week: 51, day: 2, reference: "Acts 13-15", title: "First Journey" },
  { week: 51, day: 3, reference: "Acts 16-18", title: "To Europe" },
  { week: 51, day: 4, reference: "Acts 19-21", title: "Ephesus to Jerusalem" },
  { week: 51, day: 5, reference: "Acts 22-24", title: "Paul's Defense" },

  // Week 52
  { week: 52, day: 1, reference: "Acts 25-28", title: "To Rome" },
  { week: 52, day: 2, reference: "Rom 1-8", title: "Justified by Faith" },
  { week: 52, day: 3, reference: "Rom 9-16", title: "Love One Another" },
  { week: 52, day: 4, reference: "1 Cor 1-9", title: "Church Issues" },
  { week: 52, day: 5, reference: "1 Cor 10-16", title: "Love Never Fails" },
];

export function getWholeBibleReading(week: number, day: number): DailyReading | null {
  return wholeBibleSchedule.find(r => r.week === week && r.day === day) || null;
}
