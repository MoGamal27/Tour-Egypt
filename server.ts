import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import destinationRoute from './src/Routes/DestinationRoute'
import attractionRoute from './src/Routes/AttractionRoute'
import restaurantRoute from './src/Routes/RestaurantRoute'
import hotelRoute from './src/Routes/HotelRoute'
import RegisterTourGuide from './src/Routes/TourGuideRoute'
import RegisterTourist from './src/Routes/TouristRoute' 
import categoryRoute from './src/Routes/CategoryRoute';
import souvenirRoute from './src/Routes/SouvenirRoute';
import bookingRoute from './src/Routes/BookingRoute'
import activityRoute from './src/Routes/ActivityRoute';
import reviewRoute from './src/Routes/ReviewRoute';
import verifyToken from './src/middleware/verifyToken';
import authenticateUser from './src/middleware/authMiddleware';
import { createReview, getHotelReviews } from './src/api/reviews';

import cors from 'cors'
const app = express();


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}))

app.use(express.json());


// Serve ALL static files (CSS, JS, images) from Frontend folder
app.use(express.static(path.join(__dirname, 'Frontend')));


// Public HTML routes (no authentication required)
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'login.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'register.html'));
});




// API routes
app.use('/api', 
    destinationRoute, 
    attractionRoute,
    restaurantRoute,
    hotelRoute,
    RegisterTourGuide,
    RegisterTourist,
    categoryRoute,
    souvenirRoute,
    bookingRoute,
    activityRoute,
    reviewRoute  
);

// Redirect root to login if not authenticated
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

app.listen(3000, () => {
  console.log('Server up and running on port: 3000');
  console.log('Login page available at: http://localhost:3000/login.html');
});
