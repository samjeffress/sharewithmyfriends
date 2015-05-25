Items = new Mongo.Collection("items");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.iveborrowed.helpers({
    items: function(){
      return Items.find({borrowerId:Meteor.user().username});
    }
  });

  Template.iveborrowed.events({
    "click li .return_item": function(event){
      Items.update(this._id, {$set: {borrowerId:null}});
    }
  });

  Template.iown.helpers({
    items: function(){
      return Items.find({ownerId:Meteor.user().username});
    }
  });

  Template.otherpeoplesthings.helpers({
    items: function(){
      return Items.find({ownerId:{$ne:Meteor.user().username}, $or:[{borrowerId:{$exists:false}},{borrowerId:null},{borrowerId:''}]});
    }
  });

  Template.otherpeoplesthings.events({
    "submit .otherpeoplesthings" : function(event){
      event.preventDefault();
      Items.update(this._id, {$set: {borrowerId: Meteor.user().username}});
    } 
  });

  Template.addsomethingiown.events({
    "submit .addsomethingiown" : function(event){
      event.preventDefault();
      var itemName = event.target.itemName.value; 
      Items.insert({
        name: itemName,
        createdAt: new Date(), // current time
        ownerId: Meteor.user().username 
      });
      event.target.itemName.value = "";
      return false;

    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
