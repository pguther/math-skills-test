from app import app
from flask import render_template
import random
import time
from flask import jsonify
from flask import request


def makeDict():
    equationList = []
    correctAnswerList = []
    operators = ["+", "-", "*"]
    numbers = [0,1,2,3,4,5,6,7,8,9]
    json =[]
    for i in range(10):
        operator = operators[random.randrange(0,3)]
        number1 = numbers[random.randrange(0,9)]
        number2 = numbers[random.randrange(0,9)]
        eq = (str(number1) + " " + operator + " " + str(number2))
        answer = (eval(eq))
        equationList.append(eq)
        correctAnswerList.append(answer)
    for i in range(len(equationList)):
        json.append({"equation": equationList[i], "answer": correctAnswerList[i], "userInput": None})
    timeAndQuestions = {"startTime": time.time(), "questions": json}
    return timeAndQuestions


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/test')
def test():
    return render_template('test.html')


@app.route('/score', methods=['POST'])
def score():
    correct = 0
    endTime = time.time()
    startTime = request.json["startTime"]
    totalTime = endTime - startTime
    questions = request.json["questions"]
    for question in questions:
        try:
            userInput = int(question["userInput"])
		except ValueError:
			pass
		else:
			if question["answer"] == int(question["userInput"]):
				correct += 1

	return str((correct / totalTime) * 100)


@app.route('/generate')
def stuff():
    return jsonify(makeDict())

















