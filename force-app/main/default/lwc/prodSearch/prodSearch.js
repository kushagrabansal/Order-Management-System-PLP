import { LightningElement, wire, api } from 'lwc';
import getProducts from '@salesforce/apex/OrdersT.getProducts';
import getUnitPrice from '@salesforce/apex/OrdersT.getUnitPrice';
import getOrdIdNum from '@salesforce/apex/OrdersT.getOrdId';
import getOrdItemss from '@salesforce/apex/OrdersT.getOrdItems';
import fff from '@salesforce/apex/OrdersT.ff';
import ggg from '@salesforce/apex/OrdersT.gg';
const DELAY = 500;
export default class ProdSearch extends LightningElement {

    @api searchKey_name = "";
    @api searchKey_brand = "";
    @api product_id;
    @api unitprice;
    @api pricebookentryid;
    @api orderList;
    @api orderItemList;
    @api pb1;
    @api pb2;
    @api ordId;
    @api ordid;
    @api ordid2;
    products;
    isshow = false;
    isShowAdd = false;
    isShowAdd0 = false;
    isShowAdd1 = false;
    isShowAdd2 = false;
    isShowAdd3 = false;
    isShowAdd4 = false;
    isShowAdd5 = false;
    


    @wire(getProducts,{searchKey_name:'$searchKey_name',searchKey_brand:'$searchKey_brand'})
    wiredContacts({ error, data }) {
        if (data) {
            this.products = data;
            this.error = undefined;
            console.log("hi");
            console.log(JSON.stringify(data));
            this.isshow=false;
            this.isshow=true;
        } else if (error) {
            this.error = error;
            this.products = undefined;
            console.log("not working");
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

    /*handleAdd(event)
    {

        console.log("Product Id : "+event.target.value);
        this.product_id = event.target.value;
        getUnitPrice({'searchId':event.target.value}).then(result=> {
            console.log(JSON.stringify(result))
            this.unitprice = result[0].UnitPrice;
            this.pricebookentryid = result[0].Id;
            console.log(this.unitprice);
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
        this.isShowAdd1 = true;
    }*/
    handleAdd(event){
        this.isShowAdd = false;
        this.isShowAdd5 = false;
        this.isShowAdd1 = false;
        this.isShowAdd2 = false;
        this.isShowAdd3 = false;
        this.isShowAdd4 = false;
        this.product_id = event.target.value;
       getOrdIdNum().then(result=> {
            console.log(JSON.stringify(result))
            this.orderList=result;
            console.log(this.orderList);
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
        this.isShowAdd = true;
    }
    selectOrder(event){
        console.log('Order Id='+event.target.value);
        this.isShowAdd = false;
        this.ordId=event.target.value;
        getOrdItemss({'searchId':event.target.value}).then(result=> {
            console.log('Products associated with this order are=');
            console.log(JSON.stringify(result));
            this.orderItemList=result;
            console.log(this.orderItemList);
            console.log(this.orderItemList.length);
            if(this.orderItemList.length === 0) {this.isShowAdd1 = true;console.log(this.isShowAdd5);}
        else{ this.isShowAdd2 = true; console.log(this.isShowAdd2);}
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
        
    }
    checkProd(event){
        console.log('inside check');
        console.log(event.target.value);
        console.log();

        fff({'searchId':event.target.value}).then(result=> {
            console.log('pb1=');
            console.log(JSON.stringify(result));
            this.pb1=result;
            console.log(this.pb1);
            //checkProd2();      
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
        
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            ggg({'searchId':this.ordId}).then(result=> {
            console.log('pb2=');
            console.log(JSON.stringify(result));
            this.pb2=result;
            console.log(this.pb2);
            

            console.log('-----');
            const aa =  this.pb1.find(a => a.Pricebook2Id === this.pb2[0]);
            // console.log(aa);
            // console.log('-----');
            // console.log(this.aa);
            
            //console.log( this.pb1.find(a => a.Pricebook2Id === this.pb2[0].Pricebook2Id) );
            
            console.log( this.pb1.some(a => a.Pricebook2Id === this.pb2[0].Pricebook2Id) );
            

            if(this.pb1.some(a => a.Pricebook2Id === this.pb2[0].Pricebook2Id) === true ) 
            {
                console.log('i found it: yay')
                console.log( this.pb2[0].Pricebook2Id );
                this.isShowAdd3 = true;
                this.isShowAdd2 = false;
            }
            else{
                this.isShowAdd4 = true;
                this.isShowAdd2 = false;
            }

                  
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
        });}, DELAY);

    }
    addFinal(){
        this.ordId2='00000120';
        this.isShowAdd3 = false;
            console.log('inside addFinal');
            console.log("Product Id : "+this.product_id);
            console.log('Pricebook2Id:'+this.pb2[0].Pricebook2Id)
        
        getUnitPrice({'searchId':this.product_id,'prid':this.pb2[0].Pricebook2Id}).then(result=> {
            console.log(JSON.stringify(result))
            this.unitprice = result[0].UnitPrice;
            this.pricebookentryid = result[0].Id;
            console.log(this.unitprice);
            console.log(this.ordId);
            
            console.log(this.ordId2);
            this.isShowAdd5 = true;
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

        }


        
    handleSuccess(event)
    {
        alert('Successfully added');

        const updatedRecord = event.detail.id;
        console.log('onsuccess: ', updatedRecord); 
        console.log(this.ordid);
        console.log(this.ordid2); 
        console.log(this.ordId); 
        
        this.isShowAdd = false;

    }

    handleError(event) {
        alert('Error occurred . Report to uyour admin .');
        console.log("handleError event");
        console.log(JSON.stringify(event.detail));
    }

    handleClose(event)
    {
        this.isShowAdd = false;
    }
    
    handleClose5(event)
    {
        this.isShowAdd5 = false;
    }






}