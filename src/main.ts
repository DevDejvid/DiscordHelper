import * as discord from 'discord.js';
import * as dotenv from 'dotenv';
import * as msganalyzer from './message_analyzer';
import * as config from '../config/config';

const client = new discord.Client();

msganalyzer.config();
dotenv.config();

client.once('ready', () => {
    console.log(client.user.username + ' is online!');
});

client.on('message', (message) => {
    // only analyze messages in selected channels, if any
    if (!config.channelIDs.length || config.channelIDs.includes(message.channel.id)) {
        // ignore messages from bots, admins and members with specified roles
        if (!message.author.bot && !message.member.hasPermission('ADMINISTRATOR') && !blacklisted(message.member.roles.cache.array())) {
            // read message content
            msganalyzer.read(message.content, message.author.id)
            .then((response) => {
                // if message contains keyword and user was not previously notified, reply to user with given response
                if (response) {
                    message.channel.send('Hi ' + message.author.toString() + ', ' + response + '.');
                }
            });
        }
    }
});

function blacklisted(roles: discord.Role[]): boolean {
    // check if user has one of the roles specified in the config file
    for (let i = 0; i < config.roleIDs.length; i++) {
        for (let j = 0; j < roles.length; j++) {
            if (roles[j].id == config.roleIDs[i]) {
                return true;
            }
        }
    }

    return false;
}

client.login(process.env.BOT_TOKEN);
