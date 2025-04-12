const express = require("express");
const cors = require("cors");
const paymentRouter = require("./routes/payments.routes");
const bookingRouter = require("./routes/bookings.routes");
const adminRouter = require("./routes/admin.routes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use('/', paymentRouter);
app.use('/', bookingRouter);
app.use('/', adminRouter);

app.get('/', (req, res) => {
  res.send('Server Works fine!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
