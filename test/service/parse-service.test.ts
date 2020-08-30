import { ParseService, ParseServiceImpl } from "../../src/service/parse-service";
import { Client } from "../../src/model/client";

describe("ParseService", () => {
    describe("parse", () => {
        let parseService: ParseService;

        beforeAll(() => {
            parseService = new ParseServiceImpl();
        });

        it("should parse correct formated expression", () => {
            const client = parseService.parse({ data: "JOHN0000MICHAEL0009994567" });
            expect(client).toStrictEqual({
                firstName: "JOHN",
                lastName: "MICHAEL",
                clientId: "9994567"
            } as Client);
        });

        it("should throw an error with incorrect formated expression", () => {
            expect(() => {
                parseService.parse({ data: "JOHN0000MICHAEL" });
            }).toThrowError();
        });
    });
});
