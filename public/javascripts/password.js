'use strict';

class password {
    constructor() {
        password.handlePassword();
    }

    static handlePassword() {
        document.getElementById("password").addEventListener("keyup", (event) => {
            if (event.key === `Enter`) {
                let pw = document.getElementById("password").value;
                password.performFetch(9, pw, (result) => {
					console.log(result);
                    if (result === `1`) {
                        window.open('http://pk-incidents.herokuapp.com/main.ejs', '_self', 'status=yes');
                    } else {
                        document.getElementById("password").value = ``;
                        alert(`INCORRECT Password!`);
                    }
                });
            }
        });
    }

    static performFetch(fetchNum, password, callback) {
        // https://stackoverflow.com/a/41854807
        fetch(document.url, {
            method: 'POST',
            body: password,
            headers: {
                'x-requested-with': `fetch.${fetchNum}`,
                'mode': 'no-cors'
            }
        }).then((response) => {
            return response.text();
        }).then((data) => {
            callback(data);
        }).catch((error) => {
            console.log(error);
        });
    }
}

window.addEventListener('load', () => {
    new password();
});