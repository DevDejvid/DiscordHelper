import * as filemngr from './file_manager';
import {readFileSync} from 'fs';
import {createHash} from 'crypto';

// directory storing list of notified users corresponding to each keyword
const directory: string = './data/';

type keyword = {
    keyword: string,
    regex: string,
    response: string
}

var keywords: keyword[];

export function config() {
    try {
        // load keyword from file to memory
        keywords = JSON.parse(readFileSync('./config/keywords.json', 'utf8'));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export async function read(message: string, userID: string): Promise<string> {
    // split message into list of words based on spaces and other punctuation
    var words: string[] = message.split(/[\s,.!?]+/);

    // check if any word from the list matches with list of keywords
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < keywords.length; j++) {
            if (RegExp(keywords[j].regex, 'i').test(words[i])) {
                // calculate hash from user ID using SHA256 algorithm with result as hexadecimal value
                let userHash: string = createHash('sha256').update(userID).digest('hex');

                // check if user was previously notified
                if (!await filemngr.find(userHash, directory + keywords[j].keyword + '.txt')) {
                    // add user to the file
                    filemngr.append(userHash, directory + keywords[j].keyword + '.txt');
                    return keywords[j].response;
                }
            }            
        }
    }

    return null;
}
