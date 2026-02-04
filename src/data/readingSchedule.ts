/**
 * 260-Day Bible Narratives Reading Schedule
 * 52 weeks × 5 days per week
 * Based on Tune My Heart curriculum by Scott Aniol
 */

export interface DailyReading {
  week: number;
  day: number;
  reference: string;
  title: string;
  summary?: string;
  studyNotes?: string;
  devotional?: string;
  reflectionQuestions?: string[];
}

export const readingSchedule: DailyReading[] = [
  // Week 1
  { 
    week: 1, 
    day: 1, 
    reference: "Gen 1:1–2:3", 
    title: "Creation",
    summary: "Genesis 1 establishes God as the source, sustainer, and ultimate end of all things. As creator of all, God is King and has the right to do whatever he pleases with what he created for his own glory. Everything God made was perfect and good, but God created humankind as the pinnacle of all that he made, and thus as ruler of all under his supreme authority. Thus we are blessed with the privilege of cultivating and enjoying what God created, serving him in the capacity for which he created us, to his honor and glory.",
    studyNotes: `Chapter 1, Verse 1. This verse describes part of what God did on the first day; he created the heavens and earth on the first day, but they were yet formless (v. 2).

Verse 3. Light. God created light also on the first day, even though he didn't create the physical sources of light until the fourth day. God was and is the eternal source of light.

Verse 4. Good. The word "good" can mean several different things. Here it does not likely refer to moral goodness but rather to ability to serve a particular function, or it could also mean beauty.

Verse 5. Day. In Hebrew, "day" with a number (as in "first day," "second day," etc.) always refers to a literal 24-hour period. God created the world in a literal six-day week.

Verses 11, 12, 21. Kind. God created all plants and animal species, showing that the theory that various creatures evolved across species lines in incorrect.

Verses 26, 27. Image. Adam and Eve were the only creatures God made in his own image, distinguishing them from all other creatures. The image of God includes self-consciousness, creativity, morality, and other communicable attributes of God that animals do not share with humans. Dominion. Since humans were the pinnacle of all of God's creation, he set them as rulers of the rest of creation. Male and female. Man and woman are equal in essence and value but distinct from and complementary to one another physically and relationally.

Verse 28. Be fruitful and multiply. God blessed Adam and Eve by giving them the ability to fill the earth with offspring, to cultivate and enjoy what he had made, and to rule over it all.

Chapter 2, Verse 2. Rested. God had no need of physical rest, yet he ceased from his creative work on the seventh day and established a seven-day cycle for human work, including the necessity for one day of rest each week.`,
    reflectionQuestions: [
      "Why do you think God created the world in the order that he did?",
      "What is our responsibility toward God as his creation?",
      "What does it mean to have dominion over the earth, to subdue the earth, and to be fruitful?"
    ]
  },
  { 
    week: 1, 
    day: 2, 
    reference: "Gen 2:4–24", 
    title: "Adam and Eve",
    summary: "God created a perfect, holy sanctuary in which he placed Adam, his priest whose purpose was to commune with God and obey his commands. He created Eve to complete Adam and assist him with his duties. These purposes and roles never changed. The purpose of all people is to worship God according to the commands that he has given in his sanctuary where he dwells.",
    studyNotes: `Chapter 2, Verse 7. Formed. This is a more detailed, specific account of God's creation of Adam and Even on day six of creation. Unlike the other elements of creation, which God created out of nothing, he formed Adam from the earth, and thus when we die, we return to dust. However, he breathed into Adam the breath of life, and thus our souls live forever.

Verse 8. Eden. The location of the garden of Eden is not known, but it was likely in the Mesopotamian Valley, east of where Moses wrote this account.

Verse 9. Tree of life. This tree had a special ability to sustain eternal life. Tree of knowledge. This tree, forbidden for Adam and Eve to eat, was put in the garden as a test of whether they would choose good or evil.

Verse 15. Work it and keep it. This describes Adam's purpose. These two terms used together in the Old Testament most often refer to the duties of the Levitical priests in the Tabernacle/Temple. Adam's purpose was to serve as God's priest, communing with God in his holy sanctuary.

Verse 17. Die. The result of disobedience to God's command was separation, first spiritually, and eventually physically.

Verse 18. Not good. Adam was incomplete before the end of the sixth day until God created Eve, who as created from Adam and also in God's image was equal with him in essence and worth, was distinct physically from Adam and was a suitable helper for him.

Verse 24. One flesh. The fact that Eve was created from out of Adam establishes the basis for marital union.`,
    reflectionQuestions: [
      "Why do you think God created Adam from the dust of the earth instead of out of nothing?",
      "Why do you think God created Eve out of Adam?",
      "What does it mean for us today that Adam and Eve were created to worship and obey God?"
    ]
  },
  { 
    week: 1, 
    day: 3, 
    reference: "Gen 2:25–3:24", 
    title: "Fall",
    summary: "God created Adam and Eve in order to commune with them in his sanctuary, but their disobedience broke that communion. Thus God cursed them, their posterity, and all of creation. But God did not leave us in our sin; he made a promise that he would one day crush the head of the serpent, representing sin, through an offspring of Eve—his only Son. He foreshadowed how this would take place when he killed an animal and covered their guilt with its skin. Sin breaks communion with God, but through the substitutionary atonement of the Son of God, restored fellowship is possible!",
    studyNotes: `Chapter 2, Verse 25. This verse describes the state of untested, innocent holiness in which Adam and Eve were created.

Chapter 3, Verse 1. Serpent. John identifies the serpent as Satan (Rev 12:9, 20:2). He tempts Eve to disobey God by questioning God's motives and authority, which is always the essence of temptation.

Verse 4. Her husband. While Eve was deceived into sinning, Adam ate of the fruit willfully.

Verse 7. The innocence that characterized Adam and Eve when they were created is now replaced by guilt and shame.

Verse 8. Walking. God's desire was to commune with his people in his sanctuary, but sin prevents free communion with God.

Verse 9. Where are you? This does not mean God didn't know where they were; it was simply a way to force them to explain why they were hiding from him and acknowledge their guilt.

Verse 15. This is the first proclamation of God's plan to send his Son to redeem mankind from their sin.

Verse 17. Cursed. Because of Adam's sin, all of mankind and all of creation fell under God's just curse.

Verse 21. Clothed. This is a foreshadowing of the atonement ("covering") for sin through the sacrificial death of a substitute that is necessary to restore broken communion with God.`,
    reflectionQuestions: [
      "Do you notice any similarities between Satan's temptation of Eve and his later temptation of Jesus in the wilderness (Matt 4:1–11)?",
      "What consequences do we still experience today as a result of Adam's sin?",
      "How did God fulfill his promise made in Genesis 3:15?"
    ]
  },
  { 
    week: 1, 
    day: 4, 
    reference: "Gen 4:1–16; Prov 1", 
    title: "Cain and Abel",
    summary: "Knowledge of God alone is not sufficient for wise living that pleases him. Cain knew God and even spoke with him, but his self-interest and pride prevented him from obeying God and instead led him into horrendous sin. On the other hand, it is a proper fear of God that will lead us, like Abel, to reverence God and obey his clear instructions out of a true desire for fellowship with him. This is true wisdom.",
    studyNotes: `Genesis 4, Verse 4. Although the account here does not explicitly explain why God accepted Abel's offering and not Cain's, the New Testament seems to indicate that both inward heart motivation (Abel was "righteous," while Cain was "evil") as well as the sacrifices themselves (Abel's sacrifice was "more excellent" than Cain's) are in view (see John 3:12, Heb 11:4, and Jude 11). God cares about both the heart of the worshiper and that the worshiper presents what is excellent in obedience to God's clear commands.

Verse 14. Whoever. Eve must have birthed many children and enough time must have passed for the population of the earth to have increased considerably by this point.

Verse 15. Mark. While not clear what this mark was exactly, it must have been some sort of visible sign and warning that no one was to harm Cain in any way. This was an act of mercy by God in spite of Cain's sin.

Proverbs 1, Verse 1. Proverbs are short statements of wisdom. They are not necessary legal guarantees; rather, they are general principles that typically ring true.

Verse 2. Wisdom. Wisdom is not simply intellectual knowledge, but rather the ability to skillfully apply what one knows practically in life.

Verse 7. Fear. A proper imagination of God and reverence toward him precedes a right understanding of him. It is not enough to simply know who God is; a wise person has the appropriate heart affections toward him. Fool. A fool in Scripture is an unbeliever.`,
    reflectionQuestions: [
      "What clear instructions about worship has God given us in Scripture that should regulate how we approach him?",
      "Why is knowledge of God alone insufficient for a life pleasing to God?",
      "How can we resist temptation to sin, either from within our hearts or from others?"
    ]
  },
  { 
    week: 1, 
    day: 5, 
    reference: "Gen 6:1–8:19", 
    title: "Noah and the Flood",
    summary: "Sin deserves judgement. But God, who is rich in mercy, chooses to save those who trust in his promises and come to him in faith through the means that he has provided.",
    studyNotes: `Chapter 6, Verse 2. Sons of God. To whom this description refers is not clear; some believe it refers to angels, others think that it describes powerful human kings. Regardless, the point of these verses is to describe the increasing corruption on earth that leads to judgment.

Verse 4. Nephilim. The meaning of this term is also uncertain. It could refer to fallen angels or mighty, violent giants. Again, however, the primary emphasis is to describe the violence and injustice that characterized mankind at the time.

Verse 6. Regretted. This term describes the deep sorrow of God in response to the sinfulness of his creatures, not that it surprised him in any way.

Verse 19. Two of every sort. The ark had more than enough space to house two of each species of animal on earth, even by generous estimates.

Chapter 7, Verse 11. The water that covered the earth came from three sources: the "fountains of the great deep," the water canopy encircling the earth (the "windows of the heavens"; see 1:7), and the rain that fell over a period of forty days.`,
    reflectionQuestions: [
      "What is the main lesson from the story of Noah and the flood?",
      "What does sin deserve?",
      "What is necessary to be rescued from judgment?"
    ]
  },

  // Week 2
  { 
    week: 2, 
    day: 1, 
    reference: "Gen 8:20–9:29; 11:1–9", 
    title: "God Establishes Human Government",
    summary: "God intended human government to be the means through which he would rule the common kingdom of the world. God intended human government to enforce his moral laws, protect the innocent, and punish evil. However, although human government was created by God, it regularly seeks to establish humanity as autonomous and self-sufficient. Thus God divided the people through confusing their languages, creating multiple people groups with their own governments.",
    studyNotes: `Chapter 9, Verse 9. Covenant. God made this covenant not only with his people, but with "every living creature." This passage (8:20–9:17) is the establishment of God's common kingdom by which he rules over the earth through the means of human government, including the death penalty in cases of murder (9:6) based on the fact that people are created in the image of God.

Chapter 11, Verse 4. Top in the heavens. God established human government as the means through which he rules his common kingdom, but very quickly government was corrupted as a means to establish human autonomy and rebellion against God.

Verse 5. Came down. This is an ironic statement made by the narrator. The people wanted to build a high tower to heaven, but even then God, who is always high above all, had to "come down" to see what they had made.

Verse 9. Babel . . . confused. The Hebrew word translated "confused" is Balel, which sounds like the name of the city. Later this very city would be called Babylon (see Rev 17–18), the epitome of a worldly city.`,
    reflectionQuestions: [
      "What did God intend for the purpose of human government?",
      "Why was it wrong for the people to build the Tower of Babel?",
      "Where did the different nations of the world come from?"
    ]
  },
  { 
    week: 2, 
    day: 2, 
    reference: "Gen 11:26–12:20", 
    title: "The Call of Abram",
    summary: "God's covenant with Abram has ramifications for his offspring to this day, the promise having yet to be fulfilled. Yet the promise to bless all the nations of the world through Abram has and is being fulfilled through Jesus Christ, Abraham's seed, who offers salvation to all who believe in him.",
    studyNotes: `Chapter 12, Verse 1. This is the initial introduction to the Abrahamic covenant, an everlasting, unilateral covenant God makes with Abram.

Verse 7. Land. Part of God's covenant with Abram is that his offspring would inherit the land of Canaan, a promise still yet to be completely fulfilled. Altar. Abraham worships in response to God's self-revelation and covenant.`,
    reflectionQuestions: [
      "If God promised that Abram's descendants would inherit the land of Canaan forever, will he keep his promise?",
      "What can Abram's response to God's covenant teach us about worship?",
      "How have we non-Jews been blessed by the Abrahamic covenant?"
    ]
  },
  { 
    week: 2, 
    day: 3, 
    reference: "Gen 13:1–14:16", 
    title: "Lot",
    summary: "God reaffirmed his promise Abram after Lot chose the fertile land of the Jordan Valley. His defeat of Lot's captors confirms that God will indeed bless Abram and his descendants.",
    studyNotes: `Chapter 13, Verse 14. God reaffirms his promise to Abram that his descendants would inherit the land of Canaan.

Chapter 14, Verse 13. Hebrew. This is the first time this ethnic title is used. It means "descended from Eber" (see 11:15–17).`,
    reflectionQuestions: [
      "What do you think motivated Lot to choose the land that he did?",
      "What is revealed about Abram when he allows Lot to choose the land first?",
      "What is revealed about Abram in his successful rescue of Lot?"
    ]
  },
  { 
    week: 2, 
    day: 4, 
    reference: "Gen 14:17–15:21; 16:1–16", 
    title: "Blessing and Promise",
    summary: "God will keep his promises, no matter how impossible they seem. Some of God's promises are dependent upon how we act, but others are unilateral, meaning that God will keep them no matter what we do.",
    studyNotes: `Chapter 14, Verse 18. Melchizedek. This mysterious priest-king over Jerusalem has no biography or genealogy, leading later biblical authors to use him as a type of Christ (see Ps 110:4; Heb 7:17, 21). Priest of God Most High. This phrase indicates that Melchizedek did not worship one of the Canaanite pagan gods; rather, he worshiped the true God, the same God that called Abram (see v. 22).

Chapter 15, Verse 6. Believed. Abraham was justified, not by works, but by faith in the promises of God (see Rom 4:3, 9, 22; Gal 3:6; Jas 2:23).

Verse 7. Land. God's promise that Abram would inherit land is intricately tied with his covenant and confirmed in a formal ceremony (vv. 9–21).

Verse 12. Sleep. God put Abram to sleep because the covenant did not require any action on Abram's part; the covenant was completely unilateral—God would fulfill his promises regardless of what Abram or his descendants did.

Chapter 16, Verse 3. Hagar. It was a customary practice to marry a maidservant in the case of no male heir, but this demonstrated lack of faith in God's promise.

Verse 7. Angel of the Lord. This individual appears many times in the Old Testament and is often identified as the reincarnate Christ, one who is in some way both distinct from and identified with Yahweh.

Verse 12. Against. Ishmael's descendants are modern-day Arabs.`,
    reflectionQuestions: [
      "How can you be sure God will keep his promises?",
      "Why is it important to believe the promises of God, no matter how impossible they seem?",
      "What promises has God made to you?"
    ]
  },
  { 
    week: 2, 
    day: 5, 
    reference: "Gen 18:1–15; 21:1–7", 
    title: "The Birth of Isaac",
    summary: "God can do anything, and we should trust that when he says he will do something, he will.",
    studyNotes: `Chapter 18, Verse 3. Lord. Abraham recognized one of the three men as the true God.

Chapter 21, Verse 1. Visited. This conception and birth was clearly a miracle of God.

Verse 4, Circumcised. Cutting away the male foreskin was what God had commanded of Abraham's descendants as a sign of the covenant (see 17:11).`,
    reflectionQuestions: [
      "Are there any promises God has made to you that seem impossible?",
      "Why do you think God makes promises to us that seem impossible?",
      "What can you do to be sure that you trust in God's promises no matter what?"
    ]
  },

  // Week 3
  { 
    week: 3, 
    day: 1, 
    reference: "Gen 18:16–33; 19:1–29", 
    title: "Destruction of Sodom",
    studyNotes: `Chapter 29, Verse 17 (Eyes were weak): This likely means her eyes lacked the sparkle or beauty considered attractive.

Verse 25 (It was Leah): The deceiver (Jacob) was deceived. God often disciplines us by allowing us to experience the pain of our own sins in others.

Verse 31 (Hated): This is a relative term meaning "loved less" (see v. 30).

Verse 35 (Praise the LORD): Leah finally stopped looking to her husband for significance and found her joy in the LORD. She named her son Judah ("Praise").`
  },
  { 
    week: 3, 
    day: 2, 
    reference: "Gen 20; Ps 1", 
    title: "Abraham and Abimelech",
    studyNotes: `Chapter 32, Verse 10 (Unworthy): Jacob finally humbled himself, recognizing that everything he had was due to God's hesed (steadfast love).

Verse 24 (Man): This was a pre-incarnate appearance of the Son of God (the Angel of the LORD).

Verse 28 (Israel): The name means "he strives with God" or "God fights." Jacob prevailed not by strength, but by clinging to God in weakness and asking for a blessing.

Verse 31 (Peniel): "Face of God."`
  },
  { 
    week: 3, 
    day: 3, 
    reference: "Gen 21:8–21; Pss 4–5", 
    title: "Hagar and Ishmael",
    studyNotes: `Verse 3 (Robe): This special garment marked Joseph as the heir, which naturally incited his brothers' jealousy.

Verse 5 (Dream): The dreams were from God, foretelling Joseph's future exaltation.

Verse 28 (Sold): The brothers' act was evil, but God was using it for his good purposes (Ps 105:17).

Verse 36 (Potiphar): God providentially placed Joseph in the house of an official of Pharaoh.`
  },
  { 
    week: 3, 
    day: 4, 
    reference: "Pss 6–7", 
    title: "Psalms of Lament",
    studyNotes: `Genesis 38, Verse 1 (Went down): Judah left his brothers and intermarried with Canaanites, leading to spiritual decline.

Verse 26 (More righteous than I): Judah acknowledged his sin. This chapter contrasts Judah's unrighteousness with Joseph's righteousness (ch. 39), yet remarkably, the Messiah would come through Judah's line.

Psalm 51, Verse 1 (Mercy): David appeals to God's covenant love.

Verse 4 (Against you only): All sin is ultimately rebellion against God.

Verse 5 (Iniquity): David confesses original sin; he was a sinner from conception.

Verse 17 (Broken spirit): God does not despise a heart that is truly humble and repentant.

Genesis 39, Verse 2 (With Joseph): Four times in this chapter it says the LORD was "with Joseph." This is the key to his success and endurance.

Verse 9 (Sin against God): Joseph resisted temptation by recognizing that adultery is a sin against God.

Verse 21 (Steadfast love): Even in prison, God extended his covenant loyalty to Joseph.

Chapter 40, Verse 8 (Interpretations belong to God): Joseph gave glory to God rather than claiming ability for himself.`
  },
  { 
    week: 3, 
    day: 5, 
    reference: "Gen 23; Ps 8", 
    title: "Death of Sarah",
    studyNotes: `Chapter 41, Verse 16 (Not in me): Again, Joseph demonstrated humility and pointed Pharaoh to God.

Verse 38 (Spirit of God): Even the pagan Pharaoh recognized God's presence in Joseph.

Verse 51 (Manasseh): "Making to forget." God helped Joseph move past the pain of his family's rejection.

Verse 52 (Ephraim): "Making fruitful."

Chapter 42, Verse 9 (Remembered the dreams): Joseph realized God's prophecies were being fulfilled.

Verse 21 (Guilty): The brothers' consciences were finally awakening after more than twenty years.

Verse 24 (Wept): Joseph was not vengeful; he loved his brothers and desired their repentance.

Chapter 43, Verse 9 (Pledge of safety): Judah, who once sold Joseph, now offered himself as a surety for Benjamin. This shows the change in his heart.

Verse 32 (Abomination): The Egyptians looked down on Hebrews, yet God was using this separation to preserve Israel as a distinct nation.`
  },

  // Week 4
  { 
    week: 4, 
    day: 1, 
    reference: "Gen 22:1–19; Rom 4", 
    title: "Abraham Tested",
    studyNotes: `Chapter 44, Verse 2 (Cup): Joseph's purpose in placing the cup in Benjamin's sack was to test his brothers to see if they had changed. Would they abandon Benjamin to save themselves as they had abandoned Joseph?

Verse 16 (Guilt): Judah did not try to make excuses but acknowledged their guilt before God. This was a true sign of repentance.

Verse 33 (Substitute): Judah offered himself as a substitute for Benjamin. This is a powerful picture of the gospel, where Christ, the Lion of the tribe of Judah, offers himself as a substitute for his people.

Chapter 45, Verse 5 (God sent me): Joseph recognized God's sovereign hand in all that had happened. Even though his brothers meant it for evil, God meant it for good to preserve life (see 50:20).

Verse 7 (Remnant): God was preserving the family of Jacob so that the Messiah could eventually be born.

Verse 24 (Do not quarrel): Joseph knew that his brothers would be tempted to blame one another for what they had done to him, so he warned them to maintain unity.

Chapter 50, Verse 20 (God meant it for good): This is the theological summary of the entire Joseph narrative and, indeed, the whole Bible. God is sovereign over the evil actions of men and uses them to accomplish his good purposes.

Verse 24 (God will visit you): Joseph died with the same faith as his father, trusting that God would one day bring his people back to the Promised Land.

Verse 25 (Bones): Joseph gave instructions for his bones to be carried to Canaan, a command that was obeyed hundreds of years later (Ex 13:19; Josh 24:32).

Exodus 1, Verse 8 (Did not know Joseph): The new pharaoh did not respect the history of how Joseph had saved Egypt.

Verse 17 (Feared God): The midwives obeyed God rather than man, establishing the principle that civil disobedience is necessary when the government commands us to sin (Acts 5:29).

Chapter 2, Verse 2 (Basket): The Hebrew word used here is the same word used for Noah's "ark." Just as God preserved Noah in the ark, he preserved Moses in the basket.

Verse 24 (Remembered): This does not mean God had forgotten his covenant, but that he was now acting to fulfill his promises to Abraham, Isaac, and Jacob.`
  },
  { 
    week: 4, 
    day: 2, 
    reference: "Pss 9–10", 
    title: "Psalms of Trust",
    studyNotes: `Chapter 3, Verse 2 (Burning bush): The fire represented God's holy presence. The fact that the bush was not consumed may symbolize that God would be with his people in the "fire" of affliction but would not let them be destroyed.

Verse 5 (Holy ground): Holiness refers to God's set-apartness. Approach to God requires reverence.

Verse 14 (I AM WHO I AM): God revealed his personal covenant name, Yahweh (LORD), which emphasizes his self-existence, eternity, and unchangeableness.

Chapter 4, Verse 21 (Harden his heart): While Pharaoh hardened his own heart, God also hardened Pharaoh's heart to demonstrate his power and glory.`
  },
  { 
    week: 4, 
    day: 3, 
    reference: "Gen 24", 
    title: "A Wife for Isaac",
    studyNotes: `Chapter 5, Verse 2 (Who is the LORD?): Pharaoh's question sets the stage for the conflict that follows. God will demonstrate exactly who he is through the plagues.

Verse 22 (Why?): Even Moses struggled with doubt when things got worse before they got better.

Chapter 6, Verse 6 (Redeem): This is the first time this important word appears in the Bible. It means to free a slave by paying a price.

Chapter 7, Verse 12 (Swallowed): God showed immediately that his power was greater than the power of Egypt's false gods and magicians.

Chapter 8, Verse 19 (Finger of God): Even the magicians were forced to acknowledge that this was the work of God.

Chapter 9, Verse 16 (For this purpose): Paul quotes this verse in Romans 9:17 to teach God's sovereignty in election and reprobation. God raised Pharaoh up to display his power.

Chapter 10, Verse 2 (Tell in the hearing): The purpose of God's mighty acts was not just for that generation but so that they would recount God's power to their children and grandchildren.

Verse 21 (Darkness): The plague of darkness was a direct attack on Ra, the sun god, the chief deity of Egypt.

Chapter 11, Verse 3 (Favor): God ensured that the Israelites were compensated for their years of slavery by moving the Egyptians to give them silver and gold.`
  },
  { 
    week: 4, 
    day: 4, 
    reference: "Prov 2; Gen 25:19–34", 
    title: "Jacob and Esau",
    studyNotes: `Chapter 12, Verse 13 (Blood): The blood of the lamb on the doorpost was a substitute for the firstborn. This is a clear picture of the blood of Christ, our Passover Lamb (1 Cor 5:7), which shelters us from God's wrath.

Verse 38 (Mixed multitude): Many non-Israelites also left Egypt with them, having seen the power of God.

Chapter 13, Verse 21 (Pillar of cloud and fire): God led his people personally and visibly, providing guidance and protection.`
  },
  { 
    week: 4, 
    day: 5, 
    reference: "Gen 26", 
    title: "Isaac and the Covenant",
    studyNotes: `Chapter 14, Verse 13 (Stand firm): Salvation is of the Lord. The people could do nothing to save themselves; they simply had to trust in God's deliverance.

Verse 31 (Feared the LORD): The crossing of the sea resulted in the people fearing God and believing in his servant Moses.

Chapter 15, Verse 1 (Song): This is the first recorded song in Scripture. Salvation naturally leads to singing.

Verse 11 (Holiness): God's holiness—his transcendence and moral purity—is the reason for his fearful praises.`
  },

  // Week 5
  { 
    week: 5, 
    day: 1, 
    reference: "Prov 3", 
    title: "Wisdom and Understanding",
    studyNotes: `Chapter 16, Verse 4 (Test): God provided manna not just to feed them but to test their obedience. Would they trust him for their daily bread?

Verse 23 (Sabbath): This is the first mention of the Sabbath since creation, showing that the principle of a weekly day of rest and worship predates the Ten Commandments.

Chapter 17, Verse 6 (Strike the rock): Paul tells us that "the Rock was Christ" (1 Cor 10:4). Jesus was struck for us so that the living water of the Spirit might flow to us.`
  },
  { 
    week: 5, 
    day: 2, 
    reference: "Gen 27", 
    title: "Jacob Deceives Isaac",
    studyNotes: `Exodus 18, Verse 11 (Greater than all gods): Jethro, a Midianite priest, came to faith in Yahweh after hearing what God had done for Israel.

Verse 21 (Able men): Leadership requires character. Jethro advised Moses to choose men who feared God, were trustworthy, and hated bribes.

Chapter 19, Verse 6 (Kingdom of priests): God's purpose for Israel was that they would be a holy nation set apart to represent him to the world. Peter applies this title to the church (1 Pet 2:9).

Chapter 20, Verse 2 (I am the LORD your God): The commandments are grounded in who God is and what he has done (redemption). Obedience is the response to grace, not the cause of it.

Verses 3-17 (Commandments): The first four commandments deal with our relationship with God (worship), and the last six deal with our relationship with our neighbor.`
  },
  { 
    week: 5, 
    day: 3, 
    reference: "Gen 28:1–29:30", 
    title: "Jacob's Dream",
    studyNotes: `Exodus 21, Verse 1 (Rules): These "case laws" applied the general principles of the Ten Commandments to specific situations in Israel's civil society.

Verse 24 (Eye for eye): This principle, known as lex talionis, was not about personal vengeance but about limiting punishment to fit the crime. It ensured justice was neither too lenient nor too harsh.

Chapter 23, Verse 2 (Crowd): God warned against following the majority to do evil. Truth is not determined by popular opinion.

Exodus 24, Verse 3 (We will do): The people pledged obedience, but their subsequent history would show their inability to keep God's law, pointing to the need for a new covenant written on the heart (Jer 31:31–34).

Verse 8 (Blood of the covenant): The covenant was ratified with blood, signifying that death is the penalty for breaking it. Jesus used these words at the Last Supper to institute the New Covenant in his blood (Matt 26:28).

Verse 10 (Saw the God of Israel): The elders were given a glimpse of God's glory, yet they were not consumed.

Chapter 25, Verse 8 (Dwell in their midst): The purpose of the tabernacle was to provide a way for a holy God to dwell among his sinful people. It is a type of Christ, who "tabernacled" among us (John 1:14).

Verse 22 (Mercy seat): This lid of the ark was where the blood was sprinkled on the Day of Atonement. It represents the place where God meets with man through propitiation.

Chapter 31, Verse 3 (Spirit of God): The Holy Spirit equipped Bezalel and Oholiab with artistic skill for the construction of the tabernacle. All beauty and creativity come from God.

Chapter 32, Verse 4 (Calf): The people grew impatient and created a visible representation of God, violating the second commandment. They wanted a god they could control.

Verse 32 (Blot me out): Like Paul (Rom 9:3), Moses was willing to be cut off from God for the sake of his people. This points to Christ, who was actually cut off for his people.

Chapter 33, Verse 15 (Your presence): Moses understood that without God's presence, the Promised Land was nothing. What distinguishes God's people is that God is with them.

Chapter 34, Verse 6 (The LORD, the LORD): God revealed his glory to Moses by proclaiming his name: a God merciful and gracious, slow to anger, and abounding in steadfast love and faithfulness.

Verse 14 (Jealous): God's jealousy is his holy zeal for his own glory and the undivided devotion of his people.

Chapter 40, Verse 34 (Glory filled): When the work was finished according to God's instructions, God's glory filled the tabernacle. This indicated his acceptance of the sanctuary and his presence with his people.`
  },
  { 
    week: 5, 
    day: 4, 
    reference: "Gen 29:31–31:3", 
    title: "Jacob's Family",
    studyNotes: `Leviticus 1, Verse 4 (Lay his hand): This gesture symbolized the transfer of guilt from the worshiper to the animal substitute.

Chapter 10, Verse 1 (Unauthorized fire): Nadab and Abihu offered worship in a way God had not commanded. This teaches the "Regulative Principle of Worship"—we must worship God only as he has prescribed in his Word.

Chapter 23: The feasts were designed to remind Israel of God's past deliverance and provision, structuring their year around the worship of God.

Chapter 16, Verse 21 (Confess): The high priest confessed the sins of the people over the scapegoat, which was then sent away, symbolizing the removal of sin (expiation). The other goat was killed, symbolizing the payment for sin (propitiation).

Chapter 17, Verse 11 (Life is in the blood): Blood represents life poured out. God gave blood upon the altar to make atonement for souls.`
  },
  { 
    week: 5, 
    day: 5, 
    reference: "Gen 31:4–55", 
    title: "Jacob Returns",
    studyNotes: `Numbers 1, Verse 3 (Go to war): The census was primarily for military organization. Israel was the army of the Lord, marching toward the conquest of Canaan.

Chapter 6, Verse 24 (Bless you): The Aaronic blessing is a beautiful prayer for God's favor, protection, and peace upon his people.

Chapter 10, Verse 11 (Cloud): When the cloud moved, the people moved. They were completely dependent on God's guidance.

Chapter 11, Verse 1 (Complained): The people's gratitude for deliverance quickly turned to grumbling about their circumstances.

Chapter 12, Verse 3 (Meek): Moses did not defend himself when attacked by Aaron and Miriam; he entrusted himself to God.

Chapter 14, Verse 4 (Let us choose a leader): The people's refusal to enter the land was essentially a rejection of God's salvation and a desire to return to slavery. As a result, that generation was sentenced to die in the wilderness.`
  },

  // Week 6
  { 
    week: 6, 
    day: 1, 
    reference: "Gen 32–33", 
    title: "Jacob Wrestles God",
    studyNotes: `Chapter 16, Verse 3 (Exalt yourselves): Korah and his followers challenged the God-ordained leadership of Moses and Aaron.

Chapter 20, Verse 12 (Did not believe): Moses disobeyed God by striking the rock instead of speaking to it. Leaders are held to a stricter judgment because they represent God to the people.

Chapter 21, Verse 9 (Bronze serpent): Jesus explained the meaning of this event in John 3:14-15. Just as the people looked at the serpent and lived physically, so we look to Christ crucified with the eye of faith and live eternally.`
  },
  { 
    week: 6, 
    day: 2, 
    reference: "Gen 35, 37", 
    title: "Joseph Sold into Slavery",
    studyNotes: `Chapter 16, Verse 3 (Exalt yourselves): Korah and his followers challenged the God-ordained leadership of Moses and Aaron.

Chapter 20, Verse 12 (Did not believe): Moses disobeyed God by striking the rock instead of speaking to it. Leaders are held to a stricter judgment because they represent God to the people.

Chapter 21, Verse 9 (Bronze serpent): Jesus explained the meaning of this event in John 3:14-15. Just as the people looked at the serpent and lived physically, so we look to Christ crucified with the eye of faith and live eternally.`
  },
  { 
    week: 6, 
    day: 3, 
    reference: "Gen 39–41", 
    title: "Joseph in Egypt",
    studyNotes: `Numbers 22-24: Balaam was hired to curse Israel, but God turned the curse into a blessing. This demonstrates God's sovereign protection of his people. No weapon formed against God's elect will prosper.`
  },
  { 
    week: 6, 
    day: 4, 
    reference: "Gen 42–43", 
    title: "Joseph's Brothers Go to Egypt",
    studyNotes: `Deuteronomy 6: This chapter contains the Shema, Israel's great confession of faith. Parents are commanded to teach God's Word diligently to their children, integrating it into every aspect of daily life.

Deuteronomy 30-31: Moses set before Israel a choice between life and death, blessing and curse. Choosing life meant loving and obeying God. This choice still confronts every person today.`
  },
  { 
    week: 6, 
    day: 5, 
    reference: "Gen 44–46", 
    title: "Joseph Revealed",
    studyNotes: `Joshua 1, Verse 2 (Dead): The death of Moses marked the end of an era, but God's work continues. He buries his workmen but carries on his work.

Verse 5 (I will be with you): This is the key to Joshua's success. It was not his military skill but God's presence that would guarantee victory.

Verse 8 (Book of the Law): Success in God's kingdom is defined by obedience to God's Word. Meditation on the Scripture is the fuel for courageous obedience.

Chapter 2, Verse 11 (He is God): Rahab, a Gentile prostitute, expressed a profound faith in the God of Israel, acknowledging his sovereignty over heaven and earth.`
  },

  // Week 7
  { 
    week: 7, 
    day: 1, 
    reference: "Gen 47–50", 
    title: "Jacob Blesses His Sons",
    studyNotes: `Chapter 3, Verse 10 (Living God): The miraculous crossing of the Jordan was proof that the living God was among them and would drive out their enemies.

Verse 16 (Stood in a heap): Just as God had parted the Red Sea for the previous generation, he parted the Jordan for this generation, confirming that he was with Joshua just as he had been with Moses.

Chapter 4, Verse 6 (Sign): The twelve stones were set up as a memorial so that future generations would ask about them, providing an opportunity to testify of God's faithfulness.`
  },
  { 
    week: 7, 
    day: 2, 
    reference: "Gen 38; Ps 51", 
    title: "Judah and Tamar",
    studyNotes: `Chapter 5, Verse 2 (Circumcise): Before they could conquer the land, they had to be right with God. The previous generation had neglected the covenant sign of circumcision.

Verse 14 (No): When Joshua asked the Stranger if he was for them or for their enemies, the answer was "No." The question is not whether God is on our side, but whether we are on his side. This "Commander" is likely a pre-incarnate appearance of Christ.

Chapter 6, Verse 2 (Given Jericho): The victory was secured by God before the fighting even began. The strange strategy (marching around the city) was designed to test their faith and prove that the victory belonged to God alone.`
  },
  { 
    week: 7, 
    day: 3, 
    reference: "Gen 39–40", 
    title: "Joseph in Prison",
    studyNotes: `Chapter 7, Verse 1 (But...): This small conjunction introduces a massive problem. Achan's secret sin brought defeat upon the entire nation. Sin is never purely private; it affects the whole community.

Verse 21 (Coveted): Like Eve, Achan saw, coveted, and took. This progression of sin leads to death (James 1:15).

Chapter 8, Verse 1 (Do not fear): Once the sin was dealt with through judgment, God's presence and favor returned. God is holy and will not dwell amidst unrepentant sin.`
  },
  { 
    week: 7, 
    day: 4, 
    reference: "Gen 41", 
    title: "Joseph Exalted",
    studyNotes: `Chapter 9, Verse 14 (Did not ask counsel): The leaders were deceived by the Gibeonites because they trusted their own eyes rather than seeking God's guidance.

Chapter 10, Verse 14 (Fought for Israel): The miracle of the sun standing still demonstrated that the Creator fights for his people. It was a localized reversal of the natural order for the sake of God's covenant purposes.`
  },
  { 
    week: 7, 
    day: 5, 
    reference: "Gen 42–45", 
    title: "Joseph's Brothers & Revelation",
    studyNotes: `Chapter 1, Verse 19 (Could not drive out): The failure to drive out the inhabitants of the land was due to a lack of faith, not a lack of God's power.

Chapter 2, Verse 10 (Did not know the LORD): Faith cannot be inherited; it must be passed down through faithful instruction (Deut 6). The failure of one generation to teach the next led to apostasy.

Verse 11 (Baals): The people turned to the fertility gods of Canaan, hoping for agricultural success, but found only slavery.

Chapter 3, Verse 7 (Forgot the LORD): Forgetting God is the root of all sin.

Verse 9 (Cried out): God in his mercy heard the cries of his people, even though their repentance was often shallow.

Verse 15 (Left-handed): God often uses unexpected people and methods (like a left-handed man with a homemade sword) to deliver his people, showing that salvation belongs to the Lord.`
  },

  // Week 8
  { 
    week: 8, 
    day: 1, 
    reference: "Ex 12–13", 
    title: "The Passover",
    studyNotes: `Chapter 4, Verse 9 (Woman): Because Barak hesitated to obey God's command without Deborah's presence, the honor of the victory went to Jael, a woman.

Chapter 5, Verse 20 (Stars): The poetic song of Deborah reveals that God fought for Israel, likely sending a torrential rainstorm that rendered the Canaanite chariots useless in the mud.`
  },
  { 
    week: 8, 
    day: 2, 
    reference: "Ex 14–15", 
    title: "Crossing the Red Sea",
    studyNotes: `Chapter 6, Verse 13 (Where are all his wonders?): Gideon questioned God's presence because of the people's suffering, failing to realize that the suffering was God's discipline for their sin.

Verse 15 (Weakest): God chose the weakest man from the weakest clan to show that the power was not in the vessel but in God.

Verse 24 (The LORD is Peace): Yahweh-Shalom. Peace comes not from compromise with the world, but from being reconciled to God.

Chapter 7, Verse 2 (Too many): God reduced Gideon's army from 32,000 to 300 to ensure that Israel could not boast in their own strength.

Chapter 8, Verse 23 (The LORD will rule): Gideon rightly refused the kingship, acknowledging that God was Israel's true King. However, his subsequent making of an ephod (v. 27) became a snare, showing that even good leaders are flawed.`
  },
  { 
    week: 8, 
    day: 3, 
    reference: "Ex 16–17", 
    title: "Bread from Heaven",
    studyNotes: `Chapter 11, Verse 30 (Vow): Jephthah's tragic vow was a result of his ignorance of God's law and his attempt to manipulate God. God desires obedience, not rash promises or human sacrifice.

Chapter 13, Verse 5 (Nazirite): Samson was set apart from birth to be a Nazirite (see Num 6), which involved abstaining from wine, dead bodies, and cutting one's hair. He was meant to be holy to the Lord.

Verse 25 (Stir him): The Spirit of the Lord began to empower Samson, but unlike Othniel or Gideon, Samson often used this power for selfish revenge rather than national deliverance.

Chapter 14, Verse 3 (Right in my own eyes): This phrase characterizes Samson's life and the entire book of Judges (see 21:25). Samson was driven by his lusts rather than by God's law.

Chapter 15, Verse 15 (Jawbone): Samson's victory was miraculous, but it was also a violation of his Nazirite vow (touching a dead bone). He was a flawed savior.

Chapter 16, Verse 20 (Left him): This is one of the saddest verses in the Bible. Samson presumed upon God's grace, not realizing that his persistent disobedience had finally resulted in the withdrawal of God's power.

Verse 28 (Remember me): In his final moments, blinded and humbled, Samson finally prayed. God heard him and used his death to destroy the enemies of his people, a faint picture of Christ who destroyed Satan through his own death.

Chapter 17, Verse 6 (No king): The refrain "In those days there was no king in Israel. Everyone did what was right in his own eyes" explains the moral, religious, and political chaos of the period.

Chapter 19: This horrific chapter shows how low Israel had sunk, becoming like Sodom. It highlights the desperate need for a righteous king to establish order and justice.`
  },
  { 
    week: 8, 
    day: 4, 
    reference: "Ex 18", 
    title: "Jethro's Advice",
    studyNotes: `Chapter 1, Verse 1 (Famine): The famine was likely a judgment from God on the land during the time of the Judges.

Verse 16 (Your God my God): Ruth's conversion is remarkable. She left her people and her gods to embrace Yahweh and his people, showing that God's grace extends to the Gentiles.

Verse 20 (Mara): Naomi ("Pleasant") changed her name to "Bitter," unable to see that God was working behind the scenes for her good.

Chapter 2, Verse 3 (Happened): The narrator uses this phrase to highlight God's providence. Nothing "just happens" in God's world; he guides our steps.

Verse 12 (Wings): Boaz prayed that Ruth would be rewarded by the God under whose wings she had come to take refuge. He then became the answer to his own prayer by providing for her.

Verse 20 (Redeemer): Goel. A kinsman-redeemer had the responsibility to protect the family and property of a relative. Boaz is a type of Christ, our Kinsman-Redeemer.

Chapter 3, Verse 9 (Spread your wings): Ruth asked Boaz to fulfill his prayer (2:12) by marrying her. This was not an immoral act but a formal request for redemption and marriage according to the custom.

Verse 18 (Wait): Faith often requires waiting for God to work.

Chapter 4, Verse 14 (Not left you): The women praised God for providing a redeemer.

Verse 17 (Obed): The birth of Obed was significant not just for Naomi, but for the world. He was the grandfather of David, and thus an ancestor of Jesus Christ (Matt 1:5). God used a Moabite widow to preserve the line of the Messiah.`
  },
  { 
    week: 8, 
    day: 5, 
    reference: "Ex 19–20", 
    title: "The Ten Commandments",
    studyNotes: `Chapter 1, Verse 6 (Closed her womb): God's sovereignty extends to all areas of life. He closed Hannah's womb to drive her to prayer and to prepare her to dedicate her son to him.

Verse 11 (Give him to the LORD): Hannah vowed that if God gave her a son, she would give him back to God for service in the tabernacle.

Chapter 2, Verse 1 (Exulted): Hannah's prayer is not just about a baby; it is a prophetic song about God's holiness, knowledge, and power to reverse human fortunes.

Verse 10 (King): Remarkably, Hannah prophesies about a "king" and God's "anointed" (Messiah) long before Israel even had a king. She looked forward to the true King.

Verse 12 (Worthless): Eli's sons were priests, but they did not know the Lord. Office does not guarantee grace.

Chapter 3, Verse 1 (Rare): The word of the Lord was rare because of the hardness of the people's hearts.

Verse 10 (Speak, for your servant hears): This is the posture of true faith. We must listen to God's Word with a readiness to obey.

Chapter 4, Verse 3 (Let us take the ark): The Israelites treated the ark like a lucky charm, thinking its mere presence would save them, regardless of their spiritual condition. God will not be used.

Verse 21 (Ichabod): "The glory has departed." The capture of the ark signified that God's glory had left Israel because of their sin.

Chapter 5, Verse 3 (Dagon): God defended his own glory. The Philistine idol fell prostrate before the ark, showing that Yahweh is the only true God.

Chapter 6, Verse 19 (Struck): The men of Beth-shemesh treated the holy things of God with curiosity rather than reverence. God's holiness is dangerous to sinners.

Chapter 7, Verse 3 (Return): Samuel called for wholehearted repentance, putting away foreign gods.

Verse 12 (Ebenezer): "Stone of help." Samuel set up a memorial to acknowledge that "Till now the LORD has helped us."`
  },

  // Week 9
  { 
    week: 9, 
    day: 1, 
    reference: "Ex 21–23", 
    title: "Laws for Life",
    studyNotes: `Chapter 21, Verse 1 (Rules): These "case laws" applied the general principles of the Ten Commandments to specific situations in Israel's civil society.

Verse 24 (Eye for eye): This principle, known as lex talionis, was not about personal vengeance but about limiting punishment to fit the crime. It ensured justice was neither too lenient nor too harsh.

Chapter 23, Verse 2 (Crowd): God warned against following the majority to do evil. Truth is not determined by popular opinion.`
  },
  { 
    week: 9, 
    day: 2, 
    reference: "Ex 24", 
    title: "Confirming the Covenant",
    studyNotes: `Exodus 24, Verse 3 (We will do): The people pledged obedience, but their subsequent history would show their inability to keep God's law, pointing to the need for a new covenant written on the heart (Jer 31:31–34).

Verse 8 (Blood of the covenant): The covenant was ratified with blood, signifying that death is the penalty for breaking it. Jesus used these words at the Last Supper to institute the New Covenant in his blood (Matt 26:28).

Verse 10 (Saw the God of Israel): The elders were given a glimpse of God's glory, yet they were not consumed.`
  },
  { 
    week: 9, 
    day: 3, 
    reference: "Ex 25–31", 
    title: "The Tabernacle",
    studyNotes: `Chapter 25, Verse 8 (Dwell in their midst): The purpose of the tabernacle was to provide a way for a holy God to dwell among his sinful people. It is a type of Christ, who "tabernacled" among us (John 1:14).

Verse 22 (Mercy seat): This lid of the ark was where the blood was sprinkled on the Day of Atonement. It represents the place where God meets with man through propitiation.

Chapter 31, Verse 3 (Spirit of God): The Holy Spirit equipped Bezalel and Oholiab with artistic skill for the construction of the tabernacle. All beauty and creativity come from God.`
  },
  { 
    week: 9, 
    day: 4, 
    reference: "Ex 32–34", 
    title: "The Golden Calf",
    studyNotes: `Chapter 32, Verse 4 (Calf): The people grew impatient and created a visible representation of God, violating the second commandment. They wanted a god they could control.

Verse 32 (Blot me out): Like Paul (Rom 9:3), Moses was willing to be cut off from God for the sake of his people. This points to Christ, who was actually cut off for his people.

Chapter 33, Verse 15 (Your presence): Moses understood that without God's presence, the Promised Land was nothing. What distinguishes God's people is that God is with them.

Chapter 34, Verse 6 (The LORD, the LORD): God revealed his glory to Moses by proclaiming his name: a God merciful and gracious, slow to anger, and abounding in steadfast love and faithfulness.

Verse 14 (Jealous): God's jealousy is his holy zeal for his own glory and the undivided devotion of his people.`
  },
  { 
    week: 9, 
    day: 5, 
    reference: "Ex 34–40", 
    title: "Renewing the Covenant",
    studyNotes: `Chapter 34, Verse 6 (The LORD, the LORD): God revealed his glory to Moses by proclaiming his name: a God merciful and gracious, slow to anger, and abounding in steadfast love and faithfulness.

Verse 14 (Jealous): God's jealousy is his holy zeal for his own glory and the undivided devotion of his people.

Chapter 40, Verse 34 (Glory filled): When the work was finished according to God's instructions, God's glory filled the tabernacle. This indicated his acceptance of the sanctuary and his presence with his people.`
  },

  // Week 10
  { 
    week: 10, 
    day: 1, 
    reference: "Lev 1–10; 23", 
    title: "Offerings and Feasts",
    studyNotes: `Leviticus 1, Verse 4 (Lay his hand): This gesture symbolized the transfer of guilt from the worshiper to the animal substitute.

Chapter 10, Verse 1 (Unauthorized fire): Nadab and Abihu offered worship in a way God had not commanded. This teaches the "Regulative Principle of Worship"—we must worship God only as he has prescribed in his Word.

Chapter 23: The feasts were designed to remind Israel of God's past deliverance and provision, structuring their year around the worship of God.`
  },
  { 
    week: 10, 
    day: 2, 
    reference: "Lev 16–17", 
    title: "The Day of Atonement",
    studyNotes: `Chapter 16, Verse 21 (Confess): The high priest confessed the sins of the people over the scapegoat, which was then sent away, symbolizing the removal of sin (expiation). The other goat was killed, symbolizing the payment for sin (propitiation).

Chapter 17, Verse 11 (Life is in the blood): Blood represents life poured out. God gave blood upon the altar to make atonement for souls.`
  },
  { 
    week: 10, 
    day: 3, 
    reference: "Num 1–10", 
    title: "Census and Organization",
    studyNotes: `Numbers 1, Verse 3 (Go to war): The census was primarily for military organization. Israel was the army of the Lord, marching toward the conquest of Canaan.

Chapter 6, Verse 24 (Bless you): The Aaronic blessing is a beautiful prayer for God's favor, protection, and peace upon his people.

Chapter 10, Verse 11 (Cloud): When the cloud moved, the people moved. They were completely dependent on God's guidance.`
  },
  { 
    week: 10, 
    day: 4, 
    reference: "Num 11–14", 
    title: "Rebellion in the Wilderness",
    studyNotes: `Chapter 11, Verse 1 (Complained): The people's gratitude for deliverance quickly turned to grumbling about their circumstances.

Chapter 12, Verse 3 (Meek): Moses did not defend himself when attacked by Aaron and Miriam; he entrusted himself to God.

Chapter 14, Verse 4 (Let us choose a leader): The people's refusal to enter the land was essentially a rejection of God's salvation and a desire to return to slavery. As a result, that generation was sentenced to die in the wilderness.`
  },
  { 
    week: 10, 
    day: 5, 
    reference: "Num 16–21", 
    title: "Korah's Rebellion; The Bronze Serpent",
    studyNotes: `Chapter 16, Verse 3 (Exalt yourselves): Korah and his followers challenged the God-ordained leadership of Moses and Aaron.

Chapter 20, Verse 12 (Did not believe): Moses disobeyed God by striking the rock instead of speaking to it. Leaders are held to a stricter judgment because they represent God to the people.

Chapter 21, Verse 9 (Bronze serpent): Jesus explained the meaning of this event in John 3:14-15. Just as the people looked at the serpent and lived physically, so we look to Christ crucified with the eye of faith and live eternally.`
  },

  // Week 11
  { 
    week: 11, 
    day: 1, 
    reference: "Josh 1–2", 
    title: "Commissioning of Joshua",
    studyNotes: `Chapter 1, Verse 2 (Dead): The death of Moses marked the end of an era, but God's work continues. He buries his workmen but carries on his work.

Verse 5 (I will be with you): This is the key to Joshua's success. It was not his military skill but God's presence that would guarantee victory.

Verse 8 (Book of the Law): Success in God's kingdom is defined by obedience to God's Word. Meditation on the Scripture is the fuel for courageous obedience.

Chapter 2, Verse 11 (He is God): Rahab, a Gentile prostitute, expressed a profound faith in the God of Israel, acknowledging his sovereignty over heaven and earth.`
  },
  { 
    week: 11, 
    day: 2, 
    reference: "Josh 3–4", 
    title: "Crossing the Jordan",
    studyNotes: `Chapter 3, Verse 10 (Living God): The miraculous crossing of the Jordan was proof that the living God was among them and would drive out their enemies.

Verse 16 (Stood in a heap): Just as God had parted the Red Sea for the previous generation, he parted the Jordan for this generation, confirming that he was with Joshua just as he had been with Moses.

Chapter 4, Verse 6 (Sign): The twelve stones were set up as a memorial so that future generations would ask about them, providing an opportunity to testify of God's faithfulness.`
  },
  { 
    week: 11, 
    day: 3, 
    reference: "Josh 5:13–6:27", 
    title: "The Commander of the Army",
    studyNotes: `Chapter 5, Verse 2 (Circumcise): Before they could conquer the land, they had to be right with God. The previous generation had neglected the covenant sign of circumcision.

Verse 14 (No): When Joshua asked the Stranger if he was for them or for their enemies, the answer was "No." The question is not whether God is on our side, but whether we are on his side. This "Commander" is likely a pre-incarnate appearance of Christ.

Chapter 6, Verse 2 (Given Jericho): The victory was secured by God before the fighting even began. The strange strategy (marching around the city) was designed to test their faith and prove that the victory belonged to God alone.`
  },
  { 
    week: 11, 
    day: 4, 
    reference: "Josh 7–8", 
    title: "Sin in the Camp",
    studyNotes: `Chapter 7, Verse 1 (But...): This small conjunction introduces a massive problem. Achan's secret sin brought defeat upon the entire nation. Sin is never purely private; it affects the whole community.

Verse 21 (Coveted): Like Eve, Achan saw, coveted, and took. This progression of sin leads to death (James 1:15).

Chapter 8, Verse 1 (Do not fear): Once the sin was dealt with through judgment, God's presence and favor returned. God is holy and will not dwell amidst unrepentant sin.`
  },
  { 
    week: 11, 
    day: 5, 
    reference: "Josh 9–10", 
    title: "The Sun Stands Still",
    studyNotes: `Chapter 9, Verse 14 (Did not ask counsel): The leaders were deceived by the Gibeonites because they trusted their own eyes rather than seeking God's guidance.

Chapter 10, Verse 14 (Fought for Israel): The miracle of the sun standing still demonstrated that the Creator fights for his people. It was a localized reversal of the natural order for the sake of God's covenant purposes.`
  },

  // Week 12
  { 
    week: 12, 
    day: 1, 
    reference: "Job 1–3", 
    title: "Job's Suffering",
    studyNotes: `Chapter 1, Verse 8 (My servant Job): God himself initiates the conversation about Job. Job's suffering was not a result of his sin, but actually a result of his righteousness.

Verse 21 (Blessed be the name): Job's response to the loss of his wealth and children is one of the greatest statements of faith in Scripture. He recognized God's sovereignty in both giving and taking away.

Chapter 2, Verse 10 (Accept adversity): Job refused to charge God with wrong, acknowledging that God has the right to send both good and evil (calamity).

Chapter 3: Job's lament shows that it is not sinful to be honest with God about our pain. He cursed the day of his birth but did not curse God.`
  },
  { 
    week: 12, 
    day: 2, 
    reference: "Job 4–31", 
    title: "The Debate",
    studyNotes: `Chapter 4, Verse 7 (Innocent): Eliphaz represents the traditional wisdom that says suffering is always the result of personal sin. While this is often true in a general sense (Gal 6:7), it is not a universal rule, and it was wrongly applied to Job.

Chapter 19, Verse 25 (Redeemer lives): In the midst of his despair, Job rises to a height of prophetic hope. He expresses confidence that he has a Vindicator who will stand upon the earth, and that even after death, Job will see God.`
  },
  { 
    week: 12, 
    day: 3, 
    reference: "Job 32–37", 
    title: "Elihu Speaks",
    studyNotes: `Chapter 32, Verse 2 (Justified himself): Elihu was angry because Job was more concerned with vindicating himself than vindicating God.

Chapter 33, Verse 29 (Twice, three times): Elihu suggests that God uses suffering not just to punish, but to discipline, instruct, and keep man from pride.`
  },
  { 
    week: 12, 
    day: 4, 
    reference: "Job 38–41", 
    title: "God Speaks",
    studyNotes: `Chapter 38, Verse 2 (Darkens counsel): When God finally speaks, he does not answer Job's "why" questions. Instead, he interrogates Job about the wonders of creation.

Verse 4 (Where were you?): God emphasizes his infinite wisdom and power compared to Job's finite understanding. If Job cannot understand the workings of the physical creation, how can he expect to understand the moral governance of the universe?

Chapter 40, Verse 2 (Faultfinder): The creature has no right to put the Creator on trial.`
  },
  { 
    week: 12, 
    day: 5, 
    reference: "Job 42", 
    title: "Job's Restoration",
    studyNotes: `Chapter 42, Verse 5 (Eye sees you): The ultimate answer to Job's suffering was not an explanation, but a revelation of God himself. Seeing God's glory silenced Job's questions.

Verse 6 (Repent): Job repented not of sins that caused his suffering, but of his pride and arrogance in questioning God's justice.

Verse 10 (Prayed for his friends): Job's restoration began when he acted as a priest for those who had hurt him, foreshadowing Christ who prayed for his persecutors.`
  },

  // Week 13
  { 
    week: 13, 
    day: 1, 
    reference: "Judg 1–2", 
    title: "Incomplete Conquest",
    studyNotes: `Chapter 1, Verse 19 (Could not drive out): The failure to drive out the inhabitants of the land was due to a lack of faith, not a lack of God's power.

Chapter 2, Verse 10 (Did not know the LORD): Faith cannot be inherited; it must be passed down through faithful instruction (Deut 6). The failure of one generation to teach the next led to apostasy.

Verse 11 (Baals): The people turned to the fertility gods of Canaan, hoping for agricultural success, but found only slavery.`
  },
  { 
    week: 13, 
    day: 2, 
    reference: "Judg 3", 
    title: "Othniel and Ehud",
    studyNotes: `Judges 3, Verse 7 (Forgot the LORD): Forgetting God is the root of all sin.

Verse 9 (Cried out): God in his mercy heard the cries of his people, even though their repentance was often shallow.

Verse 15 (Left-handed): God often uses unexpected people and methods (like a left-handed man with a homemade sword) to deliver his people, showing that salvation belongs to the Lord.`
  },
  { 
    week: 13, 
    day: 3, 
    reference: "Judg 4–5", 
    title: "Deborah and Barak",
    studyNotes: `Chapter 4, Verse 9 (Woman): Because Barak hesitated to obey God's command without Deborah's presence, the honor of the victory went to Jael, a woman.

Chapter 5, Verse 20 (Stars): The poetic song of Deborah reveals that God fought for Israel, likely sending a torrential rainstorm that rendered the Canaanite chariots useless in the mud.`
  },
  { 
    week: 13, 
    day: 4, 
    reference: "Judg 6", 
    title: "Gideon's Call",
    studyNotes: `Judges 6, Verse 13 (Where are all his wonders?): Gideon questioned God's presence because of the people's suffering, failing to realize that the suffering was God's discipline for their sin.

Verse 15 (Weakest): God chose the weakest man from the weakest clan to show that the power was not in the vessel but in God.

Verse 24 (The LORD is Peace): Yahweh-Shalom. Peace comes not from compromise with the world, but from being reconciled to God.`
  },
  { 
    week: 13, 
    day: 5, 
    reference: "Judg 7–8", 
    title: "Gideon's Victory",
    studyNotes: `Chapter 7, Verse 2 (Too many): God reduced Gideon's army from 32,000 to 300 to ensure that Israel could not boast in their own strength.

Chapter 8, Verse 23 (The LORD will rule): Gideon rightly refused the kingship, acknowledging that God was Israel's true King. However, his subsequent making of an ephod (v. 27) became a snare, showing that even good leaders are flawed.`
  },

  // Week 14
  { 
    week: 14, 
    day: 1, 
    reference: "Judg 10–12", 
    title: "Jephthah",
    studyNotes: `Chapter 11, Verse 30 (Vow): Jephthah's tragic vow was a result of his ignorance of God's law and his attempt to manipulate God. God desires obedience, not rash promises or human sacrifice.`
  },
  { 
    week: 14, 
    day: 2, 
    reference: "Judg 13", 
    title: "Samson's Birth",
    studyNotes: `Judges 13, Verse 5 (Nazirite): Samson was set apart from birth to be a Nazirite (see Num 6), which involved abstaining from wine, dead bodies, and cutting one's hair. He was meant to be holy to the Lord.

Verse 25 (Stir him): The Spirit of the Lord began to empower Samson, but unlike Othniel or Gideon, Samson often used this power for selfish revenge rather than national deliverance.`
  },
  { 
    week: 14, 
    day: 3, 
    reference: "Judg 14–15", 
    title: "Samson's Riddle",
    studyNotes: `Chapter 14, Verse 3 (Right in my own eyes): This phrase characterizes Samson's life and the entire book of Judges (see 21:25). Samson was driven by his lusts rather than by God's law.

Chapter 15, Verse 15 (Jawbone): Samson's victory was miraculous, but it was also a violation of his Nazirite vow (touching a dead bone). He was a flawed savior.`
  },
  { 
    week: 14, 
    day: 4, 
    reference: "Judg 16", 
    title: "Samson and Delilah",
    studyNotes: `Judges 16, Verse 20 (Left him): This is one of the saddest verses in the Bible. Samson presumed upon God's grace, not realizing that his persistent disobedience had finally resulted in the withdrawal of God's power.

Verse 28 (Remember me): In his final moments, blinded and humbled, Samson finally prayed. God heard him and used his death to destroy the enemies of his people, a faint picture of Christ who destroyed Satan through his own death.`
  },
  { 
    week: 14, 
    day: 5, 
    reference: "Judg 17–21", 
    title: "Moral Chaos",
    studyNotes: `Chapter 17, Verse 6 (No king): The refrain "In those days there was no king in Israel. Everyone did what was right in his own eyes" explains the moral, religious, and political chaos of the period.

Chapter 19: This horrific chapter shows how low Israel had sunk, becoming like Sodom. It highlights the desperate need for a righteous king to establish order and justice.`
  },

  // Week 15
  { 
    week: 15, 
    day: 1, 
    reference: "Ruth 1", 
    title: "Ruth's Loyalty",
    studyNotes: `Ruth 1, Verse 1 (Famine): The famine was likely a judgment from God on the land during the time of the Judges.

Verse 16 (Your God my God): Ruth's conversion is remarkable. She left her people and her gods to embrace Yahweh and his people, showing that God's grace extends to the Gentiles.

Verse 20 (Mara): Naomi ("Pleasant") changed her name to "Bitter," unable to see that God was working behind the scenes for her good.`
  },
  { 
    week: 15, 
    day: 2, 
    reference: "Ruth 2", 
    title: "Ruth Meets Boaz",
    studyNotes: `Ruth 2, Verse 3 (Happened): The narrator uses this phrase to highlight God's providence. Nothing "just happens" in God's world; he guides our steps.

Verse 12 (Wings): Boaz prayed that Ruth would be rewarded by the God under whose wings she had come to take refuge. He then became the answer to his own prayer by providing for her.

Verse 20 (Redeemer): Goel. A kinsman-redeemer had the responsibility to protect the family and property of a relative. Boaz is a type of Christ, our Kinsman-Redeemer.`
  },
  { 
    week: 15, 
    day: 3, 
    reference: "Ruth 3", 
    title: "The Threshing Floor",
    studyNotes: `Ruth 3, Verse 9 (Spread your wings): Ruth asked Boaz to fulfill his prayer (2:12) by marrying her. This was not an immoral act but a formal request for redemption and marriage according to the custom.

Verse 18 (Wait): Faith often requires waiting for God to work.`
  },
  { 
    week: 15, 
    day: 4, 
    reference: "Ruth 4", 
    title: "The Redeemer",
    studyNotes: `Ruth 4, Verse 14 (Not left you): The women praised God for providing a redeemer.

Verse 17 (Obed): The birth of Obed was significant not just for Naomi, but for the world. He was the grandfather of David, and thus an ancestor of Jesus Christ (Matt 1:5). God used a Moabite widow to preserve the line of the Messiah.`
  },
  { 
    week: 15, 
    day: 5, 
    reference: "1 Sam 1", 
    title: "Hannah's Prayer",
    studyNotes: `1 Samuel 1, Verse 6 (Closed her womb): God's sovereignty extends to all areas of life. He closed Hannah's womb to drive her to prayer and to prepare her to dedicate her son to him.

Verse 11 (Give him to the LORD): Hannah vowed that if God gave her a son, she would give him back to God for service in the tabernacle.`
  },

  // Week 16
  { 
    week: 16, 
    day: 1, 
    reference: "1 Sam 2:1–11", 
    title: "Hannah's Song",
    studyNotes: `1 Samuel 2, Verse 1 (Exulted): Hannah's prayer is not just about a baby; it is a prophetic song about God's holiness, knowledge, and power to reverse human fortunes.

Verse 10 (King): Remarkably, Hannah prophesies about a "king" and God's "anointed" (Messiah) long before Israel even had a king. She looked forward to the true King.`
  },
  { 
    week: 16, 
    day: 2, 
    reference: "1 Sam 2:12–3:21", 
    title: "The Call of Samuel",
    studyNotes: `1 Samuel 2, Verse 12 (Worthless): Eli's sons were priests, but they did not know the Lord. Office does not guarantee grace.

Chapter 3, Verse 1 (Rare): The word of the Lord was rare because of the hardness of the people's hearts.

Verse 10 (Speak, for your servant hears): This is the posture of true faith. We must listen to God's Word with a readiness to obey.`
  },
  { 
    week: 16, 
    day: 3, 
    reference: "1 Sam 4–7", 
    title: "The Ark Captured/Returns",
    studyNotes: `1 Samuel 4, Verse 3 (Let us take the ark): The Israelites treated the ark like a lucky charm, thinking its mere presence would save them, regardless of their spiritual condition. God will not be used.

Verse 21 (Ichabod): "The glory has departed." The capture of the ark signified that God's glory had left Israel because of their sin.

Chapter 5, Verse 3 (Dagon): God defended his own glory. The Philistine idol fell prostrate before the ark, showing that Yahweh is the only true God.

Chapter 6, Verse 19 (Struck): The men of Beth-shemesh treated the holy things of God with curiosity rather than reverence. God's holiness is dangerous to sinners.

Chapter 7, Verse 3 (Return): Samuel called for wholehearted repentance, putting away foreign gods.

Verse 12 (Ebenezer): "Stone of help." Samuel set up a memorial to acknowledge that "Till now the LORD has helped us."`
  },
  { 
    week: 16, 
    day: 4, 
    reference: "1 Sam 8", 
    title: "Israel Demands a King",
    studyNotes: `1 Samuel 8, Verse 5 (Like all the nations): Israel's desire for a king was sinful because they wanted to be like the pagan nations around them, rejecting their distinctiveness as God's holy people.

Verse 7 (Rejected me): God told Samuel that their request was ultimately a rejection of God's kingship over them.`
  },
  { 
    week: 16, 
    day: 5, 
    reference: "1 Sam 9–10", 
    title: "Saul Chosen",
    studyNotes: `Chapter 9, Verse 2 (Handsome): Saul looked like a king. He was tall and impressive, fitting the people's desire for a leader who could fight their battles (fleshly standards).

Chapter 10, Verse 6 (Turned into another man): The Spirit empowered Saul for his office, but this does not necessarily imply regeneration (saving faith).`
  },

  // Week 17
  { 
    week: 17, 
    day: 1, 
    reference: "1 Sam 11–12", 
    title: "Saul's Victory",
    studyNotes: `Chapter 11, Verse 13 (Salvation): Saul's reign began well, giving glory to God for the victory.

Chapter 12, Verse 23 (Sin against the LORD): Samuel promised to continue praying for the people and teaching them the good and right way. Prayerlessness is a sin for those in spiritual leadership.

Verse 24 (Consider): The motivation for fearing and serving God is gratitude for the great things he has done for us.`
  },
  { 
    week: 17, 
    day: 2, 
    reference: "1 Sam 13–14", 
    title: "Saul's Disobedience",
    studyNotes: `Chapter 13, Verse 12 (Forced myself): Saul offered the sacrifice unlawfully because he feared the people and lacked faith in God's timing. He tried to justify his disobedience with religious excuses.

Verse 14 (Heart): God sought a man after his own heart—one who would obey his commands. This is the first mention of David.`
  },
  { 
    week: 17, 
    day: 3, 
    reference: "1 Sam 15", 
    title: "To Obey is Better",
    studyNotes: `1 Samuel 15, Verse 3 (Devote to destruction): God commanded the total judgment of the Amalekites for their ancient hostility to Israel.

Verse 9 (Spared): Saul obeyed partially, which is actually disobedience. He kept the best for himself (and "for the Lord," he claimed).

Verse 22 (Obey is better than sacrifice): Religious rituals are worthless without a heart of obedient submission to God's Word. God desires our will, not just our bulls.

Verse 23 (Rebellion): Rebellion is as serious as witchcraft because it is an attempt to control one's own destiny apart from God.`
  },
  { 
    week: 17, 
    day: 4, 
    reference: "1 Sam 16", 
    title: "David Anointed",
    studyNotes: `1 Samuel 16, Verse 7 (Look on the heart): God's criteria for leadership are different from man's. Man looks at the outward appearance (as they did with Saul), but God looks at the heart (faith and character).

Verse 13 (Spirit rushed upon David): Unlike Saul, the Spirit's presence with David would remain. David is the true Anointed One (Messiah) who typifies Christ.`
  },
  { 
    week: 17, 
    day: 5, 
    reference: "1 Sam 17", 
    title: "David and Goliath",
    studyNotes: `1 Samuel 17, Verse 26 (Defy the armies): While everyone else saw a giant, David saw a blasphemer defying the living God. David's confidence was not in his sling, but in the name of the LORD (v. 45).

Verse 47 (Battle is the LORD's): This is the central theme of the narrative. Victory comes from God, not from swords or spears.`
  },

  // Week 18
  { 
    week: 18, 
    day: 1, 
    reference: "1 Sam 18–19", 
    title: "David and Jonathan",
    studyNotes: `Chapter 18, Verse 1 (Loved him): The covenant friendship between David and Jonathan is a model of loyalty and sacrificial love. Jonathan, the heir to the throne, willingly stepped aside for God's anointed.

Verse 7 (Ten thousands): Saul's jealousy was ignited by David's success. Jealousy is a rot that destroys the soul.

Chapter 19, Verse 12 (Let David down): Michal, Saul's daughter, loved David and helped him escape, showing that God was protecting David even through Saul's own family.`
  },
  { 
    week: 18, 
    day: 2, 
    reference: "1 Sam 20", 
    title: "David Flees",
    studyNotes: `1 Samuel 20, Verse 3 (Step between me and death): David lived in constant danger, yet he trusted in God.

Verse 42 (Go in peace): Jonathan and David parted in sorrow, but their covenant remained unbroken.`
  },
  { 
    week: 18, 
    day: 3, 
    reference: "1 Sam 21–22", 
    title: "David at Nob",
    studyNotes: `Chapter 21, Verse 6 (Holy bread): Jesus refers to this incident (Matt 12:3-4) to teach that ceremonial laws (like temple bread) are subservient to moral laws (preservation of life).

Chapter 22, Verse 2 (Distress): David became the captain of a motley crew of outcasts. This pictures Christ, who receives sinners and makes them into a kingdom of priests.`
  },
  { 
    week: 18, 
    day: 4, 
    reference: "1 Sam 23–24", 
    title: "David Spares Saul",
    studyNotes: `Chapter 23, Verse 16 (Strengthened his hand in God): Jonathan encouraged David by reminding him of God's promises. We need friends who point us to God.

Chapter 24, Verse 6 (Touch the LORD's anointed): David refused to kill Saul even when he had the chance, entrusting vengeance to God. He respected the office even when the man holding it was wicked.`
  },
  { 
    week: 18, 
    day: 5, 
    reference: "1 Sam 25", 
    title: "David and Abigail",
    studyNotes: `1 Samuel 25, Verse 25 (Nabal): His name means "Fool," and he acted like one.

Verse 32 (Blessed be the LORD): David recognized that Abigail's intervention was God's restraining grace, keeping him from bloodguilt.`
  },

  // Week 19
  { 
    week: 19, 
    day: 1, 
    reference: "1 Sam 26", 
    title: "David Spares Saul Again",
    studyNotes: `1 Samuel 26, Verse 9 (Who can put out his hand): David maintained his integrity, waiting for God's time to exalt him rather than grasping for power himself.`
  },
  { 
    week: 19, 
    day: 2, 
    reference: "1 Sam 27–28", 
    title: "Philistines and Witches",
    studyNotes: `Chapter 27, Verse 1 (I shall perish): David had a moment of weak faith, fearing Saul more than trusting God, leading him to hide among the Philistines.

Chapter 28, Verse 7 (Medium): Saul's consultation of a medium shows his total spiritual bankruptcy.

Verse 19 (With me): Samuel (or an apparition sent by God) pronounced final judgment on Saul.`
  },
  { 
    week: 19, 
    day: 3, 
    reference: "1 Sam 29–30", 
    title: "Ziklag",
    studyNotes: `1 Samuel 30, Verse 6 (Strengthened himself in the LORD): When David lost everything and his own men wanted to stone him, he found his strength in his covenant God. This is the turning point.`
  },
  { 
    week: 19, 
    day: 4, 
    reference: "1 Sam 31", 
    title: "The Death of Saul",
    studyNotes: `1 Samuel 31, Verse 4 (Fall upon his sword): Saul's tragic end was a result of his rebellion against God (1 Chron 10:13-14). It cleared the way for David to become king, not by murder, but by divine providence.`
  },
  { 
    week: 19, 
    day: 5, 
    reference: "2 Sam 1", 
    title: "David Laments",
    studyNotes: `2 Samuel 1, Verse 19 (How the mighty have fallen): David's song for Saul and Jonathan shows his lack of bitterness and his genuine love. He honored Saul as God's anointed.`
  },

  // Week 20
  { 
    week: 20, 
    day: 1, 
    reference: "2 Sam 2–4", 
    title: "King of Judah",
    studyNotes: `Chapter 2, Verse 4 (King over Judah): David's kingship began partially (only one tribe), requiring patience for the full promise to be realized.

Chapter 3, Verse 1 (Stronger): The house of David grew stronger while the house of Saul grew weaker, symbolizing the triumph of God's kingdom over the kingdom of man.`
  },
  { 
    week: 20, 
    day: 2, 
    reference: "2 Sam 5", 
    title: "King of Israel",
    studyNotes: `2 Samuel 5, Verse 2 (Shepherd): David is the first ruler called a shepherd of God's people, a title that points forward to Jesus, the Good Shepherd.

Verse 7 (Zion): David conquered Jerusalem and made it the center of worship and rule. Zion becomes a key theological symbol for God's dwelling place.`
  },
  { 
    week: 20, 
    day: 3, 
    reference: "2 Sam 6", 
    title: "The Ark to Zion",
    studyNotes: `2 Samuel 6, Verse 7 (Uzzah): Uzzah's death was a reminder that God is holy and must be worshiped according to his rules, not our good intentions. They had transported the ark on a cart (Philistine method) rather than on poles (God's method).

Verse 14 (Danced): David's undignified worship showed his humble heart. He was more concerned with God's glory than his own reputation.`
  },
  { 
    week: 20, 
    day: 4, 
    reference: "2 Sam 7", 
    title: "The Davidic Covenant",
    studyNotes: `2 Samuel 7, Verse 2 (House of cedar): David wanted to build God a house (temple).

Verse 11 (Make you a house): God turned it around and promised to build David a "house" (dynasty).

Verse 13 (Establish the throne forever): This is the Davidic Covenant. God promised that a son of David would reign on his throne forever. While partially fulfilled in Solomon, this finds its ultimate fulfillment only in Jesus Christ, the eternal Son of David (Luke 1:32-33).`
  },
  { 
    week: 20, 
    day: 5, 
    reference: "2 Sam 9", 
    title: "Kindness to Mephibosheth",
    studyNotes: `2 Samuel 9, Verse 1 (For Jonathan's sake): David's kindness to Mephibosheth was based on his covenant with Jonathan, not on Mephibosheth's merit. This illustrates God's grace to us for Christ's sake.

Verse 3 (Kindness of God): David viewed his actions as an extension of God's hesed (covenant love).

Verse 7 (Restore): Mephibosheth, a crippled outcast from the house of a former enemy, was restored and given a seat at the king's table. We, too, are crippled by sin but are invited to feast at the King's table.`
  },

  // Week 21
  { 
    week: 21, 
    day: 1, 
    reference: "2 Sam 11", 
    title: "David and Bathsheba",
    studyNotes: `2 Samuel 11, Verse 1 (When kings go out to battle): David's sin began with idleness and neglecting his duty. Spiritual sloth often precedes moral failure.

Verse 4 (Took her): David abused his power to take what belonged to another. One sin (lust) quickly led to others (adultery, deception, and murder).

Verse 27 (Displeased the LORD): David thought he had covered his tracks, but he could not hide from God. God sees all things.`
  },
  { 
    week: 21, 
    day: 2, 
    reference: "2 Sam 12; Ps 32", 
    title: "Nathan Rebukes David",
    studyNotes: `2 Samuel 12, Verse 7 (You are the man): Nathan boldly confronted the king. The Word of God cuts to the heart.

Verse 13 (I have sinned): Unlike Saul, who made excuses, David immediately confessed his sin.

Verse 13 (Put away your sin): God's forgiveness was immediate, but the consequences remained (v. 14). Grace cancels guilt, but it does not always remove temporal discipline.

Psalm 32, Verse 3 (Silent): David describes the physical and spiritual agony of unconfessed sin.

Verse 5 (Forgave): The joy of forgiveness follows the pain of confession.`
  },
  { 
    week: 21, 
    day: 3, 
    reference: "2 Sam 13", 
    title: "Amnon and Tamar",
    studyNotes: `2 Samuel 13, Verse 15 (Hated her): Sinful lust is selfish; once gratified, it often turns to hatred. Amnon's sin destroyed Tamar's life and eventually cost him his own.

Verse 21 (Angry): David was angry but did nothing to discipline his son, perhaps because his own conscience was burdened by his past sin. Passive fathers leave room for sin to grow in the home.`
  },
  { 
    week: 21, 
    day: 4, 
    reference: "2 Sam 14–15", 
    title: "Absalom's Conspiracy",
    studyNotes: `Chapter 14, Verse 14 (Means): The woman of Tekoa spoke a profound truth: God devises means to bring his banished ones back to him. This points to the gospel.

Chapter 15, Verse 6 (Stole the hearts): Absalom was a master manipulator, using charm to undermine his father's authority.

Verse 26 (Let him do): David submitted to God's sovereignty. He knew he deserved judgment and entrusted himself to God's will, whether for life or death.`
  },
  { 
    week: 21, 
    day: 5, 
    reference: "2 Sam 16; Ps 3", 
    title: "David Flees",
    studyNotes: `2 Samuel 16, Verse 10 (Let him curse): David accepted Shimei's cursing as potentially coming from the Lord as discipline. He did not retaliate.

Psalm 3, Verse 3 (Shield): Even while fleeing from his own son, David knew that Yahweh was his protector and the one who lifted his head.

Verse 8 (Salvation belongs to the LORD): In the midst of danger, David rested in the truth that deliverance comes only from God.`
  },

  // Week 22
  { 
    week: 22, 
    day: 1, 
    reference: "2 Sam 17", 
    title: "Ahithophel and Hushai",
    studyNotes: `2 Samuel 17, Verse 14 (Defeat the counsel): God sovereignly influenced the minds of the leaders to reject Ahithophel's smart advice and accept Hushai's bad advice, in order to bring disaster on Absalom. God rules in the councils of men.`
  },
  { 
    week: 22, 
    day: 2, 
    reference: "2 Sam 18", 
    title: "Absalom's Death",
    studyNotes: `2 Samuel 18, Verse 33 (O Absalom, my son): David's cry is one of the most heart-wrenching in Scripture. He would have died in his rebel son's place. This reflects the heart of God, who actually did die for his rebellious children.`
  },
  { 
    week: 22, 
    day: 3, 
    reference: "2 Sam 19", 
    title: "David Returns",
    studyNotes: `2 Samuel 19, Verse 14 (Turned the hearts): David won back the hearts of his people through forgiveness and conciliation, not revenge.

Verse 34 (How many years): Barzillai, an old man, had no desire for the world's luxuries. He modeled contentment and generosity.`
  },
  { 
    week: 22, 
    day: 4, 
    reference: "2 Sam 20", 
    title: "Sheba's Rebellion",
    studyNotes: `2 Samuel 20, Verse 1 (No portion in David): The cracks in the kingdom were already showing. This tribal jealousy would eventually lead to the divided kingdom after Solomon.

Verse 19 (Mother in Israel): A wise woman saved her city by decisive action. Wisdom is better than weapons of war (Eccl 9:18).`
  },
  { 
    week: 22, 
    day: 5, 
    reference: "2 Sam 21", 
    title: "The Gibeonites",
    studyNotes: `2 Samuel 21, Verse 1 (Bloodguilt): Saul's zeal had been nationalistic, not godly, leading him to break Israel's oath to the Gibeonites. God remembers covenants, even those made centuries prior.

Verse 14 (God responded to the plea): Atonement was necessary to remove the curse from the land.`
  },

  // Week 23
  { 
    week: 23, 
    day: 1, 
    reference: "2 Sam 22", 
    title: "David's Song of Deliverance",
    studyNotes: `2 Samuel 22, Verse 2 (Rock): David piles up metaphors to describe God's protection: rock, fortress, deliverer, shield, horn, stronghold, refuge, savior.

Verse 31 (Word of the LORD proves true): God's way is perfect. His promises have been tested in the fire of David's life and found faithful.`
  },
  { 
    week: 23, 
    day: 2, 
    reference: "2 Sam 23", 
    title: "David's Mighty Men",
    studyNotes: `2 Samuel 23, Verse 5 (Everlasting covenant): In his last words, David rests his hope not on his own imperfect rule, but on God's everlasting covenant with him.

Verse 16 (Poured it out): David refused to drink water that was obtained at the risk of his men's lives, offering it as a drink offering to the Lord. He valued life and honored God above his own desires.`
  },
  { 
    week: 23, 
    day: 3, 
    reference: "2 Sam 24", 
    title: "The Census",
    studyNotes: `2 Samuel 24, Verse 1 (Incited): God incited David to number the people as judgment (sovereignty), yet 1 Chronicles 21:1 says Satan stood up against Israel (secondary cause). David's sin was pride and trust in military might rather than God.

Verse 24 (Cost me nothing): True worship involves sacrifice. We cannot give God what costs us nothing.`
  },
  { 
    week: 23, 
    day: 4, 
    reference: "1 Kings 1", 
    title: "Adonijah Sets Himself Up",
    studyNotes: `1 Kings 1, Verse 5 (I will be king): Like Absalom, Adonijah tried to seize the throne. Those who exalt themselves will be humbled.

Verse 30 (Solomon shall sit): David confirmed God's choice of Solomon. The promise would continue through the chosen seed, not necessarily the oldest.`
  },
  { 
    week: 23, 
    day: 5, 
    reference: "1 Kings 2", 
    title: "David's Charge and Death",
    studyNotes: `1 Kings 2, Verse 2 (Be strong): David charged Solomon to keep God's law. The success of the king depended on his obedience to the Torah (Deut 17).

Verse 12 (Established): The transition of power was successful because it was of the Lord.`
  },

  // Week 24
  { 
    week: 24, 
    day: 1, 
    reference: "1 Kings 3; Prov 1", 
    title: "Solomon's Wisdom",
    studyNotes: `1 Kings 3, Verse 9 (Understanding mind): Solomon asked for wisdom to govern God's people, which pleased the Lord. Wisdom is the skill to live and lead according to God's character.

Proverbs 1, Verse 7 (Fear of the LORD): This is the motto of the book of Proverbs. True knowledge begins with a submissive reverence for God.`
  },
  { 
    week: 24, 
    day: 2, 
    reference: "1 Kings 4; Prov 2–4", 
    title: "Solomon's Administration",
    studyNotes: `1 Kings 4, Verse 25 (Vine and fig tree): This phrase symbolizes peace, prosperity, and security—a foretaste of the Messianic kingdom.

Proverbs 3, Verse 5 (Trust in the LORD): We must rely on God's infinite wisdom rather than our own limited understanding.

Proverbs 4, Verse 23 (Keep your heart): The heart is the control center of life. It must be guarded diligently against sin.`
  },
  { 
    week: 24, 
    day: 3, 
    reference: "1 Kings 5–6", 
    title: "Building the Temple",
    studyNotes: `1 Kings 5, Verse 5 (Build a house): Solomon fulfilled the task David could not. The temple was to be a place for God's name to dwell.

1 Kings 6, Verse 7 (Silence): The stones were prepared off-site so that no hammer was heard at the temple. This suggests the reverence and order required in God's work.`
  },
  { 
    week: 24, 
    day: 4, 
    reference: "1 Kings 8", 
    title: "Dedication of the Temple",
    studyNotes: `1 Kings 8, Verse 27 (Cannot contain you): Solomon acknowledged God's transcendence. Even the highest heaven cannot contain him, yet he graciously chose to dwell among his people.

Verse 46 (No one who does not sin): Solomon's prayer anticipated Israel's future sin and exile, asking God for forgiveness upon their repentance.`
  },
  { 
    week: 24, 
    day: 5, 
    reference: "1 Kings 9", 
    title: "God Appears to Solomon",
    studyNotes: `1 Kings 9, Verse 4 (If you will walk): The promises to Solomon were conditional on his obedience. If he turned aside, the temple would become a heap of ruins. Privilege brings responsibility.`
  },

  // Week 25
  { 
    week: 25, 
    day: 1, 
    reference: "1 Kings 10", 
    title: "The Queen of Sheba",
    studyNotes: `1 Kings 10, Verse 9 (Blessed be the LORD): Solomon's wisdom and wealth caused a pagan queen to bless Yahweh. Israel was meant to be a light to the nations.

Verse 23 (Excelled): Solomon's glory was the peak of Israel's history, yet Jesus said that he is "greater than Solomon" (Matt 12:42).`
  },
  { 
    week: 25, 
    day: 2, 
    reference: "1 Kings 11", 
    title: "Solomon's Apostasy",
    studyNotes: `1 Kings 11, Verse 4 (Turned away his heart): Solomon's many foreign wives led him into idolatry. He broke God's law for kings (Deut 17:17).

Verse 9 (Angry): God's judgment was swift. The kingdom would be torn away from his son.`
  },
  { 
    week: 25, 
    day: 3, 
    reference: "1 Kings 12", 
    title: "The Kingdom Divides",
    studyNotes: `1 Kings 12, Verse 7 (Servant): The elders advised Rehoboam to be a servant-leader, but he chose tyranny.

Verse 15 (Turn of affairs was from the LORD): The division of the kingdom was caused by Rehoboam's foolishness, yet it was also the fulfillment of God's word (sovereignty and responsibility).

Verse 28 (Calves): Jeroboam established false worship to keep control, leading Israel into a sin that would plague them for centuries.`
  },
  { 
    week: 25, 
    day: 4, 
    reference: "1 Kings 13–14", 
    title: "Jeroboam's Sin",
    studyNotes: `Chapter 13, Verse 2 (Josiah): A prophet predicted the birth and actions of Josiah by name, 300 years before he was born. God controls the future.

Chapter 14, Verse 9 (Cast me behind your back): Idolatry is an act of despising God.`
  },
  { 
    week: 25, 
    day: 5, 
    reference: "1 Kings 15", 
    title: "Abijam and Asa",
    studyNotes: `1 Kings 15, Verse 11 (Asa did what was right): Asa was the first good king of Judah after the division. He removed idols, though the high places were not taken away. Reformation is often a struggle.

Verse 14 (Heart was wholly true): Despite his failures, Asa's fundamental orientation was toward God.`
  },

  // Week 26
  { 
    week: 26, 
    day: 1, 
    reference: "1 Kings 16", 
    title: "Kings of Israel",
    studyNotes: `1 Kings 16, Verse 31 (Jezebel): Ahab did more evil than all before him by marrying Jezebel and officially establishing Baal worship in Israel.

Verse 34 (Cost of his firstborn): The rebuilding of Jericho cost Hiel his sons, fulfilling Joshua's curse (Josh 6:26). God's threatenings are as sure as his promises.`
  },
  { 
    week: 26, 
    day: 2, 
    reference: "1 Kings 17", 
    title: "Elijah and the Widow",
    studyNotes: `1 Kings 17, Verse 1 (No dew or rain): Elijah pronounced judgment on Baal, the supposed god of storm and rain. Yahweh controls the weather.

Verse 14 (Jar of flour): God miraculously provided for his prophet and a Gentile widow, showing that his grace is not limited to national Israel (Luke 4:25-26).

Verse 24 (Word of the LORD): The resurrection of her son confirmed that Elijah spoke the true Word of God.`
  },
  { 
    week: 26, 
    day: 3, 
    reference: "1 Kings 18", 
    title: "Elijah on Carmel",
    studyNotes: `1 Kings 18, Verse 21 (Limping): Elijah challenged the people to stop wavering between two opinions. Syncretism (mixing religions) is unacceptable to God.

Verse 37 (Turn their hearts back): The fire from heaven proved that Yahweh is God, and the purpose of the miracle was the revival of the people's hearts.`
  },
  { 
    week: 26, 
    day: 4, 
    reference: "1 Kings 19", 
    title: "Elijah Flees",
    studyNotes: `1 Kings 19, Verse 4 (Take away my life): Great victories are often followed by great discouragement. Elijah was human and frail (James 5:17).

Verse 12 (Low whisper): God was not in the wind, earthquake, or fire, but in the "sound of thin silence." God often works not through dramatic displays but through the quiet operation of his Word.

Verse 18 (Seven thousand): Elijah thought he was alone, but God had preserved a remnant by his grace (Rom 11:4).`
  },
  { 
    week: 26, 
    day: 5, 
    reference: "1 Kings 20", 
    title: "Ahab's Wars",
    studyNotes: `1 Kings 20, Verse 28 (God of the hills): The Syrians thought Yahweh was a local deity. God gave Israel victory to prove that he is God of the whole earth.

Verse 42 (You have let go): Ahab showed false mercy to Ben-hadad, an enemy devoted to destruction.`
  },

  // Week 27
  { 
    week: 27, 
    day: 1, 
    reference: "1 Kings 21", 
    title: "Naboth's Vineyard",
    studyNotes: `1 Kings 21, Verse 3 (Forbidden): Naboth refused to sell his inheritance because he feared God's law more than the king.

Verse 19 (Dogs lick your blood): Elijah pronounced doom on Ahab and Jezebel for their judicial murder of Naboth. God is the avenger of the oppressed.

Verse 29 (Humbled himself): Even Ahab's temporary, external repentance was noticed by God, delaying the judgment. God is incredibly patient.`
  },
  { 
    week: 27, 
    day: 2, 
    reference: "1 Kings 22", 
    title: "Micaiah Prophesies",
    studyNotes: `1 Kings 22, Verse 14 (What the LORD says): Micaiah refused to be a "yes-man" like the false prophets. He spoke the truth even when it was unpopular.

Verse 34 (At random): A soldier shot an arrow "at random," but it was guided by God's hand to strike Ahab exactly as prophesied. There are no accidents in God's universe.`
  },
  { 
    week: 27, 
    day: 3, 
    reference: "2 Chron 17–20", 
    title: "Jehoshaphat",
    studyNotes: `Chapter 17, Verse 9 (Book of the Law): Jehoshaphat sent Levites to teach the people the law. Revival is based on biblical education.

Chapter 20, Verse 12 (We do not know what to do): Jehoshaphat's prayer is a model of dependence: "Our eyes are on you."`
  },
  { 
    week: 27, 
    day: 4, 
    reference: "2 Kings 1–2", 
    title: "Elijah Taken Up",
    studyNotes: `Chapter 2, Verse 9 (Double portion): Elisha asked to be the successor (the firstborn son's portion) to Elijah's ministry.

Verse 11 (Chariots of fire): Elijah did not see death but was taken to heaven, a preview of the future translation of believers.`
  },
  { 
    week: 27, 
    day: 5, 
    reference: "2 Kings 3", 
    title: "War with Moab",
    studyNotes: `2 Kings 3, Verse 14 (Regard the presence): Elisha only helped the ungodly kings because of the presence of Jehoshaphat. Believers are often a source of blessing to the ungodly world.`
  },

  // Week 28
  { 
    week: 28, 
    day: 1, 
    reference: "2 Kings 4", 
    title: "The Widow's Oil",
    studyNotes: `2 Kings 4, Verse 7 (Pay your debts): God cares about the physical needs of his people.

Verse 26 (It is well): The Shunammite woman's faith in the face of her son's death is remarkable. She believed God could restore him.`
  },
  { 
    week: 28, 
    day: 2, 
    reference: "2 Kings 5", 
    title: "Naaman Healed",
    studyNotes: `2 Kings 5, Verse 11 (Naaman was angry): The gospel is offensive to human pride. Naaman wanted to do something great, but he had to simply wash and be clean. Salvation is by grace, not works.

Verse 15 (No God in all the earth): Naaman's healing led to monotheistic faith.

Verse 26 (Heart go with you): Gehazi tried to monetize the grace of God and inherited Naaman's leprosy. Greed in ministry is a deadly sin.`
  },
  { 
    week: 28, 
    day: 3, 
    reference: "2 Kings 6", 
    title: "The Floating Axe Head",
    studyNotes: `2 Kings 6, Verse 16 (Those who are with us): Elisha prayed that his servant's eyes would be opened to see the invisible army of angels protecting them. Faith sees the reality of the spiritual world.`
  },
  { 
    week: 28, 
    day: 4, 
    reference: "2 Kings 7", 
    title: "Famine and Plenty",
    studyNotes: `2 Kings 7, Verse 9 (Day of good news): The lepers realized they could not keep the news of the victory to themselves. This is a picture of evangelism: we are beggars telling other beggars where to find bread.

Verse 20 (Trampled): The official who doubted God's word saw the fulfillment but did not partake in it, a warning against unbelief.`
  },
  { 
    week: 28, 
    day: 5, 
    reference: "2 Kings 8", 
    title: "The Shunammite Woman",
    studyNotes: `2 Kings 8, Verse 5 (While he was telling): God's providence timed the woman's arrival perfectly to confirm Gehazi's story and restore her land.

Verse 12 (Wept): Elisha wept because he knew the evil Hazael would do to Israel. God uses wicked men as rods of discipline.`
  },

  // Week 29
  { 
    week: 29, 
    day: 1, 
    reference: "2 Kings 9", 
    title: "Jehu Anointed",
    studyNotes: `2 Kings 9, Verse 6 (Anoint you king): Jehu was raised up as an instrument of divine judgment against the house of Ahab.

Verse 22 (What peace?): There can be no peace with God while idolatry and sin persist.

Verse 36 (Word of the LORD): The gruesome death of Jezebel fulfilled Elijah's prophecy precisely.`
  },
  { 
    week: 29, 
    day: 2, 
    reference: "2 Kings 10", 
    title: "Jehu's Purge",
    studyNotes: `2 Kings 10, Verse 16 (Zeal for the LORD): Jehu had great zeal against Baal, but he lacked true love for God (v. 31). He destroyed Baal worship but kept the golden calves of Jeroboam. Zeal without knowledge or obedience is dangerous.`
  },
  { 
    week: 29, 
    day: 3, 
    reference: "2 Kings 11", 
    title: "Athaliah and Joash",
    studyNotes: `2 Kings 11, Verse 1 (Destroyed): Athaliah, the daughter of Jezebel, tried to wipe out the line of David. Satan has always tried to destroy the seed of the woman.

Verse 12 (Crown): Joash was preserved in the temple, the lamp of David flickering but not extinguished.`
  },
  { 
    week: 29, 
    day: 4, 
    reference: "2 Kings 12", 
    title: "Joash Repairs the Temple",
    studyNotes: `2 Kings 12, Verse 2 (Instructed him): Joash did well as long as he was mentored by Jehoiada the priest. His faith was second-hand, as his later apostasy proved (2 Chron 24).`
  },
  { 
    week: 29, 
    day: 5, 
    reference: "2 Kings 13", 
    title: "Jehoahaz and Jehoash",
    studyNotes: `2 Kings 13, Verse 23 (Gracious): Even in the midst of Israel's apostasy, God was gracious to them because of his covenant with Abraham. God's faithfulness rests on his own character, not ours.`
  },

  // Week 30
  { 
    week: 30, 
    day: 1, 
    reference: "2 Kings 14", 
    title: "Amaziah and Jeroboam II",
    studyNotes: `2 Kings 14, Verse 25 (Jonah): The prophet Jonah ministered during the reign of Jeroboam II, when Israel experienced a temporary political resurgence before its final fall.`
  },
  { 
    week: 30, 
    day: 2, 
    reference: "2 Kings 15", 
    title: "Azariah and Jotham",
    studyNotes: `2 Kings 15, Verse 5 (Leper): Azariah (Uzziah) was a good king, but he became proud and intruded into the priestly office (2 Chron 26), resulting in leprosy. God resists the proud.`
  },
  { 
    week: 30, 
    day: 3, 
    reference: "2 Kings 16", 
    title: "Ahaz",
    studyNotes: `2 Kings 16, Verse 3 (Burned his son): Ahaz was one of Judah's worst kings, reviving the Canaanite practice of child sacrifice.

Verse 10 (Altar): He replaced God's altar with a pagan altar, corrupting the worship of God.`
  },
  { 
    week: 30, 
    day: 4, 
    reference: "2 Kings 17", 
    title: "The Fall of Israel",
    studyNotes: `2 Kings 17, Verse 7 (Sinned against the LORD): The writer gives the theological reason for the exile: it was not political weakness, but spiritual rebellion.

Verse 15 (Despised his statutes): They rejected God's Word and followed the nations.

Verse 23 (Removed Israel out of his sight): God's patience finally ran out, and the northern kingdom was destroyed. This stands as a sober warning that God will judge unrepentant sin.`
  },
  { 
    week: 30, 
    day: 5, 
    reference: "2 Kings 18; 2 Chron 29", 
    title: "Hezekiah's Reform",
    studyNotes: `2 Kings 18, Verse 4 (Nehushtan): Hezekiah destroyed the bronze serpent because the people had turned a good thing (a means of God's grace in the past) into an idol. Anything we trust in more than God must be removed.

Verse 7 (The LORD was with him): Success is defined by the presence of God.

2 Chronicles 29, Verse 10 (Covenant): Hezekiah understood that the troubles of the nation were due to their breach of the covenant, so he led them in covenant renewal.`
  },

  // Week 31
  { 
    week: 31, 
    day: 1, 
    reference: "2 Chron 30", 
    title: "The Passover",
    studyNotes: `2 Chronicles 30, Verse 1 (All Israel): Hezekiah invited the remnant of the northern kingdom to join them for Passover. True worship unites God's people.

Verse 19 (Sets his heart): Hezekiah prayed for those who were not ceremonially clean but had set their hearts to seek God. God looks at the heart more than the ritual.`
  },
  { 
    week: 31, 
    day: 2, 
    reference: "2 Kings 18–19; Isa 36–37", 
    title: "Sennacherib's Threat",
    studyNotes: `2 Kings 18, Verse 30 (Do not let Hezekiah make you trust): The enemy always attacks our faith. The Assyrian king mocked their trust in Yahweh.

2 Kings 19, Verse 14 (Spread it before the LORD): When faced with a terrifying letter, Hezekiah took it directly to God in prayer.

Verse 19 (You alone are God): Hezekiah's concern was for God's glory, not just his own safety.`
  },
  { 
    week: 31, 
    day: 3, 
    reference: "2 Kings 20; Isa 38", 
    title: "Hezekiah's Illness",
    studyNotes: `2 Kings 20, Verse 5 (I have heard your prayer): God graciously extended Hezekiah's life in answer to prayer.

Verse 13 (Showed them): Hezekiah pridefully showed off his wealth to the Babylonians, leading to Isaiah's prophecy of the future exile to Babylon. Even good men can fall into pride.`
  },
  { 
    week: 31, 
    day: 4, 
    reference: "2 Kings 21; 2 Chron 33", 
    title: "Manasseh",
    studyNotes: `2 Kings 21, Verse 9 (More evil): Manasseh led Judah to be worse than the Canaanites God had destroyed.

2 Chronicles 33, Verse 12 (Humbled himself): Remarkably, this wicked king repented in his distress, and God heard him. This shows the incredible depth of God's mercy.`
  },
  { 
    week: 31, 
    day: 5, 
    reference: "2 Kings 22–23", 
    title: "Josiah's Reform",
    studyNotes: `Chapter 22, Verse 8 (Book of the Law): The Word of God had been lost in the house of God. When it was found and read, it led to conviction and reformation.

Chapter 23, Verse 25 (Turned to the LORD): Josiah is commended for turning to the Lord with all his heart, soul, and might (Deut 6:5). He is a model of wholehearted devotion.`
  },

  // Week 32
  { 
    week: 32, 
    day: 1, 
    reference: "Jer 1", 
    title: "Jeremiah's Call",
    studyNotes: `Jeremiah 1, Verse 5 (Before I formed you): God's call on Jeremiah's life predated his birth. God has a sovereign plan for his servants.

Verse 9 (Put my words in your mouth): The authority of the prophet comes entirely from speaking God's words, not his own opinions.`
  },
  { 
    week: 32, 
    day: 2, 
    reference: "Jer 2", 
    title: "The Broken Cisterns",
    studyNotes: `Jeremiah 2, Verse 13 (Two evils): Sin is described as forsaking the fountain of living waters (God) and hewing out broken cisterns (idols) that can hold no water. Sin is seeking satisfaction in things that cannot satisfy.`
  },
  { 
    week: 32, 
    day: 3, 
    reference: "Jer 7", 
    title: "The Temple Sermon",
    studyNotes: `Jeremiah 7, Verse 4 (Temple of the LORD): The people trusted in the external building and rituals ("The temple of the LORD") while living in sin. Jeremiah warned that religious symbols cannot save us from judgment if we do not obey God.`
  },
  { 
    week: 32, 
    day: 4, 
    reference: "Jer 18–19", 
    title: "The Potter and the Clay",
    studyNotes: `Chapter 18, Verse 6 (Potter): God has sovereign rights over nations just as a potter has over clay. He can mold them or destroy them as he sees fit.

Chapter 19, Verse 11 (Break this people): Jeremiah smashed a flask to symbolize the irreversible judgment coming upon Jerusalem.`
  },
  { 
    week: 32, 
    day: 5, 
    reference: "Jer 36", 
    title: "Jehoiakim and the Scroll",
    studyNotes: `Jeremiah 36, Verse 23 (Cut it): King Jehoiakim showed his contempt for God's Word by cutting up the scroll and burning it. But burning the Bible does not destroy its truth; Jeremiah simply wrote it again (v. 32).`
  },

  // Week 33
  { 
    week: 33, 
    day: 1, 
    reference: "2 Kings 24–25", 
    title: "The Siege",
    studyNotes: `2 Kings 25, Verse 9 (Burned the house of the LORD): The unthinkable happened. The temple was destroyed because the people had polluted it with their sins. God is not bound to a building.

Verse 27 (Lifted up the head): The book ends with a glimmer of hope. Jehoiachin, the Davidic king, is released from prison and given a seat at the table. The line of David continues.`
  },
  { 
    week: 33, 
    day: 2, 
    reference: "Jer 31", 
    title: "The New Covenant",
    studyNotes: `Jeremiah 31, Verse 31 (New covenant): The old covenant (Mosaic) was broken by the people. Jeremiah predicts a new covenant that will not be external but internal ("written on their hearts").

Verse 34 (Forgive their iniquity): The foundation of the new covenant is the full and final forgiveness of sins.`
  },
  { 
    week: 33, 
    day: 3, 
    reference: "Lam 3", 
    title: "Lamentations",
    studyNotes: `Lamentations 3, Verse 22 (Steadfast love): In the middle of the book of mourning, Jeremiah declares that God's mercies are new every morning. Great is his faithfulness.

Verse 33 (Does not afflict from his heart): Judgment is God's "strange work" (Isa 28:21); he delights in mercy.`
  },
  { 
    week: 33, 
    day: 4, 
    reference: "Ezek 1–3", 
    title: "Ezekiel's Call",
    studyNotes: `Chapter 1, Verse 28 (Likeness of the glory): Ezekiel saw a vision of God's glory in Babylon, showing that God is not confined to Jerusalem.

Chapter 2, Verse 7 (Whether they hear or refuse): Success in ministry is defined by faithfulness to the message, not by the response of the audience.`
  },
  { 
    week: 33, 
    day: 5, 
    reference: "Ezek 37", 
    title: "The Valley of Dry Bones",
    studyNotes: `Ezekiel 37, Verse 4 (Prophesy to these bones): The power to give life belongs to God alone. Preaching is speaking God's word to spiritually dead people, trusting the Spirit to give life.

Verse 14 (Put my Spirit within you): This prophecy looks forward to the regeneration of Israel and the giving of the Holy Spirit.`
  },

  // Week 34
  { 
    week: 34, 
    day: 1, 
    reference: "Dan 1", 
    title: "Daniel's Training",
    studyNotes: `Daniel 1, Verse 8 (Resolved): Daniel made a decision in his heart not to defile himself with the king's food. Conviction precedes action.

Verse 9 (God gave Daniel favor): Daniel's success was due to God's sovereign blessing.`
  },
  { 
    week: 34, 
    day: 2, 
    reference: "Dan 2", 
    title: "Nebuchadnezzar's Dream",
    studyNotes: `Daniel 2, Verse 21 (Removes kings and sets up kings): God is sovereign over history and politics.

Verse 44 (Kingdom that shall never be destroyed): The dream predicts the coming of the Kingdom of God (the stone cut without hands), which will destroy all human empires and last forever.`
  },
  { 
    week: 34, 
    day: 3, 
    reference: "Dan 3", 
    title: "The Fiery Furnace",
    studyNotes: `Daniel 3, Verse 18 (But if not): Shadrach, Meshach, and Abednego trusted God to deliver them, but their faith was not dependent on the outcome. They would not serve idols even if it cost them their lives.

Verse 25 (Son of the gods): God was with them in the fire. He does not always save us from trouble, but he is with us in it.`
  },
  { 
    week: 34, 
    day: 4, 
    reference: "Dan 5", 
    title: "The Writing on the Wall",
    studyNotes: `Daniel 5, Verse 23 (Weighed in the balances): Belshazzar was arrogant and failed to honor God. His kingdom was judged and given to the Medes and Persians.`
  },
  { 
    week: 34, 
    day: 5, 
    reference: "Dan 6", 
    title: "Daniel in the Lions' Den",
    studyNotes: `Daniel 6, Verse 10 (Prayed): Daniel's habit of prayer was so well known that his enemies used it against him. He feared God more than the lions.

Verse 22 (Shut the lions' mouths): God delivered his faithful servant, foreshadowing Christ's victory over death.`
  },

  // Week 35
  { 
    week: 35, 
    day: 1, 
    reference: "Ezra 1, 3", 
    title: "The Decree of Cyrus",
    studyNotes: `Chapter 1, Verse 1 (Stirred up the spirit): God moved the heart of a pagan king to fulfill his promise to Jeremiah (70 years).

Chapter 3, Verse 11 (Sang): The laying of the foundation was celebrated with praise, though the older men wept because it was smaller than Solomon's temple.`
  },
  { 
    week: 35, 
    day: 2, 
    reference: "Ezra 4–6; Hag 1", 
    title: "Rebuilding the Temple",
    studyNotes: `Haggai 1, Verse 4 (Paneled houses): The people had neglected God's house to build their own. Haggai called them to consider their ways and put God first.

Ezra 6, Verse 22 (Joy): The completion of the temple was a cause for great joy because God's worship was restored.`
  },
  { 
    week: 35, 
    day: 3, 
    reference: "Esth 1–4", 
    title: "Esther",
    studyNotes: `Chapter 4, Verse 14 (For such a time as this): Though God's name is not mentioned in the book, his providence is everywhere. Mordecai recognized that Esther was placed in her position by God to save her people.`
  },
  { 
    week: 35, 
    day: 4, 
    reference: "Esth 5–10", 
    title: "Esther Saves Her People",
    studyNotes: `Chapter 6, Verse 1 (Could not sleep): A sleepless night for the king led to the honor of Mordecai and the downfall of Haman. God works through "coincidences."`
  },
  { 
    week: 35, 
    day: 5, 
    reference: "John 1", 
    title: "The Word Made Flesh",
    studyNotes: `John 1, Verse 1 (Was God): Jesus is the eternal Word, fully divine and distinct from the Father.

Verse 14 (Became flesh): The Incarnation. God became man to dwell (tabernacle) among us.

Verse 29 (Lamb of God): John the Baptist identified Jesus as the fulfillment of the sacrificial system who takes away the sin of the world.`
  },

  // Week 36
  { 
    week: 36, 
    day: 1, 
    reference: "Luke 1", 
    title: "Gabriel Visits Mary",
    studyNotes: `Luke 1, Verse 32 (Throne of his father David): The angel confirmed that Jesus is the Messiah promised in the Davidic Covenant (2 Sam 7).

Verse 35 (Holy Spirit): The virgin conception was a miraculous work of the Spirit, ensuring Jesus' sinlessness.

Verse 38 (Servant of the Lord): Mary's humble submission to God's will is a model for all believers.`
  },
  { 
    week: 36, 
    day: 2, 
    reference: "Luke 2; Matt 1", 
    title: "The Birth of Jesus",
    studyNotes: `Luke 2, Verse 7 (No place): The King of Glory was born in humble circumstances, showing that his kingdom is not of this world.

Matthew 1, Verse 21 (Jesus): His name means "Yahweh Saves," indicating his mission to save his people from their sins.`
  },
  { 
    week: 36, 
    day: 3, 
    reference: "Matt 2", 
    title: "The Magi",
    studyNotes: `Matthew 2, Verse 2 (Worship him): These Gentile wise men sought the King of the Jews to worship him, foreshadowing the inclusion of the Gentiles in the gospel.

Verse 15 (Out of Egypt): Jesus relived Israel's history but without sin, proving to be the true Son of God.`
  },
  { 
    week: 36, 
    day: 4, 
    reference: "Luke 2:41–52", 
    title: "The Boy Jesus",
    studyNotes: `Luke 2, Verse 49 (Father's house): Even at age 12, Jesus understood his unique relationship with the Father and his mission.

Verse 51 (Submissive): Jesus perfectly obeyed the fifth commandment, fulfilling the law on our behalf.`
  },
  { 
    week: 36, 
    day: 5, 
    reference: "Matt 3; Mark 1:1–11", 
    title: "John the Baptist",
    studyNotes: `Matthew 3, Verse 2 (Repent): The message of the kingdom begins with a call to turn from sin.

Verse 8 (Fruit): True repentance produces a changed life.`
  },

  // Week 37
  { 
    week: 37, 
    day: 1, 
    reference: "Matt 3–4", 
    title: "The Baptism and Temptation",
    studyNotes: `Chapter 3, Verse 15 (Fulfill all righteousness): Jesus was baptized not for his own sin, but to identify with his people and fulfill the righteous requirements of the law.

Chapter 4, Verse 4 (It is written): Jesus defeated Satan by quoting Scripture. The Word is our sword (Eph 6:17).`
  },
  { 
    week: 37, 
    day: 2, 
    reference: "John 1:35–51", 
    title: "The First Disciples",
    studyNotes: `John 1, Verse 41 (We have found the Messiah): One of the first things Andrew did was to tell his brother about Jesus. Evangelism flows from discovery.`
  },
  { 
    week: 37, 
    day: 3, 
    reference: "John 2:1–12", 
    title: "The Wedding at Cana",
    studyNotes: `John 2, Verse 11 (Sign): Jesus' first miracle revealed his glory and inspired faith. Turning water to wine symbolized the joy and abundance of the new covenant.`
  },
  { 
    week: 37, 
    day: 4, 
    reference: "John 3", 
    title: "Nicodemus",
    studyNotes: `John 3, Verse 3 (Born again): Regeneration (new birth) is a sovereign work of the Spirit that is necessary for salvation. We contribute nothing to our physical birth, nor to our spiritual birth.

Verse 16 (God so loved): The motive for the cross was God's love. The scope is the world (all kinds of people). The result is eternal life for believers.`
  },
  { 
    week: 37, 
    day: 5, 
    reference: "John 4", 
    title: "The Woman at the Well",
    studyNotes: `John 4, Verse 14 (Spring of water): Jesus offers living water (the Spirit) that satisfies the deepest thirst of the soul.

Verse 24 (Spirit and truth): True worship is not about location (Gerizim or Jerusalem) but about the heart's orientation toward God through the Spirit and the Word.`
  },

  // Week 38
  { 
    week: 38, 
    day: 1, 
    reference: "Luke 4", 
    title: "Rejection at Nazareth",
    studyNotes: `Luke 4, Verse 18 (Spirit of the Lord is upon me): Jesus applied Isaiah 61 to himself, claiming to be the Anointed One who brings good news to the poor.

Verse 28 (Wrath): The people loved his gracious words until he exposed their pride and mentioned God's grace to Gentiles.`
  },
  { 
    week: 38, 
    day: 2, 
    reference: "Luke 5", 
    title: "Calling Fishermen",
    studyNotes: `Luke 5, Verse 8 (Depart from me): Peter's encounter with Jesus' power made him acutely aware of his own sinfulness. Holiness reveals sin.

Verse 28 (Left everything): Discipleship requires a radical break with the past to follow Jesus.`
  },
  { 
    week: 38, 
    day: 3, 
    reference: "Matt 5", 
    title: "The Sermon on the Mount 1",
    studyNotes: `Matthew 5, Verse 3 (Poor in spirit): The Beatitudes describe the character of kingdom citizens. They begin with spiritual bankruptcy.

Verse 17 (Fulfill): Jesus did not come to abolish the Law but to fulfill its demands and its types. He is the goal of the Law (Rom 10:4).

Verse 20 (Exceeds): External righteousness is not enough. God demands a righteousness of the heart, which only Christ can provide.`
  },
  { 
    week: 38, 
    day: 4, 
    reference: "Matt 6–7", 
    title: "The Sermon on the Mount 2",
    studyNotes: `Chapter 6, Verse 9 (Pray then like this): The Lord's Prayer teaches us to prioritize God's glory ("Hallowed be thy name") before our needs.

Chapter 7, Verse 21 (I never knew you): Profession of faith without the practice of obedience is dead. Salvation involves a personal relationship with Christ ("knew").`
  },
  { 
    week: 38, 
    day: 5, 
    reference: "Mark 4", 
    title: "Calming the Storm",
    studyNotes: `Mark 4, Verse 41 (Who then is this?): The miracle demonstrated Jesus' authority over nature, proving he is the Creator God.`
  },

  // Week 39
  { 
    week: 39, 
    day: 1, 
    reference: "Mark 5", 
    title: "The Gerasene Demoniac",
    studyNotes: `Mark 5, Verse 19 (Tell them): While Jesus often told people to be silent, he told this Gentile man to go and tell what the Lord had done. He was a missionary to the Decapolis.`
  },
  { 
    week: 39, 
    day: 2, 
    reference: "John 6", 
    title: "Feeding the 5000",
    studyNotes: `John 6, Verse 35 (Bread of life): The miracle pointed to a greater reality: Jesus is the spiritual food that sustains eternal life. We must feed on him by faith.

Verse 44 (No one can come): Jesus taught the doctrine of total inability and unconditional election. Salvation is God's work.`
  },
  { 
    week: 39, 
    day: 3, 
    reference: "Matt 16", 
    title: "Peter's Confession",
    studyNotes: `Matthew 16, Verse 16 (You are the Christ): Peter confessed Jesus' true identity.

Verse 18 (Build my church): The church is built on the rock of this confession (Christ). The gates of hell (death) cannot prevail against it because Jesus has conquered death.`
  },
  { 
    week: 39, 
    day: 4, 
    reference: "Matt 17", 
    title: "The Transfiguration",
    studyNotes: `Matthew 17, Verse 2 (Transfigured): The veil of Jesus' humanity was pulled back to reveal his divine glory.

Verse 5 (Listen to him): Moses (Law) and Elijah (Prophets) appeared, but they vanished, leaving only Jesus. He is the final Word of God.`
  },
  { 
    week: 39, 
    day: 5, 
    reference: "Luke 10", 
    title: "The Good Samaritan",
    studyNotes: `Luke 10, Verse 29 (Who is my neighbor?): The lawyer tried to limit the command to love. Jesus showed that our neighbor is anyone in need whom we are in a position to help.

Verse 33 (Compassion): Jesus is the ultimate Good Samaritan who found us half-dead in sin and saved us at great cost to himself.`
  },

  // Week 40
  { 
    week: 40, 
    day: 1, 
    reference: "Luke 15", 
    title: "The Prodigal Son",
    studyNotes: `Luke 15, Verse 20 (Father saw him): The focus of the parable is the compassionate father (God) who welcomes repenting sinners.

Verse 28 (Angry): The older brother represents the Pharisees who resented God's grace to tax collectors and sinners.`
  },
  { 
    week: 40, 
    day: 2, 
    reference: "John 11", 
    title: "Raising Lazarus",
    studyNotes: `John 11, Verse 25 (I am the resurrection): Jesus does not just give resurrection; he is the resurrection. Life is found in union with him.

Verse 35 (Jesus wept): Jesus displayed his humanity and his hatred of death, the enemy he came to destroy.`
  },
  { 
    week: 40, 
    day: 3, 
    reference: "Matt 21; Mark 11", 
    title: "The Triumphal Entry",
    studyNotes: `Matthew 21, Verse 5 (Humble, mounted on a donkey): Jesus entered as the Prince of Peace, fulfilling Zechariah 9:9, not as a military conqueror.

Mark 11, Verse 17 (Den of robbers): Jesus cleansed the temple because they had turned a place of prayer for the nations into a place of profit.`
  },
  { 
    week: 40, 
    day: 4, 
    reference: "John 13", 
    title: "The Last Supper",
    studyNotes: `John 13, Verse 1 (Loved them to the end): The foot washing was a demonstration of Jesus' sacrificial love and a model of humble service.

Verse 34 (New commandment): We are to love one another not just as we love ourselves, but as Christ has loved us. This is the mark of a true disciple.`
  },
  { 
    week: 40, 
    day: 5, 
    reference: "John 14", 
    title: "The Way, Truth, and Life",
    studyNotes: `John 14, Verse 6 (I am the way): Jesus makes an exclusive claim. He is not a way to God; he is the only way.

Verse 15 (If you love me): Love for Christ is demonstrated by obedience to his commands.

Verse 16 (Helper): Jesus promises the Holy Spirit, who will dwell in believers, providing the presence of God that the temple only foreshadowed.`
  },

  // Week 41
  { 
    week: 41, 
    day: 1, 
    reference: "John 15", 
    title: "The Vine and Branches",
    studyNotes: `John 15, Verse 5 (Apart from me you can do nothing): Spiritual life and fruitfulness are impossible without vital union with Christ. We must abide in him through his Word and prayer.

Verse 18 (Hated me): Believers should not be surprised by the world's hostility. Union with Christ means sharing in his rejection.`
  },
  { 
    week: 41, 
    day: 2, 
    reference: "John 16", 
    title: "The Work of the Spirit",
    studyNotes: `John 16, Verse 8 (Convict the world): The Spirit's work is to expose the guilt of sinners concerning sin, righteousness, and judgment.

Verse 13 (Guide you into all truth): The Spirit does not bring new revelation but illuminates the truth of Christ found in the Word.`
  },
  { 
    week: 41, 
    day: 3, 
    reference: "John 17", 
    title: "The High Priestly Prayer",
    studyNotes: `John 17, Verse 3 (Eternal life): Jesus defines eternal life not merely as endless existence, but as knowing the only true God and Jesus Christ.

Verse 17 (Sanctify them): Holiness comes through the truth, and God's Word is truth.

Verse 24 (With me): Jesus' ultimate desire is for his people to be with him and behold his glory.`
  },
  { 
    week: 41, 
    day: 4, 
    reference: "Matt 26", 
    title: "Gethsemane",
    studyNotes: `Matthew 26, Verse 39 (Not as I will): Jesus' submission to the Father's will involved drinking the "cup" of God's wrath against sin. He suffered the agony of anticipation before the agony of the cross.

Verse 41 (Spirit is willing): We must watch and pray because our flesh is weak and vulnerable to temptation.`
  },
  { 
    week: 41, 
    day: 5, 
    reference: "John 18", 
    title: "Betrayal and Arrest",
    studyNotes: `John 18, Verse 6 (I am he): When Jesus identified himself with the divine name ("I am"), the soldiers fell back. He surrendered voluntarily; he was not captured.

Verse 11 (Cup): Jesus was determined to drink the cup the Father had given him.`
  },

  // Week 42
  { 
    week: 42, 
    day: 1, 
    reference: "Luke 22", 
    title: "Peter's Denial",
    studyNotes: `Luke 22, Verse 31 (Sift you like wheat): Satan desired to destroy Peter, but Jesus prayed for him. Our security lies in Christ's intercession, not our strength.

Verse 61 (Lord turned and looked): The look of Jesus broke Peter's heart, leading to repentance. Judas had remorse (guilt), but Peter had repentance (turning back).`
  },
  { 
    week: 42, 
    day: 2, 
    reference: "John 18–19", 
    title: "Jesus Before Pilate",
    studyNotes: `Chapter 18, Verse 36 (Not of this world): Jesus' kingdom is not political or advanced by the sword. It is a kingdom of truth.

Chapter 19, Verse 11 (No authority): Jesus reminded Pilate that his authority was delegated from God. God is sovereign even over wicked rulers.`
  },
  { 
    week: 42, 
    day: 3, 
    reference: "Matt 27", 
    title: "The Crucifixion",
    studyNotes: `Matthew 27, Verse 46 (Forsaken): Jesus experienced the spiritual death (separation from the Father) that we deserved. He was forsaken so we might be forgiven.

Verse 51 (Curtain was torn): The barrier between a holy God and sinful man was removed by Christ's death. We now have access to the Holy of Holies.`
  },
  { 
    week: 42, 
    day: 4, 
    reference: "Luke 23", 
    title: "The Burial",
    studyNotes: `Luke 23, Verse 50 (Joseph of Arimathea): God used a wealthy, secret disciple to fulfill the prophecy that the Messiah would be with a rich man in his death (Isa 53:9).

Verse 56 (Rested): Even in death, Jesus observed the Sabbath, completing his work of the old creation before rising to begin the new creation.`
  },
  { 
    week: 42, 
    day: 5, 
    reference: "Matt 28:1–15", 
    title: "The Empty Tomb",
    studyNotes: `Matthew 28, Verse 8 (Saw and believed): The sight of the linen cloths, retaining the shape of the body but collapsed, convinced John that the body had not been stolen but had passed through the graveclothes.

Verse 17 (My Father and your Father): Because of the resurrection, Jesus' relationship with the Father is shared with his disciples. We are adopted sons.`
  },

  // Week 43
  { 
    week: 43, 
    day: 1, 
    reference: "Luke 24:13–49", 
    title: "The Road to Emmaus",
    studyNotes: `Luke 24, Verse 26 (Necessary): The suffering of the Messiah was not an accident but a divine necessity prophesied in the OT.

Verse 27 (All the Scriptures): Jesus interpreted the OT Christocentrically. The whole Bible is about him.

Verse 32 (Hearts burn): The exposition of Scripture by the Spirit warms the heart and ignites true worship.`
  },
  { 
    week: 43, 
    day: 2, 
    reference: "John 20", 
    title: "Doubting Thomas",
    studyNotes: `John 20, Verse 15 (Do you love me?): Jesus restored Peter by allowing him to affirm his love three times, countering his three denials. Ministry flows from love for Christ.

Verse 19 (Follow me): The call to discipleship remains the same: follow Jesus, even to death.`
  },
  { 
    week: 43, 
    day: 3, 
    reference: "John 21", 
    title: "Breakfast by the Sea",
    studyNotes: `John 21, Verse 15 (Do you love me?): Jesus restored Peter by allowing him to affirm his love three times, countering his three denials. Ministry flows from love for Christ.

Verse 19 (Follow me): The call to discipleship remains the same: follow Jesus, even to death.`
  },
  { 
    week: 43, 
    day: 4, 
    reference: "Matt 28:16–20", 
    title: "The Great Commission",
    studyNotes: `Matthew 28, Verse 18 (All authority): The mission of the church is based on the universal reign of the risen Christ.

Verse 19 (Make disciples): The central command is to make disciples through going, baptizing (sacraments), and teaching (Word).

Verse 20 (With you always): The presence of Christ is the power for the mission.`
  },
  { 
    week: 43, 
    day: 5, 
    reference: "Acts 1:1–11", 
    title: "The Ascension",
    studyNotes: `Acts 1, Verse 8 (Witnesses): The disciples were not to speculate about the timing of the kingdom but to be witnesses of the King, powered by the Spirit.

Verse 11 (Come in the same way): The ascension guarantees the return. Jesus is physically currently in heaven, ruling until he returns.`
  },

  // Week 44
  { 
    week: 44, 
    day: 1, 
    reference: "Acts 1:12–2:4", 
    title: "Day of Pentecost",
    studyNotes: `Acts 2, Verse 4 (Tongues): The miracle of speaking in other known languages reversed the curse of Babel. It signaled that the gospel is for all nations.

Verse 23 (Definite plan): Peter preached that the cross was both the wicked act of men and the sovereign plan of God.

Verse 37 (Cut to the heart): True preaching produces conviction of sin.`
  },
  { 
    week: 44, 
    day: 2, 
    reference: "Acts 2:5–47", 
    title: "Peter's Sermon",
    studyNotes: `Acts 3, Verse 6 (In the name of Jesus): The power to heal came not from Peter, but from the name (authority) of Jesus. Miracles confirmed the message.

Verse 19 (Repent): The proper response to the gospel is repentance—a change of mind and direction.`
  },
  { 
    week: 44, 
    day: 3, 
    reference: "Acts 3–4", 
    title: "Healing the Lame Man",
    studyNotes: `Acts 4, Verse 12 (No other name): The exclusivity of Christ is a core doctrine. Salvation is found nowhere else.

Verse 24 (Sovereign Lord): When threatened, the church did not pray for safety, but praised God's sovereignty and prayed for boldness to keep preaching.`
  },
  { 
    week: 44, 
    day: 4, 
    reference: "Acts 5", 
    title: "Ananias and Sapphira",
    studyNotes: `Acts 5, Verse 3 (Lie to the Holy Spirit): The sin was not withholding money, but lying about it to look spiritual. It was an attack on the purity of the church.

Verse 11 (Great fear): God's judgment on sin in the church leads to a healthy fear of God.`
  },
  { 
    week: 44, 
    day: 5, 
    reference: "Acts 6–7", 
    title: "Stephen Martyred",
    studyNotes: `Chapter 6, Verse 2 (Not right to give up preaching): The apostles prioritized the ministry of the Word and prayer. Deacons were chosen to handle physical needs so the leaders could focus on spiritual needs.

Chapter 7, Verse 51 (Resist the Holy Spirit): Stephen accused the religious leaders of being just like their ancestors who rejected the prophets.

Verse 56 (Standing): Jesus stood to welcome his first martyr.

Verse 60 (Do not hold this sin): Like Jesus, Stephen died praying for his killers. Saul (Paul) was a witness to this testimony.`
  },

  // Week 45
  { 
    week: 45, 
    day: 1, 
    reference: "Acts 8", 
    title: "Philip and the Ethiopian",
    studyNotes: `Acts 8, Verse 1 (Scattered): Persecution served God's purpose by scattering believers, who took the gospel with them. What the enemy meant for evil, God used for good.

Verse 35 (Preached Jesus): Philip used Isaiah 53 to explain the gospel. The OT points to the suffering Servant.`
  },
  { 
    week: 45, 
    day: 2, 
    reference: "Acts 9:1–31", 
    title: "Saul's Conversion",
    studyNotes: `Acts 9, Verse 4 (Persecuting me): Jesus identifies so closely with his church that persecuting the church is persecuting Christ.

Verse 15 (Chosen instrument): Paul's salvation was an act of sovereign election. God chose the church's greatest enemy to be its greatest missionary.`
  },
  { 
    week: 45, 
    day: 3, 
    reference: "Acts 10", 
    title: "Peter and Cornelius",
    studyNotes: `Acts 10, Verse 15 (Clean): God prepared Peter to accept Gentiles by overturning the dietary laws. The ceremonial law is fulfilled in Christ.

Verse 34 (No partiality): The gospel breaks down racial and ethnic barriers. Anyone who fears God and believes is accepted.`
  },
  { 
    week: 45, 
    day: 4, 
    reference: "Acts 11:19–12:25", 
    title: "The Church in Antioch",
    studyNotes: `Chapter 11, Verse 26 (Christians): The disciples were first called Christians in Antioch. It means "little Christs" or "partisans of Christ."

Chapter 12, Verse 5 (Earnest prayer): The church fought Herod's sword with prayer, and God sent an angel to deliver Peter.`
  },
  { 
    week: 45, 
    day: 5, 
    reference: "Acts 13", 
    title: "First Missionary Journey",
    studyNotes: `Acts 13, Verse 2 (Set apart): The Holy Spirit called missionaries from the context of a worshipping church.

Verse 38 (Forgiveness of sins): Paul preached justification by faith—freedom from sin that the Law of Moses could never provide.

Verse 48 (Appointed): "As many as were appointed to eternal life believed." Evangelism (preaching) and election (appointing) work together.`
  },

  // Week 46
  { 
    week: 46, 
    day: 1, 
    reference: "Acts 14", 
    title: "Iconium and Lystra",
    studyNotes: `Acts 14, Verse 15 (Men of like nature): Paul refused to receive worship, directing the glory to the living God.

Verse 22 (Tribulations): Paul taught new believers that suffering is a normal part of the Christian life and the path to the kingdom.`
  },
  { 
    week: 46, 
    day: 2, 
    reference: "Acts 15", 
    title: "The Jerusalem Council",
    studyNotes: `Acts 15, Verse 11 (Saved through the grace): The council affirmed that Gentiles do not need to keep the law (circumcision) to be saved. Salvation is by grace alone through faith alone for both Jew and Gentile.`
  },
  { 
    week: 46, 
    day: 3, 
    reference: "Acts 16:1–15", 
    title: "The Macedonian Call",
    studyNotes: `Acts 16, Verse 9 (Macedonian call): The Spirit directed Paul's movements, sometimes by closing doors and sometimes by visions. We must be sensitive to God's leading.

Verse 31 (Believe in the Lord Jesus): The jailer asked what he must do; Paul told him who he must trust.`
  },
  { 
    week: 46, 
    day: 4, 
    reference: "Acts 16:16–40", 
    title: "Philippian Jailer",
    studyNotes: `Acts 17, Verse 11 (Examining the Scriptures): The Bereans are commended for testing Paul's teaching against the Bible. This is the duty of every believer.

Verse 30 (Commands all people everywhere to repent): The gospel is not a suggestion; it is a royal summons from the King of the universe.`
  },
  { 
    week: 46, 
    day: 5, 
    reference: "Acts 17", 
    title: "Thessalonica and Berea",
    studyNotes: `Acts 18, Verse 10 (I have many in this city): God encouraged Paul to keep preaching because God had elect people in Corinth who had not yet believed. Election is a motivation for evangelism.`
  },

  // Week 47
  { 
    week: 47, 
    day: 1, 
    reference: "Acts 18", 
    title: "Corinth",
    studyNotes: `Acts 19, Verse 19 (Burned them): Repentance involved the costly destruction of their occult books. True faith breaks ties with darkness.

Verse 26 (Gods made with hands are not gods): The gospel threatens the idols of the culture, often causing economic and social backlash.`
  },
  { 
    week: 47, 
    day: 2, 
    reference: "Acts 19", 
    title: "Ephesus",
    studyNotes: `Acts 20, Verse 24 (Course): Paul viewed his life as a race. His only goal was to finish the ministry God gave him—to testify to the gospel of the grace of God.

Verse 28 (Obtained with his own blood): This verse affirms the deity of Christ (God's blood) and the value of the church. Pastors must shepherd the flock carefully because Christ bought it at such a high price.`
  },
  { 
    week: 47, 
    day: 3, 
    reference: "Acts 20", 
    title: "Eutychus",
    studyNotes: `Acts 21, Verse 13 (Die for the name): Paul was willing to face imprisonment and death for Christ.

Chapter 22, Verse 21 (Gentiles): The Jewish mob listened until Paul mentioned the Gentiles. Religious prejudice can be a blinding idol.`
  },
  { 
    week: 47, 
    day: 4, 
    reference: "Acts 21–22", 
    title: "Arrest in Jerusalem",
    studyNotes: `Acts 23, Verse 11 (Take courage): In Paul's darkest hour, the Lord stood by him and promised he would testify in Rome. God's plan cannot be thwarted by plots or prisons.`
  },
  { 
    week: 47, 
    day: 5, 
    reference: "Acts 23", 
    title: "Paul Before the Sanhedrin",
    studyNotes: `Acts 24, Verse 16 (Clear conscience): Paul lived his life before God and man with integrity.

Verse 25 (Alarmed): Felix was convicted by Paul's preaching on righteousness and judgment, but he procrastinated ("Go away for the present"). Delaying repentance is dangerous.`
  },

  // Week 48
  { 
    week: 48, 
    day: 1, 
    reference: "Acts 24–25", 
    title: "Paul Before Felix and Festus",
    studyNotes: `Acts 25, Verse 11 (I appeal to Caesar): Paul used his rights as a Roman citizen to further the gospel and escape the Jewish plot. It is lawful to use legal protections for God's glory.`
  },
  { 
    week: 48, 
    day: 2, 
    reference: "Acts 26", 
    title: "Paul Before Agrippa",
    studyNotes: `Acts 26, Verse 18 (Open their eyes): Paul summarizes the gospel mission: to turn people from darkness to light and from the power of Satan to God.

Verse 28 (Short time): Agrippa was "almost persuaded," but almost saved is entirely lost.`
  },
  { 
    week: 48, 
    day: 3, 
    reference: "Acts 27", 
    title: "The Storm",
    studyNotes: `Acts 27, Verse 23 (God to whom I belong): In the midst of the storm, Paul's confidence was in his ownership by God.

Verse 25 (Faith in God): Paul believed God's promise that they would be saved, bringing hope to a hopeless crew.`
  },
  { 
    week: 48, 
    day: 4, 
    reference: "Acts 28", 
    title: "Shipwreck and Rome",
    studyNotes: `Acts 28, Verse 31 (Unhindered): The book of Acts ends abruptly, with Paul under house arrest but preaching the kingdom "without hindrance." The messenger may be bound, but the Word of God is not bound. The story continues with us.`
  },
  { 
    week: 48, 
    day: 5, 
    reference: "Rom 1–3", 
    title: "Sin and Justification",
    studyNotes: `Chapter 1, Verse 16 (Not ashamed): The gospel is the power of God for salvation.

Chapter 3, Verse 23 (All have sinned): The bad news is that everyone falls short of God's glory.

Verse 24 (Justified by his grace): The good news is that we are declared righteous freely by God's grace through the redemption in Christ.`
  },

  // Week 49
  { 
    week: 49, 
    day: 1, 
    reference: "Rom 6–8", 
    title: "Grace and Life",
    studyNotes: `Chapter 6, Verse 11 (Dead to sin): Believers are united with Christ in his death and resurrection, breaking the power of sin.

Chapter 8, Verse 1 (No condemnation): Those in Christ are safe from God's wrath.

Verse 28 (Work together for good): God sovereignly orchestrates all events for the good of his elect.`
  },
  { 
    week: 49, 
    day: 2, 
    reference: "1 Cor 15", 
    title: "The Resurrection Body",
    studyNotes: `1 Corinthians 15, Verse 14 (In vain): Without the resurrection, Christianity is a lie.

Verse 20 (Firstfruits): Christ's resurrection guarantees ours.

Verse 58 (Steadfast): Because resurrection is true, our labor for the Lord is never in vain.`
  },
  { 
    week: 49, 
    day: 3, 
    reference: "2 Cor 4–5", 
    title: "New Creation",
    studyNotes: `Chapter 4, Verse 7 (Jars of clay): The power is in the message (treasure), not the messenger (clay jar).

Chapter 5, Verse 17 (New creation): Salvation is a re-creation. The old life is gone; the new has come.

Verse 21 (He made him to be sin): The great exchange: our sin was imputed to Christ, and his righteousness is imputed to us.`
  },
  { 
    week: 49, 
    day: 4, 
    reference: "Gal 5–6", 
    title: "Fruit of the Spirit",
    studyNotes: `Chapter 5, Verse 1 (Freedom): Christ set us free from the law's curse, not so we could sin, but so we could serve one another in love.

Verse 22 (Fruit): The Spirit produces character that reflects Christ: love, joy, peace, etc.`
  },
  { 
    week: 49, 
    day: 5, 
    reference: "Eph 1–4", 
    title: "Unity in Christ",
    studyNotes: `Chapter 1, Verse 4 (Chose us): Election happened before the foundation of the world.

Chapter 2, Verse 8 (By grace): Salvation is a gift, not a wage we earn.

Chapter 4, Verse 1 (Walk in a manner worthy): Doctrine (chs. 1-3) must lead to duty (chs. 4-6).`
  },

  // Week 50
  { 
    week: 50, 
    day: 1, 
    reference: "Phil 2", 
    title: "The Humility of Christ",
    studyNotes: `Philippians 2, Verse 6 (Form of God): Jesus is fully God.

Verse 8 (Humbled himself): The path to exaltation was through humiliation and the cross. We are called to have this same mind.`
  },
  { 
    week: 50, 
    day: 2, 
    reference: "Col 1", 
    title: "The Supremacy of Christ",
    studyNotes: `Colossians 1, Verse 15 (Image of the invisible God): Jesus is the supreme revelation of God and the Creator of all things.

Verse 18 (Preeminent): Christ must have first place in everything.`
  },
  { 
    week: 50, 
    day: 3, 
    reference: "1 Thess 4–5", 
    title: "The Coming of the Lord",
    studyNotes: `Chapter 4, Verse 16 (Descend): Christ will return physically. The dead in Christ will rise first.

Verse 18 (Encourage): The doctrine of the second coming is meant to give us hope and comfort.`
  },
  { 
    week: 50, 
    day: 4, 
    reference: "1 Tim 6", 
    title: "Godliness with Contentment",
    studyNotes: `1 Timothy 6, Verse 6 (Great gain): True wealth is spiritual contentment, not material riches.

Verse 12 (Fight the good fight): The Christian life is a battle that requires endurance.`
  },
  { 
    week: 50, 
    day: 5, 
    reference: "Heb 4, 8–10", 
    title: "Jesus Our High Priest",
    studyNotes: `Chapter 4, Verse 15 (Sympathize): Jesus understands our weaknesses because he was tempted, yet he remained sinless.

Chapter 10, Verse 14 (Perfected for all time): Christ's single offering on the cross finished the work of atonement. It never needs to be repeated.`
  },

  // Week 51
  { 
    week: 51, 
    day: 1, 
    reference: "James 1–2", 
    title: "Faith in Action",
    studyNotes: `Chapter 1, Verse 22 (Doers): Hearing the Word without doing it is self-deception.

Chapter 2, Verse 17 (Faith apart from works is dead): True saving faith will always produce the fruit of good works. We are justified by faith alone, but the faith that justifies is never alone.`
  },
  { 
    week: 51, 
    day: 2, 
    reference: "1 Pet 1", 
    title: "Living Hope",
    studyNotes: `1 Peter 1, Verse 3 (Born again to a living hope): Our hope is anchored in the resurrection of Jesus.

Verse 7 (Tested by fire): Trials are necessary to refine our faith, proving it genuine.`
  },
  { 
    week: 51, 
    day: 3, 
    reference: "1 John 1–2", 
    title: "Walking in the Light",
    studyNotes: `Chapter 1, Verse 9 (Confess): Christians still sin, but we have a way to be cleansed through confession.

Chapter 2, Verse 1 (Advocate): When we sin, Jesus speaks to the Father in our defense.`
  },
  { 
    week: 51, 
    day: 4, 
    reference: "Jude", 
    title: "Contend for the Faith",
    studyNotes: `Jude, Verse 3 (Contend): We must fight for the faith once for all delivered to the saints.

Verse 24 (Able to keep you): Our perseverance depends on God's preserving power. He will present us blameless.`
  },
  { 
    week: 51, 
    day: 5, 
    reference: "Rev 1", 
    title: "The Vision of Jesus",
    studyNotes: `Revelation 1, Verse 13 (Son of Man): Jesus is no longer the humble carpenter; he is the glorified Judge and King, walking among his churches.

Verse 17 (Fear not): The glorified Christ comforts his people with his sovereignty over death and Hades.`
  },

  // Week 52
  { 
    week: 52, 
    day: 1, 
    reference: "Rev 4–5", 
    title: "Worthy is the Lamb",
    studyNotes: `Chapter 4, Verse 11 (Created all things): God is worthy of worship because he is the Creator.

Chapter 5, Verse 9 (Worthy): The Lamb (Jesus) is worthy to open the scroll (God's plan for history) because he was slain and redeemed a people from every tribe.`
  },
  { 
    week: 52, 
    day: 2, 
    reference: "Rev 19", 
    title: "The King Returns",
    studyNotes: `Revelation 19, Verse 11 (White horse): Jesus returns as the Warrior-King to judge the nations and make war on evil.

Verse 16 (King of kings): His authority is absolute. Every knee will bow.`
  },
  { 
    week: 52, 
    day: 3, 
    reference: "Rev 20", 
    title: "The Millennium and Judgment",
    studyNotes: `Revelation 20, Verse 2 (Thousand years): Satan is bound, and the saints reign with Christ.

Verse 12 (Great white throne): The final judgment is based on works, proving that all fall short. Only those in the Book of Life (saved by grace) escape the lake of fire.`
  },
  { 
    week: 52, 
    day: 4, 
    reference: "Rev 21", 
    title: "New Heaven and New Earth",
    studyNotes: `Revelation 21, Verse 1 (New heaven and new earth): God restores creation. The sea (chaos/separation) is no more.

Verse 3 (God with them): The ultimate goal of the covenant is realized: God dwelling perfectly with his people.`
  },
  {
    week: 52,
    day: 5,
    reference: "Rev 22; Ps 150",
    title: "Jesus Is Coming",
    studyNotes: `Revelation 22, Verse 20 (Come, Lord Jesus): The Bible ends with a prayer for Christ's return. This should be the heart cry of every believer.`
  },
];

export function getReading(week: number, day: number): DailyReading | null {
  return readingSchedule.find(r => r.week === week && r.day === day) || null;
}

export function getWeekReadings(week: number): DailyReading[] {
  return readingSchedule.filter(r => r.week === week);
}

export function getTotalReadings(): number {
  return readingSchedule.length;
}
