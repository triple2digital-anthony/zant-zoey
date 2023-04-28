const express = require('express');

const router = express.Router();

const http = require("../utis/http")

const dataset = require('../data')

router.get('/', async (req, res) => {
    try {
        const { id } = req.query;
        var scenarioId = id || 1;
        const scenarios = [
            { id: 1, name: "Scenario 1" },
            { id: 2, name: "Scenario 2" },
            { id: 3, name: "Scenario 3" },
            { id: 4, name: "Scenario 4" }
        ]
        const scenario = dataset['scenario' + scenarioId].slice(1).map(story => story.input);
        const answers = dataset['scenario' + scenarioId].slice(1).map(story => story.output);
        res.render('home.pug', { selectedValue: id, scenarioOptions: scenarios, questionOptions: scenario, previousAnswers: answers, answer: "" });

    } catch (error) {
        console.log("ERR", error)
        return new http.ErrorResponse(500).send(res);
    }

});

module.exports = router;
