/**
 * Created by chongrui on 2014/9/28 0028.
 */
var myEvent = function(row,col,new_bombSize){
    // Step 3. calculateLabel
    var cells = calculateLabel(row,col);
    console.log("cells in myEvent is: ",cells);
    // console.log("new_bomb=",new_bombSize); // for debugging

    // Initialization
    var gameOver = false;
    var allClear = false;
    // variables for indication of # of bombs left
    var number_of_bombs = parseInt(new_bombSize);
    var number_of_spaces_marked_as_bombs = 0;
    var number_of_bombs_left = number_of_bombs - number_of_spaces_marked_as_bombs;
    // variables for counting time
    var number_of_clicks = 0;
    var start;
    var elapsed = 0;

/*Part II. Game Event*/
/*
Open step:
focus on current single cell only => traverse using parent and children
Bind with mousedown
    if left click a normal btn:
        if is marked, no reaction
        else if is a bomb, Game Over!
            else
                if click on a btn adjacent to a bomb => label > 0 :
                    set cleared; replace it with label
                else [the button is not adjacent to any bombs => label = 0]
                        set cleared; replace it with a blank btn
                        call check_neighbors(this,neighbor) for 8 directions???
                        // Though the cell is not bomb and not adjacent to bomb, neighbors can be marked or adj to bomb
                        // put the part of check neighbors in Refresh step

    else right click / shift click a normal btn:
        if click on btn-normal, mark as flag; replace with btn-flag;
        if click on btn-flag, un-mark it and replace with btn-normal;

    after each click,
    1. recursively check all connected neighbors from 8 directions: blank & label
    push current btn(target) into stack
      while(stack!=null){
        current = stack.pop()
        if current has 8 neighbors and that neighbor is not bomb, not cleared, not marked{
          // may still either be blank or label
          set the neighbor to be connected // refresh step will display every connected blank or button
          push the neighbor into stack
        }
      }
    2. decide if is_all_cleared --> result
    if all cleared,
        unbind mousedown, mouseup
        alert "You Won"

Refresh step:
check all cells, use .each + parent/siblings would still be fine.
Bind with mouseup => every click with do a click_down event and a refresh event
    for each button that is connected:
      if is blank button, display it and set it to be cleared
      if is label button, display label and set it to be cleared

    // put game over function in click step right after clicking on bomb
    check if is gameover, GO!
    // check if all cleared after each click => still in click step
    check if is all cleared, You Won!

*/



    // Step 4. userClick
    $('body').bind('contextmenu', function() {
        return false;
    });

    // Game Process
    // While not all cleared and not click on bombs, keep refreshment
    var mainGameProcess = function (gameOver) {
        alert("Game Start");
        $(":button").on({
            mousedown: buttonClick,
            mouseup: refreshBoard
        });

        // while is not allowed in events
//        do{}while(!gameOver);



    };
    mainGameProcess();


    // HOW TO MAP THE BUTTON CLICKED WITH BOARD_OBJECTS???
    // TO KNOW WHICH BUTTON IS CLICKED AND THEREFORE GET ITS INDEX IN THE BUTTON SERIES
    // THIS INDEX OR which_index COULD BE MAPPED WITH THE index INSIDE cell_objects
    // in a jQuery object

    function buttonClick(event) {
        event.preventDefault();

        // after click on a btn, how to know which button is clicked?
        // based on the button that was clicked, get the mapped data from cell_objects
        // may click on img in Chrome???????
        var target = event.target;
        // console.log("event.target=", $(event.target).parent());  // for debugging
        // console.log("target=",target);  // for debugging

        var which_index = find_which_button(event, target);
        console.log("# " + which_index + " is clicked");

        if (event.button == 0) {
            // if click on flag, no reaction!
            // if is already cleared, do nothing with right or left click
            if (cells[which_index].is_marked == 1 || cells[which_index].is_cleared == 1) {
                console.log("should not react!");
                // intentionally no reaction
            } else {
                
                // click on any btn that this not cleared should increase count for clicks
                // should including first click that is to mark as flag
                number_of_clicks += 1;
                console.log("click time=",number_of_clicks);
                // at the first click, start counting time!
                if(number_of_clicks == 1){
                    start = new Date();
                    interval_time = setInterval(function(){updateTime(start,elapsed);},1000);
                    console.log("interval_time=",interval_time); // for debugging
                }
                // if click on bomb, game over!
                if (cells[which_index].is_bomb == 1) {
                    gameOver = true;
                    // stop counting time and display bomb
                    clearInterval(interval_time);
                    displayBomb();
                    $(":button").each(function(){
                        $(this).unbind("mousedown");
                        $(this).unbind("mouseup");
                    });
                    alert("game over");
                } else {
                    // if click on a btn adjacent to a bomb: set cleared; replace it with label
                    if (cells[which_index].label > 0 && cells[which_index].is_marked == 0) {
                        cells[which_index].is_cleared = 1;
                        $(this).removeClass('btn-normal')
                            .addClass('btn-blank active');
                        displayLabel(cells[which_index].label, event);
                        $(this).off(event);
                    } else if (cells[which_index].label == 0 && cells[which_index].is_marked == 0) {
                        // the button is not adjacent to any bombs, just set cleared; replace it with a blank btn
                        cells[which_index].is_cleared = 1;
                        $(this).removeClass('btn-normal').addClass('btn-blank active');
                        // displayLabel(cells[which_index].label,event); // for debugging
                        $(this).off(event);

                    }
                }
            }
        }

        else if (event.button == 2) {
            if (cells[which_index].is_cleared == 1) {
                // if is already cleared, do nothing with right or left click
                // do nothing
            } else {
                // click on any btn that this not cleared should increase count for clicks
                // should including first click that is to mark as flag
                number_of_clicks += 1;
                console.log("click time=",number_of_clicks);
                // at the first click, start counting time!
                if(number_of_clicks == 1){
                    start = new Date();
                    interval_time = setInterval(function(){updateTime(start,elapsed)},1000);
                    console.log("interval_time=",interval_time); // for debugging
                }

                if (cells[which_index].is_marked == 0) {
                    // if right click on btn-normal, mark as flag; replace with btn-flag;
                    cells[which_index].is_marked = 1;
                    $(this).removeClass('btn-normal').addClass('btn-flag glyphicon glyphicon-flag');

                    // count number of bombs left
                    number_of_spaces_marked_as_bombs += 1;
                    number_of_bombs_left = number_of_bombs - number_of_spaces_marked_as_bombs;
                    $("#bombLeft").empty().html('<code>'+number_of_bombs_left+'</code>');
                }
                // if click on btn-flag, un-mark it and replace with btn-normal;
                else if (cells[which_index].is_marked == 1) {
                    cells[which_index].is_marked = 0;
                    // if right click on a displayed bomb?
                    $(this).removeClass('btn-flag btn-flag glyphicon glyphicon-flag').addClass('btn-normal').html('');

                    // delete previous count of mark as bomb
                    number_of_spaces_marked_as_bombs -= 1;
                    number_of_bombs_left = number_of_bombs - number_of_spaces_marked_as_bombs;
                    $("#bombLeft").empty().html('<code>'+number_of_bombs_left+'</code>');
                }
            }

        }

        //  after each click,
        // 1. recursively check all connected neighbors from 8 directions: both blank & label
        // push current btn(target) into stack
        // while(stack!=null){
        //  current = stack.pop()
        //   if current has 8 neighbors and that neighbor is not bomb, not cleared, not marked{
                // may still either be blank or label
        //        set the neighbor to be connected // refresh step will display every connected blank or button
        //        push the neighbor into stack
        //    }
        // }

        if(cells[which_index].label == 0 && cells[which_index].is_cleared == 1)
            find_all_adjacent_neighbors(which_index,target);

        // console.log("cells after connection=",cells); // for debugging

        // after each click, check to see if running out of time
        var now = new Date();
        var time = now.getTime() - start.getTime();
        console.log("time after each click=",time);
        // if over 999 seconds, alert and unbind the event
        if (time > 999*1000){
            clearInterval(interval_time);
            alert("out of time!");
            gameOver = true;
            $(":button").each(function(){
                $(this).unbind("mousedown");
                $(this).unbind("mouseup");
            });
        }

        // 2. decide if is_all_cleared --> allClear
        //    if all cleared,
        //        unbind mousedown, mouseup
        //    alert "You Won"
        allClear = is_all_cleared(cells);
        if (allClear) {
            $(":button").each(function(){
                $(this).unbind("mousedown");
                $(this).unbind("mouseup");
            });
            // stop counting time and display info
            clearInterval(interval_time);
            alert("You won!");
            // add the current time score to the PersonalScores object and display it;
            PersonalScores.add(time);
            PersonalScores.find_best_scores();
            PersonalScores.print_scores();
        }


    }

function find_all_adjacent_neighbors(index,target){
    var neighbor,neighbor_index;
    var stack = new Array();
    var current;
    var x,y;

    stack.push(target,index);
    console.log("initial stack.length=",stack.length);
    while(stack.length!=0){
        index = stack.pop();
        console.log("index=",index);
        current = stack.pop();
        console.log("current=",current);
        x = cells[index].x;
        y = cells[index].y;
        if(cells[index].label!=0){
            // if current is a label, do nothing? continue is unnecessaryu h
            console.log("a label")
        }else if(cells[index].label ==0){
            // left
            if (y - 1 >= 0                                    ){
                neighbor = $(current).parent().prev().children();
                console.log("left=",neighbor); // for debugging
                neighbor_index = index - 1;
                check_neighbor_blank(stack,neighbor,neighbor_index,cells);
            }

            // left down
            if (x + 1 <= row - 1 && y - 1 >= 0        ){
                neighbor =$(current).parent().parent().next().children().eq(index % col - 1).children();
                console.log("left down=",neighbor); // for debugging
                neighbor_index = index + col - 1;
                check_neighbor_blank(stack,neighbor,neighbor_index,cells);
            }

            // down
            if (x + 1 <= row - 1                      ) {
                neighbor = $(current).parent().parent().next().children().eq(index % col).children();
                console.log("down=",neighbor); // for debugging
                neighbor_index = index + col;
                check_neighbor_blank(stack,neighbor,neighbor_index,cells);
            }

            // down right
            if (x + 1 <= row - 1 && y + 1 <= col - 1 ) {
                neighbor = $(current).parent().parent().next().children().eq(index % col + 1).children();
                neighbor_index = index + col + 1;
                check_neighbor_blank(stack,neighbor,neighbor_index,cells);
                console.log("down right blank=",neighbor);

            }

            // right
            if (y + 1 <= col - 1                      ) {
                neighbor = $(current).parent().next().children();
                neighbor_index = index + 1;
                check_neighbor_blank(stack,neighbor,neighbor_index,cells);
                console.log("right blank=",neighbor);
            }

            // upper right
            if (x - 1 >= 0     && y + 1 <= col - 1    ) {
                neighbor = $(current).parent().parent().prev().children().eq(index % col + 1).children();
                console.log("upper right=",neighbor); // for debugging
                neighbor_index = index - col + 1;
                check_neighbor_blank(stack,neighbor,neighbor_index,cells);
            }

            // upper
            if (x - 1 >= 0                       ){
                neighbor =$(current).parent().parent().prev().children('td').eq(index % col).children();
                console.log("upper=",neighbor); // for debugging
                neighbor_index = index - col;
                check_neighbor_blank(stack,neighbor,neighbor_index,cells);
            }

            // left upper
            if (x - 1 >= 0     && y - 1 >= 0     ){
                neighbor = $(current).parent().parent().prev().children().eq(index % col - 1).children();
                console.log("left upper=",neighbor); // for debugging
                neighbor_index = index - col - 1;
                check_neighbor_blank(stack,neighbor,neighbor_index,cells);
            }

        }
    }

}

    function refreshBoard(){
        $(":button").each(function(index){
            if (cells[index].is_connected){
                $(this).removeClass('btn-normal').addClass('btn-blank active');
                // set cleared;
                cells[index].is_cleared = 1;
                if(cells[index].label>0){
                    $(this).html('<span>'+cells[index].label+'</span>');
                }
            }
        });
    }


};

function find_which_button (event,target){
    var which_index = -1;
    // if the event.target points to an img, transform to its parent button: .is()???

    $(":button").each(function(index){
        if (this == target) {
            which_index = index;
            return false;
        }
    });
//        console.log("which_index = ",which_index);  // for debugging
    return which_index;
}

function check_neighbor_blank(stack,neighbor,neighbor_index,cells) {
    if (cells[neighbor_index].is_bomb == 0 && cells[neighbor_index].is_cleared == 0
        && cells[neighbor_index].is_connected == 0 && cells[neighbor_index].is_marked == 0
       /* && cells[neighbor_index].label>=0*/ ){
        cells[neighbor_index].is_connected = 1;
        stack.push(neighbor);
        stack.push(neighbor_index);
    }
}
function is_all_cleared(cells){
    var key;
    for(key = 0; key < cells.length; key++){
        // console.log("key in all_cleared=",key); // for debugging
        if (cells[key].label >= 0 && cells[key].is_cleared == 0){
            console.log("Not yet!");
            return false;
        }
    }
    console.log("All cleared!");
    return true;
}


