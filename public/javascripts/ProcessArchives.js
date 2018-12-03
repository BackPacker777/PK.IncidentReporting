"use strict";

import SetResultsLocalStorage from './SetResultsLocalStorage.js';

export default class ProcessArchives {
    constructor() {
        this.handleArchivesButton();
        this.handleReturnButton();
        document.getElementById("selectedArchivesButton").style.display = 'none';
    }

    handleArchivesButton() {
        const PASS = '7778';
        document.getElementById("archivesButton").addEventListener("click", () => {
            let password = prompt(`PASSWORD:`);
            if (password === PASS) {
                this.setDisplay('archives', 1);
                document.getElementById("searchDateDiv").style.display = 'none';
                document.getElementById("searchLastNameDiv").style.display = 'none';
                document.getElementById("searchIncidentIDDiv").style.display = 'none';
                this.handleArchiveSearching();
            } else {
                alert(`Invalid password!`);
            }
        });
    }

    handleArchiveSearching() {
        let search = document.forms['mainForm'].elements['searchCriteria'];
        for (let i = 0; i < search.length; i++) {
            search[i].addEventListener("click", () => {
                if (search[i].value === "date") {
                    document.getElementById("searchDateDiv").style.display = 'block';
                    document.getElementById("searchLastNameDiv").style.display = 'none';
                    document.getElementById("searchIncidentIDDiv").style.display = 'none';
                    document.getElementById("searchDateInput").addEventListener('blur', () => {
                        this.handleSearchButton('date');
                    });
                } else if (search[i].value === "lastName") {
                    document.getElementById("searchLastNameDiv").style.display = 'block';
                    document.getElementById("searchDateDiv").style.display = 'none';
                    document.getElementById("searchIncidentIDDiv").style.display = 'none';
                    document.getElementById("searchLastNameInput").addEventListener('blur', () => {
                        this.handleSearchButton('lastName');
                    });
                } else {
                    document.getElementById("searchIncidentIDDiv").style.display = 'block';
                    document.getElementById("searchLastNameDiv").style.display = 'none';
                    document.getElementById("searchDateDiv").style.display = 'none';
                    document.getElementById("searchIncidentIDInput").addEventListener('blur', () => {
                        this.handleSearchButton('incidentID');
                    });
                }
            });
        }
    }

    displaySearchResults(data) {
        data = JSON.parse(data);
        if (data[0]. length > 0) {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    // console.log(data[i][j]);
                    document.getElementById(`incidentData`).innerHTML += `<br><input type="checkbox" name="archiveIncident" value="${data[i][j].incident_id}"> &nbsp;&nbsp; | &nbsp;&nbsp; <strong>Last Name:</strong> ${data[i][j].lastName} &nbsp;&nbsp; <strong>First Name:</strong> ${data[i][j].firstName} &nbsp;&nbsp; <strong>Date:</strong> ${data[i][j].date} &nbsp;&nbsp; <strong>Incident Description:</strong> ${data[i][j].incidentDescription} &nbsp;&nbsp; <strong>Incident Location:</strong> ${data[i][j].location}`;
                }
            }
            document.getElementById("selectedArchivesButton").style.display = 'block';
            this.handleSelectedArchivesButton(data);
        } else {
            document.getElementById('incidentData').innerHTML = `<br><br><h1>! No Data !</h1>`;
        }
    }

    handleReturnButton() {
        document.getElementById("returnButton").addEventListener("click", () => {
            this.setDisplay('archives', 0);
        });
    }

    handleSearchButton(search) {
        let searchFor;
        let removeMe;
        document.getElementById("searchButton").addEventListener("click", removeMe = () => {
            if (search === 'date') {
                searchFor = ['date', document.getElementById("searchDateInput").value];
            } else if (search === 'lastName') {
                searchFor = ['lastName', document.getElementById("searchLastNameInput").value];
            } else {
                searchFor = ['incidentID', document.getElementById("searchIncidentIDInput").value];
            }
            this.performFetch(searchFor);
            document.getElementById('searchButton').removeEventListener("click", removeMe);
        });
    }

    setDisplay(whichDiv, visibility) {
        let divs = ['topMast','topStuff','personalInfo','patientHistory','locations','lifts','hills','history'
            ,'equipment','incidentDesc','conditions','injury','injuryZone','firstAid','patrollers','transportDestination'
            ,'witness','completers','bottomStuff','archives'];
        for (let i = 0; i < divs.length; i++) {
            if (visibility === 0) {
                if (divs[i] !== whichDiv) {
                    document.getElementById(divs[i]).style.display = 'block';
                }
                else {
                    document.getElementById(divs[i]).style.display = 'none';
                }
            } else {
                if (divs[i] !== whichDiv) {
                    document.getElementById(divs[i]).style.display = 'none';
                }
                else {
                    document.getElementById(divs[i]).style.display = 'block';
                }
            }
        }
    }

    handleSelectedArchivesButton(data) {
        let incidentBoxes = [];
        let archiveIncidents = document.getElementsByName('archiveIncident');
        document.getElementById("selectedArchivesButton").addEventListener("click", () => {
            for (let i = 0; i < archiveIncidents.length; i++) {
                if (archiveIncidents[i].checked) {
                    incidentBoxes.push(archiveIncidents[i].value);
                }
            }
            for (let i = 0; i < incidentBoxes.length; i++) {
                new SetResultsLocalStorage(incidentBoxes[i], data);
            }
        });
    }

    performFetch(criteria) {
        fetch(document.url, {
            method: 'POST',
            body: criteria,
            headers: {
                'x-requested-with': 'fetch.1',
                'mode': 'no-cors'
            }
        }).then((response) => {
            return response.text();
        }).then((data) => {
            this.displaySearchResults(data);
        }).catch((error) => {
            console.log(error);
        });
    }

}