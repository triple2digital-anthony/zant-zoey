const express = require('express');

const router = express.Router();

const dataset = require('../data')

const http = require("../utis/http")

router.get('/', async (req, res) => {
    try {
        const response = dataset.firstQuestions.map((question, index) => ({
            scenarioId: index + 1,
            question
        }))

        return new http.SuccessResponse(response).send(res);
    } catch (error) {
        return new http.ErrorResponse(500).send(res);
    }

});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!dataset['scenario' + id]) return new http.ErrorResponse(404, "Not found scenario with that ID").send(res);

        const response = dataset['scenario' + id].slice(1).map(story => ({
            Customer: story.input,
            Zoey: story.output
        }));

        return new http.SuccessResponse(response).send(res);
    } catch (error) {
        return new http.ErrorResponse(500).send(res);
    }

});

module.exports = router;
