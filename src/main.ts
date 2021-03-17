import * as discord from 'discord.js';
import * as dotenv from 'dotenv';

const client = new discord.Client();

dotenv.config();

client.once('ready', () => {
    console.log(client.user.username + ' is online!');
});

client.login(process.env.BOT_TOKEN);
