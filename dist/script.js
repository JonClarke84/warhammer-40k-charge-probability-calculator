// **** BUTTON ****

button.onclick = function(distance, xD6) {
  
 //setting dom variables
const mainContent = document.getElementById('content')
const header = document.getElementById('header')
const finalResults = document.getElementById('finalResults')

function makePercentage(num){
  return `${((num + Number.EPSILON) * 100).toFixed(3)}%`
} //converts the result to a percentage

function singleDice(){
   var miniArr = []
   for (let x = 1; x <=6; x++){miniArr.push(x)} //write mini array of results 1-6
   return miniArr
} //generates an array of 1D6 results - 1,2,3,4,5,6

function diceResults(xD6){
   var results = []
   var tempResults = []
   var count = 1
   
 if (xD6 == 2){
 for (var x = 0; x <=5; x++){
   for (var c = 0; c <= 5; c++){results.push([singleDice()[x] + singleDice()[c]])}}
 } //builds array of all possible 2 dice results
   else{
     for (var x = 0; x <=5; x++){
      for (var c = 0; c <= 5; c++){
        for (var n = 0; n <= 5; n++){results.push([singleDice()[x], singleDice()[c], singleDice()[n]]) }}
     }
     for (var sort = 0; sort < results.length; sort++){
       results[sort].sort((a,b)=>a-b) //for each sub array sort into numerical order
       results[sort].shift()          //remove the first element of each sub array
       results[sort] = results[sort][0] + results[sort][1] //combine the sub array elements into a dice score
     }
   }        //builds array of all possible 3 dice results
  
   
  results.sort((a,b)=>a-b) //sorts an array into numerical order

    function countInstances(){
    var occurrences = results.reduce(function(obj, item) {
  obj[item] = (obj[item] || 0) + 1;
  return obj;
}, {})
    const diceResults = [0]
    Object.values(occurrences).forEach(val => diceResults.push(val))
  return diceResults
 } //returns the unique occurrences of each result
  
   
   return countInstances()
 } //generate the results of rolling 2 dice or 3, discarding one

function diceProbability(distance, xD6){
  
  let numOfDice = 6 ** xD6
  let chances = 0
  const impediment = document.getElementById('impediment').value
  const bonus = document.getElementById('bonus').value
  
  var chargeDistance = (distance-parseInt(bonus))+parseInt(impediment) //adds any bonus and subtracts and impediments
     
  for (var i=chargeDistance-1; i < diceResults(xD6).length; i++){chances += diceResults(xD6)[i]} //totals all chances above the target distance
 
  if (document.getElementById('rerolling').value == "True"){
    return (chances/numOfDice)+(((1-((chances/numOfDice)))*(chances/numOfDice)))}
  
  return chances/numOfDice

} //function to take num and work out the probability of getting distance+ on xD6

  
  distance = document.getElementById("charge-distance").value
  xD6 = document.getElementById("number-of-dice").value
  
  finalResults.innerHTML = " "
  finalResults.innerHTML += `<div class="header"><h1>The chance of ${distance}+ on ${xD6}D6 is ${makePercentage(diceProbability(distance, xD6))}</h1></div>`
  
  //console.log(`The chance of a ${distance}+ on ${xD6}D6 is ${makePercentage(diceProbability(distance, xD6))}`)
  //console.log(diceResults(xD6))
    
}