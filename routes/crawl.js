/* GET users listing. */

var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var schedule = require("node-schedule");
var dao = require('../dao/stockDao');
var originRequest = require('request')
var iconv = require('iconv-lite')
var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

function request(url, callback) {
    var options = {
        url: url,
        encoding: null,
        headers: headers
    }
    originRequest(options, callback)
}


exports.queryStock = function () {
    //var url = 'http://hq.sinajs.cn/list=sh601006,sz300221';
    //
    //var a=request(url, function (error, res, body) {
    //
    //    if (!error && res.statusCode == 200) {
    //        //        console.log("body:", body);
    //        var fetchContent=iconv.decode(body, 'gbk');
    //        console.log(fetchContent);
    //        eval(fetchContent);
    //        var result = eval('hq_str_sh601006');
    //
    //
    //
    //    }
    //});

    function getPrefix(st) {
        var prefix = 'sh';
        if (st === 2) {
            prefix = 'sz';
        }
        return prefix;
    };

    function appendCode(r) {
        var codes = ''
        for (var i = 0; i < r.length; i++) {
            var prefix = getPrefix(r[i].st);
            if (i === r.length - 1) {
                codes += prefix + r[i].code;
            } else {
                codes += prefix + r[i].code + ',';
            }
        }
        return codes;
    };

    function refresh(result) {
        var codes = appendCode(result);
        console.log('length:'+codes.split(',').length);

        var url = 'http://hq.sinajs.cn/list=' + codes;


        request(url, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                var fetchContent = iconv.decode(body, 'gbk');
                eval(fetchContent);
                console.log('r_'+result.length);
                var cnt=0;
                result.forEach(function (o, i) {
                    var prefix = getPrefix(o.st);
                    var str = eval('hq_str_' + prefix + o.code);
                    if (str !== '') {
                        cnt++;
                        var arr = str.split(',');
                        dao.add([o.code,arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], arr[10], arr[11], arr[12], arr[13], arr[14], arr[15], arr[16], arr[17], arr[18], arr[19],
                            arr[20], arr[21], arr[22], arr[23], arr[24], arr[25], arr[26], arr[27], arr[28], arr[29], arr[30] +' ' + arr[31]]);
                    } else {
                        console.log('error:'+o.code);
                    }

                });
                console.log('cnt:'+cnt);

            } else {
                console.dir(error);
            }
        });
    }




    //dao.queryStocks(700, 700, refresh);
    //dao.queryStocks(1400, 700, refresh);
    //dao.queryStocks(2100, 700, refresh);


    var rule = new schedule.RecurrenceRule();
    var times = [0];

    //for(var i=1; i<60; i++){
    //
    //    times.push(i);
    //
    //}

    rule.second = times;

    var c=0;
    var j = schedule.scheduleJob(rule, function(){
        function isExecute(){
            var d=new Date();
            var h= d.getHours();
            var m= d.getMinutes();
            console.log('h:'+h+' m:'+m);
            if(h===9){
                if(m>=30){
                    return true;
                }
                return false;
            }
            if(h===11){
                if(m<=30){
                    return true;
                }
                return false;
            }
            if(h===10||h===13||h===14){
                return true;
            }
            return false;
        };
        var execute=isExecute();
        if(execute){
            dao.queryStocks(0, 700, refresh);
            var timemid = 20000;
            setTimeout(function () {
                dao.queryStocks(700, 700, refresh);
            }, Math.floor(Math.random() * timemid));

            setTimeout(function () {
                dao.queryStocks(1400, 700, refresh);
            }, Math.floor(Math.random() * timemid));

            setTimeout(function () {
                dao.queryStocks(2100, 700, refresh);
            }, Math.floor(Math.random() * timemid));
            c++;
            console.log(c);
        }


    });


};


