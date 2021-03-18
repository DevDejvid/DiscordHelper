// regular expression matching words keyword and keywords
const keyword = new RegExp(/^keyword(s)?$/i);

export function read(message: string): string {
    // split message into list of words based on spaces and other punctuation
    var words: string[] = message.split(/[\s,.!?]+/);

    // check if any word from the list matches with regular expression
    for (let i = 0; i < words.length; i++) {
        if (keyword.test(words[i])) {
            return 'response to keyword goes here';
        }
    }

    return null;
}
