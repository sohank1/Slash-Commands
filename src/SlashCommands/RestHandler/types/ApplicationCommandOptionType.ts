export type ApplicationCommandOptionType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ApplicationCommandOptionStringType =
  | "sub-command"
  | "sub-command-group"
  | "string"
  | "integer"
  | "boolean"
  | "user"
  | "channel"
  | "role";
export enum ApplicationCommandOptionEnum {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP,
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
}
