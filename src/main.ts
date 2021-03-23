import * as discord from 'discord.js';
import * as dotenv from 'dotenv';
import * as msganalyzer from './message_analyzer';

const client = new discord.Client();

msganalyzer.config();
dotenv.config();

client.once('ready', () => {
    console.log(client.user.username + ' is online!');
});

client.on('message', (message) => {
    // ignore messages from bots and admins
    if (!message.author.bot && !message.member.hasPermission('ADMINISTRATOR')) {
        // read message content
        msganalyzer.read(message.content, message.author.id)
        .then((response) => {
            // if message contains keyword and user was not previously notified, reply to user with given response
            if (response) {
                message.channel.send('Hi ' + message.author.toString() + ', ' + response + '.');
            }
        });
    }
});

client.login(process.env.BOT_TOKEN);
