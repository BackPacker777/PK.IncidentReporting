"use strict";

export default class ProcessArchives {
    constructor() {
        this.handleArchivesButton();
        this.handleReturnButton();
    }

    handleArchivesButton() {
        const PASS = 'skinubs';
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
                        let date = [];
                        date = document.getElementById("searchDateInput").value.split(/-/);
                        if (Number(date[2]) < 10) {
                            let index = 1;
                            date[2] = date[2].charAt(index);
                        }
                        let finalDate = `${date[1]}/${date[2]}/${date[0]}`;
                        document.getElementById('actualDate').value = finalDate;
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
        if (data.length > 0) {
            data = JSON.parse(data);
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    // console.log(data[i][j]);
                    document.getElementById(`incidentData`).innerHTML = `<p><br><strong>Last Name:</strong> ${data[i][j].lastName} &nbsp;&nbsp; <strong>First Name:</strong> ${data[i][j].firstName} &nbsp;&nbsp; <strong>Date:</strong> ${data[i][j].date} &nbsp;&nbsp; <strong>Incident Description:</strong> ${data[i][j].incidentDescription}</p>\n`;
                }
            }
        } else {
            document.getElementById('incidentData').innerHTML = `<br><br><h1>Incident not found.</h1>`;
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



