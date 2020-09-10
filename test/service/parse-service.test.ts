import {
  ParseService,
  ParseServiceImpl,
} from "../../src/service/parse-service";
import { Client } from "../../src/model/client";

describe("ParseService", () => {
  describe("parse", () => {
    let parseService: ParseService;

    beforeAll(() => {
      parseService = new ParseServiceImpl();
    });

    it("should parse correct formated expression", () => {
      const client = parseService.parse({ data: "HENRY0000FORD0005554567" });
      expect(client).toStrictEqual({
        firstName: "HENRY",
        lastName: "FORD",
        clientId: "5554567",
      } as Client);
    });

    it("should throw an error with incorrect formated expression", () => {
      expect(() => {
        parseService.parse({ data: "HENRY0000FORD" });
      }).toThrowError();
    });
  });
});
