const jobStress = require("./scenario1.json");
const sleepStress = require("./scenario2.json");
const studentStress = require("./scenario3.json");
const motherStress = require("./scenario4.json");
const placeholders = require("./placeholders")

module.exports = {
    dataset: [...jobStress, ...sleepStress, ...studentStress, ...motherStress],
    firstQuestions: [jobStress[1].input, sleepStress[1].input, studentStress[1].input, motherStress[1].input],
    scenario1: jobStress,
    scenario2: sleepStress,
    scenario3: studentStress,
    scenario4: motherStress,
    placeholders
}