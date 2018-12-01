'use strict';

export default class ControlSignatures {
    constructor() {
        let canvas = document.querySelector('#sigCanvas');
        this.signature = new SignaturePad(canvas);
        this.handleSigSave();
        this.handleSigClear();
    }

    handleSigSave() {
        document.getElementById('sigSave').addEventListener(`click`, () => {
            let sig = this.signature.toDataURL('image/png');
            document.getElementById('finalSig').value = sig;
            this.performFetch(sig);
            //https://stackoverflow.com/questions/52383511/writing-a-png-thats-generated-from-canvas-using-todataurl-then-sent-via-xmlhttp
        });
    }

    handleSigClear() {
        document.getElementById('sigClear').addEventListener(`click`, () => {
            this.signature.clear();
        });
    }

    performFetch(signature) {
        fetch(document.url, {
            method: 'POST',
            body: signature,
            headers: {
                'x-requested-with': 'fetch.10',
                'mode': 'no-cors'
            }
        }).then((response) => {
            return response.text();
        }).catch((error) => {
            console.log(error);
        });
    }
}