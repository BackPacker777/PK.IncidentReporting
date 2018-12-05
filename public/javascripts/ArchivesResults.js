'use strict';

class ArchivesResults {
    constructor() {
        ArchivesResults.populateResults();
    }

    static populateResults() {
        //DATE & TIME-----------------------------------------------------------------------------------------------------------
        document.getElementById('day').innerText = localStorage.getItem('day');
        document.getElementById('date').innerText = localStorage.getItem('date');
        document.getElementById('incidentTime').innerText = localStorage.getItem('incidentTime');

        //LOCATION--------------------------------------------------------------------------------------------------------------
        if (localStorage.getItem('whichHill')) {
            document.getElementById('hill').checked = true;
            document.getElementById('location').innerText = localStorage.getItem('whichHill');
            if (localStorage.getItem('difficulty') === "1") {
                document.getElementById('easier').checked = true;
            } else if (localStorage.getItem('difficulty') === "2") {
                document.getElementById('moreDiff').checked = true;
            } else if (localStorage.getItem('difficulty') === "3") {
                document.getElementById('mostDiff').checked = true;
                if (localStorage.getItem('whichHill') === "Terrain Park") {
                    document.getElementById('freestyle').checked = true;
                }
            } else if (localStorage.getItem('difficulty') === "4") {
                document.getElementById('experts').checked = true;
            }
        } else if (localStorage.getItem('whichLift')) {
            document.getElementById('lift').checked = true;
            document.getElementById('location').innerText = localStorage.getItem('whichLift');
            document.getElementById('na').checked = true;
        } else {
            document.getElementById('premise').checked = true;
            document.getElementById('location').innerText = localStorage.getItem('location');
            document.getElementById('na').checked = true;
        }
        document.getElementById('specificLocation').innerText = localStorage.getItem('specificLocation');

        //INJURED PERSON--------------------------------------------------------------------------------------------------------
        document.getElementById('lastName').innerText = localStorage.getItem('lastName');
        document.getElementById('firstName').innerText = localStorage.getItem('firstName');
        if (localStorage.getItem('gender') === "Male") {
            document.getElementById('male').checked = true;
        } else {
            document.getElementById('female').checked = true;
        }
        document.getElementById('dob').innerText = localStorage.getItem('dob');
        document.getElementById('age').innerText = localStorage.getItem('age');
        document.getElementById('height').innerText = localStorage.getItem('height');
        document.getElementById('weight').innerText = localStorage.getItem('weight');
        document.getElementById('patientStreet').innerText = localStorage.getItem('patientStreet');
        document.getElementById('patientCity').innerText = localStorage.getItem('patientCity');
        if (localStorage.getItem('patientState')) {
            document.getElementById('patientState').innerText = localStorage.getItem('patientState').replace(/(\r\n|\n|\r)/gm, "");
        }
        document.getElementById('patientZip').innerText = localStorage.getItem('patientZip');
        document.getElementById('email').innerText = localStorage.getItem('email');
        document.getElementById('occupation').innerText = localStorage.getItem('occupation');
        document.getElementById('homePhoneNum').innerText = localStorage.getItem('homePhoneNum');
        document.getElementById('cellPhoneNum').innerText = localStorage.getItem('cellPhoneNum');

        //SKIING HISTORY--------------------------------------------------------------------------------------------------------
        if (localStorage.getItem('ability') === 'Beginner') {
            document.getElementById('beginner').checked = true;
        } else if (localStorage.getItem('ability') === 'Intermediate') {
            document.getElementById('intermediate').checked = true;
        } else if (localStorage.getItem('ability') === 'Expert') {
            document.getElementById('advanced').checked = true;
        } else {
            document.getElementById('abilityNA').checked = true;
        }

        if (localStorage.getItem('inLesson') === "Yes") {
            document.getElementById('inLesson').checked = true;
            document.getElementById('instYep').innerText = localStorage.getItem('instructor');
        } else {
            document.getElementById('lessonNA').checked = true;
        }

        if (localStorage.getItem('timesWhere') === 'Hill') {
            document.getElementById('numTimesTrail').checked = true;
            document.getElementById('trailLiftToday').checked = true;
            document.getElementById('timesToday').innerText = localStorage.getItem('numTimesToday');
            if (localStorage.getItem('numTimesPrior') >= 0) {
                document.getElementById('trailLiftPrior').checked = true;
                document.getElementById('timesPrior').innerText = localStorage.getItem('numTimesPrior');
            }
        } else if (localStorage.getItem('timesWhere') === 'Lift') {
            document.getElementById('numTimesLift').checked = true;
            document.getElementById('trailLiftToday').checked = true;
            document.getElementById('timesToday').innerText = localStorage.getItem('numTimesToday');
            if (localStorage.getItem('numTimesPrior') >= 0) {
                document.getElementById('trailLiftPrior').checked = true;
                document.getElementById('timesPrior').innerText = localStorage.getItem('numTimesPrior');
            }
        } else if (localStorage.getItem('timesWhere') === 'Other') {
            document.getElementById('timesOther').innerText = localStorage.getItem('setOther');
            document.getElementById('timesToday').innerText = localStorage.getItem('numTimesToday');
            if (localStorage.getItem('numTimesPrior') >= 0) {
                document.getElementById('trailLiftPrior').checked = true;
                document.getElementById('timesPrior').innerText = localStorage.getItem('numTimesPrior');
            }
        } else {
            document.getElementById('timesOther').innerText = 'N/A';
        }

        if (localStorage.getItem('removedBy') === 'Fall') {
            document.getElementById('equipRemoveFall').checked = true;
        } else if (localStorage.getItem('removedBy') === 'Injured') {
            document.getElementById('equipRemoveInjured').checked = true;
        } else if (localStorage.getItem('removedBy') === 'Patrol') {
            document.getElementById('equipRemovePatrol').checked = true;
        } else if (localStorage.getItem('removedBy') === 'Other') {
            document.getElementById('equipRemoveOther').checked = true;
        }

        //PATIENT HISTORY-------------------------------------------------------------------------------------------------------
        document.getElementById('priorInjury').innerText = localStorage.getItem('priorInjury');
        document.getElementById('yearInjured').innerText = localStorage.getItem('yearInjured');
        if (localStorage.getItem('hi') === 'Yes') {
            document.getElementById('insuranceYes').checked = true;
        } else {
            document.getElementById('insuranceNo').checked = true;
        }
        document.getElementById('meds').innerText = localStorage.getItem('medications');
        document.getElementById('ticketType').innerText = localStorage.getItem('ticketType');
        document.getElementById('group').innerText = localStorage.getItem('group');

        //EQUIPMENT-------------------------------------------------------------------------------------------------------------
        if (localStorage.getItem('equipType') === "Alpine") {
            document.getElementById('alpine').checked = true;
        }
        if (localStorage.getItem('equipType') === "Nordic") {
            document.getElementById('nordic').checked = true;
        }
        if (localStorage.getItem('equipType') === "Snowboard") {
            document.getElementById('snowboard').checked = true;
        }
        if (localStorage.getItem('equipType') === "Other") {
            document.getElementById('equipOther').checked = true;
            if (localStorage.getItem('otherEquip')) {
                document.getElementById('equipTypeOther').innerHTML = localStorage.getItem('otherEquip');
            }
        }
        if (localStorage.getItem('owner') === "Owned") {
            document.getElementById('owned').checked = true;
        }
        if (localStorage.getItem('owner') === "AreaRental") {
            document.getElementById('areaRental').checked = true;
            document.getElementById('skiNum').innerText = localStorage.getItem('skiNum');
            document.getElementById('bootNum').innerText = localStorage.getItem('bootNum');
            document.getElementById('shopName').innerText = localStorage.getItem('shopName');
            document.getElementById('shopStreet').innerText = localStorage.getItem('shopStreet');
            document.getElementById('shopCity').innerText = localStorage.getItem('shopCity');
            document.getElementById('shopState').innerText = localStorage.getItem('shopState');
            document.getElementById('shopZip').innerText = localStorage.getItem('shopZip');
        }
        if (localStorage.getItem('owner') === "OtherRental") {
            document.getElementById('otherRental').checked = true;
            document.getElementById('skiNum').innerText = localStorage.getItem('skiNum');
            document.getElementById('bootNum').innerText = localStorage.getItem('bootNum');
            document.getElementById('shopName').innerText = localStorage.getItem('shopName');
            document.getElementById('shopStreet').innerText = localStorage.getItem('shopStreet');
            document.getElementById('shopCity').innerText = localStorage.getItem('shopCity');
            document.getElementById('shopState').innerText = localStorage.getItem('shopState');
            document.getElementById('shopZip').innerText = localStorage.getItem('shopZip');
        }
        if (localStorage.getItem('owner') === "Borrowed") {
            document.getElementById('borrowed').checked = true;
        }
        if (localStorage.getItem('owner') === "Demo") {
            document.getElementById('demo').checked = true;
            document.getElementById('skiNum').innerText = localStorage.getItem('skiNum');
            document.getElementById('bootNum').innerText = localStorage.getItem('bootNum');
            document.getElementById('shopName').innerText = localStorage.getItem('shopName');
            document.getElementById('shopStreet').innerText = localStorage.getItem('shopStreet');
            document.getElementById('shopCity').innerText = localStorage.getItem('shopCity');
            document.getElementById('shopState').innerText = localStorage.getItem('shopState');
            document.getElementById('shopZip').innerText = localStorage.getItem('shopZip');
        }
        document.getElementById('bindingMake').innerText = localStorage.getItem('bindingMake');
        document.getElementById('bindingModel').innerText = localStorage.getItem('bindingModel');
        document.getElementById('leftDinToe').innerText = localStorage.getItem('leftDinToe');
        document.getElementById('leftDinHeel').innerText = localStorage.getItem('leftDinHeel');
        document.getElementById('rightDinToe').innerText = localStorage.getItem('rightDinToe');
        document.getElementById('rightDinHeel').innerText = localStorage.getItem('rightDinHeel');
        if (localStorage.getItem('helmet') === "Yes") {
            document.getElementById('helmetYes').checked = true;
            if (localStorage.getItem('helmetRental') === 'Yes') {
                document.getElementById('helmetRentalYes').checked = true;
                document.getElementById('helmetRentalNum').innerText = localStorage.getItem('helmetNum');
            } else if (localStorage.getItem('helmetRental') === 'No') {
                document.getElementById('helmetRentalNo').checked = true;
            }
        } else {
            document.getElementById('helmetNo').checked = true;
        }
        if (localStorage.getItem('video') === "Yes") {
            document.getElementById('videoYes').checked = true;
            document.getElementById('videoName').innerText = localStorage.getItem('videoName');
        } else {
            document.getElementById('videoNo').checked = true;
        }

        //INCIDENT DESCRIPTION--------------------------------------------------------------------------------------------------
        document.getElementById('incidentDescription').innerText = localStorage.getItem('incidentDescription');
        document.getElementById('statementTaker').innerText = localStorage.getItem('statementTaker');

        //PROBABLE INJURY-------------------------------------------------------------------------------------------------------
        if (localStorage.getItem('injuryType')) {
            if (localStorage.getItem('injuryType').match("Fracture")) {
                document.getElementById('fracture').checked = true;
            }
            if (localStorage.getItem('injuryType').match("Puncture")) {
                document.getElementById('puncture').checked = true;
            }
            if (localStorage.getItem('injuryType').match("Abrasion")) {
                document.getElementById('abrasion').checked = true;
            }
            if (localStorage.getItem('injuryType').match("Dislocation")) {
                document.getElementById('dislocation').checked = true;
            }
            if (localStorage.getItem('injuryType').match("Sprain")) {
                document.getElementById('sprain').checked = true;
            }
            if (localStorage.getItem('injuryType').match("Bruise")) {
                document.getElementById('bruise').checked = true;
            }
            if (localStorage.getItem('injuryType').match("Concussion")) {
                document.getElementById('concussion').checked = true;
            }
            if (localStorage.getItem('injuryType').match("Frostbite")) {
                document.getElementById('frostbite').checked = true;
            }
            if (localStorage.getItem('injuryType').match("Multiple")) {
                document.getElementById('multipleType').checked = true;
            }
            if (localStorage.getItem('injuryType').match("Other")) {
                document.getElementById('injOther').checked = true;
                if (localStorage.getItem('injuryTypeOther')) {
                    document.getElementById('injuryTypeOther').innerText = localStorage.getItem('injuryTypeOther');
                }
            }
        }

        //INJURY ZONE-----------------------------------------------------------------------------------------------------------
        if (localStorage.getItem('injuryZone')) {
            if (localStorage.getItem('injuryZone').match("Left")) {
                document.getElementById('left').checked = true;
            } else if (localStorage.getItem('injuryZone').match("Right")) {
                document.getElementById('right').checked = true;
            } else if (localStorage.getItem('injuryZone').match("Both")) {
                document.getElementById('both').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Multiple")) {
                document.getElementById('multipleZone').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("UpperLeg")) {
                document.getElementById('upperLeg').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Knee")) {
                document.getElementById('knee').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("LowerLeg")) {
                document.getElementById('lowerLeg').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Ankle")) {
                document.getElementById('ankle').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Foot")) {
                document.getElementById('foot').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Hip")) {
                document.getElementById('hip').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Abdomen")) {
                document.getElementById('abdomen').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Chest")) {
                document.getElementById('chest').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Back")) {
                document.getElementById('back').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Neck")) {
                document.getElementById('neck').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Shoulder")) {
                document.getElementById('shoulder').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Arm")) {
                document.getElementById('arm').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Wrist")) {
                document.getElementById('wrist').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Hand")) {
                document.getElementById('hand').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Thumb")) {
                document.getElementById('thumb').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Head")) {
                document.getElementById('head').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Face")) {
                document.getElementById('face').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Eye")) {
                document.getElementById('eye').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Nose")) {
                document.getElementById('nose').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Mouth")) {
                document.getElementById('mouth').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Teeth")) {
                document.getElementById('teeth').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Internal")) {
                document.getElementById('internal').checked = true;
            }
            if (localStorage.getItem('injuryZone').match("Other")) {
                document.getElementById('zoneOther').checked = true;
                if (localStorage.getItem('injuryZoneOther')) {
                    document.getElementById('injuryZoneOther').innerText = localStorage.getItem('injuryZoneOther');
                }
            }
        }

        //FIRST AID RENDERED----------------------------------------------------------------------------------------------------
        document.getElementById('hillFirstAid').innerText = localStorage.getItem('hillFirstAid');
        document.getElementById('patrolRoomAid').innerText = localStorage.getItem('patrolRoomAid');

        //PATROLLERS------------------------------------------------------------------------------------------------------------
        if (localStorage.getItem('scenePatrollers_0')) {
            document.getElementById('scenePatrollers').innerText = localStorage.getItem('scenePatrollers_0');
            let count = 1;
            while (count > 0) {
                if (localStorage.getItem(`scenePatrollers_${count}`)) {
                    document.getElementById('scenePatrollers').innerText += (`, ` + localStorage.getItem(`scenePatrollers_${count}`));
                    count++;
                } else {
                    break;
                }
            }
        }
        if (localStorage.getItem('transportPatrollers_0')) {
            document.getElementById('transportPatrollers').innerText = localStorage.getItem('transportPatrollers_0');
            let count = 1;
            while (count > 0) {
                if (localStorage.getItem(`transportPatrollers_${count}`)) {
                    document.getElementById('transportPatrollers').innerText += (`, ` + localStorage.getItem(`transportPatrollers_${count}`));
                    count++;
                } else {
                    break;
                }
            }
        }
        if (localStorage.getItem('aidPatrollers_0')) {
            document.getElementById('aidPatrollers').innerText = localStorage.getItem('aidPatrollers_0');
            let count = 1;
            while (count > 0) {
                if (localStorage.getItem(`aidPatrollers_${count}`)) {
                    document.getElementById('aidPatrollers').innerText += (`, ` + localStorage.getItem(`aidPatrollers_${count}`));
                    count++;
                } else {
                    break;
                }
            }
        }

        //TRANSPORTATION & DESTINATION------------------------------------------------------------------------------------------
        if (localStorage.getItem('arrive') === "SkiPatrol") {
            document.getElementById('patrol').checked = true;
        }
        if (localStorage.getItem('arrive') === "WalkIn") {
            document.getElementById('walkIn').checked = true;
        }
        if (localStorage.getItem('arrive') === "Other") {
            document.getElementById('arriveOther').checked = true;
            if (localStorage.getItem('arriveOther')) {
                document.getElementById('otherArrive').innerText = localStorage.getItem('arriveOther');
            }
        }
        if (localStorage.getItem('leave') === "Ambulance") {
            document.getElementById('ambulance').checked = true;
        }
        if (localStorage.getItem('leave') === "Car") {
            document.getElementById('car').checked = true;
        }
        if (localStorage.getItem('leave') === "Walk") {
            document.getElementById('walkOut').checked = true;
        }
        if (localStorage.getItem('dest') === "Home") {
            document.getElementById('home').checked = true;
        }
        if (localStorage.getItem('dest') === "Lodge") {
            document.getElementById('lodge').checked = true;
        }
        if (localStorage.getItem('dest') === "ReturnSkiing") {
            document.getElementById('returnSki').checked = true;
        }
        if (localStorage.getItem('dest') === "Other") {
            document.getElementById('destOther').checked = true;
            if (localStorage.getItem('otherDest')) {
                document.getElementById('otherDest').innerText = localStorage.getItem('otherDest');
            }
        }

        //SITE CONDITIONS-------------------------------------------------------------------------------------------------------
        if (localStorage.getItem('sceneSurface')) {
            if (localStorage.getItem('sceneSurface').match("powder,")) {
                document.getElementById('powder').checked = true;
            }
            if (localStorage.getItem('sceneSurface').match("packed,")) {
                document.getElementById('packedPowder').checked = true;
            }
            if (localStorage.getItem('sceneSurface').match("hard,")) {
                document.getElementById('hardPacked').checked = true;
            }
            if (localStorage.getItem('sceneSurface').match("variable,")) {
                document.getElementById('variable').checked = true;
            }
            if (localStorage.getItem('sceneSurface').match("corn,")) {
                document.getElementById('corn').checked = true;
            }
            if (localStorage.getItem('sceneSurface').match("granular,")) {
                document.getElementById('loose').checked = true;
            }
            if (localStorage.getItem('sceneSurface').match("wet,")) {
                document.getElementById('wet').checked = true;
            }
            if (localStorage.getItem('sceneSurface').match("other")) {
                document.getElementById('other').checked = true;
                if (localStorage.getItem('sceneSurfaceOther')) {
                    document.getElementById('surfaceConditionsOther').innerText = localStorage.getItem('sceneSurfaceOther');
                }
            }
        }

        if (localStorage.getItem('sceneVisibility')) {
            if (localStorage.getItem('sceneVisibility').match("Clear")) {
                document.getElementById('clear').checked = true;
            }
            if (localStorage.getItem('sceneVisibility').match("Overcast")) {
                document.getElementById('overcast').checked = true;
            }
            if (localStorage.getItem('sceneVisibility').match("Fog")) {
                document.getElementById('fog').checked = true;
            }
            if (localStorage.getItem('sceneVisibility').match("Snowing")) {
                document.getElementById('snowing').checked = true;
            }
            if (localStorage.getItem('sceneVisibility').match("Raining")) {
                document.getElementById('raining').checked = true;
            }
            if (localStorage.getItem('sceneVisibility').match("Snowmaking")) {
                document.getElementById('snowmaking').checked = true;
            }
        }

        if (localStorage.getItem('temp')) {
            if (localStorage.getItem('temp') === "Below0") {
                document.getElementById('below0').checked = true;
            } else if (localStorage.getItem('temp') === "0-32") {
                document.getElementById('zero32').checked = true;
            } else if (localStorage.getItem('temp') === "above32") {
                document.getElementById('above32').checked = true;
            }
        }

        if (localStorage.getItem('wind')) {
            if (localStorage.getItem('wind') === "Calm") {
                document.getElementById('calm').checked = true;
            } else if (localStorage.getItem('wind') === "Moderate") {
                document.getElementById('moderate').checked = true;
            } else if (localStorage.getItem('wind') === "High") {
                document.getElementById('high').checked = true;
            }
        }

        //WITNESSES---------------------------------------------------------------------------------------------------------
        if (localStorage.getItem('w0Name')) {
            let count = 0;
            while (count >= 0) {
                if (localStorage.getItem(`w${count}Name`)) {
                    document.getElementById('witnesses').innerText += (
                        `Witness ${count + 1}: `
                        + localStorage.getItem(`w${count}Name`)
                        + `,   ` + localStorage.getItem(`w${count}Street`)
                        + `,   ` + localStorage.getItem(`w${count}CityStateZip`)
                        + `; Home Phone: ` + localStorage.getItem(`w${count}HomePhoneNum`)
                        + `, Cell Phone: ` + localStorage.getItem(`w${count}CellPhoneNum`)
                        + `\nWitness ${count + 1} Statement: ` + localStorage.getItem(`w${count}Statement`)
                        + (`\n`)
                    );
                    count++;
                } else {
                    break;
                }
            }
        } else {
            document.getElementById('noWitness').checked = true;
        }

        //REPORT COMPLETER--------------------------------------------------------------------------------------------------
        document.getElementById('reportCompleter').innerText = localStorage.getItem('reportCompleter');
        document.getElementById('dateComplete').innerText = localStorage.getItem('dateComplete');

        //SIGNATURE---------------------------------------------------------------------------------------------------------
        let sigLocation;
        if (localStorage.getItem('sigLocation')) {
            sigLocation = localStorage.getItem('sigLocation');
        } else {
            sigLocation = 'sigInjured';
        }
        document.getElementById(sigLocation).style.backgroundImage = 'url("/public/images/signature.png")';
    }
}

window.addEventListener('load', () => {
    new ArchivesResults();
});