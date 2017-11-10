
var page = require('webpage').create();
var url = "http://replay.pokemonshowdown.com/";

page.settings.resourceTimeout = 3000;
// page.settings.loadImages = false;

page.open(url, function (status) {
  console.log("opened page");
  var buttons = page.evaluate(function() {

    // function pause(millis)
    // {
    //     var date = new Date();
    //     var curDate = null;
    //     do { curDate = new Date(); }
    //     while(curDate-date < millis);
    // }
    var input = document.getElementsByTagName('input')[0];
    input.value = "deluks917";

    var buttons = document.getElementsByTagName('button');
    buttons[0].click();
    //
    // pause(2000);

    // var more = buttons[2];
    // var res = buttons[buttons.length-1];
    //
    // if(more) {
    //   more.click();
    // }

    return buttons;
  });
  // for(var i=0; i<buttons.length; i++) {
  //   console.log(buttons[i].outerHTML);
  // }

  // function pause(millis)
  // {
  //     var date = new Date();
  //     var curDate = null;
  //     do { curDate = new Date(); }
  //     while(curDate-date < millis);
  // }
  //
  // pause(2000);
  // page.render('replays.png');
  // phantom.exit();

  window.setTimeout(function() {
    page.render('replays.png');
    phantom.exit();
  }, 200);
});

page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('Loading started');
};
page.onLoadFinished = function() {
    loadInProgress = false;
    console.log('Loading finished');
};
page.onConsoleMessage = function(msg) {
    console.log(msg);
};
