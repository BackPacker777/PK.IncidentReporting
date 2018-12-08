"use strict";

import SetResultsSessionStorage from './SetResultsSessionStorage.js';

export default class ProcessArchives {
    constructor() {
        this.prepArchivesUX();
        this.handleReturnButton();
    }

    prepArchivesUX() {
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
        document.getElementById(`incidentData`).innerHTML = '';
        document.getElementById(`searchRow`).addEventListener('keypress', (evt) => {
            let key = evt.which;
            if (key === 13 || key === 169) {
                evt.preventDefault();
            }
        });
        let search = document.forms['mainForm'].elements['searchCriteria'];
        for (let i = 0; i < search.length; i++) {
            search[i].addEventListener("click", (event) => {
                event.stopImmediatePropagation();
                document.getElementById(`incidentData`).innerHTML = '';
                if (search[i].value === "date") {
                    document.getElementById("selectedArchivesButton").style.visibility = 'hidden';
                    document.getElementById("searchBlank").style.display = 'none';
                    document.getElementById("searchDateDiv").style.display = 'block';
                    document.getElementById("searchLastNameDiv").style.display = 'none';
                    document.getElementById("searchIncidentIDDiv").style.display = 'none';
                    document.getElementById("searchDateInput").addEventListener('focus', (event) => {
                        event.stopImmediatePropagation();
                        document.getElementById(`incidentData`).innerHTML = '';
                        this.handleSearchButton('date');
                    });
                } else if (search[i].value === "lastName") {
                    document.getElementById("selectedArchivesButton").style.visibility = 'hidden';
                    document.getElementById("searchBlank").style.display = 'none';
                    document.getElementById("searchLastNameDiv").style.display = 'block';
                    document.getElementById("searchDateDiv").style.display = 'none';
                    document.getElementById("searchIncidentIDDiv").style.display = 'none';
                    document.getElementById("searchLastNameInput").addEventListener('focus', (event) => {
                        event.stopImmediatePropagation(); //https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
                        document.getElementById(`incidentData`).innerHTML = '';
                        this.handleSearchButton('lastName');
                    });
                } else {
                    document.getElementById("selectedArchivesButton").style.visibility = 'hidden';
                    document.getElementById("searchBlank").style.display = 'none';
                    document.getElementById("searchIncidentIDDiv").style.display = 'block';
                    document.getElementById("searchLastNameDiv").style.display = 'none';
                    document.getElementById("searchDateDiv").style.display = 'none';
                    document.getElementById("searchIncidentIDInput").addEventListener('focus', (event) => {
                        event.stopImmediatePropagation();
                        document.getElementById(`incidentData`).innerHTML = '';
                        this.handleSearchButton('incidentID');
                    });
                }
            });
        }
    }

    handleSearchButton(search) {
        document.getElementById("searchDateInput").value = '';
        document.getElementById("searchIncidentIDInput").value = '';
        document.getElementById("searchLastNameInput").value = '';
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
            this.performFetch(1, searchFor);
            document.getElementById("searchButton").removeEventListener("click", removeMe);
            document.getElementById("searchButton").classList.add('disabled');
            document.getElementById("searchButton").disabled = true;
        });
    }

    displaySearchResults(data) {
        if (data.length > 0) {
            document.getElementById(`incidentData`).innerHTML += `<div class="row" id="IncidentHeaders">
                    <div class="small-1 columns"><strong>SELECT:</strong></div>
                    <div class="small-1 columns"><strong>Last:</strong></div>
                    <div class="small-1 columns"><strong>First:</strong></div>
                    <div class="small-1 columns"><strong>Date:</strong></div>
                    <div class="small-7 columns"><strong>Incident Description:</strong></div>
                    <div class="small-1 columns"><strong>Location:</strong></div>
                </div>`;
            for (let j = 0; j < data.length; j++) {
                document.getElementById(`incidentData`).innerHTML += `<div class="row">
                    <div class="small-1 columns text-center">
                        <input type="checkbox" name="archiveIncidents" id="archiveIncident.${data[j].incident_id}" value="${data[j].incident_id}">
                    </div>
                    <div class="small-1 columns">
                        ${data[j].lastName}
                    </div>
                    <div class="small-1 columns">
                        ${data[j].firstName}
                    </div>
                    <div class="small-1 columns">
                        ${data[j].date}
                    </div>
                    <div class="small-7 columns">
                        ${data[j].incidentDescription}
                    </div>
                    <div class="small-1 columns">
                        ${data[j].location}
                    </div>
                </div>`
            }
            document.getElementById("selectedArchivesButton").style.visibility = 'visible';
            this.handleSelectedArchivesButton(data);
        } else {
            document.getElementById('incidentData').innerHTML = `<br><div class="row" id="noDataDiv">
                    <div class="small-12 columns text-center">
                        <h1>! No Data !</h1>
                    </div>
                </div>`;
        }
    }

    handleSelectedArchivesButton(data) {
        document.getElementById("selectedArchivesButton").addEventListener("click", () => {
            let incidentBoxes = [];
            let archiveIncidents = document.getElementsByName('archiveIncidents');
            archiveIncidents.forEach((incident) => {
                if (incident.checked) {
                    incidentBoxes.push(incident.value);
                }
            });
            if (incidentBoxes.length > 0) {
                for (let j = 0; j < incidentBoxes.length; j++) {
                    for (let i = 0; i < data.length; i++) {
                        if (Number(data[i].patient_id) === Number(incidentBoxes[j])) {
                            if (data[i].finalSig) {
                                let sig = data[i].finalSig;
                                this.performFetch(10, sig);
                            }
                            new SetResultsSessionStorage(data[i]);
                        }
                    }
                    sessionStorage.clear();
                }
                incidentBoxes = [];
            } else {
                alert(`Nothing Selected`);
            }
        });
    }

    handleReturnButton() {
        document.getElementById("returnButton").addEventListener("click", () => {
            this.setDisplay('archives', 0);
        });
    }

    performFetch(whichFetch, criteria) {
        fetch(document.url, {
            method: 'POST',
            body: criteria,
            headers: {
                'x-requested-with': `fetch.${whichFetch}`,
                'mode': 'no-cors'
            }
        }).then((response) => {
            return response.text();
        }).then((data) => {
            if (whichFetch === 1) {
                this.displaySearchResults(JSON.parse(data));
            }
        }).catch((error) => {
            console.log(error);
        });
    }
}