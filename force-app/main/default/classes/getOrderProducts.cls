public with sharing class getOrderProducts {
    
    
    

    @AuraEnabled(cacheable=true)
    public static List<OrderItem> getAllOrderProducts(String recordId) {
        List<OrderItem> mylist=Database.query('SELECT Brand__c,Product_Code__c,Product_Name__c,Quantity,Stock_Quantity__c FROM OrderItem WHERE OrderId = :recordId');
        
        return mylist;
    }

    
// List<sObject> sobjList = Database.query('SELECT Id FROM MyCustomObject__c WHERE Name = :myTestString');
    
}

