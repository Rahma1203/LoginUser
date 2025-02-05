require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/mongo");
const cors = require('cors');



dbConnect();

const app = express();

// Constants.
const PORT = process.env.PORT || 5000;

// Middlewares.
// Le decimos a la app de express() que use express.json() para procesar JSON.
app.use(cors());
app.use(express.json());
app.use("/api", require("./routes")); //Lee routes/index.js por defecto
// app.use(cors());



// LISTEN.

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}.`);
    });




module.exports = app;