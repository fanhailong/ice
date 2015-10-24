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

function request (url, callback) {
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

    function appendCode(r){
        var codes=''
        for(var i=0;i< r.length;i++){
            if(i=== r.length-1){
                codes+='sz'+r[i].code;
            }else{
                codes+='sz'+r[i].code+',';
            }

        }
        return codes;
    };

    function refresh(result){
            var codes=appendCode(result);
            console.log(codes);
            var url = 'http://hq.sinajs.cn/list='+codes;


            request(url, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    //        console.log("body:", body);
                    var fetchContent=iconv.decode(body, 'gbk');

                    eval(fetchContent);
                    result.forEach(function(o,i){
                        var str = eval('hq_str_sz'+ o.code);
                        if(str!==''){
                            dao.updateById(2, o.code);
                            console.log(str);
                        }
                    });
                    //var result = eval('hq_str_sh601006');



                }else{
                    console.dir(error);
                }
            });
    }

    dao.queryStocks(0,700,refresh);
    dao.queryStocks(700,700,refresh);
    dao.queryStocks(1400,700,refresh);
    dao.queryStocks(2100,686,refresh);



    //var rule = new schedule.RecurrenceRule();
    //
    //var times = [];
    //
    //for(var i=1; i<60; i++){
    //
    //    times.push(i);
    //
    //}
    //
    //rule.second = times;
    //
    //var c=0;
    //var j = schedule.scheduleJob(rule, function(){
    //    c++;
    //    console.log(c);
    //});



};


