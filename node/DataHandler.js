//   todo:

"use strict";

const FS = require('fs');
const SQL = require('sqlite3').verbose();

class DataHandler {
    constructor() {
        this.initDB();
    }

    initDB() {
        this.db = new SQL.Database(`data/incident_data.db`, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Connected to Sqlite3 DB`);
        });
        this.db.run(`CREATE TABLE IF NOT EXISTS pk_incidents (
        id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
        maker TEXT,
        model TEXT,
        tag INTEGER,
        sn TEXT,
        type TEXT,
        description TEXT,
        warranty INTEGER,
        purchaseDate INTEGER,
        isTitle1 INTEGER DEFAULT 0,
        isTitle9 INTEGER DEFAULT 0,
        is31a INTEGER DEFAULT 0
        )`);
        console.log(`Sqlite table -psp_assets- created`);
        this.db.run(`PRAGMA AUTO_VACUUM = FULL`);
        // date: http://www.sqlitetutorial.net/sqlite-date/
    }

    static renderDom(path, contentType, callback, encoding) {
        FS.readFile(path, encoding ? encoding : 'utf-8', (error, string) => {
            callback(error, string, contentType);
        });
    }

    static setBaseData(data, callback) {
        let filePath, columns;
        if (data === 'zip') {
            filePath = 'data/ZipCodeDB.csv';
        } else if (data === 'hills') {
            filePath = 'data/hills.csv';
            columns = 2;
        } else if (data === 'lifts') {
            filePath = 'data/lifts.csv';
            columns = 1;
        } else if (data === 'patrollers') {
            filePath = 'data/patrollers.csv';
            columns = 2;
        }

        FS.readFile(filePath, 'utf8', (err, file) => {
            let tempArray, finalData = [];
            tempArray = file.split(/\r?\n/); //remove newlines
            for (let i = 0; i < tempArray.length; i++) {
                finalData[i] = tempArray[i].split(/,/).slice(0, columns);
            }
            // finalData = JSON.stringify(finalData);
            callback(finalData);
        });
    }

    static handleUserData(data, callback) {
        data = JSON.parse(data);
        const FILE_PATH = 'data/users.csv';
        FS.readFile(FILE_PATH, 'utf8', (err, file) => {
            let user = {};
            const COLUMNS = 4;
            let tempArray, finalData = [];
            tempArray = file.split(/\r?\n/); //remove newlines
            for (let i = 0; i < tempArray.length; i++) {
                finalData[i] = tempArray[i].split(/,/).slice(0, COLUMNS);
            }
            for (let i = 0; i < finalData.length; i++) {
                if (data === finalData[i][0]) {
                    user = JSON.stringify({
                        'email': finalData[i][0],
                        'position': finalData[i][1],
                        'lastName': finalData[i][2],
                        'firstName': finalData[i][3]
                    });
                    break;
                } else {
                    user = 'false';
                }
            }
            callback(user);
        });
    }

    static addData(data) {
        DB.insert(data, (err, newDocs) => {
            console.log(newDocs._id);
        });
    }

    static generateResultsData(callback) {
        DB.find({}, (err, docs) => {
            callback(docs);
        });
    }
}

module.exports = DataHandler;