/**
 * Created by chongrui on 2014/10/5 0005.
 */
var Cells = function(is_bomb, is_cleared, is_connected, is_marked, label, x, y){
    this.is_bomb = is_bomb;
    this.is_cleared = is_cleared;     // decide whether or not you've won  ---> all cleared
    this.is_connected = is_connected;
    this.is_marked = is_marked;       // mark the flag
    this.label = label;
    this.x = x;
    this.y = y;
};