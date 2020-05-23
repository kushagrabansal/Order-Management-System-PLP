import { LightningElement, track, wire, api } from "lwc";
import getdata from "@salesforce/apex/cclass.getAllOrderProducts";
import dedata  from "@salesforce/apex/cclass.delProduct";
export default class ChildO extends LightningElement {
    @api getIdFromParent;
    @api objectApiName;
    @track orderprods;
    @wire(getdata, { recordId: "$getIdFromParent" })
    getApexData({ error, data }) {
      if (data) { this.orderprods = data; console.log(orderprods);}
      if (error) { console.log(error);}
    }

    delData(event) {
      this.indd = event.target.value;
     dedata({idid:this.orderprods[this.indd].Id});
       location.reload();
    }
   
    
}