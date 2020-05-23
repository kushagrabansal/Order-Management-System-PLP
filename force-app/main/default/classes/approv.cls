public with sharing class approv {
    public approv() {}
        @AuraEnabled
    public static void submitForApproval(Id opp){

        // Create an approval request for the Opportunity

        Approval.ProcessSubmitRequest req1 = new Approval.ProcessSubmitRequest();

        req1.setComments('Submitting request for approval automatically using Apex');

        req1.setObjectId(opp);

       // req1.setNextApproverIds(new Id[] {''});

 

        // Submit the approval request for the Opportunity

        Approval.ProcessResult result = Approval.process(req1);

 

    }
    
}
