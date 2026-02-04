/**
 * Tune My Heart 52-Week Memory Verses
 * Weekly Scripture memory verses for family worship
 */

export interface MemoryVerse {
  week: number;
  reference: string;
  text: string;
}

export interface MemoryVersesByTranslation {
  [translation: string]: MemoryVerse[];
}

export const memoryVersesESV: MemoryVerse[] = [
  {
    week: 1,
    reference: "Genesis 1:1",
    text: "In the beginning, God created the heavens and the earth."
  },
  {
    week: 2,
    reference: "Genesis 12:2",
    text: "And I will make of you a great nation, and I will bless you and make your name great, so that you will be a blessing."
  },
  {
    week: 3,
    reference: "Psalm 8:1",
    text: "O LORD, our Lord, how majestic is your name in all the earth! You have set your glory above the heavens."
  },
  {
    week: 4,
    reference: "Romans 4:5",
    text: "And to the one who does not work but believes in him who justifies the ungodly, his faith is counted as righteousness."
  },
  {
    week: 5,
    reference: "Proverbs 3:5-6",
    text: "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths."
  },
  {
    week: 6,
    reference: "Genesis 50:20",
    text: "As for you, you meant evil against me, but God meant it for good, to bring it about that many people should be kept alive, as they are today."
  },
  {
    week: 7,
    reference: "Psalm 77:11",
    text: "I will remember the deeds of the LORD; yes, I will remember your wonders of old."
  },
  {
    week: 8,
    reference: "Exodus 15:1",
    text: "Then Moses and the people of Israel sang this song to the LORD, saying, 'I will sing to the LORD, for he has triumphed gloriously; the horse and his rider he has thrown into the sea.'"
  },
  {
    week: 9,
    reference: "Deuteronomy 6:4-5",
    text: "Hear, O Israel: The LORD our God, the LORD is one. You shall love the LORD your God with all your heart and with all your soul and with all your might."
  },
  {
    week: 10,
    reference: "John 3:14-15",
    text: "And as Moses lifted up the serpent in the wilderness, so must the Son of Man be lifted up, that whoever believes in him may have eternal life."
  },
  {
    week: 11,
    reference: "Joshua 1:8",
    text: "This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it. For then you will make your way prosperous, and then you will have good success."
  },
  {
    week: 12,
    reference: "Job 19:25",
    text: "For I know that my Redeemer lives, and at the last he will stand upon the earth."
  },
  {
    week: 13,
    reference: "Judges 3:9",
    text: "But when the people of Israel cried out to the LORD, the LORD raised up a deliverer for the people of Israel, who saved them, Othniel the son of Kenaz, Caleb's younger brother."
  },
  {
    week: 14,
    reference: "Psalm 17:8",
    text: "Keep me as the apple of your eye; hide me in the shadow of your wings."
  },
  {
    week: 15,
    reference: "Psalm 19:14",
    text: "Let the words of my mouth and the meditation of my heart be acceptable in your sight, O LORD, my rock and my redeemer."
  },
  {
    week: 16,
    reference: "Luke 1:46-48",
    text: "And Mary said, 'My soul magnifies the Lord,\n\nand my spirit rejoices in God my Savior,\n\nfor he has looked on the humble estate of his servant. For behold, from now on all generations will call me blessed.'"
  },
  {
    week: 17,
    reference: "1 Samuel 15:22",
    text: "And Samuel said, 'Has the LORD as great delight in burnt offerings and sacrifices, as in obeying the voice of the LORD? Behold, to obey is better than sacrifice, and to listen than the fat of rams.'"
  },
  {
    week: 18,
    reference: "Psalm 18:1-2",
    text: "I love you, O LORD, my strength.\n\nThe LORD is my rock and my fortress and my deliverer, my God, my rock, in whom I take refuge, my shield, and the horn of my salvation, my stronghold."
  },
  {
    week: 19,
    reference: "2 Samuel 22:2-3",
    text: "He said, 'The LORD is my rock and my fortress and my deliverer, my God, my rock, in whom I take refuge, my shield, and the horn of my salvation, my stronghold and my refuge, my savior; you save me from violence.'"
  },
  {
    week: 20,
    reference: "Psalm 20:7",
    text: "Some trust in chariots and some in horses, but we trust in the name of the LORD our God."
  },
  {
    week: 21,
    reference: "Luke 1:68-69",
    text: "Blessed be the Lord God of Israel, for he has visited and redeemed his people\n\nand has raised up a horn of salvation for us in the house of his servant David."
  },
  {
    week: 22,
    reference: "Romans 3:23-24",
    text: "For all have sinned and fall short of the glory of God, and are justified by his grace as a gift, through the redemption that is in Christ Jesus."
  },
  {
    week: 23,
    reference: "Psalm 27:1-2",
    text: "The LORD is my light and my salvation; whom shall I fear?\nThe LORD is the stronghold of my life; of whom shall I be afraid?\n\nWhen evildoers assail me to eat up my flesh, my adversaries and foes, it is they who stumble and fall."
  },
  {
    week: 24,
    reference: "2 Chronicles 7:14",
    text: "If my people who are called by my name humble themselves, and pray and seek my face and turn from their wicked ways, then I will hear from heaven and will forgive their sin and heal their land."
  },
  {
    week: 25,
    reference: "Philippians 2:8",
    text: "And being found in human form, he humbled himself by becoming obedient to the point of death, even death on a cross."
  },
  {
    week: 26,
    reference: "1 Corinthians 15:3-5",
    text: "For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures,\n\nthat he was buried, that he was raised on the third day in accordance with the Scriptures,\n\nand that he appeared to Cephas, then to the twelve."
  },
  {
    week: 27,
    reference: "Romans 10:9",
    text: "Because, if you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved."
  },
  {
    week: 28,
    reference: "Ephesians 2:8-9",
    text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast."
  },
  {
    week: 29,
    reference: "Acts 3:19",
    text: "Repent therefore, and turn back, that your sins may be blotted out."
  },
  {
    week: 30,
    reference: "Romans 6:23",
    text: "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord."
  },
  {
    week: 31,
    reference: "Romans 5:1",
    text: "Therefore, since we have been justified by faith, we have peace with God through our Lord Jesus Christ."
  },
  {
    week: 32,
    reference: "Jeremiah 23:5",
    text: "Behold, the days are coming, declares the LORD, when I will raise up for David a righteous Branch, and he shall reign as king and deal wisely, and shall execute justice and righteousness in the land."
  },
  {
    week: 33,
    reference: "Psalm 86:11",
    text: "Teach me your way, O LORD, that I may walk in your truth; unite my heart to fear your name."
  },
  {
    week: 34,
    reference: "Ezekiel 37:27-28",
    text: "My dwelling place shall be with them, and I will be their God, and they shall be my people.\n\nThen the nations will know that I am the LORD who sanctifies Israel, when my sanctuary is in their midst forevermore."
  },
  {
    week: 35,
    reference: "Romans 8:5",
    text: "For those who live according to the flesh set their minds on the things of the flesh, but those who live according to the Spirit set their minds on the things of the Spirit."
  },
  {
    week: 36,
    reference: "Psalm 100:1-2",
    text: "Make a joyful noise to the LORD, all the earth!\n\nServe the LORD with gladness!\n\nCome into his presence with singing!"
  },
  {
    week: 37,
    reference: "John 3:16",
    text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."
  },
  {
    week: 38,
    reference: "Colossians 1:18",
    text: "And he is the head of the body, the church. He is the beginning, the firstborn from the dead, that in everything he might be preeminent."
  },
  {
    week: 39,
    reference: "Romans 1:16",
    text: "For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes, to the Jew first and also to the Greek."
  },
  {
    week: 40,
    reference: "John 6:40",
    text: "For this is the will of my Father, that everyone who looks on the Son and believes in him should have eternal life, and I will raise him up on the last day."
  },
  {
    week: 41,
    reference: "2 Corinthians 4:6",
    text: "For God, who said, 'Let light shine out of darkness,' has shone in our hearts to give the light of the knowledge of the glory of God in the face of Jesus Christ."
  },
  {
    week: 42,
    reference: "Luke 19:10",
    text: "For the Son of Man came to seek and to save the lost."
  },
  {
    week: 43,
    reference: "John 11:25",
    text: "Jesus said to her, 'I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live.'"
  },
  {
    week: 44,
    reference: "Isaiah 53:5",
    text: "But he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed."
  },
  {
    week: 45,
    reference: "1 Corinthians 15:21-22",
    text: "For as by a man came death, by a man has come also the resurrection of the dead. For as in Adam all die, so also in Christ shall all be made alive."
  },
  {
    week: 46,
    reference: "Acts 1:8",
    text: "But you will receive power when the Holy Spirit has come upon you, and you will be my witnesses in Jerusalem and in all Judea and Samaria, and to the end of the earth."
  },
  {
    week: 47,
    reference: "Romans 10:12",
    text: "For there is no distinction between Jew and Greek; for the same Lord is Lord of all, bestowing his riches on all who call on him."
  },
  {
    week: 48,
    reference: "Romans 8:38-39",
    text: "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord."
  },
  {
    week: 49,
    reference: "Philippians 2:9-11",
    text: "Therefore God has highly exalted him and bestowed on him the name that is above every name,\n\nso that at the name of Jesus every knee should bow, in heaven and on earth and under the earth,\n\nand every tongue confess that Jesus Christ is Lord, to the glory of God the Father."
  },
  {
    week: 50,
    reference: "Titus 2:11-13",
    text: "For the grace of God has appeared, bringing salvation for all people,\n\ntraining us to renounce ungodliness and worldly passions, and to live self-controlled, upright, and godly lives in the present age,\n\nwaiting for our blessed hope, the appearing of the glory of our great God and Savior Jesus Christ."
  },
  {
    week: 51,
    reference: "Revelation 20:12",
    text: "And I saw the dead, great and small, standing before the throne, and books were opened. Then another book was opened, which is the book of life. And the dead were judged by what was written in the books, according to what they had done."
  },
  {
    week: 52,
    reference: "Revelation 22:17",
    text: "The Spirit and the Bride say, 'Come.'\n\nAnd let the one who hears say, 'Come.'\n\nAnd let the one who is thirsty come; let the one who desires take the water of life without price."
  }
];

