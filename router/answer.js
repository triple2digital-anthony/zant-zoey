const express = require('express');

const router = express.Router();

const handleResponse = require("../nlp")

const http = require("../utis/http")

router.post('/', async (req, res) => {
    try {
        const { question, scenarioId, prevAnswer } = req.body;
        console.log(req.body)
        if (!question) return new http.ErrorResponse(400, "Question is required").send(res);

        const answer = await handleResponse(scenarioId, question, prevAnswer)

        const response = {
            answer, scenarioId: scenarioId || null, prevAnswer: prevAnswer || null
        }

        return new http.SuccessResponse(response).send(res)

    } catch (error) {
        console.log("ERR", error)
        return new http.ErrorResponse(500).send(res);
    }

});

module.exports = router;
