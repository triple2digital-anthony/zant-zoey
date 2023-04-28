const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const { words: stopWords } = require("natural/lib/natural/util/stopwords");
const path = require('path');

function preprocessInput(input) {
  const tokens = tokenizer.tokenize(input);
  const filteredTokens = tokens
    .map((token) => token.toLowerCase())
    .filter((token) => !stopWords.includes(token));
  return filteredTokens.join(" ");
}

// Define functions to handle user input for each scenario
function handleResponse(scenarioId, input, previousAnswer) {
  const fileName = scenarioId ? `scenario${scenarioId}.json` : "all.json"
  console.log("filePath", fileName)
  const modelPath = path.join(__dirname + "/models/", fileName);

  console.log("modelPath", modelPath)
  const inputText = preprocessInput(input);
  return new Promise((resolve, reject) => {
    natural.BayesClassifier.load(
      modelPath,
      null,
      function (err, classifier) {
        if (err) {
          console.log("ERRRR", err)
          reject(err);
        } else {
          const bestMatch = classifier.classify(inputText);
          const classifications = classifier.getClassifications(inputText);

          const sameInputs = classifications.filter(c => c.value === classifications[0].value)

          if (previousAnswer && sameInputs.length > 1) {

            const index = sameInputs.findIndex(c => c.label === previousAnswer);
            const answer = sameInputs[index + 1] ? sameInputs[index + 1].label : sameInputs[index].label;
            resolve(answer);

          } else {
            resolve(bestMatch);
          }
        }
      }
    );
  });
}

module.exports = handleResponse;
