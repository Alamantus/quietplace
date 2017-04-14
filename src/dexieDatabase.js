import Dexie from 'dexie';

let db = new Dexie("quietplace_db");

db.version(1).stores({
  // Indexes location name and time, expects `action` property as well
  actions: 'time,location'
});

if (process.env.NODE_ENV === 'emptydatabase') {
  console.log('Clearing the database.');
  db.actions.clear();
}

export default db;
