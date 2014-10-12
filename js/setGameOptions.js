/**
 * Created by chongrui on 2014/10/3 0001.
 */
var setGameOptions = function (row,col,bombSize) {
    var new_row = parseInt(row);
    var new_col = parseInt(col);
    var new_bombSize = parseInt(bombSize);
    var new_fieldSize =  new_row * new_col;

    // Change rows and cols
    $('#changeRowCol').click(function(){
        // clear the board
        $('#divBoard').html("");
        // Bug: last error msg was not cleared at next click loop
        $('#alertMsg').html("");

        // get value from all inputs
        new_row = parseInt($('input[name="inputRow"]').val());
        new_col = parseInt($('input[name="inputCol"]').val());
        new_fieldSize = new_row * new_col;
        // console.log("row=",new_row);console.log("col=",new_col);console.log("new_fieldSize=",new_fieldSize);

        // if meets the requirement, submit data; close modal; redraw the board
        if( new_row >= 8 && new_row <= 40 && new_col >= 8 && new_col <=30 ){
            // when the event happens again, it performs similar to a while-loop
            // if the last input was error, which removes the attribute, then needs to check that attribute's existence
            // or else => BUG: input correct data again but the modal remains failing to toggle
            $('#newFieldSize').html('<code>'+new_fieldSize+'</code>');
            var attr = $(this).attr('data-dismiss');
            // console.log("attr=",attr); // for debugging

            // BUG: how to decide whether element has attribute
            if(typeof attr == typeof undefined || attr == false){
                console.log("data-dsmiss button is OFF");
                $(this).attr("data-dismiss","modal");
            }

            // reset time count
            // Note if input invalid number and just close, should resume the counting!
            $('#time').empty().html('<code>0s</code></span>');
            // stop counting time
            console.log("interval_time in setOption=",interval_time); // for debugging
            clearInterval(interval_time);

            // if all inputs are valid, then redraw the board;reset bomb;register myEvent again
            buildBoard(new_row,new_col);
            setBomb(new_row,new_col, new_bombSize);
            myEvent(new_row,new_col, new_bombSize);
        }else{
            // don't close modal
            $(this).removeAttr("data-dismiss");
        }

        // Output input error message
        if(!$.isNumeric(new_row) || !$.isNumeric(new_col) || !new_col || !new_row){
            $(this).removeAttr("data-dismiss");
            $("#alertMsg").append("Please input a valid number!!")
                .css('color', "red");
        }else if(new_row<8){
            $(this).removeAttr("data-dismiss");
            $("#alertMsg").append("The row number should be greater than 8!")
                .css('color',"red");
        }else if(new_row>40) {
            $(this).removeAttr("data-dismiss");
            $("#alertMsg").append("The row number should be less than 40!")
                .css('color', "red");
        }else if(new_col<8){
            $(this).removeAttr("data-dismiss");
            $("#alertMsg").append("The col number should be greater than 8!")
                .css('color',"red");
        }else if(new_row>40) {
            $(this).removeAttr("data-dismiss");
            $("#alertMsg").append("The col number should be less than 40!")
                .css('color', "red");
        }
    });

    // Change Number of Bombs
    $('#changeBomb').click(function(){
        // stop current counting and clear the time count
        // clearInterval(interval_time);

        // clear the board
        $('#divBoard').html("");
        $('#newBombSize').html("");
        // Bug: last error msg was not cleared at next click loop
        $('#alertMsg').html("");
        $('#alertMsgBomb').html("");
        new_bombSize = parseInt($('input[name="inputBomb"]').val());
        console.log("new_fieldSize=",new_fieldSize);


        if( new_bombSize >= 1 && new_bombSize <= new_fieldSize -1 ){
            // if input is valid, reset the bomb size;
            $('#newBombSize').html('<code>'+new_bombSize+'</code>');
            // reset time count
            // Note if input invalid number and just close, should resume the counting!
            $('#time').empty().html('<code>0s</code></span>');
            // stop counting time
            console.log("interval_time in setOption=",interval_time); // for debugging
            clearInterval(interval_time);

            var attr = $(this).attr('data-dismiss');
            // console.log("attr=",attr); // for debugging
            // BUG: how to decide whether element has attribute
            if(typeof attr == typeof undefined || attr == false){
                console.log("data-dsmiss button is OFF");
                $(this).attr("data-dismiss","modal");
            }
            // if all inputs are valid, then redraw the board;reset bomb;register myEvent again
            buildBoard(new_row,new_col);
            setBomb(new_row,new_col,new_bombSize);
            myEvent(new_row,new_col,new_bombSize);
            // displayBomb();
        }else{
            // don't close modal
            $(this).removeAttr("data-dismiss");
        }
        // Output input error message
        if(!$.isNumeric(new_bombSize) || !bombSize){
            $("#alertMsgBomb").append("Please input a valid number!!")
                .css('color', "red");
        }else if(new_bombSize<1){
            $("#alertMsgBomb").append("The bomb size should be at least greater than 1.")
                .css('color', "red");
        }else if(new_bombSize>=new_fieldSize){
            $("#alertMsgBomb").append("The bomb size should be less than the minefield size.")
                .css('color', "red");
        }


    });


    // Restart Game
    $(".restart").click(function(){
        // clear existing data
        $('#divBoard').html("");
        $('#newBombSize').html('<code>10</code>');
        $('#newFieldSize').empty().html('<code>64</code>');
        $('#bombLeft').empty().html('<code>10</code>');
        // reset time count
        $('#time').empty().html('<code>0s</code></span>');
        // stop counting time
        console.log("interval_time in setOption=",interval_time); // for debugging
        clearInterval(interval_time);
        // redraw the board
        buildBoard(8,8);
        setBomb(8,8,10);
        myEvent(8,8,10);

    });

    // Display all bombs option
    $("#displayAllBombs").click(function(){
        displayBomb();
    });

    $("#personalBest").click(function(){
        PersonalScores.print_scores();
        if (PersonalScores.has_scores()) {
            PersonalScores.find_best_scores();
        } else {
            alert("Sorry but currently you don't have scores!");
        }


    });


};
