const { serve } = require('./server/main.js');

const app = serve({ dirname: __dirname, baseHref: '/b-here/' });
