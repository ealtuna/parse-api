import {
  Post,
  Body,
  JsonController,
  BadRequestError,
} from "routing-controllers";
import { Inject } from "typedi";

import { ParseController } from "./parse-controller";
import { ParseInput } from "../input/parse-input";
import { Client } from "../model/client";
import { ParseService } from "../service/parse-service";

@JsonController("/v2")
export class ParseControllerV2 implements ParseController {
  constructor(@Inject("ParseService") private parseService: ParseService) {}

  @Post("/parse")
  parse(@Body({ required: true }) body: ParseInput): Client {
    const client = this.parseService.parse(body);
    const [, id0, id1] = client.clientId.match(/(\d{3})(\d{4})/) ?? [];
    if (!id0 || !id1) {
      throw new BadRequestError("Incorrect clientId component format");
    }
    return {
      firstName: client.firstName,
      lastName: client.lastName,
      clientId: `${id0}-${id1}`,
    };
  }
}
