/**
 * Created by chongrui on 2014/10/6 0006.
 */
var PersonalScores = (function() {
    var scores = [];
    // if win, add the time to the scores array
    scores.add = function (time) {
        alert("Your score is "+Math.floor(time/1000)+"s");
        scores.push(time);
    };
    // if click on the personal best button, display best score
    scores.find_best_scores = function () {
        var large = 0;
        for (var k = 1; k < scores.length; k++){
            if (scores[large]>scores[k]) {
                large = k;
            }
        }
        alert ("Your best score is "+Math.floor(scores[large]/1000)+"s");
    };
    scores.print_scores = function () {
        console.log(scores);
    };
    scores.has_scores = function () {
        return scores.length > 0;
    };

    return scores;
}) ();
