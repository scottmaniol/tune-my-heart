/**
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
  {
    week: 1,
    question: "Who made you? What else did God make?",
    answer: "God made me. God made all things.",
    answerChild: "God made me. God made all things.",
    proofTexts: [
      { reference: "Gen 1:26-27", text: "" },
      { reference: "Gen 2:7", text: "" },
      { reference: "Eccl 12:1", text: "" },
      { reference: "Acts 17:24-29", text: "" },
      { reference: "Gen 1:1", text: "" },
      { reference: "Gen 1:31", text: "" },
      { reference: "Acts 14:15", text: "" },
      { reference: "Rom 11:36", text: "" },
      { reference: "Col 1:16", text: "" }
    ],
    memoryVerse: {
      reference: "Gen 1:1",
      text: ""
    }
  },
  {
    week: 2,
    question: "Why did God make you and all things?",
    answer: "God made me to glorify him and enjoy him forever.",
    answerChild: "God made me to glorify him and enjoy him forever.",
    proofTexts: [
      { reference: "Ps 19:1", text: "" },
      { reference: "Jer 9:23-24", text: "" },
      { reference: "Rev 4:11", text: "" }
    ],
    memoryVerse: {
      reference: "1 Cor 10:31",
      text: ""
    }
  },
  {
    week: 3,
    question: "How did God make you and all things?",
    answer: "God made all things out of nothing, by the Word of his power, in the space of six days, and all very good.",
    answerChild: "God made all things out of nothing, by the Word of his power, in the space of six days, and all very good.",
    proofTexts: [
      { reference: "Gen 1:1-31", text: "" }
    ],
    memoryVerse: {
      reference: "Gen 1:31",
      text: ""
    }
  },
  {
    week: 4,
    question: "What is special about God's creation of you?",
    answer: "God made me in his own image.",
    answerChild: "God made me in his own image.",
    proofTexts: [
      { reference: "Gen 1:27", text: "" },
      { reference: "Gen 9:6", text: "" }
    ],
    memoryVerse: {
      reference: "Gen 1:27",
      text: ""
    }
  },
  {
    week: 5,
    question: "Who is God?",
    answer: "God is a spirit and does not have a body like man. He is infinite, eternal, and unchangeable.",
    answerChild: "God is a spirit.",
    proofTexts: [
      { reference: "John 4:24", text: "" },
      { reference: "2 Cor 3:17", text: "" },
      { reference: "1 Tim 1:17", text: "" }
    ],
    memoryVerse: {
      reference: "Ps 86:8",
      text: ""
    }
  },
  {
    week: 6,
    question: "What is God like?",
    answer: "God is the first and best of beings. He is holy, powerful, and good.",
    answerChild: "God is the first and best of beings. He is holy, powerful, and good.",
    proofTexts: [
      { reference: "Ps 147:5", text: "" },
      { reference: "Jer 32:17", text: "" },
      { reference: "Dan 4:34-35", text: "" },
      { reference: "Eph 1:11", text: "" }
    ],
    memoryVerse: {
      reference: "Isa 6:3",
      text: ""
    }
  },
  {
    week: 7,
    question: "Are there more gods than one?",
    answer: "No. There is only one true and living God.",
    answerChild: "No. There is only one true and living God.",
    proofTexts: [
      { reference: "Deut 6:4", text: "" },
      { reference: "Jer 10:10", text: "" },
      { reference: "Mark 12:29", text: "" },
      { reference: "Acts 17:22-31", text: "" }
    ],
    memoryVerse: {
      reference: "Deut 6:4",
      text: ""
    }
  },
  {
    week: 8,
    question: "In how many persons does this one God exist?",
    answer: "God exists in three persons: the Father, the Son, and the Holy Spirit, equal in essence, power, and glory.",
    answerChild: "God exists in three persons.",
    proofTexts: [
      { reference: "Matt 3:16-17", text: "" },
      { reference: "John 5:23", text: "" },
      { reference: "John 10:30", text: "" },
      { reference: "John 14:9-10", text: "" },
      { reference: "John 15:26", text: "" },
      { reference: "John 16:13-15", text: "" },
      { reference: "1 John 5:20", text: "" },
      { reference: "Rev 1:4-5", text: "" }
    ],
    memoryVerse: {
      reference: "2 Cor 13:14",
      text: ""
    }
  },
  {
    week: 9,
    question: "What are the decrees of God?",
    answer: "The decrees of God are his eternal purposes, whereby for his own glory he has ordained whatever comes to pass.",
    answerChild: "The decrees of God are his eternal purposes, whereby for his own glory he has ordained whatever comes to pass.",
    proofTexts: [
      { reference: "Eph 1:11-12", text: "" }
    ],
    memoryVerse: {
      reference: "Dan 4:35",
      text: ""
    }
  },
  {
    week: 10,
    question: "How do you know there is a God?",
    answer: "The light of nature and the works of God plainly declare that there is a God, but only his Word and Spirit effectually reveal him to me for my salvation.",
    answerChild: "The light of nature and God's Word reveal him to me.",
    proofTexts: [
      { reference: "1 Thess 1:5-6", text: "" },
      { reference: "1 Thess 2:13", text: "" },
      { reference: "2 Tim 3:15-16", text: "" },
      { reference: "James 1:18", text: "" },
      { reference: "1 Pet 1:22-23", text: "" }
    ],
    memoryVerse: {
      reference: "James 1:18",
      text: ""
    }
  },
  {
    week: 11,
    question: "What rule has God given to direct you how you may glorify and enjoy him?",
    answer: "The Word of God, which is contained in the Scriptures of the Old and New Testaments, is the only rule to direct me how I may glorify God and enjoy Him.",
    answerChild: "The Word of God is the only rule.",
    proofTexts: [
      { reference: "Job 11:7", text: "" },
      { reference: "Ps 119:104", text: "" },
      { reference: "Isa 8:20", text: "" },
      { reference: "Matt 22:29", text: "" },
      { reference: "2 Tim 3:15-17", text: "" }
    ],
    memoryVerse: {
      reference: "2 Tim 3:16-17",
      text: ""
    }
  },
  {
    week: 12,
    question: "How can you glorify God?",
    answer: "I can glorify God by loving him and doing what he commands.",
    answerChild: "I can glorify God by loving him and doing what he commands.",
    proofTexts: [
      { reference: "Eccl 12:13", text: "" },
      { reference: "Mark 12:29-31", text: "" },
      { reference: "John 15:8-10", text: "" },
      { reference: "1 Cor 10:31", text: "" }
    ],
    memoryVerse: {
      reference: "Deut 11:1",
      text: ""
    }
  },
  {
    week: 13,
    question: "What is the greatest commandment?",
    answer: "The greatest commandment is to love the Lord my God with all my heart, soul, and mind.",
    answerChild: "The greatest commandment is to love the Lord my God with all my heart, soul, and mind.",
    proofTexts: [
      { reference: "Deut 6:4-5", text: "" },
      { reference: "Mark 12:29-30", text: "" }
    ],
    memoryVerse: {
      reference: "Mark 12:30",
      text: ""
    }
  },
  {
    week: 14,
    question: "How can you come to know God and what he has made?",
    answer: "The fear of the Lord is the beginning of knowledge.",
    answerChild: "The fear of the Lord is the beginning of knowledge.",
    proofTexts: [
      { reference: "Prov 1:7", text: "" }
    ],
    memoryVerse: {
      reference: "Prov 1:7",
      text: ""
    }
  },
  {
    week: 15,
    question: "What is sin?",
    answer: "Sin is any transgression against the law of God.",
    answerChild: "Sin is any transgression against the law of God.",
    proofTexts: [
      { reference: "1 John 3:4", text: "" },
      { reference: "Rom 3:20", text: "" },
      { reference: "James 2:9-11", text: "" }
    ],
    memoryVerse: {
      reference: "1 John 3:4",
      text: ""
    }
  },
  {
    week: 16,
    question: "Can you keep the law of God perfectly?",
    answer: "No. I am inclined by nature to hate God and my neighbor.",
    answerChild: "No. I am inclined by nature to hate God and my neighbor.",
    proofTexts: [
      { reference: "Prov 20:9", text: "" },
      { reference: "Eccl 7:20", text: "" },
      { reference: "Rom 3:19-20", text: "" },
      { reference: "James 2:10", text: "" },
      { reference: "1 John 1:8", text: "" },
      { reference: "1 John 1:10", text: "" }
    ],
    memoryVerse: {
      reference: "Rom 3:10",
      text: ""
    }
  },
  {
    week: 17,
    question: "What are the results of sin?",
    answer: "Because of sin, all mankind lost communion with God and are under his wrath and curse, resulting in the miseries of this life, death itself, and the pains of hell forever.",
    answerChild: "Sin results in God's wrath and curse.",
    proofTexts: [
      { reference: "Deut 27:26", text: "" },
      { reference: "Rom 1:18", text: "" },
      { reference: "Rom 2:2", text: "" },
      { reference: "Gal 3:10", text: "" },
      { reference: "Eph 5:6", text: "" }
    ],
    memoryVerse: {
      reference: "Rom 1:18",
      text: ""
    }
  },
  {
    week: 18,
    question: "Is there any way to escape the punishment of God and be again received into communion with him?",
    answer: "God's justice demands that I make full payment, either through myself or through a Redeemer.",
    answerChild: "God's justice demands that I make full payment, either through myself or through a Redeemer.",
    proofTexts: [
      { reference: "2 Thess 2:13", text: "" },
      { reference: "Rom 5:21", text: "" }
    ],
    memoryVerse: {
      reference: "Isa 53:10-11",
      text: ""
    }
  },
  {
    week: 19,
    question: "What kind of Redeemer must you seek?",
    answer: "I must seek a Redeemer who is truly human and also truly God.",
    answerChild: "I must seek a Redeemer who is truly human and also truly God.",
    proofTexts: [
      { reference: "Isa 9:6", text: "" },
      { reference: "Heb 4:14-16", text: "" }
    ],
    memoryVerse: {
      reference: "Isa 9:6",
      text: ""
    }
  },
  {
    week: 20,
    question: "Why must the Redeemer be a true and righteous human?",
    answer: "The Redeemer must be a true and righteous human because the justice of God requires that only one with a human nature who has not sinned may pay for my sin.",
    answerChild: "Only a righteous human can pay for my sin.",
    proofTexts: [
      { reference: "Rom 5:12", text: "" },
      { reference: "Rom 5:15", text: "" },
      { reference: "1 Cor 15:21", text: "" },
      { reference: "Heb 2:14-16", text: "" },
      { reference: "Heb 7:26-27", text: "" },
      { reference: "1 Pet 3:18", text: "" }
    ],
    memoryVerse: {
      reference: "Heb 2:17",
      text: ""
    }
  },
  {
    week: 21,
    question: "Why must the Redeemer also be true God?",
    answer: "The Redeemer must be true God so that by the power of his divine nature he might bear the burden of God's wrath and restore to me righteousness and life.",
    answerChild: "The Redeemer must be God to bear God's wrath.",
    proofTexts: [
      { reference: "Isa 9:5", text: "" },
      { reference: "Deut 4:24", text: "" },
      { reference: "Nah 1:6", text: "" },
      { reference: "Ps 130:3", text: "" },
      { reference: "Isa 53:5", text: "" },
      { reference: "Isa 53:11", text: "" },
      { reference: "John 3:16", text: "" },
      { reference: "2 Cor 5:21", text: "" }
    ],
    memoryVerse: {
      reference: "Acts 2:24",
      text: ""
    }
  },
  {
    week: 22,
    question: "Who is that Redeemer who at the same time is true God and a true and righteous human?",
    answer: "My only Redeemer is the Lord Jesus Christ, the eternal Son of God, who became human and died to pay the penalty for sin.",
    answerChild: "My only Redeemer is the Lord Jesus Christ.",
    proofTexts: [
      { reference: "1 Tim 2:5", text: "" },
      { reference: "John 1:14", text: "" },
      { reference: "1 Tim 3:16", text: "" },
      { reference: "Col 2:9", text: "" }
    ],
    memoryVerse: {
      reference: "1 Tim 2:5",
      text: ""
    }
  },
  {
    week: 23,
    question: "How did Christ, being the Son of God, become human?",
    answer: "Christ, the Son of God became human by taking to himself true human nature, being conceived by the Holy Spirit and the virgin Mary.",
    answerChild: "Christ was conceived by the Holy Spirit and born of the virgin Mary.",
    proofTexts: [
      { reference: "Matt 26:38", text: "" },
      { reference: "Heb 4:15", text: "" },
      { reference: "Heb 7:26", text: "" },
      { reference: "Luke 1:31", text: "" },
      { reference: "Luke 1:35", text: "" }
    ],
    memoryVerse: {
      reference: "Gal 4:4",
      text: ""
    }
  },
  {
    week: 24,
    question: "How did Christ satisfy God's just wrath for sin?",
    answer: "Christ suffered the miseries of this life, the wrath of God, and the cursed death of the cross.",
    answerChild: "Christ suffered the miseries of this life, the wrath of God, and the cursed death of the cross.",
    proofTexts: [
      { reference: "Ps 22", text: "" },
      { reference: "Isa 53", text: "" }
    ],
    memoryVerse: {
      reference: "Phil 2:8",
      text: ""
    }
  },
  {
    week: 25,
    question: "Why was it necessary for Christ to humble himself even unto death?",
    answer: "Christ humbled himself unto death because the justice of God required that satisfaction for my sins could be made in no other way than by the death of the Son of God.",
    answerChild: "Only Christ's death could satisfy God's justice.",
    proofTexts: [
      { reference: "Matt 27:46", text: "" },
      { reference: "Phil 2:8", text: "" }
    ],
    memoryVerse: {
      reference: "Col 1:21-22",
      text: ""
    }
  },
  {
    week: 26,
    question: "Did Christ stay dead?",
    answer: "No. Christ rose again from the dead on the third day.",
    answerChild: "No. Christ rose again from the dead on the third day.",
    proofTexts: [
      { reference: "Luke 24:45-47", text: "" },
      { reference: "1 Cor 15:3-4", text: "" }
    ],
    memoryVerse: {
      reference: "1 Cor 15:3-4",
      text: ""
    }
  },
  {
    week: 27,
    question: "How are you made a partaker of the redemption purchased by Christ?",
    answer: "I am made a partaker of the redemption purchased by Christ through repentant faith in him and his substitutionary atoning death.",
    answerChild: "Through repentant faith in Christ.",
    proofTexts: [
      { reference: "Mark 1:15", text: "" },
      { reference: "Luke 13:3", text: "" },
      { reference: "Luke 13:5", text: "" },
      { reference: "Acts 2:37-41", text: "" },
      { reference: "Acts 16:30-31", text: "" },
      { reference: "Acts 20:21", text: "" },
      { reference: "Acts 26:20", text: "" }
    ],
    memoryVerse: {
      reference: "Eph 2:8-9",
      text: ""
    }
  },
  {
    week: 28,
    question: "What is faith in Jesus Christ?",
    answer: "Faith in Jesus Christ is a saving grace, by which I receive and rest upon him alone for my salvation.",
    answerChild: "Faith is a saving grace by which I rest upon Christ alone.",
    proofTexts: [
      { reference: "John 14:6", text: "" },
      { reference: "Acts 4:12", text: "" },
      { reference: "1 Tim 2:5", text: "" },
      { reference: "1 John 5:11-12", text: "" }
    ],
    memoryVerse: {
      reference: "Gal 2:20",
      text: ""
    }
  },
  {
    week: 29,
    question: "What is repentance unto life?",
    answer: "Repentance unto life is a saving grace, by which I turn from my sin to God, promising to strive after new obedience.",
    answerChild: "Repentance is turning from sin to God.",
    proofTexts: [
      { reference: "Luke 19:8-10", text: "" },
      { reference: "Rom 6:1-2", text: "" },
      { reference: "2 Cor 7:9-11", text: "" },
      { reference: "1 Thess 1:9-10", text: "" }
    ],
    memoryVerse: {
      reference: "2 Cor 7:10",
      text: ""
    }
  },
  {
    week: 30,
    question: "What benefits in this life come from repentant faith in Jesus Christ?",
    answer: "Those who repent and believe in Jesus Christ partake of justification, adoption, and sanctification.",
    answerChild: "Those who repent and believe in Jesus Christ partake of justification, adoption, and sanctification.",
    proofTexts: [
      { reference: "Ezek 36:26", text: "" },
      { reference: "Rom 8:30", text: "" },
      { reference: "Eph 1:5", text: "" }
    ],
    memoryVerse: {
      reference: "Rom 8:30",
      text: ""
    }
  },
  {
    week: 31,
    question: "What is justification?",
    answer: "Justification is an act of God's free grace in which he pardons all my sins and accepts me as righteous in his sight only because of the righteousness of Christ imputed to me.",
    answerChild: "Justification is God's free grace pardoning my sins.",
    proofTexts: [
      { reference: "Zech 3:1-5", text: "" },
      { reference: "Rom 3:24-26", text: "" },
      { reference: "Rom 4:5", text: "" },
      { reference: "Rom 5:17-19", text: "" },
      { reference: "Rom 8:33", text: "" },
      { reference: "2 Cor 5:21", text: "" },
      { reference: "Heb 8:12", text: "" },
      { reference: "Phil 3:9", text: "" }
    ],
    memoryVerse: {
      reference: "2 Cor 5:21",
      text: ""
    }
  },
  {
    week: 32,
    question: "What is adoption?",
    answer: "Adoption is an act of God's free grace in which I am received as a son of God with all its rights and privileges.",
    answerChild: "Adoption is an act of God's free grace in which I am received as a son of God with all its rights and privileges.",
    proofTexts: [
      { reference: "John 1:12", text: "" },
      { reference: "Eph 1:5", text: "" },
      { reference: "Eph 5:1", text: "" },
      { reference: "Gal 4:7", text: "" },
      { reference: "Gal 4:31", text: "" },
      { reference: "1 John 3:1-3", text: "" }
    ],
    memoryVerse: {
      reference: "Gal 4:7",
      text: ""
    }
  },
  {
    week: 33,
    question: "What is sanctification?",
    answer: "Sanctification is the work of God's Spirit by which I am renewed after the image of God and am enabled more and more to die to sin and live to righteousness.",
    answerChild: "Sanctification is being renewed after the image of God.",
    proofTexts: [
      { reference: "John 17:17", text: "" },
      { reference: "Eph 2:10", text: "" },
      { reference: "Eph 4:22-24", text: "" },
      { reference: "Phil 2:12-13", text: "" },
      { reference: "1 Thess 5:23", text: "" }
    ],
    memoryVerse: {
      reference: "John 17:17",
      text: ""
    }
  },
  {
    week: 34,
    question: "What do you believe about the Holy Spirit?",
    answer: "The Holy Spirit is true and eternal God together with the Father and the Son.",
    answerChild: "The Holy Spirit is true and eternal God together with the Father and the Son.",
    proofTexts: [
      { reference: "Gen 1:1-2", text: "" },
      { reference: "Matt 28:19", text: "" },
      { reference: "Acts 5:3-4", text: "" },
      { reference: "1 Cor 3:16", text: "" }
    ],
    memoryVerse: {
      reference: "John 14:16-17",
      text: ""
    }
  },
  {
    week: 35,
    question: "What does the Holy Spirit do for you?",
    answer: "The Holy Spirit unites me to Christ, convicts me of sin, comforts me, and sanctifies me.",
    answerChild: "The Holy Spirit unites me to Christ, convicts me of sin, comforts me, and sanctifies me.",
    proofTexts: [
      { reference: "Eph 2:8", text: "" },
      { reference: "Eph 3:17", text: "" },
      { reference: "1 Thess 1:6", text: "" },
      { reference: "2 Thess 2:13", text: "" }
    ],
    memoryVerse: {
      reference: "2 Thess 2:13",
      text: ""
    }
  },
  {
    week: 36,
    question: "Since you have been saved by grace alone through Christ, without any merit of your own, why must you yet do good works?",
    answer: "I must do good works because Christ also renews me by his Holy Spirit to be his image, so that I might show thankfulness to God for his mercy.",
    answerChild: "I do good works to show thankfulness to God.",
    proofTexts: [
      { reference: "2 Cor 3:18", text: "" },
      { reference: "Rom 12:1-2", text: "" },
      { reference: "Eph 2:10", text: "" }
    ],
    memoryVerse: {
      reference: "Eph 2:10",
      text: ""
    }
  },
  {
    week: 37,
    question: "What is prayer?",
    answer: "Prayer is an offering up of my desires to God for things agreeable to his will, in the name of Christ, with confession of my sins and thankfulness for his mercies.",
    answerChild: "Prayer is offering up my desires to God.",
    proofTexts: [
      { reference: "Gen 17:22", text: "" },
      { reference: "Gen 18:33", text: "" },
      { reference: "Neh 1:4-11", text: "" },
      { reference: "Neh 2:4", text: "" },
      { reference: "Matt 6:6", text: "" },
      { reference: "Rom 8:26-27", text: "" }
    ],
    memoryVerse: {
      reference: "Ps 62:8",
      text: ""
    }
  },
  {
    week: 38,
    question: "What is the church?",
    answer: "The church is an assembly of baptized believers in which the gospel is truly preached and the ordinances are rightly administered.",
    answerChild: "The church is an assembly of baptized believers in which the gospel is truly preached and the ordinances are rightly administered.",
    proofTexts: [
      { reference: "Matt 18:20", text: "" },
      { reference: "Acts 2:42", text: "" }
    ],
    memoryVerse: {
      reference: "1 Cor 12:12-13",
      text: ""
    }
  },
  {
    week: 39,
    question: "What is the gospel?",
    answer: "The gospel is the good news that those who repent and believe in the death and resurrection of Christ for their sins will be forgiven.",
    answerChild: "The gospel is the good news that those who repent and believe in the death and resurrection of Christ for their sins will be forgiven.",
    proofTexts: [
      { reference: "1 Cor 15:3-7", text: "" },
      { reference: "Rom 1:16", text: "" }
    ],
    memoryVerse: {
      reference: "Rom 1:16",
      text: ""
    }
  },
  {
    week: 40,
    question: "To whom should you preach the gospel?",
    answer: "I should preach the gospel to all people in all nations to the end of the earth.",
    answerChild: "I should preach the gospel to all people in all nations to the end of the earth.",
    proofTexts: [
      { reference: "Matt 28:19-20", text: "" },
      { reference: "Acts 1:8", text: "" }
    ],
    memoryVerse: {
      reference: "Matt 28:19-20",
      text: ""
    }
  },
  {
    week: 41,
    question: "What has Christ commanded for the church's worship?",
    answer: "Reading, preaching, and singing the Word of God, prayer, baptism, and the Lord's Supper are all parts of the worship of God.",
    answerChild: "Reading, preaching, singing, prayer, baptism, and the Lord's Supper.",
    proofTexts: [
      { reference: "1 Tim 2:1-2", text: "" },
      { reference: "1 Tim 4:13", text: "" },
      { reference: "Col 3:16", text: "" },
      { reference: "Matt 28:19", text: "" },
      { reference: "1 Cor 11:24-26", text: "" }
    ],
    memoryVerse: {
      reference: "1 Cor 14:40",
      text: ""
    }
  },
  {
    week: 42,
    question: "What is baptism?",
    answer: "Baptism is an ordinance of the New Testament, instituted by Jesus Christ, to be a sign of the believer's fellowship with Christ in his death, burial, and resurrection.",
    answerChild: "Baptism is a sign of fellowship with Christ.",
    proofTexts: [
      { reference: "John 3:23", text: "" },
      { reference: "Acts 2:41", text: "" },
      { reference: "Acts 8:12", text: "" },
      { reference: "Acts 8:35-38", text: "" },
      { reference: "Col 2:12", text: "" }
    ],
    memoryVerse: {
      reference: "Rom 6:4",
      text: ""
    }
  },
  {
    week: 43,
    question: "What is the duty of those who are rightly baptized?",
    answer: "It is the duty of those who are rightly baptized to join themselves to some visible and orderly church of Jesus Christ.",
    answerChild: "It is the duty of those who are rightly baptized to join themselves to some visible and orderly church of Jesus Christ.",
    proofTexts: [
      { reference: "Acts 2:47", text: "" },
      { reference: "Heb 10:25", text: "" }
    ],
    memoryVerse: {
      reference: "Heb 10:25",
      text: ""
    }
  },
  {
    week: 44,
    question: "What is the Lord's Supper?",
    answer: "The Lord's Supper is an ordinance of the New Testament, instituted by Jesus Christ, to be a sign of the believer's communion with Christ and his church through his broken body and shed blood.",
    answerChild: "The Lord's Supper is a sign of communion with Christ.",
    proofTexts: [
      { reference: "Mark 14:22-24", text: "" },
      { reference: "1 Cor 11:23-29", text: "" }
    ],
    memoryVerse: {
      reference: "Luke 22:19-20",
      text: ""
    }
  },
  {
    week: 45,
    question: "What benefits do believers receive from Christ at their death?",
    answer: "Believers are at their death made perfect in holiness and immediately pass into the presence of God forever.",
    answerChild: "Believers pass into God's presence forever.",
    proofTexts: [
      { reference: "Heb 12:23", text: "" },
      { reference: "Phil 1:23", text: "" },
      { reference: "2 Cor 5:8", text: "" },
      { reference: "Luke 23:43", text: "" },
      { reference: "1 Thess 4:14", text: "" },
      { reference: "Isa 57:2", text: "" },
      { reference: "Job 19:26", text: "" }
    ],
    memoryVerse: {
      reference: "John 3:16",
      text: ""
    }
  },
  {
    week: 46,
    question: "What will be done to the wicked at death?",
    answer: "The wicked will at their death be cast into the torments of hell.",
    answerChild: "The wicked will at their death be cast into the torments of hell.",
    proofTexts: [
      { reference: "Ps 9:16-17", text: "" },
      { reference: "Luke 12:5", text: "" },
      { reference: "Rom 2:8-9", text: "" },
      { reference: "Rom 2:12", text: "" },
      { reference: "2 Thess 1:8-9", text: "" },
      { reference: "Rev 20:12-15", text: "" }
    ],
    memoryVerse: {
      reference: "Ps 9:16",
      text: ""
    }
  },
  {
    week: 47,
    question: "Where is Christ now?",
    answer: "Christ ascended into heaven and sits at the Father's right hand.",
    answerChild: "Christ ascended into heaven and sits at the Father's right hand.",
    proofTexts: [
      { reference: "Rom 8:34", text: "" },
      { reference: "Col 3:1", text: "" },
      { reference: "Heb 1:3", text: "" },
      { reference: "Heb 10:12", text: "" },
      { reference: "Heb 12:2", text: "" }
    ],
    memoryVerse: {
      reference: "Eph 1:20-21",
      text: ""
    }
  },
  {
    week: 48,
    question: "How does Christ's resurrection benefit you?",
    answer: "Christ's resurrection is a certain promise of my glorious resurrection.",
    answerChild: "Christ's resurrection is a certain promise of my glorious resurrection.",
    proofTexts: [
      { reference: "1 Cor 15:43", text: "" },
      { reference: "Matt 10:32", text: "" },
      { reference: "1 John 3:2", text: "" },
      { reference: "1 Thess 4:17", text: "" }
    ],
    memoryVerse: {
      reference: "1 Thess 4:13-14",
      text: ""
    }
  },
  {
    week: 49,
    question: "How does Christ's ascension into heaven benefit you?",
    answer: "Christ is my advocate in heaven before his Father and my certain promise that he will take me up to himself.",
    answerChild: "Christ is my advocate in heaven before his Father and my certain promise that he will take me up to himself.",
    proofTexts: [
      { reference: "1 John 2:1", text: "" },
      { reference: "Heb 4:15", text: "" }
    ],
    memoryVerse: {
      reference: "Rom 8:34",
      text: ""
    }
  },
  {
    week: 50,
    question: "Will Jesus Christ come again?",
    answer: "Yes. Jesus Christ will come a second time in power and glory, which is the joy and hope of all believers.",
    answerChild: "Yes. Jesus Christ will come a second time in power and glory, which is the joy and hope of all believers.",
    proofTexts: [
      { reference: "Matt 25:31-43", text: "" },
      { reference: "2 Thess 1:7-10", text: "" },
      { reference: "2 Tim 4:1", text: "" }
    ],
    memoryVerse: {
      reference: "Acts 1:11",
      text: ""
    }
  },
  {
    week: 51,
    question: "What will happen to believers after Christ comes again?",
    answer: "Believers will live with Christ forever in a new heaven and a new earth.",
    answerChild: "Believers will live with Christ forever in a new heaven and a new earth.",
    proofTexts: [
      { reference: "Isa 66:22", text: "" },
      { reference: "1 Thess 4:16-17", text: "" },
      { reference: "2 Pet 3:10-13", text: "" },
      { reference: "Rev 21:1-4", text: "" }
    ],
    memoryVerse: {
      reference: "Rev 21:3",
      text: ""
    }
  },
  {
    week: 52,
    question: "What is your only hope in life and death?",
    answer: "My only hope in life and death is that I am not my own but belong to God and to my Savior Jesus Christ.",
    answerChild: "My only hope in life and death is that I am not my own but belong to God and to my Savior Jesus Christ.",
    proofTexts: [
      { reference: "1 Cor 6:19-20", text: "" },
      { reference: "Rom 14:7-9", text: "" },
      { reference: "1 Cor 3:23", text: "" },
      { reference: "Tit 2:14", text: "" }
    ],
    memoryVerse: {
      reference: "Rom 14:7-8",
      text: ""
    }
  }
];

export const bonusQuestion: CatechismQuestion = {
  week: 0,
  question: "What is your only hope in life and death?",
  answer: "My only hope in life and death is that I am not my own but belong to God and to my Savior Jesus Christ.",
  answerChild: "My only hope in life and death is that I am not my own but belong to God and to my Savior Jesus Christ.",
  proofTexts: [
    { reference: "1 Cor 6:19-20", text: "" },
    { reference: "Rom 14:7-9", text: "" },
    { reference: "1 Cor 3:23", text: "" },
    { reference: "Tit 2:14", text: "" }
  ],
  memoryVerse: {
    reference: "Rom 14:7-8",
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
