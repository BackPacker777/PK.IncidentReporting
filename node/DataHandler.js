"use strict";

const FS = require('fs');
const SQL = require('sqlite3').verbose();

class DataHandler {
    constructor() {
        this.initDB();
        this.counter = null;
    }

    static checkPassword(password, callback) {
        const PASSWORD = `pksp2019`;
        password =  password.replace(/['"]+/g, '');
        if (password === PASSWORD) {
            callback(`1`);
        } else {
            callback(`0`);
        }
    }

    static saveSignature(sig, callback) {
        FS.writeFile(`public/images/signature.png`, sig, 'base64', err => {
            if (err) throw err;
            callback('saved');
        });
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
                healthInsurance TEXT,
                medications TEXT,
                ticketType TEXT,
                groupName TEXT
            )`);
            this.db.run(`CREATE TABLE IF NOT EXISTS pk_patientEquip (
              patientEquip_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
              patient_id INTEGER,
              removedBy TEXT,
              equipType TEXT,
              otherEquip TEXT,
              owner TEXT,
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
                instructor TEXT,
                timesWhere INTEGER,
                numTimesToday INTEGER,
                numTimesPrior INTEGER,
                incidentTime TEXT,
                video TEXT,
                videoName TEXT,
                incidentDescription TEXT,
                statementTaker TEXT,
                reportCompleter TEXT,
                dateComplete TEXT,
                finalSig TEXT,
                sigLocation TEXT,
                FOREIGN KEY (patient_id) REFERENCES pk_patients (patient_id) ON DELETE CASCADE ON UPDATE CASCADE
            )`);
            this.db.run(`CREATE TABLE IF NOT EXISTS pk_witnesses (
                witness_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                patient_id INTEGER,
                name TEXT,
                street TEXT,
                city_state_zip TEXT,
                home_phone TEXT,
                cell_phone TEXT,
                statement TEXT,
                FOREIGN KEY (patient_id) REFERENCES pk_patients (patient_id) ON DELETE CASCADE ON UPDATE CASCADE
            )`);
            this.db.run(`CREATE TABLE IF NOT EXISTS pk_siteData (
                siteData_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                patient_id INTEGER,
                location TEXT,
                whichLift TEXT,
                whichHill TEXT,
                difficulty TEXT,
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
                scenePatrollers_0 TEXT,
                scenePatrollers_1 TEXT,
                scenePatrollers_2 TEXT,
                scenePatrollers_3 TEXT,
                scenePatrollers_4 TEXT,
                scenePatrollers_5 TEXT,
                transportPatrollers_0 TEXT,
                transportPatrollers_1 TEXT,
                transportPatrollers_2 TEXT,
                transportPatrollers_3 TEXT,
                transportPatrollers_4 TEXT,
                transportPatrollers_5 TEXT,
                aidRoomPatrollers_0 TEXT,
                aidRoomPatrollers_1 TEXT,
                aidRoomPatrollers_2 TEXT,
                aidRoomPatrollers_3 TEXT,
                aidRoomPatrollers_4 TEXT,
                aidRoomPatrollers_5 TEXT,
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
            dateArray[1] = parseInt(dateArray[1], 10); //to remove the leading zero
            dateArray[2] = parseInt(dateArray[2], 10); //to remove the leading zero
            let date = (dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0]);
            let sql = `SELECT * FROM pk_incidents LEFT JOIN pk_patients ON pk_incidents.patient_id = pk_patients.patient_id
                      LEFT JOIN pk_siteData ON pk_patients.patient_id = pk_siteData.patient_id 
                      LEFT JOIN pk_patientEquip ON pk_patients.patient_id = pk_patientEquip.patient_id
                      LEFT JOIN pk_firstAid ON pk_patients.patient_id = pk_firstAid.patient_id
                      LEFT JOIN pk_witnesses ON pk_patients.patient_id = pk_witnesses.patient_id
                      WHERE pk_incidents.date = ?`;
            this.db.all(sql, [date], (err, rows) => {
                if (err) {
                    console.log(`DATE ERR = ${err}`);
                } else {
                    data.push(rows);
                    this.queryWitnesses(data[0][0].patient_id, data, callback);
                }
            });
        } else if (search[0] === 'lastName') {
            let sql = `SELECT * FROM pk_patients LEFT JOIN pk_incidents ON pk_patients.patient_id = pk_incidents.patient_id
                      LEFT JOIN pk_siteData ON pk_patients.patient_id = pk_siteData.patient_id
                      LEFT JOIN pk_patientEquip ON pk_patients.patient_id = pk_patientEquip.patient_id
                      LEFT JOIN pk_firstAid ON pk_patients.patient_id = pk_firstAid.patient_id
                      LEFT JOIN pk_witnesses ON pk_patients.patient_id = pk_witnesses.patient_id
                      WHERE LOWER(pk_patients.lastName) = ?`;
            this.db.all(sql, [search[1]], (err, rows) => {
                if (err) {
                    console.log(`NAME ERR = ${err}`);
                } else {
                    data.push(rows);
                    this.queryWitnesses(data[0][0].patient_id, data, callback);

                }
            });
        } else if (search[0] === 'incidentID') {
            let sql = `SELECT * FROM pk_incidents LEFT JOIN pk_patients ON pk_incidents.patient_id = pk_patients.patient_id
                          LEFT JOIN pk_siteData ON pk_patients.patient_id = pk_siteData.patient_id
                          LEFT JOIN pk_patientEquip ON pk_patients.patient_id = pk_patientEquip.patient_id
                          LEFT JOIN pk_firstAid ON pk_patients.patient_id = pk_firstAid.patient_id
                          WHERE pk_incidents.incident_id = ?`;

            this.db.all(sql, [search[1]], (err, rows) => {
                if (err) {
                    console.log(`ID ERR = ${err}`);
                } else {
                    data.push(rows);
                    this.queryWitnesses(data[0][0].patient_id, data, callback);
                }
            });
        }
    }

