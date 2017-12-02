from app import app
from flask import render_template
import random
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
    return json


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/test')
def test():
    return render_template('test.html')


@app.route('/score', methods=['POST'])
def score():
    print(request.json)
    return str(request.json)


@app.route('/generate')
def stuff():
    return jsonify(makeDict())
