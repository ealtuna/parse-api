import request from "supertest";

import app from "../../src/app";
import { WRONG_INPUT_EXAMPLES } from "./parse-controller-v1.test";

describe("POST /v2/parse", () => {
  it("should return 200 OK", () => {
    return request(app)
      .post("/api/v2/parse")
      .send({
        data: "HENRY0000FORD0005554567",
      })
      .expect(200)
      .expect({
        statusCode: 200,
        data: {
          firstName: "HENRY",
          lastName: "FORD",
          clientId: "555-4567",
        },
      });
  });
  it("should return 400 when no body provided", () => {
    return request(app)
      .post("/api/v2/parse")
      .expect(400)
      .expect({ statusCode: 400 });
  });
  test.each(WRONG_INPUT_EXAMPLES)(
    "should return 400 when wrong data format provided %s",
    (data) => {
      return request(app)
        .post("/api/v2/parse")
        .send({ data })
        .expect(400)
        .expect({ statusCode: 400 });
    }
  );
});
