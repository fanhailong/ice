/**
 * Created by Administrator on 2015/10/12.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');

var $sql = require('./stockMapping');

// ʹ�����ӳأ���������
var pool  = mysql.createPool( $conf.mysql);

// ��ǰ̨����JSON�����ļ򵥷�װ
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '����ʧ��'
        });
    } else {
       // res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // ��ȡǰ̨ҳ�洫�����Ĳ���
            var param = req.query || req.params;

            // �������ӣ�����в���ֵ
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.insert, [param.code, param.name], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'���ӳɹ�'
                    };
                }

                // ��json��ʽ���Ѳ���������ظ�ǰ̨ҳ��
                jsonWrite(res, result);

                // �ͷ�����
                connection.release();
            });
        });
    },
    queryStocks:function(start,row,refreshStock){

        pool.getConnection(function(err, connection) {
            // �������ӣ�����в���ֵ
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.queryAll, [start,row], function(err, result) {

                refreshStock(result);
                // �ͷ�����
                connection.release();

            });
        });

    },
    updateById:function(st,code){
        pool.getConnection(function(err, connection) {
            // �������ӣ�����в���ֵ
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.updateById, [st,code], function(err, result) {
                console.dir(result);
                // �ͷ�����
                connection.release();

            });
        });
    },

    add:function(params){
        pool.getConnection(function(err, connection) {
            // �������ӣ�����в���ֵ
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.insertTrack, params, function(err, result) {
                if(err){
                    console.log(err);
                    console.log(params);
                }

                // �ͷ�����
                connection.release();

            });
        });
    }
};