/**
 * Created by chongrui on 2014/9/28 0028.
 */

// Step 3. calculateLabel
// 1. map 1d to 2d =  array[x][y]
    // $("cell") is a 1-dimensional jquery objects, TO USE check_neighbor,you still need to convert to 2-d objects.
    // HOWEVER,if using parent() and sibling(), etc to traverse and find bombs or flags, etc, no need to do so!!!
// 2. for each arr in array
//      check 8 directions = 
//        x,y-1
//        x+1,y-1
//        x+1,y
//        x+1,y+1
//        x,y+1
//        x-1,y+1
//        x-1,y
//        x-1,y-1
//          if there is a bomb => 3. isBomb(index? a[x][y]?)
//            label++
// 4. display label
var calculateLabel = function (row,col) {
    var total = row * col;
    var cells = [];

    // use label array to temporarily store the computed labels of adjacent bombs
    var label = [];
    // cells object is one dimensional only
    var index = 0;
    var label_count = 0;
    // get the array of cells indicating bombs
    // if has bomb then cells[i] == 1; else cells[i] == 0
    var cells_jQuery_objects = $('td.cell');

    // construct cells class -> properties
    construct_cell_objects(cells,row,col);
    // console.log("cells in cal is: ",cells); // for debugging
    // cells = $.makeArray(cells_jQuery_objects);

    // if has_bomb class, set is_bomb to 1
    getIsBombProperty(cells_jQuery_objects,cells);
    // console.log('cells=',cells); // for debugging

    // for each cell,if is not a bomb, check neighbors from 8 directions
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            if (cells[index].is_bomb == 1) {
                // console.log('This is a bomb');
                label[index] = - 1;
                cells[index].label = - 1;
                index++;
            } else {
                // console.log('will check neighbor');
                label_count = calculate_neighbor_label(cells, cells[index].x, cells[index].y, row,col,index);
                label[index] = label_count;
                cells[index].label = label_count;
                index++;
            }
        }
    }
    return cells;
};

// Construct the Object type cell objects, which contains essential info. on the board
function construct_cell_objects(cells,row,col) {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            cells.push( new Cells(
                0, // is_bomb= 0,
                0, // is_cleared= 0,
                0, // is_connected=0,
                0, // is_marked= 0,
                0, // label= 0,
                i, // x = i,
                j  // y = j
            ));
        }
    }
}

// map from jQuery Objects to 1-d JS Objects
function getIsBombProperty(cells_jQuery_objects,cells) {
    cells_jQuery_objects.each(function (index) {
        // console.log("result["+index+"]=",$(this).children().hasClass("has_bomb")); // for debugging
        var has_bomb = $(this).children().hasClass('has_bomb');
        if (has_bomb) {
            cells[index].is_bomb = 1;
        } else {
            //console.log(index);
            cells[index].is_bomb = 0;
        }
    });
}


function calculate_neighbor_label(cells, x, y, row, col, index) {
    var label = 0;

    if (                    y - 1 >= 0       && cells[index - 1].is_bomb       == 1) label += 1;
    if (x + 1 <= row - 1 && y - 1 >= 0       && cells[index + col - 1].is_bomb == 1) label += 1;
    if (x + 1 <= row - 1                     && cells[index + col].is_bomb     == 1) label += 1;
    if (x + 1 <= row - 1 && y + 1 <= col - 1 && cells[index + col + 1].is_bomb == 1) label += 1;
    if (                    y + 1 <= col - 1 && cells[index + 1].is_bomb       == 1) label += 1;
    if (x - 1 >= 0       && y + 1 <= col - 1 && cells[index - col + 1].is_bomb == 1) label += 1;
    if (x - 1 >= 0                           && cells[index - col].is_bomb     == 1) label += 1;
    if (x - 1 >= 0       && y - 1 >= 0       && cells[index - col - 1].is_bomb == 1) label += 1;
    return label;
}
