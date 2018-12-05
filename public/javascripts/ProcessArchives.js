"use strict";

import SetResultsLocalStorage from './SetResultsLocalStorage.js';

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
                    // console.log(data[i][j]);
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
            document.getElementById('incidentData').innerHTML = `<br><div class="row" id="noDataDiv">
                    <div class="small-12 columns text-center">
                        <h1>! No Data !</h1>
                    </div>
                </div>`;
        }
    }

    handleArchivesCheckboxes(data) {
        let archiveIncidents = document.getElementsByName('archiveIncidents');
        document.getElementById("selectedArchivesButton").style.visibility = 'visible';
        document.getElementById("selectedArchivesButton").classList.add('disabled');
        document.getElementById("selectedArchivesButton").disabled = true;
        let incidentChecked = false;
        archiveIncidents.forEach((incident) => {
            incident.addEventListener('click', () => { //https://stackoverflow.com/a/40956816/466246
                if (incident.checked) {
                    incidentChecked = true;
                }
                if (incidentChecked) {
                    document.getElementById("selectedArchivesButton").classList.remove('disabled');
                    document.getElementById("selectedArchivesButton").disabled = false;
                    this.handleSelectedArchivesButton(data);
                }
            });
        });
    }

    handleSelectedArchivesButton(data) {
        let incidentBoxes = [];
        localStorage.clear();
        let archiveIncidents = document.getElementsByName('archiveIncidents');
        archiveIncidents.forEach((incident) => {
            if (incident.checked) {
                incidentBoxes.push(incident.value);
            }
        });
        console.log(data.length);
        console.log(data[0].length);
        if (incidentBoxes) {
            document.getElementById("selectedArchivesButton").addEventListener("click", () => {
                for (let i = 0; i < data[0][i].length; i++) {
                    if (Number(data[0][1].incident_id) === Number(incidentBoxes[i])) {
                        console.log(data[0][i]);
                    }
                }

                // for (let j = 0; j < data[i].length; j++) {
                //     if (Number(data[i][j].incident_id) === Number(incidentBoxes[j])) {
                //         console.log(data[i][j]);
                //     }
                // }


                // for (let i = 0; i < incidentBoxes.length; i++) {
                //     console.log(data[i]);
                //     for (let j = 0; j < data[i].length; j++) {
                //         if (Number(data[i][j].incident_id) === Number(incidentBoxes[i])) {
                //             console.log(data[i][j].incident_id);
                //             // new SetResultsLocalStorage(incidentBoxes[i], data);
                //             break;
                //         }
                //     }
                // }
                document.getElementById("selectedArchivesButton").classList.add('disabled');
                document.getElementById("selectedArchivesButton").disabled = true;
                document.getElementById("selectedArchivesButton").style.visibility = 'hidden';
                incidentBoxes = [];
            }, {once: true});
        } else {
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