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
            this.db.run(`PRAGMA foreign_keys = on`);
            if (err) {
                return console.error(err.message);
            }
            console.log(`Connected to Sqlite3 DB`);
        });
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS pk_patients (
            patient_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
            lastName TEXT NOT NULL,
            firstName TEXT,
            gender TEXT,
            dob TEXT,
            age INTEGER,
            height INTEGER,
            weight INTEGER,
            patientStreet TEXT,
            patientCity TEXT,
            patientState TEXT,
            patientZip INTEGER,
            email TEXT,
            occupation TEXT,
            homePhoneNum TEXT,
            cellPhoneNum TEXT
        )`);
        this.db.run(`CREATE TABLE IF NOT EXISTS pk_patientHistory (
            patientHistory_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
            patient_id INTEGER NOT NULL,
            priorInjury TEXT,
            yearInjured INTEGER,
            healthInsurance INTEGER,
            medications TEXT,
            ticketType TEXT,
            groupType TEXT,
            FOREIGN KEY (patient_id) REFERENCES pk_patients(patient_id) ON DELETE CASCADE ON UPDATE NO ACTION
        )`);
        this.db.run(`CREATE TABLE IF NOT EXISTS pk_incidents (
            incident_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
            patient_id INTEGER NOT NULL,
            day TEXT,
            date TEXT,
            incidentTime TEXT,
            location TEXT,
            specificLocation TEXT,
            ability TEXT,
            inLesson INTEGER,
            timesWhere INTEGER,
            numTimesToday INTEGER,
            numTimesPrior INTEGER,
            removedBy INTEGER,
            equipType INTEGER,
            otherEquip TEXT,
            owner INTEGER,
            skiNum INETGER,
            bootNum INTEGER,
            shopName TEXT,
            shopStreet TEXT,
            shopCity TEXT
            FOREIGN KEY (patient_id) REFERENCES pk_patients (patient_id) ON DELETE CASCADE ON UPDATE NO ACTION
        )`);
    });


        console.log(`Sqlite table -pk_incidents- created`);
        this.db.run(`PRAGMA AUTO_VACUUM = FULL`);
        this.db.close();
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