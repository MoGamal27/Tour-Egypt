import express from 'express';
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

import cors from 'cors'
const app = express();


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

app.use(express.json());
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


app.listen(3000, () => {
  console.log('Server up and running on port: 3000');
});

