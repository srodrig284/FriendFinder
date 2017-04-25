// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

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
        var newfriend = req.body;

        var scoreIndex = 0;
        var totalScoreDiff = 200;
        var tempDiff = 0;
        var thisScoreDiff = 0;
        var friendmatched = [];

        // find a the best match
        if(friendsList > 0)
        {
            $.each(friendsList, function(index, value){
                tempDiff = 0;  // reset
                // compare each friend's score to the new friend's score
                for (i = 0; i > value.scores.length; i++)
                {
                    thisScoreDiff = newfriend.scores[index] - value.scores;
                    if (thisScoreDiff < 0)
                    { // must be negative, make it positive
                        thisScoreDiff = thisScoreDiff * -1;
                        tempDiff = tempDiff + thisScoreDiff;
                    }
                }
                 // check if this difference is less that the previous difference
                if(tempDiff < totalScoreDiff)
                {
                    totalScoreDiff = tempDiff;  // replace it
                    friendmatched = [];  // clear it
                    friendmatched.push(friendsList[index]);
                }
            });
            // add new friend to the database
            friendsList.push(newfriend);
            res.json(friendmatched);
        }
        else
        {
            res.json(false);
        }

    });
};
