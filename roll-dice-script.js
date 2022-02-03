//roll xD6
function rollDice(xD6) {
  const results = []
  for (let i = 0; i < xD6; i++) {
    const rolledNum = Math.ceil(Math.random() * 6)
    results.push(rolledNum)
  }
  return results
}

//execute code on click of the roll button
document.getElementById('roll-dice-btn').addEventListener('click', function () {
  //definte input variables
  const numDice = document.getElementById('num-dice').value
  const hitRollsDiv = document.getElementById('hit-rolls')
  const woundRollsDiv = document.getElementById('wound-rolls')
  const feedbackDiv = document.getElementById('feedback')
  const hitThreshold = document.getElementById('to-hit').value
  const woundThreshold = document.getElementById('to-wound').value
  const saveThreshold = document.getElementById('to-save').value

  //generate first set of hit roll results
  const rollHitResults = rollDice(numDice)

  //determine number of successful hits
  var numOfHits = rollHitResults.filter(function (value) {
    return value >= hitThreshold
  }).length


  //print hit roll results
  hitRollsDiv.innerHTML = ''
  hitRollsDiv.innerHTML += "You rolled the following hits: " + rollHitResults.join(', ') + "<br />"

  //print number of successful hits 
  hitRollsDiv.innerHTML += "Number of successful hits: " + numOfHits + "<br />"

  //rerolling hits
  //reroll ones if button clicked
  if (document.getElementById('reroll-1s-to-hit').checked) {

    var numOfOnes = rollHitResults.filter(function (value) {
      return value < 2
    }).length

    var rerollOnes = rollDice(numOfOnes)

    var rerollOnesResults = rerollOnes.filter(function (value) {
      return value >= hitThreshold
    }).length

    numOfHits = numOfHits + rerollOnesResults

    hitRollsDiv.innerHTML += "Number of 1s rolled: " + numOfOnes + "<br />"
    hitRollsDiv.innerHTML += "You rerolled the 1s into: " + rerollOnes.join(', ') + "<br />"
    hitRollsDiv.innerHTML += "Number of successful rerolls: " + rerollOnesResults + "<br />"
    hitRollsDiv.innerHTML += "<b>Total number of successful hits: " + numOfHits + "</b><br />"
  }

  //rerolls misses if button checked
  if (document.getElementById('reroll-misses').checked) {

    var numOfMisses = rollHitResults.filter(function (value) {
      return value < hitThreshold
    }).length

    var rerollMisses = rollDice(numOfMisses)

    var rerollMissesResults = rerollMisses.filter(function (value) {
      return value >= hitThreshold
    }).length

    numOfHits = numOfHits + rerollMissesResults

    hitRollsDiv.innerHTML += "Number of misses: " + numOfMisses + "<br />"
    hitRollsDiv.innerHTML += "You rerolled the misses into: " + rerollMisses.join(', ') + "<br />"
    hitRollsDiv.innerHTML += "Number of successful rerolls: " + rerollMissesResults + "<br />"
    hitRollsDiv.innerHTML += "<b>Number of successful hits after rerolls: " + numOfHits + "</b><br />"
  }


  // roll to wound with num of hits
  var rollWoundResults = rollDice(numOfHits)

  var numOfWounds = rollWoundResults.filter(function (value) {
    return value >= woundThreshold
  }).length

  //print wound results
  woundRollsDiv.innerHTML = ''
  woundRollsDiv.innerHTML += "You rolled the following wounds: " + rollWoundResults.join(', ') + "<br />"
  woundRollsDiv.innerHTML += "Number of successful wounds " + numOfWounds + "<br />"

  //reroll wounds of 1
  if (document.getElementById('reroll-1s-to-wound').checked) {
    var numOfWoundOnes = rollWoundResults.filter(function (value) {
      return value < 2
    }).length

    var rerollWoundOnes = rollDice(numOfWoundOnes)

    var rerollWoundResults = rerollWoundOnes.filter(function (value) {
      return value >= hitThreshold
    }).length

    numOfWounds = numOfWounds + rerollWoundResults

    woundRollsDiv.innerHTML += "Number of 1s to wound rolled: " + numOfWoundOnes + "<br />"
    woundRollsDiv.innerHTML += "You rerolled the 1s into: " + rerollWoundOnes.join(', ') + "<br />"
    woundRollsDiv.innerHTML += "Number of successful wound rerolls: " + rerollWoundResults + "<br />"
    woundRollsDiv.innerHTML += "<b>Total number of successful wounds: " + numOfWounds + "</b><br />"
  }

  //reroll wounds
  if (document.getElementById('reroll-failed-wounds').checked) {

    var numOfFailedWounds = rollWoundResults.filter(function (value) {
      return value < woundThreshold
    }).length

    var rerollWounds = rollDice(numOfFailedWounds)

    var rerollWoundsResults = rerollWounds.filter(function (value) {
      return value >= woundThreshold
    }).length

    numOfWounds += rerollWoundsResults

    woundRollsDiv.innerHTML += "Number of failed wounds: " + numOfFailedWounds + "<br />"
    woundRollsDiv.innerHTML += "You rerolled failed wounds into: " + rerollWounds.join(', ') + "<br />"
    woundRollsDiv.innerHTML += "Number of successful rerolls: " + rerollWoundsResults + "<br />"
    woundRollsDiv.innerHTML += "<b>Number of successful wounds after rerolls: " + numOfWounds + "</b><br />"
  }

  // roll to save with numOfWounds
  const rollSaveResults = rollDice(numOfWounds)
  const numOfFailedSaves = rollSaveResults.filter(function (value) {
    return value < saveThreshold
  }).length

  //print opponent's save rolls
  feedbackDiv.innerHTML = ' '
  feedbackDiv.innerHTML += "Your opponent rolled the following saves: " + rollSaveResults.join(', ') + "<br />"

  //print number of failed save rolls
  feedbackDiv.innerHTML += "Your opponent failed " + numOfFailedSaves + " saves <br />"
})