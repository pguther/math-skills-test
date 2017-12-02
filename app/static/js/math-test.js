var currentIndex = 0;
var testData;

$(document).ready(function(){

    $.ajax({
        url: '/generate',
        type: 'GET',
        success: function(response) {
            testData = response;
            $("#equation").text(testData["questions"][currentIndex]["equation"]);
        },
        error: function(error) {
            console.log(error);
        }
    });


    var done = function() {
        var dataString = JSON.stringify(testData);
        $.ajax({
            url: '/score',
            data: dataString,
            type: 'POST',
            contentType : 'application/json',
            success: function(response) {
                alert(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    var submitAnswer = function() {
        if (currentIndex < testData["questions"].length - 1) {
            testData["questions"][currentIndex]["userInput"] = $("#answer").val();
            $("#answer").val("");
            currentIndex = currentIndex + 1;
            $("#equation").text(testData["questions"][currentIndex]["equation"]);
            $("#answer").focus();
        } else {
            testData["questions"][currentIndex]["userInput"] = $("#answer").val();
            $("#answer").val("");
            $("#equation").text("done");
            $("#answer").focus();
            done();
        }
    }

    $("#next").click(function(){
        submitAnswer();
    });

    $("#answer").keyup(function(event) {
        var code = (event.keyCode ? event.keyCode : event.which);
        if(code == 13) { //Enter keycode
            submitAnswer();
        }
    });


});
