// copying Stu Mini Project seed Data, gonna need to refactor to work with the User / Thought approach for this challenge, but having some starter data is great
const names = [
    'Aaron',
    'Aaron-James',
    'Abdallah',
    'Abdul',
    'Smith',
    'Jones',
    'Zechariah',
    'Zen',
    'Zenith',
    'Zhong',
    'Zion',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
    'Tommy',
    'Joel',
    'Ellie',
    'Marlene',
];

const thoughtDescriptions = [
    'Loving the new season of The Mandalorian',
    'So mad that I wasted almost $1000 to see Frank Ocean at Coachella only for him to drop out!',
    'Coding bootcamps seem really expensive but the job market makes it worthwhile',
    'How do I create custom Siri prompts?',
    'Cannot wait for them to make another Subnautica sequel!',
    'My boss should really be paying me more than minimum wage, I make more for the company every hour than I get paid in a month!',
    'What day is Mardi Gras this year? I am thinking of going.',
    'My mom told me that she wants Biden to run again, but I guess she is old too.',
    'Someone just pointed out the Tom Cruise center tooth to me and I cannot unsee it!',
    'I am so disappointed that Snowfall is ending! Amazing show!',
    'When are we supposed to get the DLC for Pokemon Scarlet and Violet?',
    'Dude, why are bottles of Gatorade $4 each at Walmart right now?',
    'Which Wich is overpriced but I am addicted to their vegetarian options.',
    'Why has Mark Cuban not been tried for warcrimes? I thought he killed a whole bay of pigs!',
    'Trey Parker sounds sick during this season of South Park, I hope he is OK...',
    'RIP Ahmad Jamal :(',
    'Drake sounds a little *too* realistic rapping WAP, I think that was really him and not an AI!',
    'My friend got rich off a crypto pump and dump but spent too much before Tax Day and owes thousands more than he has left in capital gains taxes!',
];

const reactionDescriptions = [
    'How could you say that?',
    'I completely agree!',
    'Lmaoooooooo',
    'When did that happen?',
    'I do not know but I can not wait.',
    'Oh, I hate them...',
    'Just watched, oh my god!',
    'RIP :(',
    'Really felt like a knockoff of better things anyway.',
    'Fake News!',
    'Birds Are Government Drones! Spread The Truth!',
    'Only explanation is the flat earth!',
    'Why would you say something so controversial, yet so brave?',
    'Sick of this.',
    'That is NOT funny!',
    'Holy shit, telling everyone about this!',
    'Bump',
    'I think later this year? Maybe?',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
    `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: getRandomArrItem(thoughtDescriptions),
            // in theory this will randomly assign 3 reactions to each thought, each with their own random username, I believe
            reactions: [
                { reactionBody: getRandomArrItem(reactionDescriptions) },
                { username: getRandomName() },
            ] * 3,
        });
    }
    return results;
};

// const getRandomFriends = () => ?
const getRandomFriends = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            username: getRandomName(),
            // do I need email here, or is the friends list just names?
            email: `${getRandomName()}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@gmail.com`,
        });
    }
    return results;
};

module.exports = { getRandomName, getRandomThoughts, getRandomFriends };