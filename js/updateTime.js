/**
 * Created by chongrui on 2014/10/5 0005.
 */
var updateTime = function (start, elapsed) {
    var now = new Date();
    var time;
    if(start != null) {
        time = elapsed + now.getTime() - start.getTime();
        // time = now.getTime() - start.getTime();
    }else {
        time = elapsed; // elapsed = now - start if gameover
    }
    console.log("time=",time);
    $('#time').empty().html('<code>'+Math.floor(time/1000)+'s</code>');

};
var interval_time = 0;