    queryWitnesses(patient, data, callback) {
        let witness_sql = `SELECT * FROM pk_witnesses WHERE pk_witnesses.patient_id = ?`;
        this.db.all(witness_sql, [patient], (err, rows) => {
            if (err) {
                console.log(`ID ERR = ${err}`);
            } else {
                for (let j = 0; j < data[0].length; j++) {
                    let newData = data[0][j];
                    for (let i = 0; i < rows.length; i++) {
                        let name = `name${i}`, street = `street${i}`, city_state_zip = `city_state_zip${i}`, home_phone = `home_phone${i}`, cell_phone = `cell_phone${i}`, statement = `statement${i}`;
                        Object.assign(newData, {
                            [name]: rows[i].name,
                            [street]: rows[i].street,
                            [city_state_zip]: rows[i].city_state_zip,
                            [home_phone]: rows[i].home_phone,
                            [cell_phone]: rows[i].cell_phone,
                            [statement]: rows[i].statement
                        });
                        data[0][j] = newData;
                    }
                }
                callback(data[0]);
            }
        });
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
        this.db.run(`INSERT INTO pk_patients (lastName, firstName, gender, dob, age, height, weight, patientStreet, patientCity, patientState, patientZip, email, occupation, homePhoneNum, cellPhoneNum, ability, priorInjury, yearInjured, healthInsurance, medications, ticketType, groupName)
         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.lastName, data.firstName, data.gender, data.dob, data.age, data.height, data.weight, data.patientStreet, data.patientCity, data.patientState, data.patientZip, data.email, data.occupation, data.homePhoneNum, data.cellPhoneNum, data.ability, data.priorInjury, data.yearInjured, data.hi, data.medications, data.ticketType, data.groupName],
            function(err) {
                if (err) {
                    return console.log(err.message);
                }
            }
        );
        this.getID((patient_id) => {
            this.db.run(`INSERT INTO pk_patientEquip (patientEquip_id, patient_id, removedBy, equipType, otherEquip, owner, skiNum, bootNum, shopName, shopStreet, shopCity, shopState, shopZip, bindingMake, bindingModel, leftDinToe, leftDinHeel, rightDinToe, rightDinHeel, helmet, helmetRental, helmetNum)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.patientEquip_id, patient_id, data.removedBy, data.equipType, data.otherEquip, data.owner, data.skiNum, data.bootNum, data.shopName, data.shopStreet, data.shopCity, data.shopState, data.shopZip, data.bindingMake, data.bindingModel, data.leftDinToe, data.leftDinHeel, data.rightDinToe, data.rightDinHeel, data.helmet, data.helmetRental, data.helmetNum],
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                }
            );
            this.db.run(`INSERT INTO pk_incidents (incident_id, patient_id, day, date, inLesson, instructor, timesWhere, numTimesToday, numTimesPrior, incidentTime, video, videoName, incidentDescription, statementTaker, reportCompleter, dateComplete, finalSig, sigLocation)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.incident_id, patient_id, data.day, data.date, data.inLesson, data.instructor, data.timesWhere, data.numTimesToday, data.numTimesPrior, data.incidentTime, data.video, data.videoName, data.incidentDescription, data.statementTaker, data.reportCompleter, data.dateComplete, data.finalSig, data.sigLocation],
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                }
            );
            this.db.run(`INSERT INTO pk_siteData (siteData_id, patient_id, location, whichLift, whichHill, difficulty, specificLocation, sceneSurface, sceneSurfaceOther, sceneVisibility, temp, wind)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.siteData_id, patient_id, data.location, data.whichLift, data.whichHill, data.difficulty, data.specificLocation, data.sceneSurface, data.sceneSurfaceOther, data.sceneVisibility, data.temp, data.wind],
                function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                }
            );
            let counter = 0;
            while (counter >= 0) {
                let wName = `data.w${counter}Name`;
                if (eval(wName)) {
                    let wStreet = `data.w${counter}Street`, wCityStateZip = `data.w${counter}CityStateZip`, wHomePhone = `data.w${counter}HomePhoneNum`, wCellPhone = `data.w${counter}CellPhoneNum`, wStatement = `data.w${counter}Statement`;
                    this.db.run(`INSERT INTO pk_witnesses (witness_id, patient_id, name, street, city_state_zip, home_phone, cell_phone, statement)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
                        [data.witness_id, patient_id, eval(wName), eval(wStreet), eval(wCityStateZip), eval(wHomePhone), eval(wCellPhone), eval(wStatement)],
                        function(err) {
                            if (err) {
                                return console.log(err.message);
                            }
                        }
                    );
                } else {
                    counter = null;
                    break;
                }
                counter++;
            }
            this.db.run(`INSERT INTO pk_firstAid (firstAid_id, patient_id, injuryType, injuryTypeOther, injuryZone, injuryZoneOther, hillFirstAid, patrolRoomAid, scenePatrollers_0, scenePatrollers_1, scenePatrollers_2, scenePatrollers_3, scenePatrollers_4, scenePatrollers_5, transportPatrollers_0, transportPatrollers_1, transportPatrollers_2, transportPatrollers_3, transportPatrollers_4, transportPatrollers_5, aidRoomPatrollers_0, aidRoomPatrollers_1, aidRoomPatrollers_2, aidRoomPatrollers_3, aidRoomPatrollers_4, aidRoomPatrollers_5, arrive, arrivalOther, leave, dest, destOther)
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.firstAid_id, patient_id, data.injuryType, data.injuryTypeOther, data.injuryZone, data.injuryZoneOther, data.hillFirstAid, data.patrolRoomAid, data.scenePatrollers_0, data.scenePatrollers_1, data.scenePatrollers_2, data.scenePatrollers_3, data.scenePatrollers_4, data.scenePatrollers_5, data.transportPatrollers_0, data.transportPatrollers_1, data.transportPatrollers_2, data.transportPatrollers_3, data.transportPatrollers_4, data.transportPatrollers_5, data.aidPatrollers_0, data.aidPatrollers_1, data.aidPatrollers_2, data.aidPatrollers_3, data.aidPatrollers_4, data.aidPatrollers_5, data.arrive, data.arriveOther, data.leave, data.dest, data.otherDest],
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