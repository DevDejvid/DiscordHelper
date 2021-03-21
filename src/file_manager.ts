import * as file from 'fs/promises';

export function find(line: string, filename: string): Promise<boolean> {
    return file.readFile(filename, 'utf8')
    .then((content) => {
        // split file into list of lines
        var lines: string[] = content.split(/\r?\n/);

        // linear search
        for (let i = 0; i < lines.length; i++)
        {
            if (line == lines[i])
            {
                return true;
            }
        }

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
