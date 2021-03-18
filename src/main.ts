import * as discord from 'discord.js';
import * as dotenv from 'dotenv';
import * as msganalyzer from './message_analyzer';

const client = new discord.Client();

dotenv.config();

client.once('ready', () => {
    console.log(client.user.username + ' is online!');
});

client.on('message', (message) => {
    // ignore messages from bots and admins
    if (!message.author.bot && !message.member.hasPermission('ADMINISTRATOR')) {
        // read message content
        let response: string = msganalyzer.read(message.content);

        // if message contains keyword, reply to user with given response
        if (response) {
            message.channel.send('Hi ' + message.author.toString() + ', ' + response + '.');
        }
    }
});

client.login(process.env.BOT_TOKEN);
