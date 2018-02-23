// Thank you to Daniel Shiffman for writing the skeleton for this that I then cannibalized!
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16
var output = "Once upon a "
var myVoice;
var myRec;
function setup() {
  noCanvas();
  myVoice = new p5.Speech();
  myRec = new p5.SpeechRec();

  initialize();

  myRec.onResult = personSaidWord;
  myRec.continuous = true;
	myRec.start();
}

function clearIt() {
  var markovs = selectAll('.markov');
  for (var i = 0; i < markovs.length; i++) {
    markovs[i].remove();
  }
}

var markov;
var textinput;
var listening = true;

function initialize() {
  markov = new MarkovGeneratorWord(1, 100);
  textinput = select('#text');
  // Split it up into line breaks
  var lines = textinput.value().split('\n');

  // Feed in the lines
  for (var i = 0; i < lines.length; i++) {
    // Trim out any extra white space
    markov.feed(lines[i].trim());
  }
  document.getElementById("output").innerHTML = output
  myVoice.speak(output)
}

function personSaidWord() {
  console.log("here")
  if(!myRec.resultValue) return
  var wrd = myRec.resultString.split(' ').pop();
  console.log(wrd)
  var nxt = markov.nextWord(wrd);
  if (nxt) {
    output += wrd + " " + nxt + " ";
    myVoice.speak(nxt)
  }
  else {
    output += wrd + ". "
  }
  document.getElementById("output").innerHTML = output
}
