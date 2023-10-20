const express = require('express');
const cors=require('cors');
const databaseService = require('./src/Conexion/bd');
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());
const dbService = databaseService();
require('./src/Route/Route')(app, dbService);
//app.use('/',require("./routes")(app, dbService));
app.listen(port, () => {
    console.log(`corriendo en el puerto ${port}`);
});