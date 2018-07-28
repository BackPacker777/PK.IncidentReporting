//   @todo

'use strict';
import EventHandler from './EventHandler.js';

class main {
    constructor() {
        let date = new Date();
        this.date = date;
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();
        this.year = this.date.getFullYear();
        this.weekday = this.date.getDay();
        this.fullDate = `${this.month}/${this.day}/${this.year}`;
        this.populateDate();
        this.eventHandler = new EventHandler(this.year, this.month, this.day);
        this.prepApp();
    }

    prepApp() {
        document.getElementById('noPrint').style.display = 'none';
        /*
        document.getElementById('personalInfo').style.display = 'none';
        document.getElementById('patientHistory').style.display = 'none';
        document.getElementById('locations').style.display = 'none';
        document.getElementById('lifts').style.display = 'none';
        document.getElementById('hills').style.display = 'none';
        document.getElementById('history').style.display = 'none';
        document.getElementById('equipment').style.display = 'none';
        document.getElementById('incidentDesc').style.display = 'none';
        document.getElementById('conditions').style.display = 'none';
        document.getElementById('injury').style.display = 'none';
        document.getElementById('injuryZone').style.display = 'none';
        document.getElementById('firstAid').style.display = 'none';
        document.getElementById('patrollers').style.display = 'block';
        document.getElementById('transportDestination').style.display = 'none';
        document.getElementById('witness').style.display = 'block';
        document.getElementById('completer').style.display = 'block';
        */
        main.setRequired();
    }

    static setRequired() {
        let required = document.getElementById('mainForm').querySelectorAll('[required]');
        for (let element of required) {
            element.style.backgroundColor = 'yellow';
        }
    }

    populateDate() {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        document.getElementById('day').value = days[this.weekday];
        document.getElementById('date').value = this.fullDate;
    }
}

window.addEventListener('load', () => {
    sessionStorage.clear();
    new main();
});