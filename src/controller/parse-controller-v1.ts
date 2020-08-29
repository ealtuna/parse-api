import { JsonController, Body, Post } from "routing-controllers";
import { Inject } from "typedi";

import { ParseInput } from "../input/parse-input";
import { ParseController } from "./parse-controller";
import { Client } from "../model/client";
import { ParseService } from "../service/parse-service";

export const FIRST_NAME_SUFFIX = "0000";
export const LAST_NAME_SUFFIX = "000";

@JsonController("/v1")
export class ParseControllerV1 implements ParseController {

    constructor(@Inject("ParseService") private parseService: ParseService) {}

    @Post("/parse")
    parse(@Body({ required: true }) body: ParseInput): Client {
        const originalClient = this.parseService.parse(body);
        return new Client(
            originalClient.firstName + FIRST_NAME_SUFFIX,
            originalClient.lastName + LAST_NAME_SUFFIX,
            originalClient.clientId
        );
    }
}
