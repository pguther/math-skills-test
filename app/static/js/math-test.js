var currentIndex = 0;
var testData;
var score;

$(document).ready(function(){

    $.ajax({
        url: '/generate',
        type: 'GET',
        success: function(response) {
            testData = response;
            $("#equation").text(testData["questions"][currentIndex]["equation"]);
            $("#answer").focus();
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
                score = response;
                $("div.test").html("<span>Your Score: " + score + "</span> <br/><br/><input maxlength=\"7\" type=\"text\" class=\"nameInput\" id=\"name\" placeholder=\"Name\"> <button class=\"btn\" id=\"save\">Submit to Highscore</button><form action=\"/test\"><input type=\"submit\" class=\"btn\" value=\"Restart\" /></form>");

                $("#save").click(function() {

                    scoreData = JSON.stringify({"name": $("#name").val(), "score": score})

                    $.ajax({
                        url: '/save',
                        data: scoreData,
                        type: 'POST',
                        contentType : 'application/json',
                        success: function(response) {
                            window.location.replace("/highscore");
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });

                });


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
