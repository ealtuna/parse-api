import { ParseInput } from "../input/parse-input";
import { Client } from "../model/client";

export interface ParseController {
    parse(body: ParseInput): Client;
}