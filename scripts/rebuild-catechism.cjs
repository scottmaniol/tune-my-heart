/**
 * Complete rebuild of catechismData.ts with correct data and empty text fields
 */

const fs = require('fs');
const path = require('path');

const correctData = [
  { week: 1, question: "Who made you? What else did God make?", answer: "God made me. God made all things.", answerChild: "God made me. God made all things.", proofTexts: ["Gen 1:26-27", "Gen 2:7", "Eccl 12:1", "Acts 17:24-29", "Gen 1:1", "Gen 1:31", "Acts 14:15", "Rom 11:36", "Col 1:16"], memoryVerse: "Gen 1:1" },
  { week: 2, question: "Why did God make you and all things?", answer: "God made me to glorify him and enjoy him forever.", answerChild: "God made me to glorify him and enjoy him forever.", proofTexts: ["Ps 19:1", "Jer 9:23-24", "Rev 4:11"], memoryVerse: "1 Cor 10:31" },
  { week: 3, question: "How did God make you and all things?", answer: "God made all things out of nothing, by the Word of his power, in the space of six days, and all very good.", answerChild: "God made all things out of nothing, by the Word of his power, in the space of six days, and all very good.", proofTexts: ["Gen 1:1-31"], memoryVerse: "Gen 1:31" },
  { week: 4, question: "What is special about God's creation of you?", answer: "God made me in his own image.", answerChild: "God made me in his own image.", proofTexts: ["Gen 1:27", "Gen 9:6"], memoryVerse: "Gen 1:27" },
  { week: 5, question: "Who is God?", answer: "God is a spirit and does not have a body like man. He is infinite, eternal, and unchangeable.", answerChild: "God is a spirit.", proofTexts: ["John 4:24", "2 Cor 3:17", "1 Tim 1:17"], memoryVerse: "Ps 86:8" },
  { week: 6, question: "What is God like?", answer: "God is the first and best of beings. He is holy, powerful, and good.", answerChild: "God is the first and best of beings. He is holy, powerful, and good.", proofTexts: ["Ps 147:5", "Jer 32:17", "Dan 4:34-35", "Eph 1:11"], memoryVerse: "Isa 6:3" },
  { week: 7, question: "Are there more gods than one?", answer: "No. There is only one true and living God.", answerChild: "No. There is only one true and living God.", proofTexts: ["Deut 6:4", "Jer 10:10", "Mark 12:29", "Acts 17:22-31"], memoryVerse: "Deut 6:4" },
  { week: 8, question: "In how many persons does this one God exist?", answer: "God exists in three persons: the Father, the Son, and the Holy Spirit, equal in essence, power, and glory.", answerChild: "God exists in three persons.", proofTexts: ["Matt 3:16-17", "John 5:23", "John 10:30", "John 14:9-10", "John 15:26", "John 16:13-15", "1 John 5:20", "Rev 1:4-5"], memoryVerse: "2 Cor 13:14" },
  { week: 9, question: "What are the decrees of God?", answer: "The decrees of God are his eternal purposes, whereby for his own glory he has ordained whatever comes to pass.", answerChild: "The decrees of God are his eternal purposes, whereby for his own glory he has ordained whatever comes to pass.", proofTexts: ["Eph 1:11-12"], memoryVerse: "Dan 4:35" },
  { week: 10, question: "How do you know there is a God?", answer: "The light of nature and the works of God plainly declare that there is a God, but only his Word and Spirit effectually reveal him to me for my salvation.", answerChild: "The light of nature and God's Word reveal him to me.", proofTexts: ["1 Thess 1:5-6", "1 Thess 2:13", "2 Tim 3:15-16", "James 1:18", "1 Pet 1:22-23"], memoryVerse: "James 1:18" },
  { week: 11, question: "What rule has God given to direct you how you may glorify and enjoy him?", answer: "The Word of God, which is contained in the Scriptures of the Old and New Testaments, is the only rule to direct me how I may glorify God and enjoy Him.", answerChild: "The Word of God is the only rule.", proofTexts: ["Job 11:7", "Ps 119:104", "Isa 8:20", "Matt 22:29", "2 Tim 3:15-17"], memoryVerse: "2 Tim 3:16-17" },
  { week: 12, question: "How can you glorify God?", answer: "I can glorify God by loving him and doing what he commands.", answerChild: "I can glorify God by loving him and doing what he commands.", proofTexts: ["Eccl 12:13", "Mark 12:29-31", "John 15:8-10", "1 Cor 10:31"], memoryVerse: "Deut 11:1" },
  { week: 13, question: "What is the greatest commandment?", answer: "The greatest commandment is to love the Lord my God with all my heart, soul, and mind.", answerChild: "The greatest commandment is to love the Lord my God with all my heart, soul, and mind.", proofTexts: ["Deut 6:4-5", "Mark 12:29-30"], memoryVerse: "Mark 12:30" },
  { week: 14, question: "How can you come to know God and what he has made?", answer: "The fear of the Lord is the beginning of knowledge.", answerChild: "The fear of the Lord is the beginning of knowledge.", proofTexts: ["Prov 1:7"], memoryVerse: "Prov 1:7" },
  { week: 15, question: "What is sin?", answer: "Sin is any transgression against the law of God.", answerChild: "Sin is any transgression against the law of God.", proofTexts: ["1 John 3:4", "Rom 3:20", "James 2:9-11"], memoryVerse: "1 John 3:4" },
  { week: 16, question: "Can you keep the law of God perfectly?", answer: "No. I am inclined by nature to hate God and my neighbor.", answerChild: "No. I am inclined by nature to hate God and my neighbor.", proofTexts: ["Prov 20:9", "Eccl 7:20", "Rom 3:19-20", "James 2:10", "1 John 1:8", "1 John 1:10"], memoryVerse: "Rom 3:10" },
  { week: 17, question: "What are the results of sin?", answer: "Because of sin, all mankind lost communion with God and are under his wrath and curse, resulting in the miseries of this life, death itself, and the pains of hell forever.", answerChild: "Sin results in God's wrath and curse.", proofTexts: ["Deut 27:26", "Rom 1:18", "Rom 2:2", "Gal 3:10", "Eph 5:6"], memoryVerse: "Rom 1:18" },
  { week: 18, question: "Is there any way to escape the punishment of God and be again received into communion with him?", answer: "God's justice demands that I make full payment, either through myself or through a Redeemer.", answerChild: "God's justice demands that I make full payment, either through myself or through a Redeemer.", proofTexts: ["2 Thess 2:13", "Rom 5:21"], memoryVerse: "Isa 53:10-11" },
  { week: 19, question: "What kind of Redeemer must you seek?", answer: "I must seek a Redeemer who is truly human and also truly God.", answerChild: "I must seek a Redeemer who is truly human and also truly God.", proofTexts: ["Isa 9:6", "Heb 4:14-16"], memoryVerse: "Isa 9:6" },
  { week: 20, question: "Why must the Redeemer be a true and righteous human?", answer: "The Redeemer must be a true and righteous human because the justice of God requires that only one with a human nature who has not sinned may pay for my sin.", answerChild: "Only a righteous human can pay for my sin.", proofTexts: ["Rom 5:12", "Rom 5:15", "1 Cor 15:21", "Heb 2:14-16", "Heb 7:26-27", "1 Pet 3:18"], memoryVerse: "Heb 2:17" },
  { week: 21, question: "Why must the Redeemer also be true God?", answer: "The Redeemer must be true God so that by the power of his divine nature he might bear the burden of God's wrath and restore to me righteousness and life.", answerChild: "The Redeemer must be God to bear God's wrath.", proofTexts: ["Isa 9:5", "Deut 4:24", "Nah 1:6", "Ps 130:3", "Isa 53:5", "Isa 53:11", "John 3:16", "2 Cor 5:21"], memoryVerse: "Acts 2:24" },
  { week: 22, question: "Who is that Redeemer who at the same time is true God and a true and righteous human?", answer: "My only Redeemer is the Lord Jesus Christ, the eternal Son of God, who became human and died to pay the penalty for sin.", answerChild: "My only Redeemer is the Lord Jesus Christ.", proofTexts: ["1 Tim 2:5", "John 1:14", "1 Tim 3:16", "Col 2:9"], memoryVerse: "1 Tim 2:5" },
  { week: 23, question: "How did Christ, being the Son of God, become human?", answer: "Christ, the Son of God became human by taking to himself true human nature, being conceived by the Holy Spirit and the virgin Mary.", answerChild: "Christ was conceived by the Holy Spirit and born of the virgin Mary.", proofTexts: ["Matt 26:38", "Heb 4:15", "Heb 7:26", "Luke 1:31", "Luke 1:35"], memoryVerse: "Gal 4:4" },
  { week: 24, question: "How did Christ satisfy God's just wrath for sin?", answer: "Christ suffered the miseries of this life, the wrath of God, and the cursed death of the cross.", answerChild: "Christ suffered the miseries of this life, the wrath of God, and the cursed death of the cross.", proofTexts: ["Ps 22", "Isa 53"], memoryVerse: "Phil 2:8" },
  { week: 25, question: "Why was it necessary for Christ to humble himself even unto death?", answer: "Christ humbled himself unto death because the justice of God required that satisfaction for my sins could be made in no other way than by the death of the Son of God.", answerChild: "Only Christ's death could satisfy God's justice.", proofTexts: ["Matt 27:46", "Phil 2:8"], memoryVerse: "Col 1:21-22" },
  { week: 26, question: "Did Christ stay dead?", answer: "No. Christ rose again from the dead on the third day.", answerChild: "No. Christ rose again from the dead on the third day.", proofTexts: ["Luke 24:45-47", "1 Cor 15:3-4"], memoryVerse: "1 Cor 15:3-4" },
  { week: 27, question: "How are you made a partaker of the redemption purchased by Christ?", answer: "I am made a partaker of the redemption purchased by Christ through repentant faith in him and his substitutionary atoning death.", answerChild: "Through repentant faith in Christ.", proofTexts: ["Mark 1:15", "Luke 13:3", "Luke 13:5", "Acts 2:37-41", "Acts 16:30-31", "Acts 20:21", "Acts 26:20"], memoryVerse: "Eph 2:8-9" },
  { week: 28, question: "What is faith in Jesus Christ?", answer: "Faith in Jesus Christ is a saving grace, by which I receive and rest upon him alone for my salvation.", answerChild: "Faith is a saving grace by which I rest upon Christ alone.", proofTexts: ["John 14:6", "Acts 4:12", "1 Tim 2:5", "1 John 5:11-12"], memoryVerse: "Gal 2:20" },
  { week: 29, question: "What is repentance unto life?", answer: "Repentance unto life is a saving grace, by which I turn from my sin to God, promising to strive after new obedience.", answerChild: "Repentance is turning from sin to God.", proofTexts: ["Luke 19:8-10", "Rom 6:1-2", "2 Cor 7:9-11", "1 Thess 1:9-10"], memoryVerse: "2 Cor 7:10" },
  { week: 30, question: "What benefits in this life come from repentant faith in Jesus Christ?", answer: "Those who repent and believe in Jesus Christ partake of justification, adoption, and sanctification.", answerChild: "Those who repent and believe in Jesus Christ partake of justification, adoption, and sanctification.", proofTexts: ["Ezek 36:26", "Rom 8:30", "Eph 1:5"], memoryVerse: "Rom 8:30" },
  { week: 31, question: "What is justification?", answer: "Justification is an act of God's free grace in which he pardons all my sins and accepts me as righteous in his sight only because of the righteousness of Christ imputed to me.", answerChild: "Justification is God's free grace pardoning my sins.", proofTexts: ["Zech 3:1-5", "Rom 3:24-26", "Rom 4:5", "Rom 5:17-19", "Rom 8:33", "2 Cor 5:21", "Heb 8:12", "Phil 3:9"], memoryVerse: "2 Cor 5:21" },
  { week: 32, question: "What is adoption?", answer: "Adoption is an act of God's free grace in which I am received as a son of God with all its rights and privileges.", answerChild: "Adoption is an act of God's free grace in which I am received as a son of God with all its rights and privileges.", proofTexts: ["John 1:12", "Eph 1:5", "Eph 5:1", "Gal 4:7", "Gal 4:31", "1 John 3:1-3"], memoryVerse: "Gal 4:7" },
  { week: 33, question: "What is sanctification?", answer: "Sanctification is the work of God's Spirit by which I am renewed after the image of God and am enabled more and more to die to sin and live to righteousness.", answerChild: "Sanctification is being renewed after the image of God.", proofTexts: ["John 17:17", "Eph 2:10", "Eph 4:22-24", "Phil 2:12-13", "1 Thess 5:23"], memoryVerse: "John 17:17" },
  { week: 34, question: "What do you believe about the Holy Spirit?", answer: "The Holy Spirit is true and eternal God together with the Father and the Son.", answerChild: "The Holy Spirit is true and eternal God together with the Father and the Son.", proofTexts: ["Gen 1:1-2", "Matt 28:19", "Acts 5:3-4", "1 Cor 3:16"], memoryVerse: "John 14:16-17" },
  { week: 35, question: "What does the Holy Spirit do for you?", answer: "The Holy Spirit unites me to Christ, convicts me of sin, comforts me, and sanctifies me.", answerChild: "The Holy Spirit unites me to Christ, convicts me of sin, comforts me, and sanctifies me.", proofTexts: ["Eph 2:8", "Eph 3:17", "1 Thess 1:6", "2 Thess 2:13"], memoryVerse: "2 Thess 2:13" },
  { week: 36, question: "Since you have been saved by grace alone through Christ, without any merit of your own, why must you yet do good works?", answer: "I must do good works because Christ also renews me by his Holy Spirit to be his image, so that I might show thankfulness to God for his mercy.", answerChild: "I do good works to show thankfulness to God.", proofTexts: ["2 Cor 3:18", "Rom 12:1-2", "Eph 2:10"], memoryVerse: "Eph 2:10" },
  { week: 37, question: "What is prayer?", answer: "Prayer is an offering up of my desires to God for things agreeable to his will, in the name of Christ, with confession of my sins and thankfulness for his mercies.", answerChild: "Prayer is offering up my desires to God.", proofTexts: ["Gen 17:22", "Gen 18:33", "Neh 1:4-11", "Neh 2:4", "Matt 6:6", "Rom 8:26-27"], memoryVerse: "Ps 62:8" },
  { week: 38, question: "What is the church?", answer: "The church is an assembly of baptized believers in which the gospel is truly preached and the ordinances are rightly administered.", answerChild: "The church is an assembly of baptized believers in which the gospel is truly preached and the ordinances are rightly administered.", proofTexts: ["Matt 18:20", "Acts 2:42"], memoryVerse: "1 Cor 12:12-13" },
  { week: 39, question: "What is the gospel?", answer: "The gospel is the good news that those who repent and believe in the death and resurrection of Christ for their sins will be forgiven.", answerChild: "The gospel is the good news that those who repent and believe in the death and resurrection of Christ for their sins will be forgiven.", proofTexts: ["1 Cor 15:3-7", "Rom 1:16"], memoryVerse: "Rom 1:16" },
  { week: 40, question: "To whom should you preach the gospel?", answer: "I should preach the gospel to all people in all nations to the end of the earth.", answerChild: "I should preach the gospel to all people in all nations to the end of the earth.", proofTexts: ["Matt 28:19-20", "Acts 1:8"], memoryVerse: "Matt 28:19-20" },
  { week: 41, question: "What has Christ commanded for the church's worship?", answer: "Reading, preaching, and singing the Word of God, prayer, baptism, and the Lord's Supper are all parts of the worship of God.", answerChild: "Reading, preaching, singing, prayer, baptism, and the Lord's Supper.", proofTexts: ["1 Tim 2:1-2", "1 Tim 4:13", "Col 3:16", "Matt 28:19", "1 Cor 11:24-26"], memoryVerse: "1 Cor 14:40" },
  { week: 42, question: "What is baptism?", answer: "Baptism is an ordinance of the New Testament, instituted by Jesus Christ, to be a sign of the believer's fellowship with Christ in his death, burial, and resurrection.", answerChild: "Baptism is a sign of fellowship with Christ.", proofTexts: ["John 3:23", "Acts 2:41", "Acts 8:12", "Acts 8:35-38", "Col 2:12"], memoryVerse: "Rom 6:4" },
  { week: 43, question: "What is the duty of those who are rightly baptized?", answer: "It is the duty of those who are rightly baptized to join themselves to some visible and orderly church of Jesus Christ.", answerChild: "It is the duty of those who are rightly baptized to join themselves to some visible and orderly church of Jesus Christ.", proofTexts: ["Acts 2:47", "Heb 10:25"], memoryVerse: "Heb 10:25" },
  { week: 44, question: "What is the Lord's Supper?", answer: "The Lord's Supper is an ordinance of the New Testament, instituted by Jesus Christ, to be a sign of the believer's communion with Christ and his church through his broken body and shed blood.", answerChild: "The Lord's Supper is a sign of communion with Christ.", proofTexts: ["Mark 14:22-24", "1 Cor 11:23-29"], memoryVerse: "Luke 22:19-20" },
  { week: 45, question: "What benefits do believers receive from Christ at their death?", answer: "Believers are at their death made perfect in holiness and immediately pass into the presence of God forever.", answerChild: "Believers pass into God's presence forever.", proofTexts: ["Heb 12:23", "Phil 1:23", "2 Cor 5:8", "Luke 23:43", "1 Thess 4:14", "Isa 57:2", "Job 19:26"], memoryVerse: "John 3:16" },
  { week: 46, question: "What will be done to the wicked at death?", answer: "The wicked will at their death be cast into the torments of hell.", answerChild: "The wicked will at their death be cast into the torments of hell.", proofTexts: ["Ps 9:16-17", "Luke 12:5", "Rom 2:8-9", "Rom 2:12", "2 Thess 1:8-9", "Rev 20:12-15"], memoryVerse: "Ps 9:16" },
  { week: 47, question: "Where is Christ now?", answer: "Christ ascended into heaven and sits at the Father's right hand.", answerChild: "Christ ascended into heaven and sits at the Father's right hand.", proofTexts: ["Rom 8:34", "Col 3:1", "Heb 1:3", "Heb 10:12", "Heb 12:2"], memoryVerse: "Eph 1:20-21" },
  { week: 48, question: "How does Christ's resurrection benefit you?", answer: "Christ's resurrection is a certain promise of my glorious resurrection.", answerChild: "Christ's resurrection is a certain promise of my glorious resurrection.", proofTexts: ["1 Cor 15:43", "Matt 10:32", "1 John 3:2", "1 Thess 4:17"], memoryVerse: "1 Thess 4:13-14" },
  { week: 49, question: "How does Christ's ascension into heaven benefit you?", answer: "Christ is my advocate in heaven before his Father and my certain promise that he will take me up to himself.", answerChild: "Christ is my advocate in heaven before his Father and my certain promise that he will take me up to himself.", proofTexts: ["1 John 2:1", "Heb 4:15"], memoryVerse: "Rom 8:34" },
  { week: 50, question: "Will Jesus Christ come again?", answer: "Yes. Jesus Christ will come a second time in power and glory, which is the joy and hope of all believers.", answerChild: "Yes. Jesus Christ will come a second time in power and glory, which is the joy and hope of all believers.", proofTexts: ["Matt 25:31-43", "2 Thess 1:7-10", "2 Tim 4:1"], memoryVerse: "Acts 1:11" },
  { week: 51, question: "What will happen to believers after Christ comes again?", answer: "Believers will live with Christ forever in a new heaven and a new earth.", answerChild: "Believers will live with Christ forever in a new heaven and a new earth.", proofTexts: ["Isa 66:22", "1 Thess 4:16-17", "2 Pet 3:10-13", "Rev 21:1-4"], memoryVerse: "Rev 21:3" },
  { week: 52, question: "What is your only hope in life and death?", answer: "My only hope in life and death is that I am not my own but belong to God and to my Savior Jesus Christ.", answerChild: "My only hope in life and death is that I am not my own but belong to God and to my Savior Jesus Christ.", proofTexts: ["1 Cor 6:19-20", "Rom 14:7-9", "1 Cor 3:23", "Tit 2:14"], memoryVerse: "Rom 14:7-8" }
];

