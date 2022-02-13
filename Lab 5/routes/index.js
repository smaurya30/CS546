const peopleRoutes = require('./people');
const stocksRoutes = require('./stocks');

const constructerMethod = (app) => {
    app.use('/people', peopleRoutes);
    app.use('/stocks', stocksRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error : 'Not Found'});
    });
};

module.exports = constructerMethod;