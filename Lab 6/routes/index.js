const restaurantsRoutes = require('./restaurants');
const reviewsRoutes = require('./reviews');

const constructerMethod = (app) => {
    app.use('/restaurants', restaurantsRoutes);
    app.use('/reviews', reviewsRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error : 'Not Found'});
    });
};

module.exports = constructerMethod;