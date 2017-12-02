var currentIndex = 0;
var questions;

$(document).ready(function(){


    questions = [
        {
            "equation" : "5 + 1",
            "answer" : 6,
            "userInput" : ""
        },
        {
            "equation" : "2 + 2",
            "answer" : 4,
            "userInput" : ""
        },
        {
            "equation" : "3 - 1",
            "answer" : 2,
            "userInput" : ""
        }
    ];

    $("#equation").text(questions[currentIndex]["equation"]);
    var done = function() {
        var dataString = JSON.stringify(questions);
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
        if (currentIndex < questions.length - 1) {
            questions[currentIndex]["userInput"] = $("#answer").val();
            $("#answer").val("");
            currentIndex = currentIndex + 1;
            $("#equation").text(questions[currentIndex]["equation"]);
            $("#answer").focus();
        } else {
            questions[currentIndex]["userInput"] = $("#answer").val();
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
