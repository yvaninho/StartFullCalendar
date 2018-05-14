import './planning.html'

let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};

Template.planning.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'planning' );
});

Template.planning.onRendered( () => {
  $( '#events-calendar' ).fullCalendar({
    events( start, end, timezone, callback ) {
      let data = Planning.find().fetch().map( ( event ) => {
        event.editable = !isPast( event.start );
        return event;
      });

      if ( data ) {
        callback( data );
      }
    },
    eventDrop( event, delta, revert ) {
     let date = event.start.format();
     if ( !isPast( date ) ) {
       let update = {
         _id: event._id,
         start: date,
         end: date
       };

       Meteor.call( 'editEvent', update, ( error ) => {
         if ( error ) {
           Bert.alert( error.reason, 'danger' );
         }
       });
     } else {
       revert();
       Bert.alert( 'Sorry, you can\'t move items to the past!', 'danger' );
     }
   },
    dayClick( date ) {
      Session.set( 'eventModal', { type: 'add', date: date.format() } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    },
    eventClick( event ) {
      Session.set( 'eventModal', { type: 'edit', event: event._id } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    }

  });
  Tracker.autorun( () => {
    Planning.find().fetch();
    $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
  });
});
