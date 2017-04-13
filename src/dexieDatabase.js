import Dexie from 'dexie';

let db = new Dexie("quietplace_db");
// Clear out database on each load for testing.
// db.delete();
// db = new Dexie("quietplace_db");
db.version(1).stores({
  // Indexes location name and time, expects `action` property as well
  actions: 'time,location'
});

export default db;
