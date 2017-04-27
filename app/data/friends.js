// ===============================================================================
// DATA
// Below data will hold all of the waitlist tables.
// Initially we just set it equal to a "dummy" customer.
// But you could have it be an empty array as well.
// ===============================================================================

var friendsArray = [
    {
        name: "Halle Berry",
        photo: "http://www.eurweb.com/wp-content/uploads/2016/07/halle-berry-head-face.jpg",
        scores: ['1','2','3','4','5','4','3','2','1','3']
    },
    {
        name: "John Jones",
        photo: "http://www.eurweb.com/wp-content/uploads/2016/07/halle-berry-head-face.jpg",
        scores: ['5','4','3','1','2','3','4','2','5','4']
    },
    {
        name: "Betty Boop Jones",
        photo: "http://www.eurweb.com/wp-content/uploads/2016/07/halle-berry-head-face.jpg",
        scores: ['1','1','1','1','1','1','1','1','1','1']
    }
];


// Note how we export the array. This makes it accessible to other files using require.
module.exports = friendsArray;
