
class SuccessResponse {
    payload;

    constructor(payload) {
        this.payload = payload;
    }

    send(res) {
        res.status(200).send({
            success: true,
            data: this.payload
        });
    }
}

class ErrorResponse {
    code;
    message;

    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    send(res) {
        res.status(this.code).send({
            success: false,
            data: this.message || "Internal Server Error",
        });
    }
}

module.exports = {
    SuccessResponse,
    ErrorResponse
}