var mongoose = require('mongoose');
var mongoUrl = process.env.MONGODB_URL || 'mongodb://cmassao:nirvana666@ds161121.mlab.com:61121/blogjs';

mongoose.connect(mongoUrl);
