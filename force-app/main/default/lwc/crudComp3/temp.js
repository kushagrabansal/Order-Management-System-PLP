import { LightningElement, track, wire, api } from "lwc";
import getdata from "@salesforce/apex/getOrderProducts.getAllOrderProducts";

 export default class CrudComp3 extends LightningElement {
   @api recordId;
   @api searchKey_name = "";
   @api searchKey_brand = "";
   @track orderprods;
   @track temp;
   @wire(getdata,{recordId:'$recordId',searchKey_name:'$searchKey_name',searchKey_brand:'$searchKey_brand'})
   wiredContacts({ error, data }) {
       if (data) {
           this.orderprods = data;
           this.error = undefined;
           console.log("hi");
           console.log(JSON.stringify(data));
           this.temp=JSON.stringify(data)
           console.log("hi");
           console.log(this.temp);
           
       } else if (error) {
           this.error = error;
           this.products = undefined;
           console.log("not working");
           console.log(error);
       }
   }
   
   handleKeyNameChange(event) {
    // Debouncing this method: Do not update the reactive property as long as this function is
    // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
    window.clearTimeout(this.delayTimeout);
    const searchKey_name = event.target.value;
    console.log("Name => "+searchKey_name);
    this.delayTimeout = setTimeout(() => {
        this.searchKey_name = searchKey_name;
    }, DELAY);

}

handleKeyBrandChange(event) {
    // Debouncing this method: Do not update the reactive property as long as this function is
    // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
    window.clearTimeout(this.delayTimeout);
    const searchKey_brand = event.target.value;
    console.log("Brand => "+searchKey_brand);
    this.delayTimeout = setTimeout(() => {
        this.searchKey_brand = searchKey_brand;
    }, DELAY);

}
}