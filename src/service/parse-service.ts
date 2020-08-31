import { BadRequestError } from "routing-controllers";

import { Client } from "../model/client";
import { ParseInput, PARSE_INPUT_DATA_FORMAT } from "../input/parse-input";

export interface ParseService {
  parse(parseInput: ParseInput): Client;
}

export class ParseServiceImpl implements ParseService {
  public parse(parseInput: ParseInput): Client {
    const [, firstName, lastName, clientId] =
      parseInput.data.match(PARSE_INPUT_DATA_FORMAT) ?? [];
    if (!firstName || !lastName || !clientId) {
      throw new BadRequestError("Incorrect data format");
    }
    return { firstName, lastName, clientId };
  }
}
