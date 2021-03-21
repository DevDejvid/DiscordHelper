import * as filemngr from './file_manager';

// file containing users which were previously notified and therefore, should not trigger another response
const users: string = './data/users.txt';

// regular expression matching words keyword or keywords
const keyword = new RegExp(/^keyword(s)?$/i);

export async function read(message: string, userID: string): Promise<string> {
    // check if user was previously notified
    if (!await filemngr.find(userID, users)) {
        // split message into list of words based on spaces and other punctuation
        var words: string[] = message.split(/[\s,.!?]+/);

        // check if any word from the list matches with regular expression
        for (let i = 0; i < words.length; i++) {
            if (keyword.test(words[i])) {
                // add user to the file
                filemngr.append(userID, users);
                return 'response to keyword goes here';
            }
        }
    }

    return null;
}
