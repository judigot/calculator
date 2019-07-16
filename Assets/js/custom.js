var isDecimalAllowed;

var isActive;

/***********
 * INITIAL *
 ***********/
setDefaults();


/******************
 * EVENT LISTENER *
 ******************/
var buttons = document.getElementsByTagName("button");
for (var i = 0; i < document.getElementsByTagName("button").length; i++) {

    buttons[i].addEventListener("click", function () {

        var value = this.getAttribute("value");
        var className = this.getAttribute("class");
        var isNotEmpty = document.getElementById('calcufield').value ? true : false;

        if (isNotEmpty && value === "ac") {
            setDefaults();
            document.getElementById('calcufield').value = "";
        }

        if (isNotEmpty && value === "=") {
            var content = document.getElementById('calcufield').value;
            var answer;

            answer = content.replace(/×/g, ")*(");
            answer = answer.replace(/÷/g, ")/(");

            try {
                answer = eval(`(${answer})`);
            } catch (error) {
                answer = content;
            }
            document.getElementById('calcufield').value = answer;
        }


        // Normal operator
        if (value !== "ac" || value !== "=") {
            if (className === "digit") {
                inputDigit(value);
            }

            if (className === "operator") {

                // Check if input is empty
                if (document.getElementById('calcufield').value) {
                    if (!isValidDigit()) {
                        operate(value);
                        isDecimalAllowed = true;
                    }
                }
            }

            if (className === "decimal") {
                if (isNotEmpty && isDecimalAllowed) {
                    isDecimalAllowed = false;
                    document.getElementById('calcufield').value += value;
                }
            }
        }
    });
}
/******************
 * EVENT LISTENER *
 ******************/

function isValidDigit() {
    var input = document.getElementById('calcufield').value;
    var lastInput = input[input.length - 1];

    return lastInput === "." ? true : false;
}

function setDefaults() {
    isDecimalAllowed = true;
    isActive = false;
}

function inputDigit(value) {
    document.getElementById('calcufield').value += value;
}

function operate(input) {
    if (isActive == false) {
        isActive = true;
    } else {
        var content = document.getElementById('calcufield').value;
        var lastInput = content[content.length - 1];

        if (isNaN(lastInput)) {
            document.getElementById('calcufield').value = document.getElementById('calcufield').value.substring(0, document.getElementById('calcufield').value.length - 1);
        }
    }
    document.getElementById('calcufield').value += input;
}