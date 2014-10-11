module.exports = function(req, res, next) {
	username = 'Chan Tai Man';

	if (req.session.user) {
		username = req.session.user;
		return next();
	}
	
	//res.redirect('/login');
	next();
};