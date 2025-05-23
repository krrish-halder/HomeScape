const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
dotenv.config();

const app = express();

connectDB();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Real Estate API is running');
});

app.use('/api/v1/auth', require('./routes/users/authRoutes'));


app.use('/api/v1/admin/dashboard', require('./routes/admin/dashboardRoutes'));
app.use('/api/v1/admin/users', require('./routes/admin/userRoutes'));
app.use('/api/v1/admin/state', require('./routes/admin/stateRoutes'));
app.use('/api/v1/admin/district', require('./routes/admin/districtRoutes'));
app.use('/api/v1/admin/city', require('./routes/admin/cityRoutes'));
app.use('/api/v1/admin/property-type', require('./routes/admin/propertyTypeRoutes'));
app.use('/api/v1/admin/property', require('./routes/admin/propertyRoutes'));


app.use('/api/v1/user', require('./routes/users/userRoutes'));
app.use('/api/v1/property', require('./routes/users/propertyRoutes'));
app.use('/api/v1/wishlist', require('./routes/users/wishlistRoutes'));
app.use('/api/v1/location', require('./routes/users/locationRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
