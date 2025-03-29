const express = require("express");
const cors = require("cors");
const router = require("./routes/payments.routes");
const app = express();
const port = 4000;


app.use(cors());
app.use(express.json());



app.use('/api', router)

app.listen(port , () => {
    console.log( ` App listening at http://localhost:${port} `)
}
)