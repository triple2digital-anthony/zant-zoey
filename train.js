const natural = require("natural");

const jobStress = require("./data/scenario1.json");
const sleepStress = require("./data/scenario2.json");
const studentStress = require("./data/scenario3.json");
const motherStress = require("./data/scenario4.json");

const { dataset: all, placeholders } = require("./data")

function train(dataset, fileName) {
  const classifier = new natural.BayesClassifier();
  dataset.map((data) => {
    classifier.addDocument(data.input, data.output);
  });

  classifier.train();

  classifier.save(fileName);
}

const dataSets = [jobStress, sleepStress, studentStress, motherStress];


const getDynamicData = (trainingData, placeholders) => {
  let arr = []
  for (let i = 0; i < trainingData.length; i++) {
    const data = trainingData[i];
    let rowData = []
    for (let p in placeholders) {
      const values = placeholders[p];
      if (!data.input.includes(p)) {
        const input = data.input;
        const output = data.output
        arr.push({ input, output })
      }
      else {
        values.forEach(value => {
          const input = data.input.replace(p, value);
          const output = data.output
          arr.push({ input, output })
        });
      }

    }
  }

  return arr;
}

// Learning ...

(() => {
  console.log("training...")
  var allData = [];
  dataSets.map((dataset, index) => {
    var data = dataset;

    const pl = placeholders[`scenario${index + 1}`]
    if (Object.keys(pl).length > 0) {
      data = getDynamicData(dataset, pl)
    }
    allData = [...allData, ...data]
    train(data, `./models/scenario${index + 1}.json`);
  });


  train(allData, `./models/all.json`);
})()
