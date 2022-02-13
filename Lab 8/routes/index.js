const searchRoutes = require('./search');
const path = require('path');

const constructorMethod = (app) => {
    app.use('/', searchRoutes);

    app.use('*', (req, res) => {
        res.status(404).render('marvel/error', {error: 'Something went wrong'});
    });
};


module.exports = constructorMethod;