export const memoryVersesKJV: MemoryVerse[] = [
  {
    week: 1,
    reference: "Genesis 1:1",
    text: "In the beginning God created the heaven and the earth."
  },
  {
    week: 2,
    reference: "Genesis 12:2",
    text: "And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing:"
  },
  {
    week: 3,
    reference: "Psalm 8:1",
    text: "O LORD our Lord, how excellent is thy name in all the earth! who hast set thy glory above the heavens."
  },
  {
    week: 4,
    reference: "Romans 4:5",
    text: "But to him that worketh not, but believeth on him that justifieth the ungodly, his faith is counted for righteousness."
  },
  {
    week: 5,
    reference: "Proverbs 3:5-6",
    text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths."
  },
  {
    week: 6,
    reference: "Genesis 50:20",
    text: "But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive."
  },
  {
    week: 7,
    reference: "Psalm 77:11",
    text: "I will remember the works of the LORD: surely I will remember thy wonders of old."
  },
  {
    week: 8,
    reference: "Exodus 15:1",
    text: "Then sang Moses and the children of Israel this song unto the LORD, and spake, saying, I will sing unto the LORD, for he hath triumphed gloriously: the horse and his rider hath he thrown into the sea."
  },
  {
    week: 9,
    reference: "Deuteronomy 6:4-5",
    text: "Hear, O Israel: The LORD our God is one LORD: And thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might."
  },
  {
    week: 10,
    reference: "John 3:14-15",
    text: "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up: That whosoever believeth in him should not perish, but have eternal life."
  },
  {
    week: 11,
    reference: "Joshua 1:8",
    text: "This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success."
  },
  {
    week: 12,
    reference: "Job 19:25",
    text: "For I know that my redeemer liveth, and that he shall stand at the latter day upon the earth:"
  },
  {
    week: 13,
    reference: "Judges 3:9",
    text: "And when the children of Israel cried unto the LORD, the LORD raised up a deliverer to the children of Israel, who delivered them, even Othniel the son of Kenaz, Caleb's younger brother."
  },
  {
    week: 14,
    reference: "Psalm 17:8",
    text: "Keep me as the apple of the eye, hide me under the shadow of thy wings,"
  },
  {
    week: 15,
    reference: "Psalm 19:14",
    text: "Let the words of my mouth, and the meditation of my heart, be acceptable in thy sight, O LORD, my strength, and my redeemer."
  },
  {
    week: 16,
    reference: "Luke 1:46-48",
    text: "And Mary said, My soul doth magnify the Lord, And my spirit hath rejoiced in God my Saviour. For he hath regarded the low estate of his handmaiden: for, behold, from henceforth all generations shall call me blessed."
  },
  {
    week: 17,
    reference: "1 Samuel 15:22",
    text: "And Samuel said, Hath the LORD as great delight in burnt offerings and sacrifices, as in obeying the voice of the LORD? Behold, to obey is better than sacrifice, and to hearken than the fat of rams."
  },
  {
    week: 18,
    reference: "Psalm 18:1-2",
    text: "I will love thee, O LORD, my strength. The LORD is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust; my buckler, and the horn of my salvation, and my high tower."
  },
  {
    week: 19,
    reference: "2 Samuel 22:2-3",
    text: "And he said, The LORD is my rock, and my fortress, and my deliverer; The God of my rock; in him will I trust: he is my shield, and the horn of my salvation, my high tower, and my refuge, my saviour; thou savest me from violence."
  },
  {
    week: 20,
    reference: "Psalm 20:7",
    text: "Some trust in chariots, and some in horses: but we will remember the name of the LORD our God."
  },
  {
    week: 21,
    reference: "Luke 1:68-69",
    text: "Blessed be the Lord God of Israel; for he hath visited and redeemed his people, And hath raised up an horn of salvation for us in the house of his servant David;"
  },
  {
    week: 22,
    reference: "Romans 3:23-24",
    text: "For all have sinned, and come short of the glory of God; Being justified freely by his grace through the redemption that is in Christ Jesus:"
  },
  {
    week: 23,
    reference: "Psalm 27:1-2",
    text: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid? When the wicked, even mine enemies and my foes, came upon me to eat up my flesh, they stumbled and fell."
  },
  {
    week: 24,
    reference: "2 Chronicles 7:14",
    text: "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land."
  },
  {
    week: 25,
    reference: "Philippians 2:8",
    text: "And being found in fashion as a man, he humbled himself, and became obedient unto death, even the death of the cross."
  },
  {
    week: 26,
    reference: "1 Corinthians 15:3-5",
    text: "For I delivered unto you first of all that which I also received, how that Christ died for our sins according to the scriptures; And that he was buried, and that he rose again the third day according to the scriptures: And that he was seen of Cephas, then of the twelve:"
  },
  {
    week: 27,
    reference: "Romans 10:9",
    text: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved."
  },
  {
    week: 28,
    reference: "Ephesians 2:8-9",
    text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast."
  },
  {
    week: 29,
    reference: "Acts 3:19",
    text: "Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord;"
  },
  {
    week: 30,
    reference: "Romans 6:23",
    text: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord."
  },
  {
    week: 31,
    reference: "Romans 5:1",
    text: "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ:"
  },
  {
    week: 32,
    reference: "Jeremiah 23:5",
    text: "Behold, the days come, saith the LORD, that I will raise unto David a righteous Branch, and a King shall reign and prosper, and shall execute judgment and justice in the earth."
  },
  {
    week: 33,
    reference: "Psalm 86:11",
    text: "Teach me thy way, O LORD; I will walk in thy truth: unite my heart to fear thy name."
  },
  {
    week: 34,
    reference: "Ezekiel 37:27-28",
    text: "My tabernacle also shall be with them: yea, I will be their God, and they shall be my people. And the heathen shall know that I the LORD do sanctify Israel, when my sanctuary shall be in the midst of them for evermore."
  },
  {
    week: 35,
    reference: "Romans 8:5",
    text: "For they that are after the flesh do mind the things of the flesh; but they that are after the Spirit the things of the Spirit."
  },
  {
    week: 36,
    reference: "Psalm 100:1-2",
    text: "Make a joyful noise unto the LORD, all ye lands. Serve the LORD with gladness: come before his presence with singing."
  },
  {
    week: 37,
    reference: "John 3:16",
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
  },
  {
    week: 38,
    reference: "Colossians 1:18",
    text: "And he is the head of the body, the church: who is the beginning, the firstborn from the dead; that in all things he might have the preeminence."
  },
  {
    week: 39,
    reference: "Romans 1:16",
    text: "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek."
  },
  {
    week: 40,
    reference: "John 6:40",
    text: "And this is the will of him that sent me, that every one which seeth the Son, and believeth on him, may have everlasting life: and I will raise him up at the last day."
  },
  {
    week: 41,
    reference: "2 Corinthians 4:6",
    text: "For God, who commanded the light to shine out of darkness, hath shined in our hearts, to give the light of the knowledge of the glory of God in the face of Jesus Christ."
  },
  {
    week: 42,
    reference: "Luke 19:10",
    text: "For the Son of man is come to seek and to save that which was lost."
  },
  {
    week: 43,
    reference: "John 11:25",
    text: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live:"
  },
  {
    week: 44,
    reference: "Isaiah 53:5",
    text: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed."
  },
  {
    week: 45,
    reference: "1 Corinthians 15:21-22",
    text: "For since by man came death, by man came also the resurrection of the dead. For as in Adam all die, even so in Christ shall all be made alive."
  },
  {
    week: 46,
    reference: "Acts 1:8",
    text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth."
  },
  {
    week: 47,
    reference: "Romans 10:12",
    text: "For there is no difference between the Jew and the Greek: for the same Lord over all is rich unto all that call upon him."
  },
  {
    week: 48,
    reference: "Romans 8:38-39",
    text: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."
  },
  {
    week: 49,
    reference: "Philippians 2:9-11",
    text: "Wherefore God also hath highly exalted him, and given him a name which is above every name: That at the name of Jesus every knee should bow, of things in heaven, and things in earth, and things under the earth; And that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father."
  },
  {
    week: 50,
    reference: "Titus 2:11-13",
    text: "For the grace of God that bringeth salvation hath appeared to all men, Teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly, in this present world; Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ;"
  },
  {
    week: 51,
    reference: "Revelation 20:12",
    text: "And I saw the dead, small and great, stand before God; and the books were opened: and another book was opened, which is the book of life: and the dead were judged out of those things which were written in the books, according to their works."
  },
  {
    week: 52,
    reference: "Revelation 22:17",
    text: "And the Spirit and the bride say, Come. And let him that heareth say, Come. And let him that is athirst come. And whosoever will, let him take the water of life freely."
  }
];

