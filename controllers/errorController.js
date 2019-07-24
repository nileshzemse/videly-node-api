exports.pageNotFound = (req, res, next) => {
    res.render('404', {
        pageTitle: 'Vidly App',
        path: '404',
        Error: '404 Page Not Found!'
    });
}

