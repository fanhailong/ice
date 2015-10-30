/**
 * Created by Administrator on 2015/10/12.
 */
var stock = {
    insert: 'insert into stock(code,name) values(?,?)',
    queryAll: 'select code,name,st from stock where st is not null limit ?,?',
    updateById: 'update stock set st=? where code=?',
    queryStock: 'select code,name from stock limit ?,?',
    insertTrack: 'insert into stock_track(stock_code,stock_name,opening_price,closing_price,current_price,max_price,min_price,buy_price,' +
    'sale_price,make_count,make_price,buy1_count,buy1_price,buy2_count,buy2_price,buy3_count,buy3_price,buy4_count,buy4_price,buy5_count,' +
    'buy5_price,sale1_count,sale1_price,sale2_count,sale2_price,sale3_count,sale3_price,sale4_count,sale4_price,sale5_count,sale5_price,' +
    'happen_time) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
};

module.exports = stock;