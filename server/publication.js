
Meteor.publish( 'planning',
     function(){
       return Planning.find();
     });
