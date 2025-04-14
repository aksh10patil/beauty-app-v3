const express = require("express");
const cors = require("cors");
const path = require("path");
const paymentRouter = require("./routes/payments.routes");
const bookingRouter = require("./routes/bookings.routes");
const adminRouter = require("./routes/admin.routes");
const packageRouter = require("./routes/packageRoutes");
const serviceRouter = require("./routes/serviceRoutes");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', paymentRouter);
app.use('/', bookingRouter);
app.use('/', adminRouter);
app.use('/api/packages', packageRouter);
app.use('/api/services', serviceRouter);

app.get('/', (req, res) => {
  res.send('Server Works fine!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});