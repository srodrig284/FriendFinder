/**
 * Friend Finder
 * Created by: Sandra Rodriguez
 * Date: April 25, 2017
 */

// Initialize Materialize select statement and modal functionality
$('select').material_select();



// Capture the form inputs
$("#submit-answers").on("click", function(){
    // Prevent form from submitting
    event.preventDefault();

    // Create an object for the user's data
    var userData = {
        name: $("#name").val(),
        photo: $("#photo").val(),
        scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val()]
    };


    // Grab the URL of the website
    var currentURL = window.location.origin;

    // AJAX post the data to the friends API.
    $.post(currentURL + "/api/friends", userData, function(data){

        // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        $("#matchName").text(data.name);
        $('#matchImg').attr("src", data.photo);

        // Show the modal with the best match
        displayModal(data);

    });


});

/**
 *
 * @param friendtMatch
 */
function displayModal(friendtMatch) {
    console.log('modal function triggered');

    $(".modal-body").append('<p>Your match is ' + friendtMatch.name + '!</p>');
    $(".modal-body").append('<img src="' + friendtMatch.photo + '">');

    $('#resultsModal').modal('open');
}