/**
 * Created by Administrator on 2015/10/12.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');

var $sql = require('./stockMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool( $conf.mysql);

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
       // res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.insert, [param.code, param.name], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });
    },
    queryStocks:function(start,row,refreshStock){

        pool.getConnection(function(err, connection) {
            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.queryAll, [start,row], function(err, result) {

                refreshStock(result);
                // 释放连接
                connection.release();

            });
        });

    },
    updateById:function(st,code){
        pool.getConnection(function(err, connection) {
            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.updateById, [st,code], function(err, result) {
                console.dir(result);
                // 释放连接
                connection.release();

            });
        });
    },

    add:function(params){
        pool.getConnection(function(err, connection) {
            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.insertTrack, params, function(err, result) {
                if(err){
                    console.log(err);
                    console.log(params);
                }

                // 释放连接
                connection.release();

            });
        });
    }
};