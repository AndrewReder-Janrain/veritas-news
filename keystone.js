// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');
var theme = process.env.THEME || "default";
// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'SE Demo',
	'brand': 'SE Demo',
	'env': 'production',
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/themes/' + theme + '/views/',
	'view engine': 'hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/themes/' + theme + '/views/layouts',
		partialsDir: 'templates/themes/' + theme + '/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/themes/' + theme + '/views/helpers')(),
		extname: '.hbs'
	}).engine,
	'mongo': process.env.MONGO_URI || "mongodb://mongodb:27017/veritas-news",
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
