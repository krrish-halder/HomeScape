const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();

const app = express();

connectDB();
app.use(express.json()); 


app.get('/', (req, res) => {
    res.send('Real Estate API is running');
});

app.use('/admin/state', require('./routes/Admin/stateRoutes'));
app.use('/admin/district', require('./routes/Admin/districtRoutes'));
app.use('/admin/city', require('./routes/admin/cityRoutes')); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
