public with sharing class getOrders {
    public getOrders() {  }
    @AuraEnabled(cacheable=true)
    public static List<Order> getAllOrders(){
        List<Order> mylist=[SELECT AccountId,Id,OrderNumber,TotalAmount FROM Order];
        return mylist;
    }
    // @AuraEnabled
    // public static void addEmployee(String eid,String ename,Decimal esal){
    //     EmployeePune__c emp=new EmployeePune__c(EmployeeId__c=eid,Name=ename,EmployeeSalary__c=esal);
    //     upsert emp;            
    // }
    
    // @AuraEnabled
    // public static void updEmployee(String eid,String ename,Decimal esal,String idid){
    //     EmployeePune__c emp=new EmployeePune__c(EmployeeId__c=eid,Name=ename,EmployeeSalary__c=esal,Id=idid);
    //     update emp;            
    // }
    // @AuraEnabled
    // public static void delEmployee(String eid,String ename,Decimal esal,String idid){
    //     EmployeePune__c emp=new EmployeePune__c(EmployeeId__c=eid,Name=ename,EmployeeSalary__c=esal,Id=idid);
    //     delete emp;            
    // }


}


     