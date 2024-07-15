const display=document.getElementById("input")
const backspace=document.getElementById("backspace-img")
const darkMode=document.getElementById("dark-mode")
const lightMode=document.getElementById("light-mode")
const github=document.getElementById("github")
const body=document.body

function output(content) {
    const existingPlaceholder = display.placeholder;
    const existingValue = display.value;
    const lastChar = existingValue.slice(-1); 
    const secondLastChar = existingValue.slice(-2);
    const isLastCharOperator = /[+\-\u00F7\u00D7]/.test(lastChar);
    const isSecondLastCharOperator = /[+\-\u00F7\u00D7]/.test(secondLastChar);


    //SOME ERROR HANDLINGS
    if (content == Ans) {
        display.value += display.placeholder;
        // If the display is empty and the user enters 'Ans', display the previous answer
    } else if (existingValue.includes(".") && content == ".") {
        return;
        // Prevent user from entering more than one decimal point
    } else if(!isNaN(existingPlaceholder) && existingValue==="" && /[+\-\u00F7\u00D7]/.test(content)) {
        display.value =existingPlaceholder+content;
        // If the display is empty and the user enters an operator, append the operator to the previous answer
    } else if(existingValue==="0" && content[0]=="0") {
        return
        // If the display is '0' and the user enters another '0', do nothing
    } else if(existingValue==="00" && content[0]=="0") {
        return
        // If the display is '00' and the user enters another '0', do nothing
    } else if (existingValue === "" && /[+\-\u00F7\u00D7]/.test(content)) {
        // If the display is empty and the user enters an operator, do nothing
        return;
    } else if (!isNaN(existingValue) && /[+\-\u00F7\u00D7]/.test(content)) {
        // Append operators if the display is not empty and the last character is a number
        display.value += content;
    } else if (existingValue === "0" && /[1-9]/.test(content)) {
        // Replace '0' if the display shows zero and user enters a non-zero digit
        display.value = content;
    } else if (existingValue === "" && content === "0") {
        // If the display is empty and '0' is entered, display '0'
        display.value = "0";
    } else if (lastChar === '.' && content === '.') {
        // Prevent multiple decimal points
        return;
    } else if (isLastCharOperator && content === '0') {
        // Prevent adding '0' after an operator
        return;
    } else if (isSecondLastCharOperator && lastChar === "0" && content === "0") {
        // Prevent adding '00' after an operator and '0'
        return;
    } else if (isSecondLastCharOperator && lastChar === "0" && /[1-9]/.test(content)) {
        // Replace '0' if the last character is an operator and the user enters a non-zero digit
        display.value = existingValue.slice(0, -1) + content;
    } else if (isLastCharOperator && /[+\-\u00F7\u00D7]/.test(content)) {
        // Replace the last operator with the new operator
        display.value = existingValue.slice(0, -1) + content;
    } else {
        // Default case: append content to the existing value
        display.value += content;
    }
}


function remove(){
    const existingValue = display.value;
    var update= existingValue.slice(0,-1);
    display.value= update
}

function clearScreen(){
    display.value=''
    display.placeholder='0'
}

function equals() {
    var expression = display.value;
    
    expression = expression.replace(/\u00F7/g, "/").replace(/\u00D7/g, "*");

    try {
        var answer = eval(expression);

        if (!isFinite(answer)) {
            throw new Error("Result is not finite");
        }
        if (expression.includes("/0")) {
            throw new Error("Division by zero");
        }
        clearScreen();
        display.placeholder = answer;
    } catch (error) {
        if (error instanceof SyntaxError) {
            display.placeholder = "Syntax Error";
        } else if (error.message === "Division by zero") {
            display.placeholder = "Cannot divide by zero";
        } else if (error.message === "Result is not finite") {
            display.placeholder = "Result is not valid";
        } else {
            display.placeholder = "Error";
        }
    }
}

function clearScreen() {
    display.value = "";
    display.placeholder = "0";
}



function lightFunction(){
    backspace.src="assets/iconmonstr-backspace-filled white.svg"
    github.src="assets/github white.svg"
    darkMode.style.display="block"
    lightMode.style.display="none"
    body.classList.toggle("dark")

}
function darkFunction(){
    backspace.src="assets/iconmonstr-backspace-filled dark.svg"
    github.src="assets/github dark.svg"
    darkMode.style.display="none"
    lightMode.style.display="block"

    body.classList.remove("dark")

}

