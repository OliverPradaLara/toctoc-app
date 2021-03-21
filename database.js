let sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"
const { v4: uuidv4 } = require('uuid');
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE host (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uuid text,
            name text 
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                setInterval(()=>{
                let insert = 'INSERT INTO host (uuid, name) VALUES (?,?)'
                db.run(insert, [uuidv4(),"OliverHost"])
                db.run(insert, [uuidv4(),"OliverHost"])},1000)
            }
        });  
    }
});


module.exports = db