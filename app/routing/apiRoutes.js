// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

/**
 * Friend Finder
 * Created by: Sandra Rodriguez
 * UCF Bootcamp 2017
 */

var friendsList = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================
var returnMatch = [];

module.exports = function(app) {
    /**
     * API GET Requests
     */
    // displays the friends list data file
    app.get("/api/friends", function(req, res) {
        res.json(friendsList);
    });

    /**
     * API POST Requests
     */
    app.post("/api/friends", function(req, res) {
        var newfriendscores = convertScores(req.body.scores);


        console.log("new friend converted scores = ", newfriendscores);

        var scoreIndex = 0;
        var totalScoreDiff = 200;
        var tempDiff = 0;
        var thisScoreDiff = 0;
        var friendmatched = [];
        console.log("current list length= ",friendsList.length);
        // find a the best match
        if(friendsList.length > 0)
        {
            for(j = 0; j < friendsList.length; j++)
            {
                console.log("Database Friend Comparing = ", friendsList[j].name);

                var matchedFriendScore = convertScores(friendsList[j].scores);
                console.log("matched friend converted scores = ", matchedFriendScore);

                tempDiff = 0;  // reset
                console.log("friendsList[j].scores.length = ", friendsList[j].scores.length);
                console.log("matchedFriend scores length = ", matchedFriendScore.length);
                console.log()

                // compare each friend's score to the new friend's score
                for (i = 0; i < matchedFriendScore.length; i++)
                {
                    console.log("newfriendscores.score = ", newfriendscores[i]);
                    console.log("matchedFriendScore[i].score = ", matchedFriendScore[i]);

                    thisScoreDiff = Math.abs(newfriendscores[i] - matchedFriendScore[i]);
                    console.log("thisScoreDiff", thisScoreDiff);
                    tempDiff = tempDiff + thisScoreDiff;
                    console.log("tempDiff = ", tempDiff);
                }
                console.log("totalScoreDiff", totalScoreDiff);
                 // check if this difference is less that the previous difference
                if(tempDiff < totalScoreDiff)
                {
                    console.log("New friend is less");
                    totalScoreDiff = tempDiff;  // replace it
                    friendmatched = [];  // clear it
                    friendmatched.push(friendsList[j]);
                }
                console.log("FriendMatch = ",friendmatched );
                console.log("J = ", j);
                console.log("Difference = ",totalScoreDiff);
            }

            // add new friend to the database
            console.log("PUSHING TO DATABASE");
            friendsList.push(req.body);
            console.log("Sending match = ", friendmatched);
            res.json(friendmatched);
        }
        else
        {
            friendsList.push(req.body);
            res.json(false);
        }

    });
};

function convertScores(array)
{
    var convertedArray = [];

    for (var i = 0; i < array.length; i++){

        //convert array string to integer
        var scoreInteger = parseInt(array[i]);

        //push to temp array
        convertedArray.push(scoreInteger);
    }

    return convertedArray;
}