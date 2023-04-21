const connection = require('../config/connection');
const { User, Thought } = require('../models');
// gonna attempt to use the same logic as the Stu Mini Project to seed the database with random data to work from, not exactly sure how to make all of this work correctly, but going to try
const { getRandomName, getRandomFriends, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing Thoughts
    await Thought.deleteMany({});

    // Drop existing Users
    await User.deleteMany({});

    // Create empty array to hold the Users
    const users = [];

    // Loop 20 times -- add users to the users array
    for (let i = 0; i <20; i++) {
        // get some random thought objects using a helper function in ./data
        const thoughts = getRandomThoughts(5);
        // get some random friend objects using a helper function in ./data
        const friends = getRandomFriends(10);

        const username = getRandomName();
        const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@gmail.com`;

        users.push({
            username,
            email,
            thoughts,
            friends,
        });
    }

    // Add users to the collection and await results
    await User.collection.insertMany(users);

    // Add thoughts to the collection and await results
    // I think it makes more sense to call the random reactions in the data for thoughts
    await Thought.collection.insertMany(users.thoughts/* , {
        reactions: [getRandomReactions],
    } */);

    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding Complete!');
    process.exit(0);
});