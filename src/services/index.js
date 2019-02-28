module.exports = function(app, db) {
    console.log('app', app);
    const rp = require('request-promise');
    const cheerio = require('cheerio');
    const options = {
        uri: 'https://www.transitchicago.com/bus/70/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(function ($) {
        console.log('data', $);

        var br = $(".service-notes-line").children();
        br.children().each(function (i, e) {
            var text = e.children[0].data;
            console.log('text: ', text);
        });
    }).catch((err) = > {
        console.log(err);
    });
}
