'use strict';

export default class ControlSignatures {
    constructor() {
        let canvas = document.querySelector('#sigCanvas');
        this.signature = new SignaturePad(canvas);
    }



}