export const memoryVersesNASB: MemoryVerse[] = [
  {
    week: 1,
    reference: "Genesis 1:1",
    text: "In the beginning God created the heavens and the earth."
  },
  {
    week: 2,
    reference: "Genesis 12:2",
    text: "And I will make you a great nation,\nAnd I will bless you,\nAnd make your name great;\nAnd so you shall be a blessing;"
  },
  {
    week: 3,
    reference: "Psalm 8:1",
    text: "O LORD, our Lord,\nHow majestic is Your name in all the earth,\nWho have displayed Your splendor above the heavens!"
  },
  {
    week: 4,
    reference: "Romans 4:5",
    text: "But to the one who does not work, but believes in Him who justifies the ungodly, his faith is credited as righteousness,"
  },
  {
    week: 5,
    reference: "Proverbs 3:5-6",
    text: "Trust in the LORD with all your heart\nAnd do not lean on your own understanding.\nIn all your ways acknowledge Him,\nAnd He will make your paths straight."
  },
  {
    week: 6,
    reference: "Genesis 50:20",
    text: "As for you, you meant evil against me, but God meant it for good in order to bring about this present result, to preserve many people alive."
  },
  {
    week: 7,
    reference: "Psalm 77:11",
    text: "I shall remember the deeds of the LORD;\nSurely I will remember Your wonders of old."
  },
  {
    week: 8,
    reference: "Exodus 15:1",
    text: "Then Moses and the sons of Israel sang this song to the LORD, and said,\n'I will sing to the LORD, for He is highly exalted;\nThe horse and its rider He has hurled into the sea.'"
  },
  {
    week: 9,
    reference: "Deuteronomy 6:4-5",
    text: "Hear, O Israel! The LORD is our God, the LORD is one! You shall love the LORD your God with all your heart and with all your soul and with all your might."
  },
  {
    week: 10,
    reference: "John 3:14-15",
    text: "As Moses lifted up the serpent in the wilderness, even so must the Son of Man be lifted up; so that whoever believes will in Him have eternal life."
  },
  {
    week: 11,
    reference: "Joshua 1:8",
    text: "This book of the law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it; for then you will make your way prosperous, and then you will have success."
  },
  {
    week: 12,
    reference: "Job 19:25",
    text: "As for me, I know that my Redeemer lives,\nAnd at the last He will take His stand on the earth."
  },
  {
    week: 13,
    reference: "Judges 3:9",
    text: "When the sons of Israel cried to the LORD, the LORD raised up a deliverer for the sons of Israel to deliver them, Othniel the son of Kenaz, Caleb's younger brother."
  },
  {
    week: 14,
    reference: "Psalm 17:8",
    text: "Keep me as the apple of the eye;\nHide me in the shadow of Your wings"
  },
  {
    week: 15,
    reference: "Psalm 19:14",
    text: "Let the words of my mouth and the meditation of my heart\nBe acceptable in Your sight,\nO LORD, my rock and my Redeemer."
  },
  {
    week: 16,
    reference: "Luke 1:46-48",
    text: "And Mary said:\n'My soul exalts the Lord,\nAnd my spirit has rejoiced in God my Savior.\nFor He has had regard for the humble state of His bondslave;\nFor behold, from this time on all generations will count me blessed.'"
  },
  {
    week: 17,
    reference: "1 Samuel 15:22",
    text: "Samuel said,\n'Has the LORD as much delight in burnt offerings and sacrifices\nAs in obeying the voice of the LORD?\nBehold, to obey is better than sacrifice,\nAnd to heed than the fat of rams.'"
  },
  {
    week: 18,
    reference: "Psalm 18:1-2",
    text: "I love You, O LORD, my strength.\nThe LORD is my rock and my fortress and my deliverer,\nMy God, my rock, in whom I take refuge;\nMy shield and the horn of my salvation, my stronghold."
  },
  {
    week: 19,
    reference: "2 Samuel 22:2-3",
    text: "He said,\n'The LORD is my rock and my fortress and my deliverer;\nMy God, my rock, in whom I take refuge,\nMy shield and the horn of my salvation, my stronghold and my refuge;\nMy savior, You save me from violence.'"
  },
  {
    week: 20,
    reference: "Psalm 20:7",
    text: "Some boast in chariots and some in horses,\nBut we will boast in the name of the LORD our God."
  },
  {
    week: 21,
    reference: "Luke 1:68-69",
    text: "Blessed be the Lord God of Israel,\nFor He has visited us and accomplished redemption for His people,\nAnd has raised up a horn of salvation for us\nIn the house of David His servant—"
  },
  {
    week: 22,
    reference: "Romans 3:23-24",
    text: "for all have sinned and fall short of the glory of God, being justified as a gift by His grace through the redemption which is in Christ Jesus;"
  },
  {
    week: 23,
    reference: "Psalm 27:1-2",
    text: "The LORD is my light and my salvation;\nWhom shall I fear?\nThe LORD is the defense of my life;\nWhom shall I dread?\nWhen evildoers came upon me to devour my flesh,\nMy adversaries and my enemies, they stumbled and fell."
  },
  {
    week: 24,
    reference: "2 Chronicles 7:14",
    text: "and My people who are called by My name humble themselves and pray and seek My face and turn from their wicked ways, then I will hear from heaven, will forgive their sin and will heal their land."
  },
  {
    week: 25,
    reference: "Philippians 2:8",
    text: "Being found in appearance as a man, He humbled Himself by becoming obedient to the point of death, even death on a cross."
  },
  {
    week: 26,
    reference: "1 Corinthians 15:3-5",
    text: "For I delivered to you as of first importance what I also received, that Christ died for our sins according to the Scriptures, and that He was buried, and that He was raised on the third day according to the Scriptures, and that He appeared to Cephas, then to the twelve."
  },
  {
    week: 27,
    reference: "Romans 10:9",
    text: "that if you confess with your mouth Jesus as Lord, and believe in your heart that God raised Him from the dead, you will be saved;"
  },
  {
    week: 28,
    reference: "Ephesians 2:8-9",
    text: "For by grace you have been saved through faith; and that not of yourselves, it is the gift of God; not as a result of works, so that no one may boast."
  },
  {
    week: 29,
    reference: "Acts 3:19",
    text: "Therefore repent and return, so that your sins may be wiped away, in order that times of refreshing may come from the presence of the Lord;"
  },
  {
    week: 30,
    reference: "Romans 6:23",
    text: "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord."
  },
  {
    week: 31,
    reference: "Romans 5:1",
    text: "Therefore, having been justified by faith, we have peace with God through our Lord Jesus Christ,"
  },
  {
    week: 32,
    reference: "Jeremiah 23:5",
    text: "'Behold, the days are coming,' declares the LORD,\n'When I will raise up for David a righteous Branch;\nAnd He will reign as king and act wisely\nAnd do justice and righteousness in the land.'"
  },
  {
    week: 33,
    reference: "Psalm 86:11",
    text: "Teach me Your way, O LORD;\nI will walk in Your truth;\nUnite my heart to fear Your name."
  },
  {
    week: 34,
    reference: "Ezekiel 37:27-28",
    text: "My dwelling place also will be with them; and I will be their God, and they will be My people. And the nations will know that I am the LORD who sanctifies Israel, when My sanctuary is in their midst forever."
  },
  {
    week: 35,
    reference: "Romans 8:5",
    text: "For those who are according to the flesh set their minds on the things of the flesh, but those who are according to the Spirit, the things of the Spirit."
  },
  {
    week: 36,
    reference: "Psalm 100:1-2",
    text: "Shout joyfully to the LORD, all the earth.\nServe the LORD with gladness;\nCome before Him with joyful singing."
  },
  {
    week: 37,
    reference: "John 3:16",
    text: "For God so loved the world, that He gave His only begotten Son, that whoever believes in Him shall not perish, but have eternal life."
  },
  {
    week: 38,
    reference: "Colossians 1:18",
    text: "He is also head of the body, the church; and He is the beginning, the firstborn from the dead, so that He Himself will come to have first place in everything."
  },
  {
    week: 39,
    reference: "Romans 1:16",
    text: "For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes, to the Jew first and also to the Greek."
  },
  {
    week: 40,
    reference: "John 6:40",
    text: "For this is the will of My Father, that everyone who beholds the Son and believes in Him will have eternal life, and I Myself will raise him up on the last day."
  },
  {
    week: 41,
    reference: "2 Corinthians 4:6",
    text: "For God, who said, 'Light shall shine out of darkness,' is the One who has shone in our hearts to give the Light of the knowledge of the glory of God in the face of Christ."
  },
  {
    week: 42,
    reference: "Luke 19:10",
    text: "For the Son of Man has come to seek and to save that which was lost."
  },
  {
    week: 43,
    reference: "John 11:25",
    text: "Jesus said to her, 'I am the resurrection and the life; he who believes in Me will live even if he dies,'"
  },
  {
    week: 44,
    reference: "Isaiah 53:5",
    text: "But He was pierced through for our transgressions,\nHe was crushed for our iniquities;\nThe chastening for our well-being fell upon Him,\nAnd by His scourging we are healed."
  },
  {
    week: 45,
    reference: "1 Corinthians 15:21-22",
    text: "For since by a man came death, by a man also came the resurrection of the dead. For as in Adam all die, so also in Christ all will be made alive."
  },
  {
    week: 46,
    reference: "Acts 1:8",
    text: "but you will receive power when the Holy Spirit has come upon you; and you shall be My witnesses both in Jerusalem, and in all Judea and Samaria, and even to the remotest part of the earth."
  },
  {
    week: 47,
    reference: "Romans 10:12",
    text: "For there is no distinction between Jew and Greek; for the same Lord is Lord of all, abounding in riches for all who call on Him;"
  },
  {
    week: 48,
    reference: "Romans 8:38-39",
    text: "For I am convinced that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers, nor height, nor depth, nor any other created thing, will be able to separate us from the love of God, which is in Christ Jesus our Lord."
  },
  {
    week: 49,
    reference: "Philippians 2:9-11",
    text: "For this reason also, God highly exalted Him, and bestowed on Him the name which is above every name, so that at the name of Jesus every knee will bow, of those who are in heaven and on earth and under the earth, and that every tongue will confess that Jesus Christ is Lord, to the glory of God the Father."
  },
  {
    week: 50,
    reference: "Titus 2:11-13",
    text: "For the grace of God has appeared, bringing salvation to all men, instructing us to deny ungodliness and worldly desires and to live sensibly, righteously and godly in the present age, looking for the blessed hope and the appearing of the glory of our great God and Savior, Christ Jesus,"
  },
  {
    week: 51,
    reference: "Revelation 20:12",
    text: "And I saw the dead, the great and the small, standing before the throne, and books were opened; and another book was opened, which is the book of life; and the dead were judged from the things which were written in the books, according to their deeds."
  },
  {
    week: 52,
    reference: "Revelation 22:17",
    text: "The Spirit and the bride say, 'Come.' And let the one who hears say, 'Come.' And let the one who is thirsty come; let the one who wishes take the water of life without cost."
  }
];

