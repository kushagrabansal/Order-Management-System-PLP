import { LightningElement,wire,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import ORDER_OBJECT from '@salesforce/schema/Order';
import ACCOUNTID_FIELD from '@salesforce/schema/Order.AccountId';
import EffectiveDate from '@salesforce/schema/Order.EffectiveDate';
import ContractId from '@salesforce/schema/Order.ContractId';
import Status from '@salesforce/schema/Order.Status';

import getdata from '@salesforce/apex/getOrders.getAllOrders';

export default class CrudComp extends NavigationMixin(LightningElement) {

    orderObject = ORDER_OBJECT;
    myFields = [ACCOUNTID_FIELD,EffectiveDate,ContractId,Status];
    showModal = false;
    index=0;
    rid='k';
    @track
    orders;
    @wire (getdata)
    getApexData({error,data}){
        if(data) {
            this.orders=data;        
            // console.log(orders);            
        }
        if(error){
            console.log('Error in fetching data'+error);
        }
    }
    handleAccountCreated(){
        
    }
    fun1(){
        this.showModal=true;
    }
    navigateToRecordViewPage(event) {
        console.log(event.target.value);
        console.log(this.orders[event.target.value].Id);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.orders[event.target.value].Id,
               actionName: 'view'
            }
        });
        
    }
    

}