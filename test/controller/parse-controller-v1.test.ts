import request from "supertest";
import app from "../../src/app";

export const WRONG_INPUT_EXAMPLES = [
    "",
    "MICHAEL0009994567",
    "00009994567",
    "JOHN000MICHAEL0009994567",
    "JOHN0000MICHAEL00009994567",
    "JOHN0000MICHAEL000999456",
    "JOHN0000MICHAEL0009994567A",
    "7JOHN0000MICHAEL0009994567A"
];

describe("POST /v1/parse", () => {
    it("should return 200 OK", () => {
        return request(app)
            .post("/api/v1/parse")
            .send({
                data: "JOHN0000MICHAEL0009994567"
            })
            .expect(200)
            .expect({
                statusCode: 200,
                data: {
                    firstName: "JOHN0000",
                    lastName: "MICHAEL000",
                    clientId: "9994567"
                }
            });
    });
    it("should return 400 when no body provided", () => {
        return request(app)
            .post("/api/v1/parse")
            .expect(400)
            .expect({ statusCode: 400 });
    });
    test.each(WRONG_INPUT_EXAMPLES)("should return 400 when wrong data format provided %s", (data) => {
        return request(app)
            .post("/api/v1/parse")
            .send({ data })
            .expect(400)
            .expect({ statusCode: 400 });
    });
});
