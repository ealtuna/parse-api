import { Matches } from "class-validator";

export const PARSE_INPUT_DATA_FORMAT = /^(\D+)0000(\D+)000(\d{7})$/;

export class ParseInput {
    @Matches(PARSE_INPUT_DATA_FORMAT)
    data: string;
}