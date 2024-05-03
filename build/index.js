"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const stream_1 = __importDefault(require("stream"));
const dirsctoryPath = "./cs.csv";
const fileS = fs.createReadStream(dirsctoryPath);
function TransformData() {
    let headers = [];
    return new stream_1.default.Transform({
        transform(chunk) {
            const lines = (chunk + '').split(/\r?\n/);
            for (const line of lines) {
                const values = line.split(',');
                if (!headers.length) {
                    headers = values;
                }
                else {
                    const obj = {};
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
const writeStream = fs.createWriteStream('result.csv');
fileS.pipe(transformStream).pipe(writeStream);
