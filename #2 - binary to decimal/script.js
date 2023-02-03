function decimalToBinary(decimal){
    let binValues = []
    while(decimal >= 1){
        remainder = decimal % 2
        decimal = Math.floor(decimal / 2)
        binValues.push(remainder)
    }
    let binResult = binValues.reverse().join("")
    return binResult
}

function binaryToDecimal(binary){
    let multiFactor = 1
    let splitBinary = binary.split("").reverse()
    let resultValues = []
    for(let i=0;i<splitBinary.length;i++){
        let value = splitBinary[i] * multiFactor
        resultValues.push(value)
        multiFactor *= 2
    }
    let decimalResult = 0
    for(let i=0;i<resultValues.length;i++){
        decimalResult += resultValues[i]
    }
    return decimalResult
}

function main(){
    const inputBin = document.getElementById("inputBin")
    const inputDec = document.getElementById("inputDec")
    const outputBin = document.getElementById("outputBin")
    const outputDec = document.getElementById("outputDec")

    //binary logic
    inputBin.addEventListener("input", (event) => {
        let input = event.target.value
        if(input == "") {
            outputBin.value = ""
            return
        }
        const zeroOneOnly = /^[01]+$/.test(input);
        if(zeroOneOnly){
            //calculate bin to dec
            output = binaryToDecimal(input)
            outputBin.value = output
        }
        else {
            alert("The convertion expects only zero and one digits (binary). Please, enter right values in order for the application to work correctly.")
            inputBin.value = input.substring(0, input.length-1)
        }
    })

    //decimal logic
    inputDec.addEventListener("input", (event) => {
        let input = event.target.value
        if(input == "") {
            outputDec.value = ""
            return
        }
        const onlyNumbers = /^\d+$/.test(input);
        if(onlyNumbers){
            //calculate dec to bin
            output = decimalToBinary(input)
            outputDec.value = output
        }
        else {
            alert("The convertion expects only numeric digits. Please, enter right values in order for the application to work correctly.")
            inputDec.value = input.substring(0, input.length-1)
        }
    })

    outputBin.readOnly = true
    outputDec.readOnly = true
}

main()

