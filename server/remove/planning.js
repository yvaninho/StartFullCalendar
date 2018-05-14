

Meteor.methods({
  removeEvent( event ) {
    check( event, String );

    try {
      return Planning.remove( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
