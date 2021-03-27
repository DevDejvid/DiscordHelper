import * as file from 'fs/promises';
import {createReadStream} from 'fs';
import {createInterface} from 'readline';

export function find(iinput: string, filename: string): Promise<boolean> {
    return file.access(filename)
    .then(async () => {
        // create stream for reading files
        const stream = createReadStream(filename);

        // read file line by line
        const readline = createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        // linear search
        for await (const line of readline) {
            if (line == iinput) {
                stream.close();
                return true;
            }
        }
        
        stream.close();
        return false;
    })
    .catch((/*err*/) => {
        //console.error(err);
        return false;
    });
}

export function append(input: string, filename: string) {
    // add input to the end of the file and return the cursor to new line
    file.appendFile(filename, input + '\n')
    .catch((err) => {
        // if a missing directory error occurs, create directories and try again
        if (err.code == 'ENOENT') {
            file.mkdir(filename.replace(filename.split('/')[filename.split('/').length - 1], ''));
            // if file does not exist, it will create a new one and append
            file.appendFile(filename, input + '\n')
            .catch((err) => {
                console.error(err);
            });
        }
        else {
            console.error(err);
        }
    });
}
