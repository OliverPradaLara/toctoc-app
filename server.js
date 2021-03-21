// Create express app
let express = require("express")
let app = express()
let db = require ("./database.js")

app.use (express.urlencoded ({extended: false}));
app.use (express.json ());
// Server port
let HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});
app.get("/get/resource/memory/", (req, res, next) => {
    var sql = "select * from host"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/post/resource/memory/", (req, res, next) => {
    var errors=[]
    if (!req.body.uuid){
        errors.push("No password specified");
    }
    if (!req.body.name){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        uuid: req.body.uuid,
        name: req.body.name,
    }
    var sql ='INSERT INTO host (uuid, name) VALUES (?,?)'
    var params =[data.uuid, data.name]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});
// Insert here other API endpoints
app.delete("/delete/resource/memory/", (req, res, next) => {
    db.run('DELETE FROM host',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})
// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

