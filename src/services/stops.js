module.exports = {
    getStops: function(id, stopName, res){
        const rp = require('request-promise');
        const jsonp = require('jsonp-promise');
        const cheerio = require('cheerio');
        const options = {
            uri: 'https://www.transitchicago.com/assets/1/6/stoplist_',
            transform: function (body) {
                return cheerio.load(body);
            }
        };
        var direction = {
            uri: 'https://www.transitchicago.com/assets/1/6/stoplist_'
        };
        var duhr;

        options.uri += id + '.htm';

        rp(options)
            .then(function ($) {

                var br = $("table").children();
                var stops = [];
                console.log('len: '+br[0].children.length, stopName)
                for (var i = 0; i < br[0].children.length; i++){
                    var td = br[0].children[i];
                    td = $(td).find('td');
                    if (td.length > 0){
                        var text = $(td[1]).text()
                        if (text.indexOf(stopName)>-1){
                            //console.log('td: ', $(td[0]).text(), stopName);
                            stops.push({'id':$(td[0]).text()})
                        }
                    }

                }
                console.log('stops: ', stops);
                res.status(200).send(stops);
                /*  br[0].children.each(function (i, e) {
                    console.log('chirrens: ', e.children[i])
                    var text = e.children[i];
                    console.log('texty: ', text.text())
                    if (text[text.length-2].indexOf(headsign)>-1){
                        duhr = text[3];
                        console.log('doi: ', duhr);
                        res.status(200).send({id:duhr});
                       return duhr;

                });}*/
            }).catch(function (err) {
                console.log(options.uri);
              //  console.log(err);
            });

    }

}