const config = require("./sso.config");

function SingleSignOnLogin(req, res, next) {
	console.log('SingleSignOnLogin');
	const { redirectUrl } = req.query;
	const ssoUrl = config.sso.loginUrl.replace('{redirectUrl}', redirectUrl);
	console.log('SingleSignOnLogin', ssoUrl, redirectUrl);
	return res.redirect(ssoUrl);
};

module.exports = SingleSignOnLogin;
