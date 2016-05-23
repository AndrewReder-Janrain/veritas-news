var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
  var locals = res.locals;

  // Init locals
  locals.category = req.params.category;
  locals.filters = {
    category: req.params.category
  };

  locals.data = {
    posts: [],
    categories: []
  };

  // Load all categories
  view.on('init', function(next) {
    keystone.list('PostCategory').model.find().sort('name').exec(function(err, results) {

      if (err || !results.length) {
        return next(err);
      }

      locals.data.categories = results;
      // Load the counts for each category
      async.each(locals.data.categories, function(category, next) {

        keystone.list('Post').model.count().where('categories').in([category.id]).exec(function(err, count) {
          category.postCount = count;
          next(err);
        });

      }, function(err) {
        next(err);
      });

    });

  });

  // Load the current category filter
  view.on('init', function(next) {
    if (req.params.category) {
      keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
        locals.data.category = result;
        next(err);
      });
    } else {
      next();
    }

  });
  // ['world-news','sports','us-news'];
  // locals.smallTeaserCaterories = ['lifestyle-entertainment','science-technology'];
  locals.primaryTeaserCategories = [
    { _id: "571a3e14d2c92f189fbf3aa6",
      key: 'world-news',
      name: 'World News',
      post: {}},
    { _id: "571a3e20d2c92f189fbf3aa7",
      key: 'us-news',
      name: 'US News',
      post: {}},
    { _id: "571a3e27d2c92f189fbf3aa8",
      key: 'sports',
      name: 'Sports',
      post: {}},
  ];

  locals.primaryTeaserPosts = [];
  locals.smallTeaserCategories = [
    { _id: "571a3e4dd2c92f189fbf3aaa",
      key: 'lifestyle-entertainment',
      name: 'Lifestyle + Entertainment',
      post: {}},
    { _id: "571a3e38d2c92f189fbf3aa9",
      key: 'science-technology',
      name: 'Science + Technology',
      post: {}}
  ];
  locals.smallTeaserPosts = [];
  locals.articleTeaserPosts = [
    {
      title: "HOMO NALEDI: NEW SPECIES OF HUMAN ANCESTOR DISCOVERED IN SOUTH AFRICA",
      slug: "homo-naledi-new-species-of-human-ancestor-discovered-in-south-africa",
      categoryName: "Science + Technology",
      image: { url: "http://res.cloudinary.com/keystone-demo/image/upload/v1461338094/aenhsx87mxhzrviljpyy.jpg" }
    },
    {
      title: "FLOODING TAKES TOLL IN JAPAN",
      slug: "flooding-takes-toll-in-japan",
      categoryName: "World News",
      image: { url: "http://res.cloudinary.com/keystone-demo/image/upload/v1461338873/h6bpwmzjw46ikqypyopa.jpg"}
    }
  ];
  // Load the posts
  view.on('init', function(next) {
    async.each(locals.primaryTeaserCategories, function(category, next) {
      keystone.list('Post').model.findOne().where('categories').in([category._id]).exec(function(err, result) {
        category.post = result;
        next(err);
      });
    }, function(err) {
      next(err);
    });
  });

  view.on('init', function(next) {
    async.each(locals.smallTeaserCategories, function(category, next) {
      keystone.list('Post').model.findOne().where('categories').in([category._id]).exec(function(err, result) {
        category.post = result;
        next(err);
      });
    }, function(err) {
      next(err);
    });
  });
  // Load the posts
  // view.on('init', function(next) {

  //   if (locals.data.category) {
  //     q.where('categories').in([locals.data.category]);
  //   }

  //   q.exec(function(err, results) {
  //     locals.data.posts = results;
  //     // console.log(locals.data.posts);
  //     next(err);
  //   });

  // });

  //posts.results.categories[0].key

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.theme = process.env.THEME;
	// Render the view
	view.render('index');

};
