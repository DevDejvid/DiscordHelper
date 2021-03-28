## Introduction
The aim of this Discord bot is to help with moderation of newly joined users by providing them with automatic responses based on keywords found within their messages.

## Prerequisites
* Install [Node.js](https://nodejs.org) to execute JavaScript code.
* Create the bot itself on the [Discord Developer Portal](https://discord.com/developers/applications).
* Add bot's unique token to the file called `.env_template` and afterwards, rename it to `.env`.

## Installation
1. Clone the project to your local computer.
2. Install all necessary packages by running `npm install` command inside the directory.

## Configuration
1. Set unique name, [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) and response for each keyword in the following file `./config/keywords.json`.
2. Add channel IDs to this file `./config/config.ts` to enable message analyzer only in selected channels. This feature is optional, so if list is kept empty, analyzer will be enabled in all channels.
3. Add role IDs to `./config/config.ts` to ignore messages from users with specified roles. Also optional feature.

## Run
Transpile TypeScript to JavaScript.
```
npm run build
```

Transpile and start the bot afterwards.
```
npm run start
```
