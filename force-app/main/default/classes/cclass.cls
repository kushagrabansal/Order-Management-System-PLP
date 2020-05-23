public with sharing class cclass {
    public cclass() {}
        @AuraEnabled(cacheable=true)
        public static List<OrderItem> getAllOrderProducts(String recordId) {
            List<OrderItem> mylist=Database.query('SELECT Brand__c,Product_Code__c,Product_Name__c,Quantity,Stock_Quantity__c,TotalPrice,Id FROM OrderItem WHERE OrderId = :recordId');
        
            return mylist;
        }

        @AuraEnabled
        public static void delProduct(String idid){
            OrderItem ori=new OrderItem(Id=idid);
            delete ori;
        }
    
    }
    
    