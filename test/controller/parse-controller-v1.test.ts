import request from "supertest";

import app from "../../src/app";

export const WRONG_INPUT_EXAMPLES = [
  "",
  "FORD0005554567",
  "00005554567",
  "HENRY000FORD0005554567",
  "HENRY0000FORD00005554567",
  "HENRY0000FORD000555456",
  "HENRY0000FORD0005554567A",
  "7HENRY0000FORD0005554567A",
];

describe("POST /v1/parse", () => {
  it("should return 200 OK", () => {
    return request(app)
      .post("/api/v1/parse")
      .send({
        data: "HENRY0000FORD0005554567",
      })
      .expect(200)
      .expect({
        statusCode: 200,
        data: {
          firstName: "HENRY0000",
          lastName: "FORD000",
          clientId: "5554567",
        },
      });
  });
  it("should return 400 when no body provided", () => {
    return request(app)
      .post("/api/v1/parse")
      .expect(400)
      .expect({ statusCode: 400 });
  });
  test.each(WRONG_INPUT_EXAMPLES)(
    "should return 400 when wrong data format provided %s",
    (data) => {
      return request(app)
        .post("/api/v1/parse")
        .send({ data })
        .expect(400)
        .expect({ statusCode: 400 });
    }
  );
});
