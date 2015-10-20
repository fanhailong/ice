/* GET users listing. */
var request = require('request');
var cheerio = require('cheerio');
exports.queryStock = function(){
    var url = 'http://hq.sinajs.cn/list=sh601006';
    request(url, function (error, res, body) {
      res.set
      res.setHeader('Content-Type', 'text/html; charset=gbk');
      if (!error && res.statusCode == 200) {
  //        console.log("body:", body);
        eval(body);
        var result=eval('hq_str_sh601006');

        console.log(result);
        var $ = cheerio.load(body);
        var li = $('li');
        console.log("li.length:", li.length);
        var arr = [];
        li.each(function (index, ele) {
          var text = $(this).text();
          var src = $('img', this).attr('src');
          var href = $('a', this).attr('href');
          console.log("href:", href);
          var obj = {
            src: src,
            href: 'http://www.22mm.cc' + href,
            text: text
          };
          arr.push(obj);
  //            console.log("src:", src);
  //            console.log("text:", text);
        });
        console.log("arr:", arr);

      }
    });
};


