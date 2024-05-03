import fs = require('fs');
import stream from "stream";

const dirsctoryPath = "./cs.csv"
const fileS = fs.createReadStream(dirsctoryPath)

function TransformData() {
    let headers: string[] = [];
    return new stream.Transform({
        transform(chunk) {
            const lines = (chunk + '').split(/\r?\n/);
            for (const line of lines) {
                const values = line.split(',');
                if (!headers.length) {
                    headers = values;
                } else {
                    const obj: any = {};
                    for (let i = 0; i < headers.length; i++) {
                        obj[headers[i]] = values[i];
                    }
                    this.push(JSON.stringify(obj) + '\n');
                }
            }
        }
    });
}

const transformStream = TransformData();
const writeStream = fs.createWriteStream('result.csv')
fileS.pipe(transformStream).pipe(writeStream);


