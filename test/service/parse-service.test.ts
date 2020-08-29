import { ParseService } from "../../src/service/parse-service";
import { Client } from "../../src/model/client";

describe("ParseService", () => {
    describe("parse", () => {
        let parseService: ParseService;

        beforeAll(() => {
            parseService = new ParseService();
        });

        it("should parse correct formated expression", () => {
            const client = parseService.parse({ data: "JOHN0000MICHAEL0009994567" });
            expect(client).toStrictEqual(new Client("JOHN", "MICHAEL", "9994567"));
        });

        it("should throw an error with incorrect formated expression", () => {
            expect(() => {
                parseService.parse({ data: "JOHN0000MICHAEL" });
            }).toThrowError();
        });
    });
});
