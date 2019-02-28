module.exports = {
    res: undefined,
    getDirectionFromCTA: function(id, headsign, res){
        const rp = require('request-promise');
        const jsonp = require('jsonp-promise');
        const cheerio = require('cheerio');
        const options = {
            uri: 'https://www.transitchicago.com/bus/',
            transform: function (body) {
                return cheerio.load(body);
            }
        };
        var direction = {
            uri: 'https://www.transitchicago.com/bus/'
        };
        var duhr;

        options.uri += id;

        rp(options)
            .then(function ($) {

                var br = $(".service-notes-line").children();

                br.children().each(function (i, e) {

                    var text = e.children[i].data.split(" ")
                    console.log('texty: ', text, headsign)
                    /*if (text[text.length-2].indexOf(headsign)>-1){
                        duhr = text[3];
                        console.log('doi: ', duhr);
                        res.status(200).send({id:duhr});
                       return duhr;
                    }*/
                });
            }).catch(function (err) {
                console.log(options.uri);
              //  console.log(err);
            });

    },
    getDirection: function(id, departureStop, arrivalStop, res){
        const rp = require('request-promise');
        const jsonp = require('jsonp-promise');
        const cheerio = require('cheerio');
        const directionOptions = {
            uri: 'http://ctabustracker.com/bustime/api/v2/getdirections?key=qsnyx5tsMDC2NT67JRDCNjCf2&format=json&rt='+id,
            transform: function (body) {
                return cheerio.load(body);
            }
        };
        const stopsOptions = {
            uri: 'http://ctabustracker.com/bustime/api/v2/getstops?key=qsnyx5tsMDC2NT67JRDCNjCf2&format=json&rt='+id,
            transform: function (body) {
                return cheerio.load(body);
            }
        };
        const stopTimesOptions = {
            uri: 'http://ctabustracker.com/bustime/api/v2/getstops?key=qsnyx5tsMDC2NT67JRDCNjCf2&format=json&rt='+id,
            transform: function (body) {
                return cheerio.load(body);
            }}
        module.exports.res = res;
        rp(directionOptions)
            .then(function ($) {
                var resp = JSON.parse($.text());
                resp['bustime-response'].directions.forEach(function(e,i){
                   var stoptions = stopsOptions.uri + "&dir="+ e.dir;

                    rp(stoptions)
                        .then(function (stops){
                            var s = JSON.parse(stops);
                            var myStop = false;
                            var start, stop;
                            //start.id = e.id;
                            s['bustime-response'].stops.forEach(function(el, i){
                                if (el.stpnm.indexOf(departureStop)>-1){
                                    start = el;
                                }
                                if (el.stpnm.indexOf(arrivalStop)>-1){
                                    stop = el;
                                }
                            });
                            start.id = id;
                            if (e.dir.indexOf('orth')>-1){
                                if (start.lat < stop.lat){

                                   var times = module.exports.getStopTimes(start, res);
                                    console.log('times', times)
                                  //  console.log('start', start);
                                    return start;
                                }
                            }
                            if (e.dir.indexOf('outh')>-1){
                                if (start.lat > stop.lat){
                                    module.exports.getStopTimes(start, res);
                                    console.log('times', times)
                                   // console.log('start', start);
                                    return start;
                                }
                            }
                            if (e.dir.indexOf('ast')>-1){
                                if (start.lon < stop.lon){
                                    return start;
                                }
                            }
                            if (e.dir.indexOf('est')>-1){
                                if (start.lon > stop.lon){
                                    return start;
                                }
                            }

                        }).catch(function (err){
                            console.log('direction err: ', this, err);
                        });
                });
              //  console.log('return: ', resp['bustime-response'].directions);
            }).catch(function (err) {
                console.log('error: ', err, directionOptions.uri);
                //  console.log(err);
            });
    },
    getStopTimes: function(stop, res){
        const rp = require('request-promise');
        const jsonp = require('jsonp-promise');
        const cheerio = require('cheerio');
        const directionOptions = {
            uri: 'http://ctabustracker.com/bustime/api/v2/getpredictions?key=qsnyx5tsMDC2NT67JRDCNjCf2&rt='+stop.id+'&stpid='+stop.stpid+'&format=json',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        /**
         *
         * @param date: in format yyyymmdd hh:mm
         *
         */
        function formatDate(date){
            console.log("date", date);
            return new Date(date.substring(4,6)+"/"+date.substring(6,8)+"/"+date.substring(0,4)+" "+date.split(" ")[1]);
        }
        rp(directionOptions)
            .then(function ($) {
                var resp = JSON.parse($.text());
                var prd = resp['bustime-response'].prd;
                var times = [];
                prd.forEach(function(etas){
                    var eta = formatDate(etas.prdtm)-new Date();// - new Date(prd.tmstmp);
                    eta = Math.floor(eta/1000/60);
                    times.push(eta);
                    console.log('obj', eta);
                });

                //console.log('times:',  new Date(prd.prdtm));
                res.status(200).send(times);
                return times;
            }).catch(function(err){
                console.log('error: ', err);
            })
    },
    getStopsFromCTA: function (id, stopName, res){
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
            uri: 'https://www.transitchicago.com/bus/'
        };
        var duhr;

        options.uri += id + '.htm';

        rp(options)
            .then(function ($) {

                var br = $("table tr").children();

                br.children().each(function (i, e) {

                    var text = e.children[i].data.split(" ")
                    console.log('texty: ', text)
                    /*if (text[text.length-2].indexOf(headsign)>-1){
                     duhr = text[3];
                     console.log('doi: ', duhr);
                     res.status(200).send({id:duhr});
                     return duhr;
                     }*/
                });
            }).catch(function (err) {
                console.log(options.uri);
                //  console.log(err);
            });
    }

}