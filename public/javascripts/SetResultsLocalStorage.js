"use strict";

export default class SetResultsLocalStorage {
    constructor(incident_id, data) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (Number(data[i][j].incident_id) === Number(incident_id)) {
                    console.log(data[i][j]);
                    SetResultsLocalStorage.saveData(data[i][j]);
                    window.open('/public/views/archives_results.html', '_blank', 'location=yes,height=900,width=1000,scrollbars=yes,status=yes');
                }
            }
        }
    }

    static saveData(data) {
        //DATE & TIME------------------------------------------------------------------------------------------------------
        localStorage.setItem('day', data.day);
        localStorage.setItem('date', data.date);
        localStorage.setItem('incidentTime', data.incidentTime);

        //INJURED PERSON---------------------------------------------------------------------------------------------------
        localStorage.setItem('lastName', data.lastName);
        localStorage.setItem('firstName', data.firstName);
        localStorage.setItem('gender', data.gender);
        localStorage.setItem('dob', data.dob);
        localStorage.setItem('age', data.age);
        localStorage.setItem('height', data.height);
        localStorage.setItem('weight', data.weight);
        localStorage.setItem('patientStreet', data.patientStreet);
        localStorage.setItem('patientCity', data.patientCity);
        localStorage.setItem('patientState', data.patientState);
        localStorage.setItem('patientZip', data.patientZip);
        localStorage.setItem('email', data.email);
        localStorage.setItem('occupation', data.occupation);
        localStorage.setItem('homePhoneNum', data.homePhoneNum);
        localStorage.setItem('cellPhoneNum', data.cellPhoneNum);

        //PATIENT HISTORY--------------------------------------------------------------------------------------------------
        localStorage.setItem('priorInjury', data.priorInjury);
        localStorage.setItem('yearInjured', data.yearInjured);
        localStorage.setItem('hi', data.healthInsurance);
        localStorage.setItem('meds', data.meds);
        localStorage.setItem('ticketType', data.ticketType);
        localStorage.setItem('group', data.groupName);

        //LOCATION---------------------------------------------------------------------------------------------------------
        localStorage.setItem('location', data.location);
        localStorage.setItem('locationLift', data.locationLift);
        localStorage.setItem('whichLift', data.whichLift);
        localStorage.setItem('locationHill', data.locationHill);
        localStorage.setItem('whichHill', data.whichHill);
        localStorage.setItem('difficulty', data.difficulty);
        localStorage.setItem('location', data.locationPremise);
        localStorage.setItem('specificLocation', data.specificLocation);

        //SKIING HISTORY------------------------------------------------------------------------------------------------
        localStorage.setItem('ability', data.ability);
        localStorage.setItem('inLesson', data.inLesson);
        localStorage.setItem('instructor', data.instructor);
        localStorage.setItem('timesWhere', data.timesWhere);
        localStorage.setItem('numTimesToday', data.numTimesToday);
        localStorage.setItem('numTimesPrior', data.numTimesPrior);
        localStorage.setItem('removedBy', data.removedBy);

        //EQUIPMENT--------------------------------------------------------------------------------------------------------
        localStorage.setItem('equipType', data.equipType);
        localStorage.setItem('owner', data.owner);
        if (data.owner === 'Rent' || data.owner === 'Borrowed') {
            localStorage.setItem('skiNum', data.skiNum);
            localStorage.setItem('bootNum', data.bootNum);
            localStorage.setItem('shopName', "Pine Knob");
            localStorage.setItem('shopStreet', "778 Sashabaw Road");
            localStorage.setItem('shopCity', "Clarkston");
            localStorage.setItem('shopState', "MI");
            localStorage.setItem('shopZip', "48348");
        } else if (data.owner === 'Other') {
            localStorage.setItem('skiNum', data.skiNum);
            localStorage.setItem('bootNum', data.bootNum);
            localStorage.setItem('shopName', data.shopName);
            localStorage.setItem('shopStreet', data.shopStreet);
            localStorage.setItem('shopCity', data.shopCity);
            localStorage.setItem('shopState', data.shopState);
            localStorage.setItem('shopZip', data.shopZip);
        }

        localStorage.setItem('bindingMake', data.bindingMake);
        localStorage.setItem('bindingModel', data.bindingModel);
        localStorage.setItem('leftDinToe', data.leftDinToe);
        localStorage.setItem('leftDinHeel', data.leftDinHeel);
        localStorage.setItem('rightDinToe', data.rightDinToe);
        localStorage.setItem('rightDinHeel', data.rightDinHeel);
        localStorage.setItem('helmet', data.helmet);
        localStorage.setItem('helmetRental', data.helmetRental);
        localStorage.setItem('helmetNum', data.helmetNum);
        localStorage.setItem('video', data.video);
        localStorage.setItem('videoName', data.videoName);

        //INCIDENT DESCRIPTION---------------------------------------------------------------------------------------------
        localStorage.setItem('incidentDescription', data.incidentDescription);
        localStorage.setItem('statementTaker', data.statementTaker);

        //PROBABLE INJURY--------------------------------------------------------------------------------------------------
        localStorage.setItem('injuryType', data.injuryType);
        if (data.injuryTypeOther) {
            localStorage.setItem('injuryTypeOther', data.injuryTypeOther);
        }
        localStorage.setItem('injuryZone', data.injuryZone);
        if (data.injuryZoneOther) {
            localStorage.setItem('injuryZoneOther', data.injuryZoneOther);
        }

        //SITE CONDITIONS--------------------------------------------------------------------------------------------------
        localStorage.setItem('sceneSurface', data.sceneSurface);
        if (data.sceneSurfaceOther) {
            localStorage.setItem('sceneSurfaceOther', data.sceneSurfaceOther);
        }
        localStorage.setItem('sceneVisibility', data.sceneVisibility);
        localStorage.setItem('temp', data.temp);
        localStorage.setItem('wind', data.wind);

        //FIRST AID RENDERED-----------------------------------------------------------------------------------------------
        localStorage.setItem('hillFirstAid', data.hillFirstAid);
        localStorage.setItem('patrolRoomAid', data.patrolRoomAid);

        if (data.scenePatrollers_1) {
            let count = 0;
            while (count >= 0) {
                let divCount = count + 1;
                if (document.getElementById(`scenePatrollers_${divCount}`)) {
                    localStorage.setItem(`scenePatrollers_${count}`, document.getElementById(`scenePatrollers_${count}`).value);
                    count++;
                } else {
                    break;
                }
            }
        }
        if (data.transportPatrollers_1) {
            let count = 0;
            while (count >= 0) {
                let divCount = count + 1;
                if (document.getElementById(`transportPatrollers_${divCount}`)) {
                    localStorage.setItem(`transportPatrollers_${count}`, document.getElementById(`transportPatrollers_${count}`).value);
                    count++;
                } else {
                    break;
                }
            }
        }
        if (data.aidRoomPatrollers_1) {
            localStorage.setItem('aidPatrollers', data.aidRoomPatrollers_0);
            let count = 0;
            while (count >= 0) {
                let divCount = count + 1;
                if (document.getElementById(`aidRoomPatrollers_${divCount}`)) {
                    localStorage.setItem(`aidPatrollers_${count}`, document.getElementById(`aidRoomPatrollers_${count}`).value);
                    count++;
                } else {
                    break;
                }
            }
        }

        //TRANSPORTATION & DESTINATION----------------------------------------------------------------------------------
        localStorage.setItem('arrive', data.arrive);
        localStorage.setItem('arriveOther', data.arriveOther);
        localStorage.setItem('leave', data.leave);
        localStorage.setItem('otherDest', data.destOther);
        localStorage.setItem('dest', data.dest);

        //WITNESSESS----------------------------------------------------------------------------------------------------
        if (data.w0name) {
            let count = 0;
            while (count >= 0) {
                if (document.getElementById(`w${count}LastName`)) {
                    localStorage.setItem(`w${count}Name`, document.getElementById(`w${count}LastName`).value + ", " + document.getElementById(`w${count}FirstName`).value);
                    localStorage.setItem(`w${count}Street`, document.getElementById(`w${count}Street`).value);
                    localStorage.setItem(`w${count}CityStateZip`, document.getElementById(`w${count}City`).value + ", " + document.getElementById(`w${count}State`).value + " " + document.getElementById(`w${count}Zip`).value);
                    localStorage.setItem(`w${count}HomePhoneNum`, document.getElementById(`w${count}HomePhoneNum`).value);
                    localStorage.setItem(`w${count}CellPhoneNum`, document.getElementById(`w${count}CellPhoneNum`).value);
                    localStorage.setItem(`w${count}Statement`, document.getElementById(`w${count}Statement`).value);
                    count++;
                } else {
                    break;
                }
            }
        }

        //REPORT COMPLETER----------------------------------------------------------------------------------------------
        localStorage.setItem('reportCompleter', data.reportCompleter);
        localStorage.setItem('dateComplete', data.dateComplete);

        //SIGNATURE-----------------------------------------------------------------------------------------------------
        localStorage.setItem('finalSig', data.finalSig);
        localStorage.setItem('sigLocation', document.getElementById("sigLocation").options[document.getElementById("sigLocation").selectedIndex].value);

        return false;
    }
}