export const memoryVersesNKJV: MemoryVerse[] = [
  {
    week: 1,
    reference: "Genesis 1:1",
    text: "In the beginning God created the heavens and the earth."
  },
  {
    week: 2,
    reference: "Genesis 12:2",
    text: "I will make you a great nation;\nI will bless you\nAnd make your name great;\nAnd you shall be a blessing."
  },
  {
    week: 3,
    reference: "Psalm 8:1",
    text: "O LORD, our Lord,\nHow excellent is Your name in all the earth,\nWho have set Your glory above the heavens!"
  },
  {
    week: 4,
    reference: "Romans 4:5",
    text: "But to him who does not work but believes on Him who justifies the ungodly, his faith is accounted for righteousness,"
  },
  {
    week: 5,
    reference: "Proverbs 3:5-6",
    text: "Trust in the LORD with all your heart,\nAnd lean not on your own understanding;\nIn all your ways acknowledge Him,\nAnd He shall direct your paths."
  },
  {
    week: 6,
    reference: "Genesis 50:20",
    text: "But as for you, you meant evil against me; but God meant it for good, in order to bring it about as it is this day, to save many people alive."
  },
  {
    week: 7,
    reference: "Psalm 77:11",
    text: "I will remember the works of the LORD;\nSurely I will remember Your wonders of old."
  },
  {
    week: 8,
    reference: "Exodus 15:1",
    text: "Then Moses and the children of Israel sang this song to the LORD, and spoke, saying:\n'I will sing to the LORD,\nFor He has triumphed gloriously!\nThe horse and its rider\nHe has thrown into the sea.'"
  },
  {
    week: 9,
    reference: "Deuteronomy 6:4-5",
    text: "Hear, O Israel: The LORD our God, the LORD is one! You shall love the LORD your God with all your heart, with all your soul, and with all your strength."
  },
  {
    week: 10,
    reference: "John 3:14-15",
    text: "And as Moses lifted up the serpent in the wilderness, even so must the Son of Man be lifted up, that whoever believes in Him should not perish but have eternal life."
  },
  {
    week: 11,
    reference: "Joshua 1:8",
    text: "This Book of the Law shall not depart from your mouth, but you shall meditate in it day and night, that you may observe to do according to all that is written in it. For then you will make your way prosperous, and then you will have good success."
  },
  {
    week: 12,
    reference: "Job 19:25",
    text: "For I know that my Redeemer lives,\nAnd He shall stand at last on the earth;"
  },
  {
    week: 13,
    reference: "Judges 3:9",
    text: "When the children of Israel cried out to the LORD, the LORD raised up a deliverer for the children of Israel, who delivered them: Othniel the son of Kenaz, Caleb's younger brother."
  },
  {
    week: 14,
    reference: "Psalm 17:8",
    text: "Keep me as the apple of Your eye;\nHide me under the shadow of Your wings,"
  },
  {
    week: 15,
    reference: "Psalm 19:14",
    text: "Let the words of my mouth and the meditation of my heart\nBe acceptable in Your sight,\nO LORD, my strength and my Redeemer."
  },
  {
    week: 16,
    reference: "Luke 1:46-48",
    text: "And Mary said:\n'My soul magnifies the Lord,\nAnd my spirit has rejoiced in God my Savior.\nFor He has regarded the lowly state of His maidservant;\nFor behold, henceforth all generations will call me blessed.'"
  },
  {
    week: 17,
    reference: "1 Samuel 15:22",
    text: "So Samuel said:\n'Has the LORD as great delight in burnt offerings and sacrifices,\nAs in obeying the voice of the LORD?\nBehold, to obey is better than sacrifice,\nAnd to heed than the fat of rams.'"
  },
  {
    week: 18,
    reference: "Psalm 18:1-2",
    text: "I will love You, O LORD, my strength.\nThe LORD is my rock and my fortress and my deliverer;\nMy God, my strength, in whom I will trust;\nMy shield and the horn of my salvation, my stronghold."
  },
  {
    week: 19,
    reference: "2 Samuel 22:2-3",
    text: "And he said:\n'The LORD is my rock and my fortress and my deliverer;\nThe God of my strength, in whom I will trust;\nMy shield and the horn of my salvation,\nMy stronghold and my refuge;\nMy Savior, You save me from violence.'"
  },
  {
    week: 20,
    reference: "Psalm 20:7",
    text: "Some trust in chariots, and some in horses;\nBut we will remember the name of the LORD our God."
  },
  {
    week: 21,
    reference: "Luke 1:68-69",
    text: "Blessed is the Lord God of Israel,\nFor He has visited and redeemed His people,\nAnd has raised up a horn of salvation for us\nIn the house of His servant David,"
  },
  {
    week: 22,
    reference: "Romans 3:23-24",
    text: "for all have sinned and fall short of the glory of God, being justified freely by His grace through the redemption that is in Christ Jesus,"
  },
  {
    week: 23,
    reference: "Psalm 27:1-2",
    text: "The LORD is my light and my salvation;\nWhom shall I fear?\nThe LORD is the strength of my life;\nOf whom shall I be afraid?\nWhen the wicked came against me\nTo eat up my flesh,\nMy enemies and foes,\nThey stumbled and fell."
  },
  {
    week: 24,
    reference: "2 Chronicles 7:14",
    text: "if My people who are called by My name will humble themselves, and pray and seek My face, and turn from their wicked ways, then I will hear from heaven, and will forgive their sin and heal their land."
  },
  {
    week: 25,
    reference: "Philippians 2:8",
    text: "And being found in appearance as a man, He humbled Himself and became obedient to the point of death, even the death of the cross."
  },
  {
    week: 26,
    reference: "1 Corinthians 15:3-5",
    text: "For I delivered to you first of all that which I also received: that Christ died for our sins according to the Scriptures, and that He was buried, and that He rose again the third day according to the Scriptures, and that He was seen by Cephas, then by the twelve."
  },
  {
    week: 27,
    reference: "Romans 10:9",
    text: "that if you confess with your mouth the Lord Jesus and believe in your heart that God has raised Him from the dead, you will be saved."
  },
  {
    week: 28,
    reference: "Ephesians 2:8-9",
    text: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, lest anyone should boast."
  },
  {
    week: 29,
    reference: "Acts 3:19",
    text: "Repent therefore and be converted, that your sins may be blotted out, so that times of refreshing may come from the presence of the Lord,"
  },
  {
    week: 30,
    reference: "Romans 6:23",
    text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord."
  },
  {
    week: 31,
    reference: "Romans 5:1",
    text: "Therefore, having been justified by faith, we have peace with God through our Lord Jesus Christ,"
  },
  {
    week: 32,
    reference: "Jeremiah 23:5",
    text: "'Behold, the days are coming,' says the LORD,\n'That I will raise to David a Branch of righteousness;\nA King shall reign and prosper,\nAnd execute judgment and righteousness in the earth.'"
  },
  {
    week: 33,
    reference: "Psalm 86:11",
    text: "Teach me Your way, O LORD;\nI will walk in Your truth;\nUnite my heart to fear Your name."
  },
  {
    week: 34,
    reference: "Ezekiel 37:27-28",
    text: "My tabernacle also shall be with them; indeed I will be their God, and they shall be My people. The nations also will know that I, the LORD, sanctify Israel, when My sanctuary is in their midst forevermore."
  },
  {
    week: 35,
    reference: "Romans 8:5",
    text: "For those who live according to the flesh set their minds on the things of the flesh, but those who live according to the Spirit, the things of the Spirit."
  },
  {
    week: 36,
    reference: "Psalm 100:1-2",
    text: "Make a joyful shout to the LORD, all you lands!\nServe the LORD with gladness;\nCome before His presence with singing."
  },
  {
    week: 37,
    reference: "John 3:16",
    text: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life."
  },
  {
    week: 38,
    reference: "Colossians 1:18",
    text: "And He is the head of the body, the church, who is the beginning, the firstborn from the dead, that in all things He may have the preeminence."
  },
  {
    week: 39,
    reference: "Romans 1:16",
    text: "For I am not ashamed of the gospel of Christ, for it is the power of God to salvation for everyone who believes, for the Jew first and also for the Greek."
  },
  {
    week: 40,
    reference: "John 6:40",
    text: "And this is the will of Him who sent Me, that everyone who sees the Son and believes in Him may have everlasting life; and I will raise him up at the last day."
  },
  {
    week: 41,
    reference: "2 Corinthians 4:6",
    text: "For it is the God who commanded light to shine out of darkness, who has shone in our hearts to give the light of the knowledge of the glory of God in the face of Jesus Christ."
  },
  {
    week: 42,
    reference: "Luke 19:10",
    text: "for the Son of Man has come to seek and to save that which was lost."
  },
  {
    week: 43,
    reference: "John 11:25",
    text: "Jesus said to her, 'I am the resurrection and the life. He who believes in Me, though he may die, he shall live.'"
  },
  {
    week: 44,
    reference: "Isaiah 53:5",
    text: "But He was wounded for our transgressions,\nHe was bruised for our iniquities;\nThe chastisement for our peace was upon Him,\nAnd by His stripes we are healed."
  },
  {
    week: 45,
    reference: "1 Corinthians 15:21-22",
    text: "For since by man came death, by Man also came the resurrection of the dead. For as in Adam all die, even so in Christ all shall be made alive."
  },
  {
    week: 46,
    reference: "Acts 1:8",
    text: "But you shall receive power when the Holy Spirit has come upon you; and you shall be witnesses to Me in Jerusalem, and in all Judea and Samaria, and to the end of the earth."
  },
  {
    week: 47,
    reference: "Romans 10:12",
    text: "For there is no distinction between Jew and Greek, for the same Lord over all is rich to all who call upon Him."
  },
  {
    week: 48,
    reference: "Romans 8:38-39",
    text: "For I am persuaded that neither death nor life, nor angels nor principalities nor powers, nor things present nor things to come, nor height nor depth, nor any other created thing, shall be able to separate us from the love of God which is in Christ Jesus our Lord."
  },
  {
    week: 49,
    reference: "Philippians 2:9-11",
    text: "Therefore God also has highly exalted Him and given Him the name which is above every name, that at the name of Jesus every knee should bow, of those in heaven, and of those on earth, and of those under the earth, and that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father."
  },
  {
    week: 50,
    reference: "Titus 2:11-13",
    text: "For the grace of God that brings salvation has appeared to all men, teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly in the present age, looking for the blessed hope and glorious appearing of our great God and Savior Jesus Christ,"
  },
  {
    week: 51,
    reference: "Revelation 20:12",
    text: "And I saw the dead, small and great, standing before God, and books were opened. And another book was opened, which is the Book of Life. And the dead were judged according to their works, by the things which were written in the books."
  },
  {
    week: 52,
    reference: "Revelation 22:17",
    text: "And the Spirit and the bride say, 'Come!' And let him who hears say, 'Come!' And let him who thirsts come. Whoever desires, let him take the water of life freely."
  }
];

