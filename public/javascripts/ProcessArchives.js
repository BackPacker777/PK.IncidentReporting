"use strict";

import SetResultsLocalStorage from './SetResultsLocalStorage.js';

export default class ProcessArchives {
    constructor() {
        this.handleArchivesButton();
        this.handleReturnButton();
    }

    handleArchivesButton() {
        const PASS = '7778';
        document.getElementById("archivesButton").addEventListener("click", () => {
            let password = prompt(`PASSWORD:`);
            if (password === PASS) {
                this.setDisplay('archives', 1);
                document.getElementById(`incidentData`).innerHTML = '';
                document.getElementById("selectedArchivesButton").style.visibility = 'hidden';
                document.getElementById("searchButton").classList.add('disabled');
                document.getElementById("searchButton").disabled = true;
                document.getElementById("searchBlank").style.visibility = 'hidden';
                document.getElementById("searchDateDiv").style.display = 'none';
                document.getElementById("searchLastNameDiv").style.display = 'none';
                document.getElementById("searchIncidentIDDiv").style.display = 'none';
                this.handleArchiveSearching();
            } else {
                alert(`Invalid password!`);
            }
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

    handleArchiveSearching() {
        let search = document.forms['mainForm'].elements['searchCriteria'];
        for (let i = 0; i < search.length; i++) {
            search[i].addEventListener("click", () => {
                document.getElementById(`incidentData`).innerHTML = '';
                if (search[i].value === "date") {
                    document.getElementById("selectedArchivesButton").style.visibility = 'hidden';
                    document.getElementById("searchBlank").style.display = 'none';
                    document.getElementById("searchDateDiv").style.display = 'block';
                    document.getElementById("searchLastNameDiv").style.display = 'none';
                    document.getElementById("searchIncidentIDDiv").style.display = 'none';
                    document.getElementById("searchDateInput").addEventListener('keyup', () => {
                        // document.getElementById('searchButton').style.display = 'block';
                        this.handleSearchButton('date');
                    });
                } else if (search[i].value === "lastName") {
                    document.getElementById("selectedArchivesButton").style.visibility = 'hidden';
                    document.getElementById("searchBlank").style.display = 'none';
                    document.getElementById("searchLastNameDiv").style.display = 'block';
                    document.getElementById("searchDateDiv").style.display = 'none';
                    document.getElementById("searchIncidentIDDiv").style.display = 'none';
                    document.getElementById("searchLastNameInput").addEventListener('keyup', () => {
                        // document.getElementById('searchButton').style.display = 'block';
                        this.handleSearchButton('lastName');
                    });
                } else {
                    document.getElementById("selectedArchivesButton").style.visibility = 'hidden';
                    document.getElementById("searchBlank").style.display = 'none';
                    document.getElementById("searchIncidentIDDiv").style.display = 'block';
                    document.getElementById("searchLastNameDiv").style.display = 'none';
                    document.getElementById("searchDateDiv").style.display = 'none';
                    document.getElementById("searchIncidentIDInput").addEventListener('keyup', () => {
                        // document.getElementById('searchButton').style.display = 'block';
                        this.handleSearchButton('incidentID');
                    });
                }
            });
        }
    }

    handleSearchButton(search) {
        document.getElementById("searchButton").classList.remove('disabled');
        document.getElementById("searchButton").disabled = false;
        let searchFor = [];
        let removeMe;
        document.getElementById("searchButton").addEventListener("click", removeMe = () => {
            if (search === 'date') {
                searchFor = ['date', document.getElementById("searchDateInput").value];
            } else if (search === 'lastName') {
                let finalName = document.getElementById("searchLastNameInput").value.toLowerCase();
                searchFor = ['lastName', finalName];
            } else {
                searchFor = ['incidentID', document.getElementById("searchIncidentIDInput").value];
            }
            this.performFetch(searchFor);
            searchFor = [];
            document.getElementById("searchButton").removeEventListener("click", removeMe);
            document.getElementById("searchButton").classList.add('disabled');
            document.getElementById("searchButton").disabled = true;
        });
    }

    displaySearchResults(data) {
        data = JSON.parse(data);
        if (data[0].length > 0) {
            document.getElementById(`incidentData`).innerHTML += `<div class="row" id="IncidentHeaders">
                    <div class="small-1 columns"><strong>SELECT:</strong></div>
                    <div class="small-1 columns"><strong>Last:</strong></div>
                    <div class="small-1 columns"><strong>First:</strong></div>
                    <div class="small-1 columns"><strong>Date:</strong></div>
                    <div class="small-7 columns"><strong>Incident Description:</strong></div>
                    <div class="small-1 columns"><strong>Location:</strong></div>
                </div>`;
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    console.log(data[i][j]);
                    document.getElementById(`incidentData`).innerHTML += `<div class="row">
                        <div class="small-1 columns text-center">
                            <input type="checkbox" name="archiveIncidents" id="archiveIncident.${data[i][j].incident_id}" value="${data[i][j].incident_id}">
                        </div>
                        <div class="small-1 columns">
                            ${data[i][j].lastName}
                        </div>
                        <div class="small-1 columns">
                            ${data[i][j].firstName}
                        </div>
                        <div class="small-1 columns">
                            ${data[i][j].date}
                        </div>
                        <div class="small-7 columns">
                            ${data[i][j].incidentDescription}
                        </div>
                        <div class="small-1 columns">
                            ${data[i][j].location}
                        </div>
                    </div>`
                }
            }
            this.handleArchivesCheckboxes(data);
        } else {
            document.getElementById('incidentData').innerHTML = `<br><br><h1>! No Data !</h1>`;
        }
    }

    handleArchivesCheckboxes(data) {
        let incidentBoxes = [];
        let archiveIncidents = document.getElementsByName('archiveIncidents');
        document.getElementById("selectedArchivesButton").style.visibility = 'visible';
        document.getElementById("selectedArchivesButton").classList.add('disabled');
        document.getElementById("selectedArchivesButton").disabled = true;
        for (let i = 0; i < archiveIncidents.length; i++) {
            let occurrence = i + 1;
            document.getElementById(`archiveIncident.${occurrence}`).addEventListener("click", () => {
                if (document.getElementById(`archiveIncident.${occurrence}`).checked) {
                    incidentBoxes.push(document.getElementById(`archiveIncident.${occurrence}`).value);
                    document.getElementById("selectedArchivesButton").style.visibility = 'visible';
                    document.getElementById("selectedArchivesButton").classList.remove('disabled');
                    document.getElementById("selectedArchivesButton").disabled = false;
                } else {
                    for (let incident of archiveIncidents) {
                        if (incident === document.getElementById(`archiveIncident.${occurrence}`).value) {
                            incidentBoxes.splice(incident, 1);
                            break;
                        }
                    }
                }
                if (archiveIncidents.length < 1) {
                    document.getElementById("selectedArchivesButton").classList.add('disabled');
                    document.getElementById("selectedArchivesButton").disabled = true;
                    this.handleSelectedArchivesButton();
                } else {
                    this.handleSelectedArchivesButton(incidentBoxes, data);
                }
            });
        }
    }

    handleSelectedArchivesButton(incidentBoxes, data) {
        console.log(incidentBoxes);
        console.log(data);
        let removeMe;
        if (incidentBoxes) {
            document.getElementById("selectedArchivesButton").addEventListener("click", removeMe = () => {
                for (let i = 0; i < incidentBoxes.length; i++) {
                    new SetResultsLocalStorage(incidentBoxes[i], data);
                }
                document.getElementById("selectedArchivesButton").removeEventListener("click", removeMe);
                document.getElementById("selectedArchivesButton").classList.add('disabled');
                document.getElementById("selectedArchivesButton").disabled = true;
                document.getElementById("selectedArchivesButton").style.visibility = 'hidden';
                incidentBoxes = [];
            });
        } else {
            document.getElementById("selectedArchivesButton").removeEventListener("click", removeMe);
            document.getElementById("selectedArchivesButton").classList.add('disabled');
            document.getElementById("selectedArchivesButton").disabled = true;
            document.getElementById("selectedArchivesButton").style.visibility = 'hidden';
        }
    }

    handleReturnButton() {
        document.getElementById("returnButton").addEventListener("click", () => {
            this.setDisplay('archives', 0);
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