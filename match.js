// a messy solution to the knapsack problem (kinda)

// find the optimal marks without formating
function getOptimalMarks(targetMarks, possibleScores){
    zeroedData = addZero(possibleScores) // add other possible values to scores
    iteratedMess = messyIteration([], zeroedData, targetMarks)
    return iteratedMess
}

// return the sum of an array (makes code easier to read)
function sum(arr){
    return arr.reduce((a, b) => a + b, 0)
}

// add a zero to possible mark to allow easier processing (values can be switched out which means that the solution can be adapted if necessary)  
function addZero(data){
    let out = [];
    for(let i = 0; i < data.length; i++){
        out[i] = [data[i], 0]
    }
    return out
}

function messyIteration(current, score, target){

    var currentHighest = 0
    var currentList = []

    if(sum(current) > target){ // if the total marks has gone over, stop iterating and return undefined
        return
    }else if(score.length === 0){ // when iteration has fully completed return the full list
        return current
    }
    
    var choppedOnion = score.slice(1, score.length)  // precalculate list missing one value to prevent wasted processing
    
    // iterate through values
    for(var i = 0; i < score[0].length; i++){
        
        // add value onto the end of the current list per avilable value
        var tempArray = current.slice()
        tempArray.push(score[0][i])

        iter = messyIteration(tempArray, choppedOnion, target) // recuse with smaller list

        if(typeof(iter) !== "undefined"){ // if the iteration is valid
            var localSum = sum(iter)
            
            if(localSum > currentHighest){ // check if the total is higher thant the currently highest processed score
                currentHighest = localSum;
                currentList = iter
            }
            if(localSum===target){ // if the total is equal to the target no more processing should be done as we have reached the easiest answer
                break;
            }
        }
    }
    return currentList // return the list with the highest total value
}

// strip each element in the input list to find only the necessary marks
function formatData(input){
    out = []
    input.data.forEach(element => {
        out.push(element.marks) // append each value to the output
    });
    return out
}

// convert list of marks into a list of booleans to determine if the question should be answered or not
function evalOutput(arr){
    out = []
    arr.forEach(element => {
        if(element === 0){
            out.push(false)
        }else{
            out.push(true)
        }
    });
    return out
}

// match the booleans provided by evalOutput the questions, removing questions with a value of false
function matchOutput(rawData, boolArray){
    out = []
    for(let i = 0; i < boolArray.length; i++){
        if(boolArray[i]){
            out.push(rawData.data[i])
        }
    }
    return out
}

// return the required questions needed to enter to get a given amount of marks on a test
function getFormattedOptimalMarks(goal, data){
    formatStrippedData = formatData(data)
    outputData = getOptimalMarks(goal, formatStrippedData)
    evaled = evalOutput(outputData)  // data in a list of whether it should be included or not [true, false ... true] etc.
    matched = matchOutput(data, evaled)
    return matched
}

// end of the solution