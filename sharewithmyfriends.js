Items = new Mongo.Collection("items");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.iveborrowed.helpers({
    items: function(){
      return Items.find({borrowerId:"me"});
    }
  });

  Template.iown.helpers({
    items: function(){
      return Items.find({ownerId:"me"});
    }
  });

  Template.addsomethingiown.events({
    "submit .addsomethingiown" : function(event){
      var itemName = event.target.itemName.value; 
      Items.insert({
        name: itemName,
        createdAt: new Date(), // current time
        ownerId:"me"
      });
      event.target.itemName.value = "";
      return false;

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
