/**
 * Created by chongrui on 2014/9/25 0025.
 */
// Step 1. initialize the board
var buildBoard = function (row,col) {
    //    Initially Creating 8X8 table
    //    Using jQuery Code:
    //    var table = $('<table></table>').addClass('table');
    //    for(var i = 0; i < 8; i++){
    //        var row = $('<tr></tr>').addClass('row');
    //        row.each( function() {
    //            for (var j = 0 ; j < 8; j++){
    //                var cells = $('<td></td>').addClass('cell');
    //                $(this).append(cells);
    //                cells.each(function(){
    //                    var button = $('<button class="btn-normal btn-default btn-lg" type="button"></button>');
    //                    $(this).append(button);
    //                });
    //            }
    //        })
    //        table.append(row);
    //    }
    //    $("#divBoard").append(table);
    // Using JavaScript Code:
    var divBoard = document.getElementById('divBoard');
    // creates a <table> element
    var tbl = document.createElement('table');
    // creating all cells
    for (var i = 0; i < row; i++) {
        // creates a table row
        var table_row = document.createElement('tr');
        for (var j = 0; j < col; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement('td');
            // var cellText = document.createTextNode("cell in row "+i+", column "+j);
            var button = document.createElement('button');
            cell.appendChild(button);
            table_row.appendChild(cell);
            table_row.className = 'row';
            cell.className = 'cell';
            button.className = 'btn-normal btn-default btn-lg'
        }
        // add the row to the end of the table body

        tbl.appendChild(table_row);
    }
    // appends <table> into <body>

    divBoard.appendChild(tbl);
};
// Step 2. setBomb
// 1. produce a random number: numRan
// 2. ensure that the random number is not already repeated => maintain an already_list
//      isAlreadyInList Function
// 3. for each cell or box, if (index == numRan) then set random seed
// 4. repeat 1,2,3 until reaches max_size
var setBomb = function (row,col,bombSize) {
    //alert("set bomb");
    var bomb_list = []; // maintain already_list
    var numRandom;
    var maxSize = row*col;

    // var numRandom = produce_random_number(64); ERROR if outside for-loop
    // while size < max_bomb_size
    for (var i = 0; i < bombSize; i++) {
        numRandom = produce_random_number( maxSize );
        while (isAlreadyInList(numRandom, bomb_list)) {
            numRandom = produce_random_number( maxSize );
        }
        bomb_list.push(numRandom); // INSERT INTO THE already_list WHENEVER THERE'S IS A NEW ITEM!
        console.log(bomb_list); // for debugging
        buryBomb(numRandom);
    }
    console.log(bomb_list); // for debugging
    //  [9, 51, 8, 24, 33, 3, 5, 44, 60, 42] random

    // displayBomb();



};
// generate a random number from 0 to max
function produce_random_number(max) {
    return Math.floor(Math.random() * max);
}
// HELPER FUNCTION: isAlreadyInList

function isAlreadyInList(numRandom, bomb_list) {
    for (var num in bomb_list) {
        // console.log("num="+num); // for debugging
        console.log('numRandom=' + numRandom); // for debugging
        if (numRandom == bomb_list[num]) {
            console.log(numRandom + ' is already in the list');
            return true;
        }
    }
    return false;
}
// bury the random seed
function buryBomb(numRandom) {
    // note that bomb cannot be set repeatedly!!!
    // numRandom cannot be repeated => maintain an already_list
    $('.cell').each(function (index) {
        if (index == numRandom) {
            $(this).append('<span class="has_bomb"></span>'); // bury the random seed
        }
    });
}
// display bomb
var displayBomb = function () {
    var cells = $('td.cell');
    cells.find('.has_bomb').siblings('.btn-normal').removeClass('btn-normal btn-default')
        .addClass('btn btn-bomb btn-danger btn-lg');
//        .html('<img id="imgBomb" src="images/glyphicons_289_bomb.png" class="bomb">');
};
// display label
function displayLabel(label,event) {
    var button = $('button');
    button.each(function (index) {
        if(event.target == this) {
            console.log('label=', label); // for debugging
            $(this).html('<span>'+label+'</span>');
        }
    });

}