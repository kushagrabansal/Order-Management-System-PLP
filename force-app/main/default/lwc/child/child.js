import { LightningElement,api } from 'lwc';

export default class Child extends LightningElement {
    @api x;
    @api y;
    cc= a+b;
}