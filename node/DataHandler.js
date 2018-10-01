//   todo:

"use strict";

const FS = require('fs');
const SQL = require('sqlite3').verbose();

class DataHandler {
    constructor() {
        this.initDB();
        this.counter = null;
    }

    initDB() {
        this.db = new SQL.Database(`data/incident_data.db`, (err) => {
            this.db.run(`PRAGMA foreign_keys = on`);
            this.db.run(`PRAGMA AUTO_VACUUM = FULL`);
            if (err) {
                return console.error(err.message);
            } else {
                console.log(`Connected to -incident_data.db- Sqlite3 DB`);
            }
        });
        this.db.serialize(() => {
            console.log(`Creating -pk_patients- table`);
            this.db.run(`CREATE TABLE IF NOT EXISTS pk_patients (
                patient_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                lastName TEXT,
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
                cellPhoneNum TEXT,
                ability TEXT,
                priorInjury TEXT,
                yearInjured INTEGER,
                healthInsurance INTEGER,
                medications TEXT,
                ticketType TEXT,
                groupType TEXT
            )`);
            this.db.run(`CREATE TABLE IF NOT EXISTS pk_patientEquip (
              patientEquip_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
              patient_id INTEGER,
              removedBy INTEGER,
              equipType INTEGER,
              otherEquip TEXT,
              owner INTEGER,
              skiNum INTEGER,
              bootNum INTEGER,
              shopName TEXT,
              shopStreet TEXT,
              shopCity TEXT,
              shopState TEXT,
              shopZip INTEGER,
              bindingMake TEXT,
              bindingModel TEXT,
              leftDinToe INTEGER,
              leftDinHeel INTEGER,
              rightDinToe INTEGER,
              rightDinHeel INTEGER,
              helmet INTEGER,
              helmetRental INTEGER,
              helmetNum INTEGER,
            FOREIGN KEY (patient_id) REFERENCES pk_patients(patient_id) ON DELETE CASCADE ON UPDATE CASCADE
            )`);
            this.db.run(`CREATE TABLE IF NOT EXISTS pk_incidents (
                incident_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                patient_id INTEGER,
                day TEXT,
                date TEXT,
                inLesson INTEGER,
                timesWhere INTEGER,
                numTimesToday INTEGER,
                numTimesPrior INTEGER,
                incidentTime TEXT,
                video TEXT,
                videoName TEXT,
                incidentDescription TEXT,
                statementTaker TEXT,
                witnessData TEXT,
                reportCompleter TEXT,
                dateComplete TEXT,
                FOREIGN KEY (patient_id) REFERENCES pk_patients (patient_id) ON DELETE CASCADE ON UPDATE CASCADE
            )`);
            this.db.run(`CREATE TABLE IF NOT EXISTS pk_siteData (
                siteData_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                patient_id INTEGER,
                location TEXT,
                specificLocation TEXT,
                sceneSurface TEXT,
                sceneSurfaceOther TEXT,
                sceneVisibility TEXT,
                temp INTEGER,
                wind TEXT,                
                FOREIGN KEY (patient_id) REFERENCES pk_patients (patient_id) ON DELETE CASCADE ON UPDATE CASCADE
            )`);
            this.db.run(`CREATE TABLE IF NOT EXISTS pk_firstAid (
                firstAid_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                patient_id INTEGER,
                injuryType TEXT,
                injuryTypeOther TEXT,
                injuryZone TEXT,
                injuryZoneOther TEXT,
                hillFirstAid TEXT,
                patrolRoomAid TEXT,
                scenePatrollers TEXT,
                transportPatrollers TEXT,
                aidRoomPatrollers TEXT,
                arrive TEXT,
                arrivalOther TEXT,
                leave TEXT,
                dest TEXT,
                destOther TEXT,
                FOREIGN KEY (patient_id) REFERENCES pk_patients (patient_id) ON DELETE CASCADE ON UPDATE CASCADE
            )`);
        });
        console.log(`Sqlite -pk- tables created`);
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

    getRowCount(callback) {
        this.db.get(`SELECT COUNT(*) as 'count' FROM pk_patients`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                callback(result.count);
            }
        });
    }

    queryData(search, callback) {
        search = search.split(',');
        let data = [];
        if (search[0] === 'date') {
            let dateArray = search[1].split('-');
            dateArray[1] = parseInt(dateArray[1], 10);
            let date = (dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0]);
            let sql = `SELECT * FROM pk_incidents LEFT JOIN pk_patients ON pk_incidents.patient_id = pk_patients.patient_id LEFT JOIN pk_siteData ON pk_patients.patient_id = pk_siteData.patient_id WHERE pk_incidents.date = ?`;
            this.db.all(sql, [date], (err, rows) => {
                if (err) {
                    console.log(`DATE ERR = ${err}`);
                } else {
                    data.push(rows);
                    console.log(data);
                    callback(data);
                }
            });
        } else if (search[0] === 'lastName') {
            let sql = `SELECT * FROM pk_patients LEFT JOIN pk_incidents ON pk_patients.patient_id = pk_incidents.patient_id LEFT JOIN pk_siteData ON pk_patients.patient_id = pk_siteData.patient_id WHERE pk_patients.lastName = ?`;
            this.db.all(sql, [search[1]], (err, rows) => {
                if (err) {
                    console.log(`NAME ERR = ${err}`);
                } else {
                    data.push(rows);
                    console.log(data);
                    callback(data);
                }
            });
        } else {
            let sql = `SELECT * FROM pk_incidents LEFT JOIN pk_patients ON pk_incidents.patient_id = pk_patients.patient_id LEFT JOIN pk_siteData ON pk_patients.patient_id = pk_siteData.patient_id WHERE pk_incidents.incident_id = ?`;
            this.db.all(sql, [search[1]], (err, rows) => {
                if (err) {
                    console.log(`ID ERR = ${err}`);
                } else {
                    data.push(rows);
                    console.log(data);
                    callback(data);
                }
            });
        }
    }

    getAllData(callback) {
        this.db.all(`SELECT * FROM pk_patients`, (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                callback(rows);
            }
        });
    }

    getID(callback) {
        this.db.get(`SELECT patient_id FROM pk_patients ORDER BY patient_id DESC LIMIT 1`, (err, row) => {
            callback(row.patient_id);
        });
    }

    insertRow(data) {
        data = JSON.parse(data);
        this.db.run(`INSERT INTO pk_patients (lastName, firstName, gender, dob, age, height, weight, patientStreet, patientCity, patientState, patientZip, email, occupation, homePhoneNum, cellPhoneNum, ability, priorInjury, yearInjured, healthInsurance, medications, ticketType, groupType)
         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.lastName, data.firstName, data.gender, data.dob, data.age, data.height, data.weight, data.patientStreet, data.patientCity, data.patientState, data.patientZip, data.email, data.occupation, data.homePhone, data.cellPhone, data.ability, data.priorInjury, data.yearInjured, data.healthInsurance, data.medications, data.ticketType, data.groupType],
            function(err) {
                if (err) {
                    return console.log(err.message);
                }
            }
        );

        this.getID((patient_id) => {
            this.db.run(`INSERT INTO pk_patientEquip (patientEquip_id, patient_id, removedBy, equipType, otherEquip, owner, skiNum, bootNum, shopName, shopStreet, shopCity, shopState, shopZip, bindingMake, bindingModel, leftDinToe, leftDinHeel, rightDinToe, rightDinHeel, helmet, helmetRental, helmetNum)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.patientEquip_id, patient_id, data.removedBy, data.equipType, data.otherEquip, data.owner, data.skiNum, data.bootNum, data.shopName, data.shopStreet, data.shopCity, data.shopState, data.shopZip, data.bindingMake, data.bindingModel, data.leftDinToe, data.leftDinHeel, data.rightDinToe, data.rightDinHeel, data.helmet, data.helmetRental, data.helmetNumdata],
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                }
            );
            this.db.run(`INSERT INTO pk_incidents (incident_id, patient_id, day, date, inLesson, timesWhere, numTimesToday, numTimesPrior, incidentTime, video, videoName, incidentDescription, statementTaker, witnessData, reportCompleter, dateComplete)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.incident_id, patient_id, data.day, data.date, data.inLesson, data.timesWhere, data.numTimesToday, data.numTimesPrior, data.incidentTime, data.video, data.videoName, data.incidentDescription, data.statementTaker, data.witnessData, data.reportCompleter, data.dateComplete],
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                }
            );
            this.db.run(`INSERT INTO pk_siteData (siteData_id, patient_id, location, specificLocation, sceneSurface, sceneSurfaceOther, sceneVisibility, temp, wind)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.siteData_id, patient_id, data.location, data.specificLocation, data.sceneSurface, data.sceneSurfaceOther, data.sceneVisibility, data.temp, data.wind],
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                }
            );
            this.db.run(`INSERT INTO pk_firstAid (firstAid_id, patient_id, injuryType, injuryTypeOther, injuryZone, injuryZoneOther, hillFirstAid, patrolRoomAid, scenePatrollers, transportPatrollers, aidRoomPatrollers, arrive, arrivalOther, leave, dest, destOther)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.firstAid_id, patient_id, data.injuryType, data.injuryTypeOther, data.injuryZone, data.injuryZoneOther, data.hillFirstAid, data.patrolRoomAid, data.scenePatrollers, data.transportPatrollers, data.aidRoomPatrollers, data.arrive, data.arrivalOther, data.leave, data.dest, data.destOther],
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                }
            );
        });
    }
}

module.exports = DataHandler;