/**
 * Created by chongrui on 2014/9/25 0025.
 */
$(document).ready(function (){
    // Initially has 10 bombs and 8*8 table
    var bombSize = 10;
    var row = 8;
    var col = 8;

    buildBoard(row,col);

    setBomb(row,col,bombSize);

    myEvent(row,col,bombSize);

    // if GameOptions are reset, will invoke step 1,2,3 again
    setGameOptions(row, col, bombSize);




});