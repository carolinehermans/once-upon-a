// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// This is based on Allison Parrish's great RWET examples
// https://github.com/aparrish/rwet-examples

// Prototype is magic!  By accessing Array.prototype
// we can augment every single String Array object with an new function

// This object will do a Markov chain by character or by "word"

// A function to split a text up into tokens
// Just using spaces for now to preserve punctuation
String.prototype.tokenize = function() {
  return this.split(/\s+/);
}

// Like python's choice this will return a
// random element from an array
Array.prototype.choice = function() {
  var i = floor(random(this.length));
  return this[i];
}

// A MarkovGenerate object
function MarkovGeneratorWord(n, max) {
  // Order (or length) of each ngram
  this.n = n;
  // What is the maximum amount we will generate?
  this.max = max;
  // An object as dictionary
  // each ngram is the key, a list of possible next elements are the values
  this.ngrams = {};
  // A separate array of possible beginnings to generated text
  this.beginnings = [];

  // A function to feed in text to the markov chain
  this.feed = function(text) {

    var tokens = text.tokenize();

    // Discard this line if it's too short
    if (tokens.length < this.n) {
      return false;
    }

    // Store the first ngram of this line
    var beginning = tokens.slice(0, this.n).join(' ');
    this.beginnings.push(beginning);

      // Now let's go through everything and create the dictionary
    for (var i = 0; i < tokens.length - this.n; i++) {
      // Usings slice to pull out N elements from the array
      gram = tokens.slice(i, i + this.n).join(' ');
      // What's the next element in the array?
      next = tokens[i + this.n];

      // Is this a new one?
      if (!this.ngrams[gram]) {
        this.ngrams[gram] = [];
      }
      // Add to the list
      this.ngrams[gram].push(next);
    }
  }

  this.nextWord = function(word) {
    var next = null
    if (this.ngrams[word]) {
      var possible_next = this.ngrams[word];
      next = possible_next.choice();
      return next
    }
    else {
      return null
    }
  }

}