export const memoryVersesLSB: MemoryVerse[] = [
  {
    week: 1,
    reference: "Genesis 1:1",
    text: "In the beginning God created the heavens and the earth."
  },
  {
    week: 2,
    reference: "Genesis 12:2",
    text: "And I will make you a great nation,\nAnd I will bless you,\nAnd make your name great;\nAnd so you shall be a blessing;"
  },
  {
    week: 3,
    reference: "Psalm 8:1",
    text: "O Yahweh, our Lord,\nHow majestic is Your name in all the earth,\nWho have displayed Your splendor above the heavens!"
  },
  {
    week: 4,
    reference: "Romans 4:5",
    text: "But to the one who does not work, but believes upon Him who justifies the ungodly, his faith is counted as righteousness,"
  },
  {
    week: 5,
    reference: "Proverbs 3:5-6",
    text: "Trust in Yahweh with all your heart\nAnd do not lean on your own understanding.\nIn all your ways acknowledge Him,\nAnd He will make your paths straight."
  },
  {
    week: 6,
    reference: "Genesis 50:20",
    text: "As for you, you meant evil against me, but God meant it for good in order to do what has happened on this day, to keep many people alive."
  },
  {
    week: 7,
    reference: "Psalm 77:11",
    text: "I shall remember the deeds of Yah;\nSurely I will remember Your wonders of old."
  },
  {
    week: 8,
    reference: "Exodus 15:1",
    text: "Then Moses and the sons of Israel sang this song to Yahweh, and said,\n'I will sing to Yahweh, for He is highly exalted;\nThe horse and its rider He has hurled into the sea.'"
  },
  {
    week: 9,
    reference: "Deuteronomy 6:4-5",
    text: "Hear, O Israel! Yahweh is our God, Yahweh is one! You shall love Yahweh your God with all your heart and with all your soul and with all your might."
  },
  {
    week: 10,
    reference: "John 3:14-15",
    text: "And as Moses lifted up the serpent in the wilderness, even so must the Son of Man be lifted up; so that whoever believes will in Him have eternal life."
  },
  {
    week: 11,
    reference: "Joshua 1:8",
    text: "This book of the law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it; for then you will make your way successful, and then you will be prosperous."
  },
  {
    week: 12,
    reference: "Job 19:25",
    text: "As for me, I know that my Redeemer lives,\nAnd at the last He will rise up over the dust of this world."
  },
  {
    week: 13,
    reference: "Judges 3:9",
    text: "Then the sons of Israel cried to Yahweh, and Yahweh raised up a savior for the sons of Israel to save them, Othniel the son of Kenaz, Caleb's younger brother."
  },
  {
    week: 14,
    reference: "Psalm 17:8",
    text: "Keep me as the apple of the eye;\nHide me in the shadow of Your wings"
  },
  {
    week: 15,
    reference: "Psalm 19:14",
    text: "Let the words of my mouth and the meditation of my heart\nBe acceptable in Your sight,\nO Yahweh, my rock and my Redeemer."
  },
  {
    week: 16,
    reference: "Luke 1:46-48",
    text: "And Mary said:\n'My soul magnifies the Lord,\nAnd my spirit has rejoiced in God my Savior.\nFor He has looked upon the humble state of His slave;\nFor behold, from this time on all generations will count me blessed.'"
  },
  {
    week: 17,
    reference: "1 Samuel 15:22",
    text: "And Samuel said,\n'Has Yahweh as much delight in burnt offerings and sacrifices\nAs in obeying the voice of Yahweh?\nBehold, to obey is better than sacrifice,\nAnd to heed than the fat of rams.'"
  },
  {
    week: 18,
    reference: "Psalm 18:1-2",
    text: "I love You, O Yahweh, my strength.\nYahweh is my rock and my fortress and my deliverer,\nMy God, my rock, in whom I take refuge;\nMy shield and the horn of my salvation, my stronghold."
  },
  {
    week: 19,
    reference: "2 Samuel 22:2-3",
    text: "He said,\n'Yahweh is my rock and my fortress and my deliverer;\nMy God, my rock, in whom I take refuge,\nMy shield and the horn of my salvation, my stronghold and my refuge;\nMy savior, You save me from violence.'"
  },
  {
    week: 20,
    reference: "Psalm 20:7",
    text: "Some boast in chariots and some in horses,\nBut we will boast in the name of Yahweh, our God."
  },
  {
    week: 21,
    reference: "Luke 1:68-69",
    text: "Blessed be the Lord God of Israel,\nFor He has visited us and accomplished redemption for His people,\nAnd has raised up a horn of salvation for us\nIn the house of David His servant—"
  },
  {
    week: 22,
    reference: "Romans 3:23-24",
    text: "for all have sinned and fall short of the glory of God, being justified as a gift by His grace through the redemption which is in Christ Jesus;"
  },
  {
    week: 23,
    reference: "Psalm 27:1-2",
    text: "Yahweh is my light and my salvation;\nWhom shall I fear?\nYahweh is the strong defense of my life;\nWhom shall I dread?\nWhen evildoers came upon me to devour my flesh,\nMy adversaries and my enemies, they stumbled and fell."
  },
  {
    week: 24,
    reference: "2 Chronicles 7:14",
    text: "and My people who are called by My name humble themselves and pray and seek My face and turn from their evil ways, then I will listen from heaven, I will forgive their sin, and I will heal their land."
  },
  {
    week: 25,
    reference: "Philippians 2:8",
    text: "Being found in appearance as a man, He humbled Himself by becoming obedient to the point of death, even death on a cross."
  },
  {
    week: 26,
    reference: "1 Corinthians 15:3-5",
    text: "For I delivered to you as of first importance what I also received, that Christ died for our sins according to the Scriptures, and that He was buried, and that He was raised on the third day according to the Scriptures, and that He appeared to Cephas, then to the twelve."
  },
  {
    week: 27,
    reference: "Romans 10:9",
    text: "that if you confess with your mouth Jesus as Lord, and believe in your heart that God raised Him from the dead, you will be saved;"
  },
  {
    week: 28,
    reference: "Ephesians 2:8-9",
    text: "For by grace you have been saved through faith; and this not of yourselves, it is the gift of God; not of works, so that no one may boast."
  },
  {
    week: 29,
    reference: "Acts 3:19",
    text: "Therefore repent and return, so that your sins may be wiped away, in order that times of refreshing may come from the presence of the Lord;"
  },
  {
    week: 30,
    reference: "Romans 6:23",
    text: "For the wages of sin is death, but the gracious gift of God is eternal life in Christ Jesus our Lord."
  },
  {
    week: 31,
    reference: "Romans 5:1",
    text: "Therefore, having been justified by faith, we have peace with God through our Lord Jesus Christ,"
  },
  {
    week: 32,
    reference: "Jeremiah 23:5",
    text: "'Behold, the days are coming,' declares Yahweh,\n'When I will raise up for David a righteous Branch;\nAnd He will reign as king and prosper\nAnd do justice and righteousness in the land.'"
  },
  {
    week: 33,
    reference: "Psalm 86:11",
    text: "Teach me Your way, O Yahweh;\nI will walk in Your truth;\nUnite my heart to fear Your name."
  },
  {
    week: 34,
    reference: "Ezekiel 37:27-28",
    text: "My dwelling place also will be with them; and I will be their God, and they will be My people. And the nations will know that I am Yahweh who sanctifies Israel, when My sanctuary is in their midst forever."
  },
  {
    week: 35,
    reference: "Romans 8:5",
    text: "For those who are according to the flesh set their minds on the things of the flesh, but those who are according to the Spirit, the things of the Spirit."
  },
  {
    week: 36,
    reference: "Psalm 100:1-2",
    text: "Make a loud shout to Yahweh, all the earth.\nServe Yahweh with gladness;\nCome before Him with joyful songs."
  },
  {
    week: 37,
    reference: "John 3:16",
    text: "For God so loved the world, that He gave His only begotten Son, that whoever believes in Him shall not perish, but have eternal life."
  },
  {
    week: 38,
    reference: "Colossians 1:18",
    text: "And He is the head of the body, the church; Who is the beginning, the firstborn from the dead, so that He Himself will come to have first place in everything."
  },
  {
    week: 39,
    reference: "Romans 1:16",
    text: "For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes, to the Jew first and also to the Greek."
  },
  {
    week: 40,
    reference: "John 6:40",
    text: "For this is the will of My Father, that everyone who sees the Son and believes in Him will have eternal life, and I Myself will raise him up on the last day."
  },
  {
    week: 41,
    reference: "2 Corinthians 4:6",
    text: "For God, who said, 'Light shall shine out of darkness,' is the One who has shone in our hearts to give the Light of the knowledge of the glory of God in the face of Christ."
  },
  {
    week: 42,
    reference: "Luke 19:10",
    text: "For the Son of Man has come to seek and to save the lost."
  },
  {
    week: 43,
    reference: "John 11:25",
    text: "Jesus said to her, 'I am the resurrection and the life; he who believes in Me will live even if he dies,'"
  },
  {
    week: 44,
    reference: "Isaiah 53:5",
    text: "But He was pierced through for our transgressions,\nHe was crushed for our iniquities;\nThe chastening for our peace fell upon Him,\nAnd by His wounds we are healed."
  },
  {
    week: 45,
    reference: "1 Corinthians 15:21-22",
    text: "For since by a man came death, by a man also came the resurrection of the dead. For as in Adam all die, so also in Christ all will be made alive."
  },
  {
    week: 46,
    reference: "Acts 1:8",
    text: "but you will receive power when the Holy Spirit has come upon you; and you shall be My witnesses both in Jerusalem, and in all Judea and Samaria, and even to the end of the earth."
  },
  {
    week: 47,
    reference: "Romans 10:12",
    text: "For there is no distinction between Jew and Greek; for the same Lord is Lord of all, abounding in riches for all who call on Him;"
  },
  {
    week: 48,
    reference: "Romans 8:38-39",
    text: "For I am convinced that neither death, nor life, nor angels, nor rulers, nor things present, nor things to come, nor powers, nor height, nor depth, nor any other created thing, will be able to separate us from the love of God, which is in Christ Jesus our Lord."
  },
  {
    week: 49,
    reference: "Philippians 2:9-11",
    text: "Therefore, God also highly exalted Him, and bestowed on Him the name which is above every name, so that at the name of Jesus every knee will bow, of those who are in heaven and on earth and under the earth, and that every tongue will confess that Jesus Christ is Lord, to the glory of God the Father."
  },
  {
    week: 50,
    reference: "Titus 2:11-13",
    text: "For the grace of God has appeared, bringing salvation to all men, instructing us that, denying ungodliness and worldly desires, we should live sensibly, righteously, and godly in the present age, looking for the blessed hope and the appearing of the glory of our great God and Savior, Jesus Christ,"
  },
  {
    week: 51,
    reference: "Revelation 20:12",
    text: "Then I saw the dead, the great and the small, standing before the throne, and books were opened; and another book was opened, which is the book of life. And the dead were judged from the things which were written in the books, according to their deeds."
  },
  {
    week: 52,
    reference: "Revelation 22:17",
    text: "And the Spirit and the bride say, 'Come.' And let the one who hears say, 'Come.' And let the one who is thirsty come. Let the one who wishes receive the water of life without cost."
  }
];

// Map of all translations
export const memoryVersesByTranslation: MemoryVersesByTranslation = {
  'ESV': memoryVersesESV,
  'KJV': memoryVersesKJV,
  'NKJV': memoryVersesNKJV,
  'NASB': memoryVersesNASB,
  'LSB': memoryVersesLSB,
};

/**
 * Get memory verse for a specific week and translation
 */
export function getMemoryVerse(week: number, translation: string = 'ESV'): MemoryVerse | null {
  const verses = memoryVersesByTranslation[translation] || memoryVersesESV;
  return verses.find(v => v.week === week) || null;
}

/**
 * Get all memory verses for a specific translation
 */
export function getAllMemoryVerses(translation: string = 'ESV'): MemoryVerse[] {
  return memoryVersesByTranslation[translation] || memoryVersesESV;
}
