public with sharing class pclass {
    public pclass() {}
    @AuraEnabled(cacheable=true)
    public static List<Order> getAllOrders(){
        List<Order> mylist=[SELECT Id,OrderNumber,TotalAmount FROM Order ORDER BY OrderNumber ASC NULLS FIRST];
        return mylist;
    }

}
