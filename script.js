const display=document.getElementById("input")



function output(content) {
    const existingValue = display.value;
    const lastChar = existingValue.slice(-1); // Get the last character of the existing value
    const secondLastChar=existingValue.slice(-2)
    const isLastCharOperator = /[+\-\u00F7\u00D7]/.test(lastChar);
    const isSecondLastCharOperator=/[+\-\u00F7\u00D7]/.test(secondLastChar)

    if (existingValue === "" && /[+\-\u00F7\u00D7]/.test(content)) {
        display.value = "";
    }
    else if(existingValue==="0" && /[1-9]/.test(content)){
        display.value=content
    }
    else if(existingValue==="" && content[0]=="0"){
        display.value='0'
    }
    else if(existingValue==="0" && content[0]=="0"){
        display.value='0'
    }
    else if(lastChar==='.' && content=='.'){
        display.value=existingValue
    }
    else if( /[+\-\u00F7\u00D7]/.test(lastChar) && content[0]=='0'){
        content='0'
        display.value=existingValue+content
    }
    else if (isSecondLastCharOperator && lastChar==="0" && content[0]=="0"){
        display.value=existingValue
    }
    else if (isSecondLastCharOperator && lastChar==="0" && /[1-9]/.test(content)){
        var update=existingValue.slice(0,-1)
        display.value=update+content
    }
    else if (isLastCharOperator && /[+\-\u00F7\u00D7]/.test(content)){
        var update=existingValue.slice(0,-1)
        display.value=update+content
    }
    else{
        display.value=existingValue+content
    }

}



function remove(){
    const existingValue = display.value;
    var update= existingValue.slice(0,-1);
    display.value= update
}

function clearScreen(){
    display.value=''
}

function equals() {
    const inputValue = display.value.trim(); // Trim any leading or trailing whitespace
  
    const operatorsRegex = /[+\-\u00F7\u00D7]+/g;

    
    
    // Use match instead of split to capture operands and operator
    // const [operand1, operand2] = inputValue.match(/-?\d+\.?\d*/g);
    const [operand1, operand2] = inputValue.match(/\d*\.?\d+|\d+/g);

    const found= inputValue.match(operatorsRegex);
    // if (found.length() == 1){
        
    // }
    // else{
    //     console.log(found)
    // }
    
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    if (found){
        const sign=found[0]
        
        switch(sign){
            case '+':
                var output=num1+num2
                display.value=output
                break
            case '-':
                var output=num1-num2
                display.value=output
                break
            case '\u00F7':
                var output=num1/num2
                display.value=output
                break   
            case '\u00D7':
                var output=num1*num2
                display.value=output
                break     
        }
    }
    else{
        console.log("no exp")
    }

}