// Generate the complete file
function generateFile() {
  let output = `/**
 * Tune My Heart 52-Week Catechism
 * Based on historic catechisms including Heidelberg, Westminster, Keach, and Spurgeon
 */

export interface CatechismQuestion {
  week: number;
  question: string;
  answer: string;
  answerChild: string;
  proofTexts: Array<{
    reference: string;
    text: string;
  }>;
  memoryVerse: {
    reference: string;
    text: string;
  };
}

export const catechismQuestions: CatechismQuestion[] = [
`;

  correctData.forEach((q, index) => {
    const proofTexts = q.proofTexts.map(ref => 
      `      { reference: "${ref}", text: "" }`
    ).join(',\n');
    
    output += `  {
    week: ${q.week},
    question: "${q.question}",
    answer: "${q.answer}",
    answerChild: "${q.answerChild}",
    proofTexts: [
${proofTexts}
    ],
    memoryVerse: {
      reference: "${q.memoryVerse}",
      text: ""
    }
  }${index < correctData.length - 1 ? ',' : ''}
`;
  });

  const bonusData = correctData[51]; // week 52
  const bonusProofTexts = bonusData.proofTexts.map(ref => 
    `    { reference: "${ref}", text: "" }`
  ).join(',\n');

  output += `];

export const bonusQuestion: CatechismQuestion = {
  week: 0,
  question: "${bonusData.question}",
  answer: "${bonusData.answer}",
  answerChild: "${bonusData.answerChild}",
  proofTexts: [
${bonusProofTexts}
  ],
  memoryVerse: {
    reference: "${bonusData.memoryVerse}",
    text: ""
  }
};

export function getCatechismQuestion(week: number): CatechismQuestion | null {
  if (week === 0) return bonusQuestion;
  return catechismQuestions.find(q => q.week === week) || null;
}

export function getAllCatechismQuestions(): CatechismQuestion[] {
  return catechismQuestions;
}
`;

  return output;
}

// Write the file
const filePath = path.join(__dirname, '..', 'src', 'data', 'catechismData.ts');
const content = generateFile();
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Catechism data file completely rebuilt!');
console.log('All 52 weeks have correct questions/answers with empty text fields.');
