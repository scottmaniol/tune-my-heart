/**
 * Tune My Heart 52-Week Hymnal
 * Weekly hymns for family worship with complete resources
 */

export interface Hymn {
  week: number;
  title: string;
  lyrics?: string;
  pdfUrl?: string;
  pianoAudioUrl?: string;
  vocalAudioUrl?: string;
  author?: string;
  composer?: string;
  year?: number;
  tuneNote?: string;
}

const FIREBASE_STORAGE_BASE = "https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/public%2Fscores%2F";

export const hymns: Hymn[] = [
  {
    week: 1,
    title: "All Creatures of Our God and King",
    author: "Francis of Assisi (1225), trans. William H. Draper (1919)",
    tuneNote: "LASST UNS ERFREUEN",
    pdfUrl: `${FIREBASE_STORAGE_BASE}All%20Creatures%20of%20Our%20God%20and%20King.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F159%20All%20Creatures%20of%20Our%20God%20and%20King.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F23%20All%20Creatures%20of%20Our%20God%20and%20King.mp3?alt=media`,
    lyrics: `1 All creatures of our God and King,\nlift up your voice and with us sing,\n"Alleluia! Alleluia!"\nThou burning sun with golden beam,\nthou silver moon with softer gleam,\nO praise Him, O praise Him!\nalleluia, alleluia, alleluia!\n\n2 Thou rushing wind that art so strong,\nye clouds that sail in heav\'n along,\nO praise Him! Alleluia!\nThou rising morn, in praise rejoice,\nye lights of ev\'ning, find a voice,\nO praise Him, O praise Him!\nalleluia, alleluia, alleluia!\n\n3 And all ye men of tender heart,\nforgiving others, take your part,\nO sing ye! Alleluia!\nYe who long pain and sorrow bear,\npraise God and on Him cast your care;\nO praise Him, O praise Him!\nalleluia, alleluia, alleluia!\n\n4 Let all things their Creator bless,\nand worship Him in humbleness;\nO praise Him! Alleluia!\nPraise, praise the Father, praise the Son,\nand praise the Spirit, Three in One;\nO praise Him, O praise Him!\nalleluia, alleluia, alleluia!`
  },
  {
    week: 2,
    title: "The God of Abraham Praise",
    author: "Thomas Olivers (1770)",
    tuneNote: "LEONI",
    pdfUrl: `${FIREBASE_STORAGE_BASE}The%20God%20of%20Abraham%20Praise.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F155%20The%20God%20of%20Abraham%20Praise.mp3?alt=media`,
    lyrics: `1 The God of Abr\'ham praise,\nwho reigns enthroned above;\nthe Ancient of eternal days\nand God of love!\nJehovah, great I AM,\nby earth and heav\'n confessed\nI bow and bless the sacred Name\nforever blest.\n\n2 The God of Abr\'ham praise,\nat whose supreme command\nfrom earth I rise, and seek the joys\nat His right hand.\nI all on earth forsake,\nits wisdom, fame, and pow\'r,\nand Him my only Portion make,\nmy Shield and Tow\'r.\n\n3 He by Himself hath sworn,\nI on His oath depend;\nI shall, on eagles\' wings upborne,\nto heaven ascend,\nI shall behold His face,\nI shall His pow\'r adore,\nand sing the wonders of His grace\nforevermore.\n\n4 He keeps His own secure,\nHe guards them by His side,\narrays in garments, white and pure,\nHis spotless bride:\nwith streams of sacred bliss,\nwith gross of living joys-\nwith all the fruits of paradise\nHe still supplies.\n\n5 Before the great Three-One\nthey all exulting stand;\nand tell the wonders He hath done,\nthrough all their land:\nthe list\'ning spheres attend,\nand swell the growing fame;\nand sing, in songs which never end,\nthe wondrous Name.\n\n6 The whole triumphant host\ngives thanks to God on high;\n"Hail, Father, Son, and Holy Ghost"\nthey ever cry.\nHail, Abr\'ham\'s God and mine!\nI join the heavenly lays;\nall might and majesty are Thine,\nand endless praise.`
  },
  {
    week: 3,
    title: "Sing Praise to God Who Reigns Above",
    author: "Johann J. Schütz (1675), trans. Frances E. Cox (1864)",
    tuneNote: "MIT FREUDEN ZART",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Sing%20Praise%20to%20God.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F166%20Sing%20Praise%20to%20God%20Who%20Reigns%20Above.mp3?alt=media`,
    lyrics: `1 Sing praise to God who reigns above,\nthe God of all creation;\nthe God of power, the God of love,\nthe God of our salvation;\nwith healing balm my soul He fills,\nand every faithless murmur stills-\nto God all praise and glory!\n\n2 What God\'s almighty power has made\nin mercy He is keeping;\nby morning glow or evening shade\nHis eye is never sleeping;\nwithin the kingdom of His might,\nlo! all is just and all is right-\nto God all praise and glory!\n\n3 The Lord is never far away,\nbut through all grief distressing,\nan ever-present help and stay,\nour peace and joy and blessing;\nas with a mother\'s tender hand\nHe leads His own, His chosen band-\nto God all praise and glory!\n\n4 Thus all my toilsome way along,\nI sing aloud His praises,\nthat all may hear the grateful song\nmy voice unwearied raises;\nbe joyful in the Lord, my heart!\nBoth soul and body bear your part-\nto God all praise and glory!`
  },
  {
    week: 4,
    title: "Not What These Hands Have Done",
    author: "Horatius Bonar (1861)",
    tuneNote: "NOT WHAT THESE HANDS",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Not%20What%20These%20Hands%20Have%20Done.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F325%20Not%20What%20These%20Hands%20Have%20Done.mp3?alt=media`,
    lyrics: `1 Not what these hands have done\ncan save this guilty soul;\nnot what this toiling flesh has borne\ncan make my spirit whole.\nNot what I feel or do\ncan give me peace with God;\nnot all my prayers and sighs and tears\ncan bear my awful load.\n\n2 Thy work alone, O Christ,\ncan ease this weight of sin;\nThy blood alone, O Lamb of God,\ncan give me peace within.\nThy love to me, O God,\nnot mine, O Lord, to Thee,\ncan rid me of this dark unrest,\nand set my spirit free.\n\n3 Thy grace alone, O God,\nto me can pardon speak;\nThy power alone, O Son of God,\ncan this sore bondage break.\nNo other work save Thine,\nno other blood will do;\nno strength save that which is divine\ncan bear me safely through.\n\n4 I bless the Christ of God;\nI rest on love divine;\nand with unfaltering lip and heart\nI call this Savior mine.\nHis cross dispels each doubt;\nI bury in His tomb\neach thought of unbelief and fear,\neach lingering shade of gloom.\n\n5 I praise the God of grace;\nI trust His truth and might;\nHe calls me His, I call Him mine,\nmy God, my joy, my light.\n\'Tis He who saveth me,\nand freely pardon gives;\nI love because He loveth me,\nI live because He lives.`
  },
  {
    week: 5,
    title: "Blessed Jesus at Thy Word",
    author: "Tobias Clausnitzer (1663), trans. Catherine Winkworth (1858)",
    tuneNote: "LIEBSTER JESU",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Blessed%20Jesus%20at%20Thy%20Word.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F346%20Blessed%20Jesus%2C%20at%20Thy%20Word.mp3?alt=media`,
    lyrics: `1 Blessed Jesus, at Thy word\nwe are gathered all to hear Thee;\nlet our hearts and souls be stirred\nnow to seek and love and fear Thee,\nby Thy teachings, sweet and holy,\ndrawn from earth to love Thee solely.\n\n2 All our knowledge, sense, and sight\nlie in deepest darkness shrouded,\ntill Thy Spirit breaks our night\nwith the beams of truth unclouded.\nThou alone to God canst win us;\nThou must work all good within us.\n\n3 Glorious Lord, Thyself impart!\nLight of light, from God proceeding,\nopen Thou our ears and heart;\nhelp us by Thy Spirit\'s pleading.\nHear the cry Thy people raises;\nhear and bless our prayers and praises.`
  },
  {
    week: 6,
    title: "What God Ordains is Always Good",
    author: "Samuel Rodigast (1676), trans. Catherine Winkworth (1863)",
    tuneNote: "WAS GOTT TUT",
    pdfUrl: `${FIREBASE_STORAGE_BASE}What%20God%20Ordains%20Is%20Always%20Good.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F411%20What%20God%20Ordains%20Is%20Always%20Good.mp3?alt=media`,
    lyrics: `1 What God ordains is always good;\nHis will is just and holy.\nAs He directs my life for me,\nI follow meek and lowly.\nMy God indeed\nin every need\ndoth well know how to shield me;\nto Him, then, I will yield me.\n\n2 What God ordains is always good;\nHe never will deceive me.\nHe leads me in His righteous way,\nand never will He leave me.\nI take content\nwhat He hath sent;\nHis hand that sends me sadness\nwill turn my tears to gladness.\n\n3 What God ordains is always good;\nHis loving thought attends me.\nNo poison can be in the cup\nthat my Physician sends me.\nMy God is true;\neach morning new\nI trust His grace unending,\nmy life to Him commending.\n\n4 What God ordains is always good;\nHe is my friend and Father.\nHe suffers naught to do me harm,\nthough many storms may gather.\nNow I may know\nboth joy and woe;\nsomeday I shall see clearly\nthat He hath loved me dearly.\n\n5 What God ordains is always good;\nthough I the cup am drinking\nwhich savors now of bitterness,\nI take it, never shrinking.\nFor after grief\nGod grants relief;\nmy heart with comfort filling\nand all my sorrow stilling.\n\n6 What God ordains is always good;\nthis truth remains unshaken.\nThough sorrow, need, or death be mine,\nI shall not be forsaken.\nI fear no harm,\nfor with His arm\nHe shall embrace and shield me;\nso to my God I yield me.`
  },
  {
    week: 7,
    title: "God Moves in a Mysterious Way",
    author: "William Cowper (1774)",
    tuneNote: "LONDON NEW",
    pdfUrl: `${FIREBASE_STORAGE_BASE}God%20Moves%20in%20a%20Mysterious%20Way.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F412%20God%20Moves%20in%20a%20Mysterious%20Way.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F04%20God%20Moves%20in%20a%20Mysterious%20Way.mp3?alt=media`,
    lyrics: `1 God moves in a mysterious way\nHis wonders to perform;\nHe plants His footsteps in the sea,\nand rides upon the storm.\n\n2 Deep in unfathomable mines\nof never-failing skill,\nHe treasures up His bright designs,\nand works His sovereign will.\n\n3 Ye fearful saints, fresh courage take;\nthe clouds ye so much dread\nare big with mercy, and shall break\nin blessings on your head.\n\n4 Judge not the Lord by feeble sense,\nbut trust Him for His grace;\nbehind a frowning providence\nHe hides a smiling face.\n\n5 His purposes will ripen fast,\nunfolding every hour;\nthe bud may have a bitter taste,\nbut sweet will be the flow\'r.\n\n6 Blind unbelief is sure to err,\nand scan His work in vain:\nGod is His own interpreter,\nand He will make it plain.`
  },
  {
    week: 8,
    title: "Guide Me, O Thou Great Jehovah",
    author: "William Williams (1745), trans. Peter Williams (1771)",
    tuneNote: "CWM RHONDDA",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Guide%20Me%20O%20Thou%20Great%20Jehovah.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F369%20Guide%20Me%2C%20O%20Thou%20Great%20Jehovah.mp3?alt=media`,
    lyrics: `1 Guide me, O Thou great Jehovah,\npilgrim through this barren land;\nI am weak, but Thou art mighty;\nhold me with Thy powerful hand;\nBread of heaven, Bread of heaven,\nfeed me till I want no more,\nfeed me till I want no more.\n\n2 Open now the crystal fountain,\nwhence the healing stream doth flow;\nlet the fire and cloudy pillar\nlead me all my journey through;\nstrong Deliverer, strong Deliverer,\nbe Thou still my Strength and Shield,\nbe Thou still my Strength and Shield.\n\n3 When I tread the verge of Jordan,\nbid my anxious fears subside;\nDeath of death, and hell\'s Destruction,\nland me safe on Canaan\'s side;\nsongs of praises, songs of praises,\nI will ever give to Thee,\nI will ever give to Thee.`
  },
  {
    week: 9,
    title: "Immortal, Invisible, God Only Wise",
    author: "Walter Chalmers Smith (1867)",
    tuneNote: "ST. DENIO",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Immortal%20Invisible%20God%20Only%20Wise.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F173%20Immortal%2C%20Invisible%2C%20God%20Only%20Wise.mp3?alt=media`,
    lyrics: `1 Immortal, invisible, God only wise,\nin light inaccessible hid from our eyes;\nmost blessed, most glorious, the Ancient of Days,\nAlmighty, victorious, Thy great name we praise.\n\n2 Unresting, unhasting, and silent as light,\nnor wanting, nor wasting, Thou rulest in might;\nThy justice, like mountains, high soaring above\nThy clouds, which are fountains of goodness and love.\n\n3 To all, life Thou givest, to both great and small;\nin all life Thou livest, the true life of all;\nwe blossom and flourish as leaves on the tree,\nand wither and perish–, but naught changeth Thee.\n\n4 Great Father of glory, pure Father of light,\nThine angels adore Thee, all veiling their sight.\nAll praise we would render; O help us to see\n\'tis only the splendor of light hideth Thee!`
  },
  {
    week: 10,
    title: "Be Thou My Vision",
    author: "Ancient Irish (8th century), trans. Mary E. Byrne (1905)",
    tuneNote: "SLANE",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Be%20Thou%20My%20Vision.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F352%20Be%20Thou%20My%20Vision.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F46%20Be%20Thou%20My%20Vision.mp3?alt=media`,
    lyrics: `1 Be Thou my vision, O Lord of my heart;\nnaught be all else to me, save that Thou art.\nThou my best thought, by day or by night,\nwaking or sleeping, Thy presence my light.\n\n2 Be Thou my wisdom, and Thou my true word;\nI ever with Thee and Thou with me, Lord.\nThou my great Father; Thine own may I be,\nThou in me dwelling, and I one with Thee.\n\n3 Riches I heed not, nor man\'s empty praise,\nThou mine inheritance, now and always.\nThou and Thou only, first in my heart,\nHigh King of heaven, my treasure Thou art.\n\n4 High King of heaven, my victory won,\nmay I reach heaven\'s joys, O bright heaven\'s Sun!\nHeart of my own heart, whatever befall,\nstill be my vision, O Ruler of all.`
  },
  {
    week: 11,
    title: "How Firm a Foundation",
    author: "John Rippon's Selection (1787)",
    tuneNote: "FOUNDATION",
    pdfUrl: `${FIREBASE_STORAGE_BASE}How%20Firm%20a%20Foundation.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F349%20How%20Firm%20a%20Foundation.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F19%20How%20Firm%20a%20Foundation.mp3?alt=media`,
    lyrics: `1 How firm a foundation, ye saints of the Lord,\nis laid for your faith in His excellent word!\nWhat more can He say than to you He hath said,\nto you who for refuge to Jesus have fled?\n\n2 "Fear not, I am with thee, O be not dismayed,\nfor I am thy God, and will still give thee aid;\nI\'ll strengthen thee, help thee, and cause thee to stand,\nupheld by My righteous, omnipotent hand.\n\n3 "When through the deep waters I call thee to go,\nthe rivers of sorrow shall not overflow;\nfor I will be with thee thy troubles to bless,\nand sanctify to thee thy deepest distress.\n\n4 "When through fiery trials thy pathway shall lie,\nMy grace, all-sufficient, shall be thy supply;\nthe flame shall not hurt thee; I only design\nthy dross to consume, and thy gold to refine.\n\n5 "The soul that on Jesus hath leaned for repose,\nI will not, I will not desert to his foes;\nthat soul, though all hell should endeavor to shake,\nI\'ll never, no never, no never forsake!"`
  },
  {
    week: 12,
    title: "This is My Father\'s World",
    author: "Maltbie D. Babcock (1901)",
    tuneNote: "TERRA BEATA",
    pdfUrl: `${FIREBASE_STORAGE_BASE}This%20Is%20My%20Fathers%20World.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F181%20This%20Is%20My%20Father's%20World.mp3?alt=media`,
    lyrics: `1 This is my Father\'s world,\nand to my list\'ning ears\nall nature sings, and \'round me rings\nthe music of the spheres.\nThis is my Father\'s world;\nI rest me in the thought\nof rocks and trees, of skies and seas;\nHis hand the wonders wrought.\n\n2 This is my Father\'s world;\nthe birds their carols raise;\nthe morning light, the lily white\ndeclare their Maker\'s praise.\nThis is my Father\'s world,\nHe shines in all that\'s fair;\nin the rustling grass I hear Him pass;\nHe speaks to me ev\'rywhere.\n\n3 This is my Father\'s world;\nO, let me ne\'er forget\nthat though the wrong seems oft so strong,\nGod is the Ruler yet.\nThis is my Father\'s world;\nthe battle is not done;\nJesus who died shall be satisfied,\nand earth and heaven be one.`
  },
  {
    week: 13,
    title: "He Who Would Valiant Be",
    author: "John Bunyan (1684), alt. Percy Dearmer (1906)",
    tuneNote: "ST. DUNSTAN\'S",
    pdfUrl: `${FIREBASE_STORAGE_BASE}He%20Who%20Would%20Valiant%20Be.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F368%20He%20Who%20Would%20Valiant%20Be.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2FHe%20Who%20Would.mp3?alt=media`,
    lyrics: `1 He who would valiant be\n\'gainst all disaster,\nlet him in constancy\nfollow the Master.\nThere\'s no discouragement\nshall make him once relent\nhis first avowed intent\nto be a pilgrim.\n\n2 Who so beset him round\nwith dismal stories,\ndo but themselves confound;\nhis strength the more is.\nNo foes shall stay his might,\nthough he with giants fight;\nhe will make good his right\nto be a pilgrim.\n\n3 Since, Lord, Thou dost defend\nus with Thy Spirit,\nwe know we at the end\nshall life inherit.\nThen fancies flee away!\nI\'ll fear not what men say,\nI\'ll labor night and day\nto be a pilgrim.`
  },
  {
    week: 14,
    title: "Jesus, Lover of My Soul",
    author: "Charles Wesley (1740)",
    tuneNote: "ABERYSTWYTH",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Jesus%20Lover%20of%20My%20Soul.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F408%20Jesus%2C%20Lover%20of%20My%20Soul.mp3?alt=media`,
    lyrics: `1 Jesus, Lover of my soul,\nlet me to Thy bosom fly,\nwhile the nearer waters roll,\nwhile the tempest still is high.\nHide me, O my Savior, hide,\ntill the storm of life is past;\nsafe into the haven guide;\nO receive my soul at last.\n\n2 Other refuge have I none,\nhangs my helpless soul on Thee;\nleave, ah! leave me not alone,\nstill support and comfort me.\nAll my trust on Thee is stayed,\nall my help from Thee I bring;\ncover my defenseless head\nwith the shadow of Thy wing.\n\n3 Plenteous grace with Thee is found,\ngrace to cover all my sin;\nlet the healing streams abound;\nmake and keep me pure within.\nThou of life the fountain art,\nfreely let me take of Thee;\nspring Thou up within my heart;\nrise to all eternity.`
  },
  {
    week: 15,
    title: "The Heavens Declare Thy Glory, Lord",
    author: "Isaac Watts (1719)",
    tuneNote: "UXBRIDGE",
    pdfUrl: `${FIREBASE_STORAGE_BASE}The%20Heavens%20Declare%20Thy%20Glory.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2FPsalm%2019A%20The%20Heavens%20Declare%20Thy%20Glory%2C%20Lord.mp3?alt=media`,
    lyrics: `1 The heavens declare Thy glory, Lord;\nin every star Thy wisdom shines;\nbut when our eyes behold Thy Word,\nwe read Thy name in fairer lines.\n\n2 The rolling sun, the changing light,\nand nights and days Thy power confess;\nbut the blest volume Thou didst write\nreveals Thy justice and Thy grace.\n\n3 Sun, moon, and stars convey Thy praise\nround the whole earth, and never stand;\nso when Thy truth began its race,\nit touched and glanced on every land.\n\n4 Nor shall Thy spreading gospel rest\ntill through the world Thy truth has run;\ntill Christ has all the nations blessed\nthat see the light or feel the sun.\n\n5 Great Sun of Righteousness, arise;\nbless the dark world with heavenly light;\nThy gospel makes the simple wise;\nThy laws are pure, Thy judgments right.\n\n6 Thy noblest wonders here we view\nin souls renewed and sins forgiven;\nLord, cleanse my sins, my soul renew,\nand make Thy Word my guide to heaven.`
  },
  {
    week: 16,
    title: "O Worship the King",
    author: "Robert Grant (1833)",
    tuneNote: "LYONS",
    pdfUrl: `${FIREBASE_STORAGE_BASE}O%20Worship%20the%20King.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F171%20O%20Worship%20the%20King.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F09%20O%20Worship%20the%20King.mp3?alt=media`,
    lyrics: `1 O worship the King, all glorious above,\nand gratefully sing His pow\'r and His love;\nour Shield and Defender, the Ancient of Days,\npavilioned in splendor, and girded with praise.\n\n2 O tell of His might, O sing of His grace,\nwhose robe is the light, whose canopy space.\nHis chariots of wrath the deep thunderclouds form,\nand dark is His path on the wings of the storm.\n\n3 The earth with its store of wonders untold,\nAlmighty, Thy pow\'r hath founded of old;\nhath stablished it fast by a changeless decree,\nand round it hath cast, like a mantle, the sea.\n\n4 Thy bountiful care, what tongue can recite?\nIt breathes in the air, it shines in the light.\nIt streams from the hills, it descends to the plain,\nand sweetly distills in the dew and the rain.\n\n5 Frail children of dust, and feeble as frail,\nin Thee do we trust, nor find Thee to fail;\nThy mercies, how tender, how firm to the end,\nour Maker, Defender, Redeemer, and Friend.`
  },
  {
    week: 17,
    title: "Jesus Shall Reign",
    author: "Isaac Watts (1719)",
    tuneNote: "DUKE STREET",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Jesus%20Shall%20Reign.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F220%20Jesus%20Shall%20Reign.mp3?alt=media`,
    lyrics: `1 Jesus shall reign where\'er the sun\ndoes its successive journeys run;\nHis kingdom spread from shore to shore,\ntill moons shall wax and wane no more.\n\n2 To Him shall endless prayer be made,\nand endless praises crown His head;\nHis name like sweet perfume shall rise\nwith every morning sacrifice.\n\n3 People and realms of every tongue\ndwell on His love with sweetest song,\nand infant voices shall proclaim\ntheir early blessings on His name.\n\n4 Blessings abound where\'er He reigns;\nthe pris\'ners leap to lose their chains,\nthe weary find eternal rest,\nand all who suffer want are blessed.\n\n5 Let every creature rise and bring\ntheir grateful honors to our King.\nAngels descend with songs again,\nand earth repeat the loud "Amen!"`
  },
  {
    week: 18,
    title: "Holy Trinity, Thanks and Praise to Thee",
    author: "Traditional",
    tuneNote: "RATISBON",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Holy%20Trinity%20Thanks%20and%20Praise.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F160%20Holy%20Trinity%2C%20Thanks%20and%20Praise%20to%20Thee.mp3?alt=media`,
    lyrics: `1 Holy Trinity,\nthanks and praise to Thee,\nthat our life and whole salvation\nflow from Christ\'s blest incarnation\nand His death for us\non the shameful cross.\n\n2 Had we angels\' tongues,\nwith seraphic songs,\nbowing hearts and knees before Thee,\nTriune God, we would adore Thee\nIn the highest strain\nfor the Lamb once slain.`
  },
  {
    week: 19,
    title: "Praise to the Lord, the Almighty",
    author: "Joachim Neander (1680), trans. Catherine Winkworth (1863)",
    tuneNote: "LOBE DEN HERREN",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Praise%20to%20the%20Lord%20the%20Almighty.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F191%20Praise%20to%20the%20Lord%2C%20the%20Almighty.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F17%20Praise%20To%20the%20Lord.mp3?alt=media`,
    lyrics: `1 Praise to the Lord, the Almighty, the King of creation;\nO my soul, praise Him, for He is thy health and salvation.\nAll ye who hear,\nnow to His temple draw near:\npraise Him in glad adoration!\n\n2 Praise to the Lord, who o\'er all things so wondrously reigneth,\nshelters thee under His wings, yea, so gently sustaineth.\nHast thou not seen\nhow thy desires e\'er have been\ngranted in what He ordaineth?\n\n3 Praise to the Lord, who with marvelous wisdom hath made thee,\ndecked thee with health, and with loving hand guided and stayed thee.\nHow oft in grief\nhath not He brought thee relief,\nspreading His wings for to shade thee!\n\n4 Praise to the Lord, who doth prosper thy work and defend thee;\nsurely His goodness and mercy here daily attend thee.\nPonder anew\nwhat the Almighty can do,\nif with His love He befriend thee.\n\n5 Praise to the Lord, O let all that is in me adore Him!\nAll that hath life and breath, come now with praises before Him.\nLet the amen\nsound from His people again,\ngladly forever adore Him.`
  },
  {
    week: 20,
    title: "Rejoice, the Lord is King",
    author: "Charles Wesley (1744)",
    tuneNote: "DARWALL\'S 148TH",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Rejoice%20the%20Lord%20is%20King.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F291%20Rejoice%2C%20the%20Lord%20Is%20King.mp3?alt=media`,
    lyrics: `1 Rejoice, the Lord is King!\nYour Lord and King adore;\nmortals, give thanks and sing,\nand triumph evermore.\nLift up your heart, lift up your voice;\nrejoice, again I say, rejoice!\n\n2 Jesus, the Savior, reigns,\nthe God of truth and love;\nwhen He had purged our stains,\nHe took His seat above.\nLift up your heart, lift up your voice;\nrejoice, again I say, rejoice!\n\n3 His kingdom cannot fail;\nHe rules o\'er earth and heav\'n;\nthe keys of death and hell\nare to our Jesus giv\'n.\nLift up your heart, lift up your voice;\nrejoice, again I say, rejoice!\n\n4 He sits at God\'s right hand\ntill all His foes submit,\nand bow to His command,\nand fall beneath His feet.\nLift up your heart, lift up your voice;\nrejoice, again I say, rejoice!`
  },
  {
    week: 21,
    title: "Good Christians All, Rejoice and Sing",
    author: "Cyril A. Alington (1925)",
    tuneNote: "GELOBT SEI GOTT",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Good%20Christian%20Men%20Rejoice.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F287%20Good%20Christians%20All%2C%20Rejoice%20and%20Sing.mp3?alt=media`,
    lyrics: `1 Good Christians all, rejoice and sing!\nNow is the triumph of our King.\nTo all the world glad news we bring:\nAlleluia, alleluia, alleluia!\n\n2 The Lord of Life is ris\'n for aye;\nbring flowers of song to strew His way;\nlet all mankind rejoice and say:\nAlleluia, alleluia, alleluia!\n\n3 Praise we in songs of victory\nthat Love, that Life which cannot die,\nand sing with hearts uplifted high:\nAlleluia, alleluia, alleluia!\n\n4 Thy name we bless, O risen Lord,\nand sing today with one accord\nthe life laid down, the Life restored:\nAlleluia, alleluia, alleluia!`
  },
  {
    week: 22,
    title: "How Sad Our State",
    author: "Isaac Watts (1707)",
    tuneNote: "DUNFERMLINE",
    pdfUrl: `${FIREBASE_STORAGE_BASE}How%20Sad%20Our%20State.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F200%20How%20Sad%20Our%20State.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F14%20How%20Sad%20Our%20State.mp3?alt=media`,
    lyrics: `1 How sad our state by nature is!\nOur sin, how deep it stains!\nAnd Satan binds our captive minds\nfast in his slavish chains.\n\n2 But there\'s a voice of sovereign grace\nsounds from the sacred Word:\n"Ho! ye despairing sinners, come,\nand trust upon the Lord."\n\n3 My soul obeys th\'almighty call,\nand runs to this relief;\nI would believe Thy promise, Lord;\nO help my unbelief!\n\n4 To the dear fountain of Thy blood,\nIncarnate God, I fly;\nhere let me wash my spotted soul\nfrom crimes of deepest dye.\n\n5 A guilty, weak, and helpless worm,\non Thy kind arms I fall;\nbe Thou my strength and righteousness,\nmy Jesus, and my all.`
  },
  {
    week: 23,
    title: "Sun of My Soul",
    author: "John Keble (1820)",
    tuneNote: "HURSLEY",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Sun%20of%20My%20Soul%20Thou%20Savior%20Dear.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F413%20Sun%20of%20My%20Soul%2C%20Thou%20Savior%20Dear.mp3?alt=media`,
    lyrics: `1 Sun of my soul, Thou Savior dear,\nit is not night if Thou be near;\noh, may no earthborn cloud arise\nto hide Thee from Thy servant\'s eyes.\n\n2 When the soft dews of kindly sleep\nmy wearied eyelids gently steep,\nbe my last thought, how sweet to rest\nforever on my Savior\'s breast.\n\n3 Abide with me from morn till eve,\nfor without Thee I cannot live;\nabide with me when night is nigh,\nfor without Thee I dare not die.\n\n4 Come near and bless us when we wake,\nere through the world our way we take,\ntill in the ocean of Thy love\nwe lose ourselves in heav\'n above.`
  },
  {
    week: 24,
    title: "Holy, Holy, Holy",
    author: "Reginald Heber (1826)",
    tuneNote: "NICAEA",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Holy%20Holy%20Holy.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F153%20Holy%2C%20Holy%2C%20Holy!.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F28%20Holy%20Holy%20Holy.mp3?alt=media`,
    lyrics: `1 Holy, holy, holy! Lord God Almighty!\nEarly in the morning our song shall rise to Thee.\nHoly, holy, holy! Merciful and mighty,\nGod in three persons, blessed Trinity!\n\n2 Holy, holy, holy! All the saints adore Thee,\ncasting down their golden crowns around the glassy sea;\ncherubim and seraphim falling down before Thee,\nwhich wert and art, and evermore shalt be.\n\n3 Holy, holy, holy! Though the darkness hide Thee,\nthough the eye of sinful man Thy glory may not see,\nonly Thou art holy; there is none beside Thee\nperfect in pow\'r, in love and purity.\n\n4 Holy, holy, holy! Lord God Almighty!\nAll Thy works shall praise Thy name, in earth and sky and sea.\nHoly, holy, holy! Merciful and mighty,\nGod in three persons, blessed Trinity!`
  },
  {
    week: 25,
    title: "All Hail the Power of Jesus\'s Name",
    author: "Edward Perronet (1779), alt. John Rippon (1787)",
    tuneNote: "CORONATION",
    pdfUrl: `${FIREBASE_STORAGE_BASE}All%20Hail%20the%20Power%20of%20Jesus%20Name.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F301%20All%20Hail%20the%20Power%20of%20Jesus'%20Name%20(CORONATION).mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F21%20All%20Hail%20MIX%202%20EDIT%20%23240916.mp3?alt=media`,
    lyrics: `1 All hail the pow\'r of Jesus\'s name!\nLet angels prostrate fall;\nbring forth the royal diadem,\nand crown Him Lord of all;\nbring forth the royal diadem,\nand crown Him Lord of all.\n\n2 Crown Him, ye martyrs of our God,\nwho from His altar call;\nextol the Stem of Jesse\'s rod,\nand crown Him Lord of all;\nextol the Stem of Jesse\'s rod,\nand crown Him Lord of all.\n\n3 Ye seed of Israel\'s chosen race,\nye ransomed from the fall,\nhail Him who saves you by His grace,\nand crown Him Lord of all;\nhail Him who saves you by His grace,\nand crown Him Lord of all.\n\n4 Sinners, whose love can ne\'er forget\nthe wormwood and the gall,\ngo, spread your trophies at His feet,\nand crown Him Lord of all;\ngo, spread your trophies at His feet,\nand crown Him Lord of all.\n\n5 Let every kindred, every tribe,\non this terrestrial ball,\nto Him all majesty ascribe,\nand crown Him Lord of all;\nto Him all majesty ascribe,\nand crown Him Lord of all.\n\n6 O that with yonder sacred throng\nwe at His feet may fall!\nWe\'ll join the everlasting song,\nand crown Him Lord of all;\nwe\'ll join the everlasting song,\nand crown Him Lord of all.`
  },
  {
    week: 26,
    title: "Christ the Lord is Risen Today",
    author: "Charles Wesley (1739)",
    tuneNote: "EASTER HYMN",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Christ%20the%20Lord%20Is%20Risen%20Today.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F281%20Christ%20the%20Lord%20Is%20Risen%20Today.mp3?alt=media`,
    lyrics: `1 "Christ the Lord is ris\'n today," Alleluia!\nsons of men and angels say, Alleluia!\nraise your joys and triumphs high, Alleluia!\nsing, ye heav\'ns, and earth, reply, Alleluia!\n\n2 Love\'s redeeming work is done, Alleluia!\nfought the fight, the battle won, Alleluia!\ndeath in vain forbids His rise, Alleluia!\nChrist hath opened paradise, Alleluia!\n\n3 Lives again our glorious King, Alleluia!\nwhere, O death, is now thy sting? Alleluia!\nOnce He died our souls to save, Alleluia!\nwhere thy victory, O grave? Alleluia!\n\n4 Soar we now where Christ hath led, Alleluia!\nfoll\'wing our exalted Head, Alleluia!\nmade like Him, like Him we rise, Alleluia!\nours the cross, the grave, the skies, Alleluia!`
  },
  {
    week: 27,
    title: "My Faith Looks Up to Thee",
    author: "Ray Palmer (1830)",
    tuneNote: "OLIVET",
    pdfUrl: `${FIREBASE_STORAGE_BASE}My%20Faith%20Looks%20Up%20to%20Thee.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F371%20My%20Faith%20Looks%20Up%20to%20Thee.mp3?alt=media`,
    lyrics: `1 My faith looks up to Thee,\nThou Lamb of Calvary,\nSavior divine!\nNow hear me while I pray,\ntake all my guilt away,\nO let me from this day\nbe wholly Thine!\n\n2 May Thy rich grace impart\nstrength to my fainting heart,\nmy zeal inspire;\nas Thou hast died for me,\nO may my love to Thee\npure, warm, and changeless be,\na living fire!\n\n3 While life\'s dark maze I tread,\nand griefs around me spread,\nbe Thou my Guide;\nbid darkness turn to day,\nwipe sorrow\'s tears away,\nnor let me ever stray\nfrom Thee aside.\n\n4 When ends life\'s transient dream,\nwhen death\'s cold, sullen stream\nshall o\'er me roll,\nblest Savior, then, in love,\nfear and distrust remove;\nO bear me safe above,\na ransomed soul!`
  },
  {
    week: 28,
    title: "God, Be Merciful to Me",
    author: "Psalm 51, versified Richard Redhead (1853)",
    tuneNote: "REDHEAD 76",
    pdfUrl: `${FIREBASE_STORAGE_BASE}God%20Be%20Merciful%20to%20Me%20(Ps%2051).pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2FPsalm%2051%20God%2C%20Be%20Merciful%20to%20Me.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F05%20God%20Be%20Merciful%20to%20Me.mp3?alt=media`,
    lyrics: `1 God, be merciful to me,\non Thy grace I rest my plea;\nplenteous in compassion Thou,\nblot out my transgressions now;\nwash me, make me pure within,\ncleanse, O cleanse me from my sin.\n\n2 My transgressions I confess,\ngrief and guilt my soul oppress;\nI have sinned against Thy grace\nand provoked Thee to Thy face;\nI confess Thy judgment just,\nspeechless, I Thy mercy trust.\n\n3 I am evil, born in sin;\nThou desirest truth within.\nThou alone my Savior art,\nteach Thy wisdom to my heart;\nmake me pure, Thy grace bestow,\nwash me whiter than the snow.\n\n4 Broken, humbled to the dust\nby Thy wrath and judgment just,\nlet my contrite heart rejoice\nand in gladness hear Thy voice;\nfrom my sins O hide Thy face,\nblot them out in boundless grace.\n\n5 Gracious God, my heart renew,\nmake my spirit right and true;\ncast me not away from Thee,\nlet Thy Spirit dwell in me;\nThy salvation\'s joy impart,\nsteadfast make my willing heart.\n\n6 Sinners then shall learn from me\nand return, O God, to Thee;\nSavior, all my guilt remove,\nand my tongue shall sing Thy love;\ntouch my silent lips, O Lord,\nand my mouth shall praise accord.`
  },
  {
    week: 29,
    title: "How Blest Is He Whose Trespass",
    author: "Psalm 32, versified 1912 Psalter",
    tuneNote: "RUTHERFORD",
    pdfUrl: `${FIREBASE_STORAGE_BASE}How%20Blest%20Is%20He%20Whose%20Trespass%20(Ps%2032).pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2FPsalm%2032%20How%20Blest%20Is%20He%20Whose%20Trespass.mp3?alt=media`,
    lyrics: `1 How blest is he whose trespass\nhas freely been forgiv\'n,\nwhose sin is wholly covered\nbefore the sight of heav\'n.\n\n2 Blest he to whom Jehovah\nwill not impute his sin,\nwho has a guileless spirit,\nwhose heart is true within.\n\n3 While I kept guilty silence\nmy strength was spent with grief,\nThy hand was heavy on me,\nmy soul found no relief.\n\n4 But when I owned my trespass,\nmy sin hid not from Thee,\nwhen I confessed transgression,\nthen Thou forgavest me.\n\n5 So let the godly seek Thee\nin times when Thou art near;\nno whelming floods shall reach them,\nnor cause their hearts to fear.\n\n6 In Thee, O Lord, I hide me,\nThou savest me from ill;\nwith songs of glad deliv\'rance\nThou dost my spirit fill.\n\n7 The Lord says, "I will teach thee\nthe way that thou must go;\nand I will guide and teach thee,\nfor thou my paths shalt know."\n\n8 Be ye not unsubmissive,\nbe not perverse and slow,\nbut yield to godly training,\nthat grace and peace ye know.\n\n9 The sorrows of the wicked\nin number shall abound,\nbut those who trust Jehovah,\nHis mercy shall surround.\n\n10 Then in the Lord be joyful;\nin song lift up your voice;\nbe glad in God, ye righteous;\nrejoice, ye saints, rejoice.`
  },
  {
    week: 30,
    title: "Jesus, Thy Blood and Righteousness",
    author: "Nicolaus L. von Zinzendorf (1739), trans. John Wesley (1740)",
    tuneNote: "GERMANY",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Jesus%20Thy%20Blood%20and%20Righteousness.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F332%20Jesus%2C%20Thy%20Blood%20and%20Righteousness.mp3?alt=media`,
    lyrics: `1 Jesus, Thy blood and righteousness\nmy beauty are, my glorious dress;\nmidst flaming worlds, in these arrayed,\nwith joy shall I lift up my head.\n\n2 Bold shall I stand in that great day,\nfor who aught to my charge shall lay?\nFully through Thee absolved I am\nfrom sin and fear, from guilt and shame.\n\n3 When from the dust of death I rise\nto claim my mansion in the skies,\nthis then shall be my only plea:\nJesus hath lived and died for me.\n\n4 Jesus, be endless praise to Thee,\nwhose boundless mercy hath for me,\nfor me, and all Thy hands have made,\nan everlasting ransom paid.\n\n5 O let the dead now hear Thy voice;\nnow bid Thy banished ones rejoice;\ntheir beauty this, their glorious dress,\nJesus, Thy blood and righteousness.`
  },
  {
    week: 31,
    title: "O For A Thousand Tongues to Sing",
    author: "Charles Wesley (1739)",
    tuneNote: "AZMON",
    pdfUrl: `${FIREBASE_STORAGE_BASE}O%20for%20a%20Thousand%20Tongues%20to%20Sing.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F345%20O%20for%20a%20Thousand%20Tongues%20to%20Sing.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F02%20O%20For%20a%20Thousand%20Tongues%20to%20Sing.mp3?alt=media`,
    lyrics: `1 O for a thousand tongues to sing\nmy great Redeemer\'s praise,\nthe glories of my God and King,\nthe triumphs of His grace!\n\n2 My gracious Master and my God,\nassist me to proclaim,\nto spread through all the earth abroad\nthe honors of Thy name.\n\n3 Jesus! the name that charms our fears,\nthat bids our sorrows cease;\n\'tis music in the sinner\'s ears,\n\'tis life and health and peace.\n\n4 He breaks the pow\'r of cancelled sin,\nHe sets the pris\'ner free;\nHis blood can make the foulest clean;\nHis blood availed for me.\n\n5 He speaks, and list\'ning to His voice,\nnew life the dead receive;\nthe mournful, broken hearts rejoice;\nthe humble poor believe.\n\n6 Hear Him, ye deaf; His praise, ye dumb,\nyour loosened tongues employ;\nye blind, behold your Savior come;\nand leap, ye lame, for joy.\n\n7 Glory to God and praise and love\nbe ever, ever giv\'n\nby saints below and saints above,\nthe Church in earth and heav\'n.`
  },
  {
    week: 32,
    title: "O Come, O Come, Emmanuel",
    author: "Latin (12th century), trans. John M. Neale (1851)",
    tuneNote: "VENI EMMANUEL",
    pdfUrl: `${FIREBASE_STORAGE_BASE}O%20Come%20O%20Come%20Emmanuel.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F211%20O%20Come%2C%20O%20Come%2C%20Emmanuel.mp3?alt=media`,
    lyrics: `1 O come, O come, Emmanuel,\nand ransom captive Israel,\nthat mourns in lonely exile here\nuntil the Son of God appear.\nRejoice! Rejoice! Emmanuel\nshall come to thee, O Israel.\n\n2 O come, Thou Wisdom from on high,\nwho ord\'rest all things mightily;\nto us the path of knowledge show,\nand teach us in her ways to go.\nRejoice! Rejoice! Emmanuel\nshall come to thee, O Israel.\n\n3 O come, O come, Thou Lord of might,\nwho to Thy tribes on Sinai\'s height\nin ancient times didst give the law,\nin cloud and majesty and awe.\nRejoice! Rejoice! Emmanuel\nshall come to thee, O Israel.\n\n4 O come, Thou Rod of Jesse\'s stem,\nfrom ev\'ry foe deliver them\nthat trust Thy mighty pow\'r to save,\nand give them vict\'ry o\'er the grave.\nRejoice! Rejoice! Emmanuel\nshall come to thee, O Israel.\n\n5 O come, Thou Key of David, come,\nand open wide our heav\'nly home;\nmake safe the way that leads on high,\nand close the path to misery.\nRejoice! Rejoice! Emmanuel\nshall come to thee, O Israel.\n\n6 O come, Thou Dayspring from on high,\nand cheer us by Thy drawing nigh;\ndisperse the gloomy clouds of night,\nand death\'s dark shadow put to flight.\nRejoice! Rejoice! Emmanuel\nshall come to thee, O Israel.\n\n7 O come, Desire of nations, bind\nin one the hearts of all mankind;\nbid Thou our sad divisions cease,\nand be Thyself our King of Peace.\nRejoice! Rejoice! Emmanuel\nshall come to thee, O Israel.`
  },
  {
    week: 33,
    title: "Glorious Things of Thee Are Spoken",
    author: "John Newton (1779)",
    tuneNote: "AUSTRIA",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Glorious%20Things%20of%20Thee%20Are%20Spoken.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F416%20Glorious%20Things%20of%20Thee%20Are%20Spoken.mp3?alt=media`,
    lyrics: `1 Glorious things of thee are spoken,\nZion, city of our God;\nHe whose word cannot be broken\nformed thee for His own abode.\nOn the Rock of Ages founded,\nwhat can shake thy sure repose?\nWith salvation\'s walls surrounded,\nthou may\'st smile at all thy foes.\n\n2 See, the streams of living waters,\nspringing from eternal love,\nwell supply thy sons and daughters\nand all fear of want remove.\nWho can faint while such a river\never flows their thirst t\'assuage—\ngrace, which like the Lord the Giver,\nnever fails from age to age?\n\n3 Round each habitation hov\'ring,\nsee the cloud and fire appear\nfor a glory and a cov\'ring,\nshowing that the Lord is near.\nThus deriving from their banner\nlight by night and shade by day,\nsafe they feed upon the manna\nwhich He gives them when they pray.\n\n4 Savior, if of Zion\'s city\nI through grace a member am,\nlet the world deride or pity,\nI will glory in Thy name.\nFading is the worldling\'s pleasure,\nall his boasted pomp and show;\nsolid joys and lasting treasure\nnone but Zion\'s children know.`
  },
  {
    week: 34,
    title: "Jerusalem, My Happy Home",
    author: "F.B.P. (16th century)",
    tuneNote: "LAND OF REST",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Jerusalem%20My%20Happy%20Home.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F420%20Jerusalem%2C%20My%20Happy%20Home.mp3?alt=media`,
    lyrics: `1 Jerusalem, my happy home,\nname ever dear to me,\nwhen shall my labors have an end,\nin joy and peace and thee?\n\n2 When shall these eyes thy heav\'n-built walls\nand pearly gates behold,\nthy bulwarks with salvation strong,\nand streets of shining gold?\n\n3 O when, thou city of my God,\nshall I thy courts ascend,\nwhere congregations ne\'er break up,\nand Sabbaths have no end?\n\n4 There happier bow\'rs than Eden\'s bloom,\nnor sin nor sorrow know;\nblest seats! through rude and stormy scenes\nI onward press to you.\n\n5 Why should I shrink from pain and woe,\nor feel at death dismay?\nI\'ve Canaan\'s goodly land in view,\nand realms of endless day.\n\n6 Apostles, martyrs, prophets, there\naround my Savior stand;\nand soon my friends in Christ below\nwill join the glorious band.\n\n7 Jerusalem, my happy home,\nmy soul still pants for thee;\nthen shall my labors have an end,\nwhen I thy joys shall see.`
  },
  {
    week: 35,
    title: "Spirit of God, Descend upon My Heart",
    author: "George Croly (1867)",
    tuneNote: "MORECAMBE",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Spirit%20of%20God%20Descend%20upon%20My%20Heart.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F309%20Spirit%20of%20God%2C%20Descend%20upon%20My%20Heart.mp3?alt=media`,
    lyrics: `1 Spirit of God, descend upon my heart;\nwean it from earth; through all its pulses move;\nstoop to my weakness, mighty as Thou art,\nand make me love Thee as I ought to love.\n\n2 I ask no dream, no prophet ecstasies,\nno sudden rending of the veil of clay,\nno angel visitant, no op\'ning skies;\nbut take the dimness of my soul away.\n\n3 Hast Thou not bid me love Thee, God and King?\nAll, all Thine own, soul, heart and strength and mind.\nI see Thy cross; there teach my heart to cling.\nO let me seek Thee, and O let me find!\n\n4 Teach me to feel that Thou art always nigh;\nteach me the struggles of the soul to bear.\nTo check the rising doubt, the rebel sigh,\nteach me the patience of unanswered prayer.\n\n5 Teach me to love Thee as Thine angels love,\none holy passion filling all my frame;\nthe kindling of the heav\'n descended Dove,\nmy heart an altar, and Thy love the flame.`
  },
  {
    week: 36,
    title: "All People That on Earth Do Dwell",
    author: "Psalm 100, William Kethe (1561)",
    tuneNote: "OLD HUNDREDTH",
    pdfUrl: `${FIREBASE_STORAGE_BASE}All%20People%20That%20on%20Earth%20Do%20Dwell%20(Ps%20100).pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2FPsalm%20100%20All%20People%20That%20on%20Earth%20Do%20Dwell.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F33%20All%20People%20that%20on%20Earth%20Do%20Dwell.mp3?alt=media`,
    lyrics: `1 All people that on earth do dwell,\nsing to the Lord with cheerful voice;\nHim serve with mirth, His praise forth tell,\ncome ye before Him and rejoice.\n\n2 Know that the Lord is God indeed;\nwithout our aid He did us make;\nwe are His folk, He doth us feed,\nand for His sheep He doth us take.\n\n3 O enter then His gates with praise,\napproach with joy His courts unto;\npraise, laud, and bless His name always,\nfor it is seemly so to do.\n\n4 For why? The Lord our God is good;\nHis mercy is forever sure;\nHis truth at all times firmly stood,\nand shall from age to age endure.\n\n5 To Father, Son, and Holy Ghost,\nthe God whom heav\'n and earth adore,\nfrom men and from the angel host\nbe praise and glory evermore.`
  },
  {
    week: 37,
    title: "Of the Father's Love Begotten",
    author: "Aurelius C. Prudentius (4th century), trans. John M. Neale (1854)",
    tuneNote: "DIVINUM MYSTERIUM",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Of%20the%20Fathers%20Love%20Begotten.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F252%20Of%20the%20Father's%20Love%20Begotten.mp3?alt=media`,
    lyrics: `1 Of the Father\'s love begotten,\nere the worlds began to be,\nHe is Alpha and Omega,\nHe the source, the ending He,\nof the things that are, that have been,\nand that future years shall see,\nevermore and evermore!\n\n2 By His word was all created;\nHe commanded; it was done:\nheav\'n and earth and depths of ocean\nin their threefold order one;\nall that grows beneath the shining\nof the light of moon and sun,\nevermore and evermore!\n\n3 O that birth forever blessed,\nwhen the Virgin, full of grace,\nby the Holy Ghost conceiving,\nbare the Savior of our race;\nand the Babe, the world\'s Redeemer,\nfirst revealed His sacred face,\nevermore and evermore!\n\n4 This is He whom seers in old time\nchanted of with one accord;\nwhom the voices of the prophets\npromised in their faithful word;\nnow He shines, the long expected,\nlet creation praise its Lord,\nevermore and evermore!\n\n5 O ye heights of heav\'n adore Him;\nangel hosts, His praises sing;\nall dominions, bow before Him,\nand extol our God and King;\nlet no tongue on earth be silent,\nevery voice in concert ring,\nevermore and evermore!\n\n6 Christ, to Thee with God the Father,\nand, O Holy Ghost, to Thee,\nhymn and chant and high thanksgiving,\nand unwearied praises be:\nhonor, glory, and dominion,\nand eternal victory,\nevermore and evermore!`
  },
  {
    week: 38,
    title: "When Morning Gilds the Skies",
    author: "German (c. 1800), trans. Edward Caswall (1854)",
    tuneNote: "LAUDES DOMINI",
    pdfUrl: `${FIREBASE_STORAGE_BASE}When%20Morning%20Gilds%20the%20Skies.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F197%20When%20Morning%20Gilds%20the%20Skies.mp3?alt=media`,
    lyrics: `1 When morning gilds the skies,\nmy heart awaking cries:\nmay Jesus Christ be praised!\nAlike at work and prayer\nto Jesus I repair:\nmay Jesus Christ be praised!\n\n2 Does sadness fill my mind?\nA solace here I find:\nmay Jesus Christ be praised!\nOr fades my earthly bliss?\nMy comfort still is this:\nmay Jesus Christ be praised!\n\n3 The night becomes as day,\nwhen from the heart we say:\nmay Jesus Christ be praised!\nThe pow\'rs of darkness fear,\nwhen this sweet chant they hear:\nmay Jesus Christ be praised!\n\n4 In heav\'n\'s eternal bliss\nthe loveliest strain is this:\nmay Jesus Christ be praised!\nLet earth, and sea, and sky,\nfrom depth to height, reply:\nmay Jesus Christ be praised!\n\n5 Be this, while life is mine,\nmy canticle divine:\nmay Jesus Christ be praised!\nBe this th\'eternal song\nthrough all the ages long:\nmay Jesus Christ be praised!`
  },
  {
    week: 39,
    title: "Jesus! What a Friend for Sinners!",
    author: "J. Wilbur Chapman (1910)",
    tuneNote: "HYFRYDOL",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Jesus%20What%20a%20Friend%20for%20Sinners.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F334%20Jesus!%20What%20a%20Friend%20of%20Sinners.mp3?alt=media`,
    lyrics: `1 Jesus! what a Friend for sinners!\nJesus! Lover of my soul;\nfriends may fail me, foes assail me,\nHe, my Savior, makes me whole.\nHallelujah! what a Savior!\nHallelujah! what a Friend!\nSaving, helping, keeping, loving,\nHe is with me to the end.\n\n2 Jesus! what a strength in weakness!\nLet me hide myself in Him;\ntempted, tried, and sometimes failing,\nHe, my Strength, my vict\'ry wins.\nHallelujah! what a Savior!\nHallelujah! what a Friend!\nSaving, helping, keeping, loving,\nHe is with me to the end.\n\n3 Jesus! what a help in sorrow!\nWhile the billows o\'er me roll,\neven when my heart is breaking,\nHe, my Comfort, helps my soul.\nHallelujah! what a Savior!\nHallelujah! what a Friend!\nSaving, helping, keeping, loving,\nHe is with me to the end.\n\n4 Jesus! what a guide and keeper!\nWhile the tempest still is high,\nstorms about me, night o\'ertakes me,\nHe, my Pilot, hears my cry.\nHallelujah! what a Savior!\nHallelujah! what a Friend!\nSaving, helping, keeping, loving,\nHe is with me to the end.\n\n5 Jesus! I do now receive Him,\nmore than all in Him I find;\nHe hath granted me forgiveness,\nI am His, and He is mine.\nHallelujah! what a Savior!\nHallelujah! what a Friend!\nSaving, helping, keeping, loving,\nHe is with me to the end.`
  },
  {
    week: 40,
    title: "I Sought the Lord",
    author: "Anonymous, The Pilgrim Hymnal (1904)",
    tuneNote: "PEACE",
    pdfUrl: `${FIREBASE_STORAGE_BASE}I%20Sought%20the%20Lord.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F322%20I%20Sought%20the%20Lord.mp3?alt=media`,
    lyrics: `1 I sought the Lord, and afterward I knew\nHe moved my soul to seek Him, seeking me;\nit was not I that found, O Savior true;\nno, I was found of Thee.\n\n2 Thou didst reach forth Thy hand and mine enfold;\nI walked and sank not on the storm-vexed sea;\n\'twas not so much that I on Thee took hold,\nas Thou, dear Lord, on me.\n\n3 I find, I walk, I love, but oh, the whole\nof love is but my answer, Lord, to Thee!\nFor Thou wert long beforehand with my soul,\nalways Thou lovedst me.`
  },
  {
    week: 41,
    title: "O Splendor of God's Glory Bright",
    author: "Ambrose of Milan (4th century), trans. Robert Bridges (1899)",
    tuneNote: "SPLENDOR PATERNAE",
    pdfUrl: `${FIREBASE_STORAGE_BASE}O%20Splendor%20of%20God\'s%20Glory%20Bright.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F183%20O%20Splendor%20of%20God's%20Glory%20Bright.mp3?alt=media`,
    lyrics: `1 O splendor of God\'s glory bright,\nfrom light eternal bringing light;\nthou Light of life, light\'s living spring,\ntrue Day, all days illumining.\n\n2 Come, very Sun of truth and love;\ncome, in Thy radiance from above\nand shed the Holy Spirit\'s ray\non all we think and do today.\n\n3 With prayer the Father we implore:\nFather of glory evermore;\nFather of grace, all-powerful,\nto blot out sins and guide the soul.\n\n4 O cleanse our hearts from thoughts of ill;\ncurb Thou our tongues, and guard our will;\nall pride and envious strife remove,\nand wrap us in the bonds of love.\n\n5 The toil of day is now begun;\nLord, be our shield till day is done;\nand in Thy mercy, condescend\nto bless our course from start to end.\n\n6 So, when the weary day is o\'er,\nand shades of night are round us pour,\nThy love will nerve our failing sight\nand make our darkness shine with light.\n\n7 To God the Father, God the Son,\nand God the Spirit, Three in One,\nlet glory, praise, and honor be\nfrom age to age eternally.`
  },
  {
    week: 42,
    title: "Come, Christians, Join to Sing",
    author: "Christian Henry Bateman (1843)",
    tuneNote: "SPANISH HYMN",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Come%20Christians%20Join%20to%20Sing.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F307%20Come%2C%20Christians%2C%20Join%20to%20Sing.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F01%20Come%2C%20Christians%2C%20Join%20to%20Sing.mp3?alt=media`,
    lyrics: `1 Come, Christians, join to sing\nAlleluia! Amen!\nLoud praise to Christ our King;\nAlleluia! Amen!\nLet all, with heart and voice,\nbefore His throne rejoice;\npraise is His gracious choice:\nAlleluia! Amen!\n\n2 Come, lift your hearts on high;\nAlleluia! Amen!\nLet praises fill the sky;\nAlleluia! Amen!\nHe is our Guide and Friend;\nto us He\'ll condescend;\nHis love will never end:\nAlleluia! Amen!\n\n3 Praise yet the Lord again;\nAlleluia! Amen!\nLife shall not end the strain;\nAlleluia! Amen!\nOn heaven\'s blissful shore\nHis goodness we\'ll adore,\nsinging forevermore:\nAlleluia! Amen!`
  },
  {
    week: 43,
    title: "My Song Is Love Unknown",
    author: "Samuel Crossman (1664)",
    tuneNote: "LOVE UNKNOWN",
    pdfUrl: `${FIREBASE_STORAGE_BASE}My%20Song%20Is%20Love%20Unknown.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F260%20My%20Song%20Is%20Love%20Unknown.mp3?alt=media`,
    lyrics: `1 My song is love unknown,\nmy Savior\'s love to me;\nlove to the loveless shown,\nthat they might lovely be.\nO who am I,\nthat for my sake\nmy Lord should take\nfrail flesh and die?\n\n2 He came from His blest throne\nsalvation to bestow;\nbut men made strange, and none\nthe longed-for Christ would know:\nbut O! my Friend,\nmy Friend indeed,\nwho at my need\nHis life did spend.\n\n3 Sometimes they strew His way,\nand His sweet praises sing;\nresounding all the day\nhosannas to their King:\nthen "Crucify!"\nis all their breath,\nand for His death\nthey thirst and cry.\n\n4 Why, what hath my Lord done?\nWhat makes this rage and spite?\nHe made the lame to run,\nHe gave the blind their sight,\nSweet injuries!\nYet they at these\nthemselves displease,\nand \'gainst Him rise.\n\n5 They rise and needs will have\nmy dear Lord made away;\na murderer they save,\nthe Prince of life they slay,\nYet cheerful He\nto suffering goes,\nthat He His foes\nmight conquer so.\n\n6 In life, no house, no home\nmy Lord on earth might have;\nin death, no friendly tomb,\nbut what a stranger gave.\nWhat may I say?\nHeav\'n was His home;\nbut mine the tomb\nwherein He lay.\n\n7 Here might I stay and sing,\nno story so divine;\nnever was love, dear King!\nnever was grief like Thine.\nThis is my Friend,\nin whose sweet praise\nI all my days\ncould gladly spend.`
  },
  {
    week: 44,
    title: "Stricken, Smitten, and Afflicted",
    author: "Thomas Kelly (1804)",
    tuneNote: "O MEIN JESU, ICH MUSS STERBEN",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Stricken%20Smitten%20and%20Afflicted.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F266%20Stricken%2C%20Smitten%2C%20and%20Afflicted.mp3?alt=media`,
    lyrics: `1 Stricken, smitten, and afflicted,\nsee Him dying on the tree!\n\'Tis the Christ by man rejected;\nyes, my soul, \'tis He, \'tis He!\n\'Tis the long-expected Prophet,\nDavid\'s Son, yet David\'s Lord;\nby His Son God now hath spoken:\n\'tis the true and faithful Word.\n\n2 Tell me, ye who hear Him groaning,\nwas there ever grief like His?\nFriends through fear His cause disowning,\nfoes insulting His distress;\nmany hands were raised to wound Him,\nnone would interpose to save;\nbut the deepest stroke that pierced Him\nwas the stroke that justice gave.\n\n3 Ye who think of sin but lightly,\nnor suppose the evil great,\nhere may view its nature rightly,\nhere its guilt may estimate.\nMark the sacrifice appointed,\nsee who bears the awful load;\n\'tis the Word, the Lord\'s Anointed,\nSon of Man and Son of God.\n\n4 Here we have a firm foundation;\nhere the refuge of the lost;\nChrist\'s the Rock of our salvation;\nHis the name of which we boast.\nLamb of God, for sinners wounded,\nSacrifice to cancel guilt!\nNone shall ever be confounded\nwho on Him their hope have built.`
  },
  {
    week: 45,
    title: "Jesus Lives, and So Shall I",
    author: "Christian F. Gellert (1757), trans. Frances E. Cox (1841)",
    tuneNote: "JESUS LEBT",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Jesus%20Lives%20and%20So%20Shall%20I.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F286%20Jesus%20Lives%2C%20and%20So%20Shall%20I.mp3?alt=media`,
    lyrics: `1 Jesus lives, and so shall I.\nDeath! thy sting is gone forever!\nHe who deigned for me to die,\nlives, the bands of death to sever.\nHe shall raise me from the dust:\nJesus is my hope and trust.\n\n2 Jesus lives, and reigns supreme;\nand, His kingdom still remaining,\nI shall also be with Him,\never living, ever reigning.\nGod has promised, be it must:\nJesus is my hope and trust.\n\n3 Jesus lives, and I am safe.\nWhat can harm me now or sever?\nHe will guard me from all ill,\nand from sin He will deliver.\nGod will be my stay and rest:\nJesus is my hope and trust.\n\n4 Jesus lives, and by His side\nI shall live from death exempted;\nI shall be with my dear Lord,\nby no grief or pain tormented.\nGod has promised, be it must:\nJesus is my hope and trust.\n\n5 Jesus lives, and death is now\nbut a way that leads to heaven;\nthis shall be my comfort here:\nrest from toil and sorrow given.\nWhat can harm me now or sever?\nJesus is my hope and trust.`
  },
  {
    week: 46,
    title: "The Church\'s One Foundation",
    author: "Samuel J. Stone (1866)",
    tuneNote: "AURELIA",
    pdfUrl: `${FIREBASE_STORAGE_BASE}The%20Churchs%20One%20Foundation.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F385%20The%20Church's%20One%20Foundation.mp3?alt=media`,
    lyrics: `1 The Church\'s one foundation\nis Jesus Christ her Lord;\nshe is His new creation\nby water and the Word.\nFrom heav\'n He came and sought her\nto be His holy bride;\nwith His own blood He bought her,\nand for her life He died.\n\n2 Elect from every nation,\nyet one o\'er all the earth,\nher charter of salvation,\none Lord, one faith, one birth;\none holy name she blesses,\npartakes one holy food,\nand to one hope she presses,\nwith every grace endued.\n\n3 Though with a scornful wonder\nmen see her sore oppressed,\nby schisms rent asunder,\nby heresies distressed,\nyet saints their watch are keeping,\ntheir cry goes up, "How long?"\nand soon the night of weeping\nshall be the morn of song.\n\n4 Mid toil and tribulation,\nand tumult of her war,\nshe waits the consummation\nof peace forevermore;\ntill with the vision glorious,\nher longing eyes are blest,\nand the great Church victorious\nshall be the Church at rest.`
  },
  {
    week: 47,
    title: "How Sweet and Awful Is the Place",
    author: "Isaac Watts (1707)",
    tuneNote: "EVAN",
    pdfUrl: `${FIREBASE_STORAGE_BASE}How%20Sweet%20and%20Awful.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F312%20How%20Sweet%20and%20Awful%20Is%20the%20Place.mp3?alt=media`,
    lyrics: `1 How sweet and awful is the place\nwith Christ within the doors,\nwhile everlasting love displays\nthe choicest of her stores.\n\n2 While all our hearts and all our songs\njoin to admire the feast,\neach of us cries, with thankful tongues,\n"Lord, why was I a guest?"\n\n3 "Why was I made to hear Thy voice,\nand enter while there\'s room,\nwhen thousands make a wretched choice,\nand rather starve than come?"\n\n4 \'Twas the same love that spread the feast\nthat sweetly drew us in;\nelse we had still refused to taste,\nand perished in our sin.\n\n5 Pity the nations, O our God,\nconstrain the earth to come;\nsend Thy victorious Word abroad,\nand bring the strangers home.\n\n6 We long to see Thy churches full,\nthat all the chosen race\nmay with one voice and heart and soul\nsing Thy redeeming grace.`
  },
  {
    week: 48,
    title: "And Can It Be",
    author: "Charles Wesley (1738)",
    tuneNote: "SAGINA",
    pdfUrl: `${FIREBASE_STORAGE_BASE}And%20Can%20It%20Be.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F318%20And%20Can%20It%20Be.mp3?alt=media`,
    vocalAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/vocals%2F13%20And%20Can%20It%20Be.mp3?alt=media`,
    lyrics: `1 And can it be that I should gain\nan int\'rest in the Savior\'s blood?\nDied He for me, who caused His pain?\nFor me, who Him to death pursued?\nAmazing love! how can it be\nthat Thou, my God, shouldst die for me?\nAmazing love! how can it be\nthat Thou, my God, shouldst die for me?\n\n2 \'Tis mystery all! Th\'Immortal dies!\nWho can explore His strange design?\nIn vain the firstborn seraph tries\nto sound the depths of love divine!\n\'Tis mercy all! let earth adore,\nlet angel minds inquire no more.\n\'Tis mercy all! let earth adore,\nlet angel minds inquire no more.\n\n3 He left His Father\'s throne above,\nso free, so infinite His grace;\nemptied Himself of all but love,\nand bled for Adam\'s helpless race;\n\'Tis mercy all, immense and free;\nfor, O my God, it found out me.\n\'Tis mercy all, immense and free;\nfor, O my God, it found out me.\n\n4 Long my imprisoned spirit lay\nfast bound in sin and nature\'s night;\nThine eye diffused a quick\'ning ray,\nI woke, the dungeon flamed with light;\nmy chains fell off, my heart was free;\nI rose, went forth and followed Thee.\nmy chains fell off, my heart was free;\nI rose, went forth and followed Thee.\n\n5 No condemnation now I dread;\nJesus, and all in Him is mine!\nAlive in Him, my living Head,\nand clothed in righteousness divine,\nbold I approach th\'eternal throne,\nand claim the crown, through Christ my own.\nbold I approach th\'eternal throne,\nand claim the crown, through Christ my own.`
  },
  {
    week: 49,
    title: "Look, Ye Saints, the Sight Is Glorious",
    author: "Thomas Kelly (1809)",
    tuneNote: "BRYN CALFARIA",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Look%20Ye%20Saints%20The%20Sight%20Is%20Glorious.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F293%20Look%2C%20Ye%20Saints%2C%20the%20Sight%20Is%20Glorious.mp3?alt=media`,
    lyrics: `1 Look, ye saints, the sight is glorious;\nsee the Man of Sorrows now;\nfrom the fight returned victorious,\nevery knee to Him shall bow;\ncrown Him! crown Him!\ncrown Him! crown Him!\ncrowns become the Victor\'s brow.\n\n2 Crown the Savior, angels, crown Him;\nrich the trophies Jesus brings;\nin the seat of power enthrone Him,\nwhile the vault of heaven rings;\ncrown Him! crown Him!\ncrown Him! crown Him!\ncrown the Savior King of kings.\n\n3 Sinners in derision crowned Him,\nmocking thus the Savior\'s claim;\nsaints and angels crowd around Him,\nown His title, praise His name;\ncrown Him! crown Him!\ncrown Him! crown Him!\nspread abroad the Victor\'s fame.\n\n4 Hark, those bursts of acclamation!\nhark, those loud triumphant chords!\nJesus takes the highest station;\nO what joy the sight affords!\ncrown Him! crown Him!\ncrown Him! crown Him!\nKing of kings, and Lord of lords.`
  },
  {
    week: 50,
    title: "Savior of the Nations, Come",
    author: "Ambrose of Milan (4th century), trans. Martin Luther (1524)",
    tuneNote: "NUN KOMM, DER HEIDEN HEILAND",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Savior%20of%20the%20Nations%20Come.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F228%20Savior%20of%20the%20Nations%2C%20Come.mp3?alt=media`,
    lyrics: `1 Savior of the nations, come,\nVirgin\'s Son, here make Thy home!\nMarvel now, O heav\'n and earth,\nthat the Lord chose such a birth.\n\n2 Not by human flesh and blood,\nby the Spirit of our God,\nwas the Word of God made flesh—\nwoman\'s offspring, pure and fresh.\n\n3 Wondrous birth! O wondrous Child\nof the Virgin, undefiled!\nThough by all the world disowned,\nstill to be in heav\'n enthroned.\n\n4 From the Father forth He came\nand returneth to the same,\ncaptive leading death and hell—\nhigh the song of triumph swell!\n\n5 Thou the Father\'s only Son,\nhast o\'er sin the vict\'ry won,\nby the grace of God alone,\nmaking thus the way to God.\n\n6 For us were the suff\'rings He\nbore by pain and agony;\nfor us is the crown He wears,\nand the throne of God He shares.\n\n7 Praise to God the Father sing,\npraise to God the Son, our King,\npraise to God the Spirit be\never and eternally.`
  },
  {
    week: 51,
    title: "Joy to the World",
    author: "Isaac Watts (1719)",
    tuneNote: "ANTIOCH",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Joy%20to%20the%20World.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F219%20Joy%20to%20the%20World.mp3?alt=media`,
    lyrics: `1 Joy to the world, the Lord is come!\nLet earth receive her King;\nlet every heart prepare Him room,\nand heav\'n and nature sing,\nand heav\'n and nature sing,\nand heav\'n, and heav\'n and nature sing.\n\n2 Joy to the earth, the Savior reigns!\nLet men their songs employ;\nwhile fields and floods, rocks, hills, and plains,\nrepeat the sounding joy,\nrepeat the sounding joy,\nrepeat, repeat the sounding joy.\n\n3 No more let sins and sorrows grow,\nnor thorns infest the ground;\nHe comes to make His blessings flow\nfar as the curse is found,\nfar as the curse is found,\nfar as, far as the curse is found.\n\n4 He rules the world with truth and grace,\nand makes the nations prove\nthe glories of His righteousness,\nand wonders of His love,\nand wonders of His love,\nand wonders, wonders of His love.`
  },
  {
    week: 52,
    title: "Lo! He Comes with Clouds Descending",
    author: "Charles Wesley (1758), alt. John Cennick (1752)",
    tuneNote: "HELMSLEY",
    pdfUrl: `${FIREBASE_STORAGE_BASE}Lo%20He%20Comes%20With%20Clouds%20Descending.pdf?alt=media`,
    pianoAudioUrl: `https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/accompaniments%2F214%20Lo!%20He%20Comes%2C%20with%20Clouds%20Descending.mp3?alt=media`,
    lyrics: `1 Lo! He comes with clouds descending,\nonce for favored sinners slain;\nthousand thousand saints attending\nswell the triumph of His train:\nHallelujah! Hallelujah!\nGod appears, on earth to reign.\n\n2 Every eye shall now behold Him,\nrobed in dreadful majesty;\nthose who set at nought and sold Him,\npierced, and nailed Him to the tree,\ndeeply wailing, deeply wailing,\nshall the true Messiah see.\n\n3 Now the sev\'n-fold wrath of God\nis poured on the Christless race;\nand the saints who have been saved\nby the riches of His grace\nshall in triumph shout His praise,\n"Hallelujah!" all their days.\n\n4 Yea, Amen! let all adore Thee,\nhigh on Thine eternal throne;\nSavior, take the power and glory,\nclaim the kingdom for Thine own:\nO come quickly! O come quickly!\nHallelujah! Come, Lord, come!`
  }
];

/**
 * Get hymn for a specific week
 */
export function getHymn(week: number): Hymn | null {
  return hymns.find(h => h.week === week) || null;
}

/**
 * Get all hymns
 */
export function getAllHymns(): Hymn[] {
  return hymns;
}
