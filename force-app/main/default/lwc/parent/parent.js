import { LightningElement ,api,track,wire} from 'lwc';

import getdata from '@salesforce/apex/pclass.getAllOrders';
import app from '@salesforce/apex/approv.submitForApproval';


export default class Parent extends LightningElement {
    @api objectApiName='Order';
    @api rid;
    @api ind;
    @track
    orders;
    @wire (getdata)
    getApexData({error,data}){
        if(data) {this.orders=data;}
        if(error){}
    }
    /*
    appfun(event){
        this.rid=event.target.value;
        console.log(this.rid);
        console.log(typeof(this.rid));
        app({'opp':event.target.value}).then(result=> {
            console.log(JSON.stringify(result))
        }).catch(error => {
            // display server exception in toast msg 
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            });
            this.dispatchEvent(event);
            // reset contacts var with null   
           // this.order = null;
        });
    }*/
    appfun(event){
        console.log('approval function triggered');
        this.ind=event.target.value;
        if(this.orders[this.ind].TotalAmount === 0) alert('please add products to your order first');
        else{
            console.log(this.orders[this.ind].Id);
        console.log(this.orders[this.ind].TotalAmount);
            this.rid=this.orders[this.ind].Id;
            console.log(this.rid);
        console.log(typeof(this.rid));
        app({'opp':this.rid}).then(result=> {
            console.log(JSON.stringify(result))
        }).catch(error => {
            console.log(JSON.stringify(error));
            console.log(error.body.message);
            
            console.log('error event');
            // display server exception in toast msg 
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            });
            this.dispatchEvent(event);
            // reset contacts var with null   
           // this.order = null;
        });
        }
    }

}