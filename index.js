const Discord = require('discord.js');
// const config = require('./config/config');
const client = new Discord.Client();

require("dotenv").config();

const { roller } = require("./src/roller");

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
})


client.on('message', (message) => {
    if (message.content === "#help") {
        message.channel.send("Dicebound only uses d6 dice, so no need to type d6 in your rolls.\nroll syntax is as follows: `#roll [dice] [difficulty]:[complexity] f[focus number]");
    }
})

client.on('message', (message) => {
    const match = message.content.match(/#roll (\d+) (\d+):(\d+)( f(\d+))?/);
    if(!match) { return; }
    let [_, dice, targetNumber, neededSuccesses, hasFocus, focus] = match;
    dice = parseInt(dice, 10);
    targetNumber = parseInt(targetNumber, 10);
    neededSuccesses = parseInt(neededSuccesses, 10);
    focus = parseInt(focus, 10);

    const roll = roller(dice, targetNumber, neededSuccesses, !!hasFocus ? focus: 0);

    const rollsOutput = roll.rolls.map(result => {
       return result.focused ? '**' + result.value + '**': result.value;
    });
    message.channel.send(`${rollsOutput} with ${roll.totalSuccesses} successes using ${roll.rolls.map(usedFocus => usedFocus.focused).reduce((a, b) => a + b)} focus`);
});