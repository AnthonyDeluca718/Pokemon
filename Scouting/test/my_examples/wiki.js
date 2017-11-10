console.log('Loading a web page');
var page = require('webpage').create();
var url = 'http://en.wikipedia.org';

page.open(url);
page.onLoadFinished = function() {
  console.log('Page loaded');
  page.render('wikipedia.org.png');
  phantom.exit();
});
console.log("test");
