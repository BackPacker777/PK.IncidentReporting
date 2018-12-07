"use strict";

export default class SetResultsSessionStorage {
    constructor(data) {
        SetResultsSessionStorage.saveData(data);
        window.open('/public/views/archives_results.html', '_blank', 'location=yes,height=900,width=1000,scrollbars=yes,status=yes');
    }

    static saveData(data) {
        //DATE & TIME------------------------------------------------------------------------------------------------------
        sessionStorage.setItem('day', data.day);
        sessionStorage.setItem('date', data.date);
        sessionStorage.setItem('incidentTime', data.incidentTime);

        //INJURED PERSON---------------------------------------------------------------------------------------------------
        sessionStorage.setItem('lastName', data.lastName);
        sessionStorage.setItem('firstName', data.firstName);
        sessionStorage.setItem('gender', data.gender);
        sessionStorage.setItem('dob', data.dob);
        sessionStorage.setItem('age', data.age);
        sessionStorage.setItem('height', data.height);
        sessionStorage.setItem('weight', data.weight);
        sessionStorage.setItem('patientStreet', data.patientStreet);
        sessionStorage.setItem('patientCity', data.patientCity);
        sessionStorage.setItem('patientState', data.patientState);
        sessionStorage.setItem('patientZip', data.patientZip);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('occupation', data.occupation);
        sessionStorage.setItem('homePhoneNum', data.homePhoneNum);
        sessionStorage.setItem('cellPhoneNum', data.cellPhoneNum);

        //PATIENT HISTORY--------------------------------------------------------------------------------------------------
        sessionStorage.setItem('priorInjury', data.priorInjury);
        sessionStorage.setItem('yearInjured', data.yearInjured);
        sessionStorage.setItem('hi', data.healthInsurance);
        sessionStorage.setItem('meds', data.meds);
        sessionStorage.setItem('ticketType', data.ticketType);
        sessionStorage.setItem('group', data.groupName);

        //LOCATION---------------------------------------------------------------------------------------------------------
        sessionStorage.setItem('location', data.location);
        sessionStorage.setItem('locationLift', data.locationLift);
        sessionStorage.setItem('whichLift', data.whichLift);
        sessionStorage.setItem('locationHill', data.locationHill);
        sessionStorage.setItem('whichHill', data.whichHill);
        sessionStorage.setItem('difficulty', data.difficulty);
        sessionStorage.setItem('location', data.locationPremise);
        sessionStorage.setItem('specificLocation', data.specificLocation);

        //SKIING HISTORY------------------------------------------------------------------------------------------------
        sessionStorage.setItem('ability', data.ability);
        sessionStorage.setItem('inLesson', data.inLesson);
        sessionStorage.setItem('instructor', data.instructor);
        sessionStorage.setItem('timesWhere', data.timesWhere);
        sessionStorage.setItem('numTimesToday', data.numTimesToday);
        sessionStorage.setItem('numTimesPrior', data.numTimesPrior);
        sessionStorage.setItem('removedBy', data.removedBy);

        //EQUIPMENT--------------------------------------------------------------------------------------------------------
        sessionStorage.setItem('equipType', data.equipType);
        sessionStorage.setItem('owner', data.owner);
        if (data.owner === 'Rent' || data.owner === 'Borrowed') {
            sessionStorage.setItem('skiNum', data.skiNum);
            sessionStorage.setItem('bootNum', data.bootNum);
            sessionStorage.setItem('shopName', "Pine Knob");
            sessionStorage.setItem('shopStreet', "778 Sashabaw Road");
            sessionStorage.setItem('shopCity', "Clarkston");
            sessionStorage.setItem('shopState', "MI");
            sessionStorage.setItem('shopZip', "48348");
        } else if (data.owner === 'Other') {
            sessionStorage.setItem('skiNum', data.skiNum);
            sessionStorage.setItem('bootNum', data.bootNum);
            sessionStorage.setItem('shopName', data.shopName);
            sessionStorage.setItem('shopStreet', data.shopStreet);
            sessionStorage.setItem('shopCity', data.shopCity);
            sessionStorage.setItem('shopState', data.shopState);
            sessionStorage.setItem('shopZip', data.shopZip);
        }

        sessionStorage.setItem('bindingMake', data.bindingMake);
        sessionStorage.setItem('bindingModel', data.bindingModel);
        sessionStorage.setItem('leftDinToe', data.leftDinToe);
        sessionStorage.setItem('leftDinHeel', data.leftDinHeel);
        sessionStorage.setItem('rightDinToe', data.rightDinToe);
        sessionStorage.setItem('rightDinHeel', data.rightDinHeel);
        sessionStorage.setItem('helmet', data.helmet);
        sessionStorage.setItem('helmetRental', data.helmetRental);
        sessionStorage.setItem('helmetNum', data.helmetNum);
        sessionStorage.setItem('video', data.video);
        sessionStorage.setItem('videoName', data.videoName);

        //INCIDENT DESCRIPTION---------------------------------------------------------------------------------------------
        sessionStorage.setItem('incidentDescription', data.incidentDescription);
        sessionStorage.setItem('statementTaker', data.statementTaker);

        //PROBABLE INJURY--------------------------------------------------------------------------------------------------
        sessionStorage.setItem('injuryType', data.injuryType);
        if (data.injuryTypeOther) {
            sessionStorage.setItem('injuryTypeOther', data.injuryTypeOther);
        }
        sessionStorage.setItem('injuryZone', data.injuryZone);
        if (data.injuryZoneOther) {
            sessionStorage.setItem('injuryZoneOther', data.injuryZoneOther);
        }

        //SITE CONDITIONS--------------------------------------------------------------------------------------------------
        sessionStorage.setItem('sceneSurface', data.sceneSurface);
        if (data.sceneSurfaceOther) {
            sessionStorage.setItem('sceneSurfaceOther', data.sceneSurfaceOther);
        }
        sessionStorage.setItem('sceneVisibility', data.sceneVisibility);
        sessionStorage.setItem('temp', data.temp);
        sessionStorage.setItem('wind', data.wind);

        //FIRST AID RENDERED-----------------------------------------------------------------------------------------------
        sessionStorage.setItem('hillFirstAid', data.hillFirstAid);
        sessionStorage.setItem('patrolRoomAid', data.patrolRoomAid);

        if (data.scenePatrollers_0) {
            sessionStorage.setItem(`scenePatrollers_0`, data.scenePatrollers_0);
        }
        if (data.scenePatrollers_1) {
            sessionStorage.setItem(`scenePatrollers_1`, data.scenePatrollers_1);
        }
        if (data.scenePatrollers_2) {
            sessionStorage.setItem(`scenePatrollers_2`, data.scenePatrollers_2);
        }
        if (data.scenePatrollers_3) {
            sessionStorage.setItem(`scenePatrollers_3`, data.scenePatrollers_3);
        }
        if (data.scenePatrollers_4) {
            sessionStorage.setItem(`scenePatrollers_4`, data.scenePatrollers_4);
        }
        if (data.scenePatrollers_5) {
            sessionStorage.setItem(`scenePatrollers_5`, data.scenePatrollers_5);
        }

        //------------------------------------

        if (data.transportPatrollers_0) {
            sessionStorage.setItem(`transportPatrollers_0`, data.transportPatrollers_0);
        }
        if (data.transportPatrollers_1) {
            sessionStorage.setItem(`transportPatrollers_1`, data.transportPatrollers_1);
        }
        if (data.transportPatrollers_2) {
            sessionStorage.setItem(`transportPatrollers_2`, data.transportPatrollers_2);
        }
        if (data.transportPatrollers_3) {
            sessionStorage.setItem(`transportPatrollers_3`, data.transportPatrollers_3);
        }
        if (data.transportPatrollers_4) {
            sessionStorage.setItem(`transportPatrollers_4`, data.transportPatrollers_4);
        }
        if (data.transportPatrollers_5) {
            sessionStorage.setItem(`transportPatrollers_5`, data.transportPatrollers_5);
        }

        //------------------------------------

        if (data.aidRoomPatrollers_0) {
            sessionStorage.setItem(`aidPatrollers_0`, data.aidRoomPatrollers_0);
        }
        if (data.aidRoomPatrollers_1) {
            sessionStorage.setItem(`aidPatrollers_1`, data.aidRoomPatrollers_1);
        }
        if (data.aidRoomPatrollers_2) {
            sessionStorage.setItem(`aidPatrollers_2`, data.aidRoomPatrollers_2);
        }
        if (data.aidRoomPatrollers_3) {
            sessionStorage.setItem(`aidPatrollers_3`, data.aidRoomPatrollers_3);
        }
        if (data.aidRoomPatrollers_4) {
            sessionStorage.setItem(`aidPatrollers_4`, data.aidRoomPatrollers_4);
        }
        if (data.aidRoomPatrollers_5) {
            sessionStorage.setItem(`aidPatrollers_5`, data.aidRoomPatrollers_5);
        }

        //TRANSPORTATION & DESTINATION----------------------------------------------------------------------------------
        sessionStorage.setItem('arrive', data.arrive);
        sessionStorage.setItem('arriveOther', data.arriveOther);
        sessionStorage.setItem('leave', data.leave);
        sessionStorage.setItem('otherDest', data.destOther);
        sessionStorage.setItem('dest', data.dest);

        //WITNESSESS----------------------------------------------------------------------------------------------------
        if (data.name0) {
            let count = 0;
            const MAX_WITNESS = 8;
            while (count >= 0 && count < MAX_WITNESS) {
                if (data[`name${count}`]) { //https://stackoverflow.com/q/53675369/466246
                    sessionStorage.setItem(`w${count}Name`, data[`name${count}`]);
                    sessionStorage.setItem(`w${count}Street`, data[`street${count}`]);
                    sessionStorage.setItem(`w${count}CityStateZip`, data[`city_state_zip${count}`]);
                    sessionStorage.setItem(`w${count}HomePhoneNum`, data[`home_phone${count}`]);
                    sessionStorage.setItem(`w${count}CellPhoneNum`, data[`cell_phone${count}`]);
                    sessionStorage.setItem(`w${count}Statement`, data[`statement${count}`]);
                }
                count++;
            }
        }

        //REPORT COMPLETER----------------------------------------------------------------------------------------------
        sessionStorage.setItem('reportCompleter', data.reportCompleter);
        sessionStorage.setItem('dateComplete', data.dateComplete);

        //SIGNATURE-----------------------------------------------------------------------------------------------------
        sessionStorage.setItem('finalSig', data.finalSig);
        sessionStorage.setItem('sigLocation', document.getElementById("sigLocation").options[document.getElementById("sigLocation").selectedIndex].value);

        return false;
    }
}