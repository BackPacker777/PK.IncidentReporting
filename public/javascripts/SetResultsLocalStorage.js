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

    static testSave(data) {
        //DATE & TIME------------------------------------------------------------------------------------------------------
        localStorage.setItem('day', data.day);
        localStorage.setItem('date', data.date);
        localStorage.setItem('incidentTime', data.incidentTime);
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
        localStorage.setItem('group', data.group);

        //LOCATION---------------------------------------------------------------------------------------------------------
        localStorage.setItem('location', data.location);
        localStorage.setItem('locationLift', data.locationLift);
        localStorage.setItem('whichLift', data.whichLift.options[data.whichLift.selectedIndex].value);
        localStorage.setItem('locationLift', data.locationLift);
        localStorage.setItem('whichLift', data.whichLift.options[data.whichLift.selectedIndex].value);
        localStorage.setItem('locationHill', data.locationHill);
        localStorage.setItem('whichHill', data.whichHill.options[data.whichHill.selectedIndex].text);
        localStorage.setItem('difficulty', data.whichHill.options[data.whichHill.selectedIndex].value);
        localStorage.setItem('location', data.locationPremise);

        /*if (data.location === 'Lift') {
            localStorage.setItem('location', data.locationLift);
            localStorage.setItem('locationLift', data.locationLift);
            localStorage.setItem('whichLift', data.whichLift.options[data.whichLift.selectedIndex].value);
        } else if (data.location === 'Hill') {
            localStorage.setItem('location', data.locationHill);
            localStorage.setItem('locationHill', data.locationHill);
            localStorage.setItem('whichHill', data.whichHill.options[data.whichHill.selectedIndex].text);
            localStorage.setItem('difficulty', data.whichHill.options[data.whichHill.selectedIndex].value);
        } else if (data.location === 'Premise') {
            localStorage.setItem('location', data.locationPremise);
        }*/

        localStorage.setItem('specificLocation', data.specificLocation);

        //SKIING HISTORY------------------------------------------------------------------------------------------------
        localStorage.setItem('ability', data.ability);

        /*if (data.ability === 'Beginner') {
            localStorage.setItem('ability', data.abilityBeginner);
        } else if (data.ability === 'Intermediate') {
            localStorage.setItem('ability', data.abilityIntermediate);
        } else if (data.ability === 'Expert') {
            localStorage.setItem('ability', data.abilityExpert);
        } else {
            localStorage.setItem('ability', data.abilityNA);
        }*/

        localStorage.setItem('inLesson', data.lesson);
        localStorage.setItem('instructor', data.instructor);

        /*if (data.inLesson === 'Yes') {
            localStorage.setItem('inLesson', data.lessonYes);
            localStorage.setItem('instructor', data.instructor);
        } else if (data.inLesson === 'No') {
            localStorage.setItem('inLesson', data.lessonNo);
        }*/

        localStorage.setItem('timesWhere', data.timesWhere);

        /*if (data.timesLift.checked) {
            localStorage.setItem('timesWhere', data.timesLift);
        } else if (data.timesHill.checked) {
            localStorage.setItem('timesWhere', data.timesHill);
        } else if (data.timesOther.checked) {
            localStorage.setItem('timesWhere', data.timesOther);
            localStorage.setItem('setOther', data.numOther);
        }*/

        localStorage.setItem('numTimesToday', data.numTimesToday);
        localStorage.setItem('numTimesPrior', data.numTimesPrior);

        localStorage.setItem('removedBy', data.removedBy);

        /*if (data.removeFall.checked) {
            localStorage.setItem('removedBy', data.removeFall);
        } else if (data.removeInjured.checked) {
            localStorage.setItem('removedBy', data.removeInjured);
        } else if (data.removePatrol.checked) {
            localStorage.setItem('removedBy', data.removePatrol);
        } else if (data.removeOther.checked) {
            localStorage.setItem('removedBy', data.removeOther);
        }*/

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

       /* if (data.equipAlpine.checked) {
            localStorage.setItem('equipType', data.equipAlpine);
        } else if (data.equipNordic.checked) {
            localStorage.setItem('equipType', data.equipNordic);
        } else if (data.equipSnowboard.checked) {
            localStorage.setItem('equipType', data.equipSnowboard);
        } else if (data.equipOther.checked) {
            localStorage.setItem('equipType', data.equipOther);
            localStorage.setItem('otherEquip', data.otherEquip);
        }
        if (data.ownerOwn.checked) {
            localStorage.setItem('owner', data.ownerOwn);
        } else if (data.ownerRent.checked) {
            localStorage.setItem('owner', data.ownerRent);
            localStorage.setItem('skiNum', data.skiNum);
            localStorage.setItem('bootNum', data.bootNum);
            localStorage.setItem('shopName', "Pine Knob");
            localStorage.setItem('shopStreet', "778 Sashabaw Road");
            localStorage.setItem('shopCity', "Clarkston");
            localStorage.setItem('shopState', "MI");
            localStorage.setItem('shopZip', "48348");
        } else if (data.ownerOther.checked) {
            localStorage.setItem('owner', data.ownerOther);
            localStorage.setItem('skiNum', data.skiNum);
            localStorage.setItem('bootNum', data.bootNum);
            localStorage.setItem('shopName', data.shopName);
            localStorage.setItem('shopStreet', data.shopStreet);
            localStorage.setItem('shopCity', data.shopCity);
            localStorage.setItem('shopState', data.shopState);
            localStorage.setItem('shopZip', data.shopZip);
        } else if (data.ownerBorrowed.checked) {
            localStorage.setItem('owner', data.ownerBorrowed);
        } else if (data.ownerDemo.checked) {
            localStorage.setItem('owner', data.ownerDemo);
            localStorage.setItem('skiNum', data.skiNum);
            localStorage.setItem('bootNum', data.bootNum);
            localStorage.setItem('shopName', "Pine Knob");
            localStorage.setItem('shopStreet', "778 Sashabaw Road");
            localStorage.setItem('shopCity', "Clarkston");
            localStorage.setItem('shopState', "MI");
            localStorage.setItem('shopZip', "48348");
        }*/

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

        /*if (data.helmetY.checked) {
            localStorage.setItem('helmet', data.helmetY);
            if (data.helmetRentalYes.checked) {
                localStorage.setItem('helmetRental', data.helmetRentalYes);
                localStorage.setItem('helmetNum', data.helmetRentalNum);
            } else if (data.helmetRentalNo.checked) {
                localStorage.setItem('helmetRental', data.helmetRentalNo);
            }
        } else if (data.helmetN.checked) {
            localStorage.setItem('helmet', data.helmetN);
        }
        if (data.videoY.checked) {
            localStorage.setItem('video', data.videoY);
            localStorage.setItem('videoName', data.videoName);
        } else if (data.videoN.checked) {
            localStorage.setItem('video', data.videoN);
        }*/

        //INCIDENT DESCRIPTION---------------------------------------------------------------------------------------------
        localStorage.setItem('incidentDescription', data.incidentDescription);
        localStorage.setItem('statementTaker', data.statementTaker_0);

        //PROBABLE INJURY--------------------------------------------------------------------------------------------------
        let injuryTypeBoxes = "";
        let injuries = document.getElementsByName('injury');
        for (let i = 0; i < injuries.length; i++) {
            if (injuries[i].checked) {
                injuryTypeBoxes += injuries[i].value + ", ";
            }
        }
        localStorage.setItem('injuryType', injuryTypeBoxes);
        if (data.injuryTypeOther) {
            localStorage.setItem('injuryTypeOther', data.injuryTypeOther);
        }

        let injuryLocBoxes = "";
        let injuries2 = document.getElementsByName('injuryLoc');
        for (let j = 0; j < injuries2.length; j++) {
            if (injuries2[j].checked) {
                injuryLocBoxes += injuries2[j].value + ", ";
            }
        }
        localStorage.setItem('injuryZone', injuryLocBoxes);
        if (data.injuryZoneOther) {
            localStorage.setItem('injuryZoneOther', data.injuryZoneOther);
        }

        //SITE CONDITIONS--------------------------------------------------------------------------------------------------
        let conditionBoxes = "";
        let sceneSurface = document.getElementsByName('sceneSurface');
        for (let k = 0; k < sceneSurface.length; k++) {
            if (sceneSurface[k].checked) {
                conditionBoxes += sceneSurface[k].value + ", ";
            }
        }
        localStorage.setItem('sceneSurface', conditionBoxes);

        let visBoxes = "";
        let sceneVis = document.getElementsByName('visibility');
        for (let l = 0; l < sceneVis.length; l++) {
            if (sceneVis[l].checked) {
                visBoxes += sceneVis[l].value + ", ";
            }
        }
        if (data.sceneSurfaceOther) {
            localStorage.setItem('sceneSurfaceOther', data.sceneSurfaceOther);
        }
        localStorage.setItem('sceneVisibility', visBoxes);

        if (data.temperatureCold.checked) {
            localStorage.setItem('temp', data.temperatureCold);
        } else if (data.temperatureMild.checked) {
            localStorage.setItem('temp', data.temperatureMild);
        } else if (data.temperatureWarm.checked) {
            localStorage.setItem('temp', data.temperatureWarm);
        }
        if (data.windCalm.checked) {
            localStorage.setItem('wind', data.windCalm);
        } else if (data.windMod.checked) {
            localStorage.setItem('wind', data.windMod);
        } else if (data.windHigh.checked) {
            localStorage.setItem('wind', data.windHigh);
        }

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
        let howArrive = document.getElementsByName('arrival');
        for (let i = 0; i < howArrive.length; i++) {
            if (howArrive[i].checked) {
                localStorage.setItem('arrive', howArrive[i].value);
                if (data.arrivalOther.checked) {
                    localStorage.setItem('arriveOther', data.arriveOther);
                }
            }
        }
        let howLeave = document.getElementsByName('leave');
        for (let i = 0; i < howLeave.length; i++) {
            if (howLeave[i].checked) {
                localStorage.setItem('leave', howLeave[i].value);
            }
        }
        let dest = document.getElementsByName('dest');
        for (let i = 0; i < dest.length; i++) {
            if (dest[i].checked) {
                localStorage.setItem('dest', dest[i].value);
                if (data.destOther.checked) {
                    localStorage.setItem('otherDest', data.otherDest);
                }
            }
        }

        //WITNESSESS----------------------------------------------------------------------------------------------------
        if (data.w0LastName) {
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
        localStorage.setItem('reportCompleter', data.reportCompleter_0);
        localStorage.setItem('dateComplete', data.dateComplete);

        //SIGNATURE-----------------------------------------------------------------------------------------------------
        localStorage.setItem('finalSig', data.finalSig);
        localStorage.setItem('sigLocation', document.getElementById("sigLocation").options[document.getElementById("sigLocation").selectedIndex].value);

        // SetSessionStorage.passData();

        return false;
    }

    static passData() {
        // https://stackoverflow.com/a/41854807
        let data = {};
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        data = JSON.stringify(data);
        fetch(document.url, {
            method: 'POST',
            body: data,
            headers: {
                'x-requested-with': 'fetch.0',
                'mode': 'no-cors'
            }
        }).then((response) => {
            console.log(response.text());
            return response.json();
        }).catch((errpr) => {
            // console.log(error);
        });

        return false;
    }
}