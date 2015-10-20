/**
 * Created by Administrator on 2015/10/12.
 */
var stock = {
    insert:'insert into stock(code,name) values(?,?)',
    queryAll: 'select code,name from stock'
};

module.exports = stock;