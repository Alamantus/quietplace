import moment from 'moment';

import db from '../dexieDatabase';

export class DuckPondController {
  constructor (state, emit) {
    this.state = state;
    this.emit = emit;

    this.locationName = 'duckPond';

    this.updateStateActions();
  }

  feed (message) {
    this.state.pellets -= (this.state.pellets > 0) ? 1 : 0;
    
    db.actions.put({
      location: this.locationName
    , time: Date.now()
    , action: message
    })
    .then(() => {
      this.updateStateActions();
    })
    .catch(error => {
      console.error('error putting action:\n' + error);
    });
  }

  updateStateActions () {
    db.actions.count(count => {
      if (count > 0) {
        db.actions.where('location')
        .equals(this.locationName)
        .reverse()
        .sortBy('time')
        .then(results => {
          const update = userActions => {
            this.state.userActions = userActions;
            this.emit('render');
          };

          if (moment(results[0].time).isBefore(moment().startOf('day'))) {
            console.log('New day, new events!');
            db.actions.clear()
            .then(() => {
              update([]);
            });
          } else {
            update(results);
          }
        })
        .catch(error => {
          console.error('error getting results:\n' + error);
        });
      } else {
        console.log('no events');
      }
    });
  }

  /*
  db.actions.put(actionObject).then (() => {
    //
    // Then when data is stored, read from it
    //
    return db.actions.get('Nicolas');
  }).then((friend) => {
    //
    // Display the result
    //
    alert ("Nicolas has shoe size " + friend.shoeSize);
  }).catch((error) => {
    //
    // Finally don't forget to catch any error
    // that could have happened anywhere in the
    // code blocks above.
    //
    alert ("Ooops: " + error);
  });
  */
}