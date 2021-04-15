// I have no idea what to call this function help me pls

import { ApplicationCommandOption } from "../RestHandler/types/ApplicationCommandOption";
import {
  ApplicationCommandOptionStringType,
  ApplicationCommandOptionType,
} from "../RestHandler/types/ApplicationCommandOptionType";

const type_map = {
  "sub-command": 1,
  "sub-command-group": 2,
  string: 3,
  integer: 4,
  boolean: 5,
  user: 6,
  channel: 7,
  role: 8,
};

export function TypeConversion(
  data: ApplicationCommandOption[],
): ApplicationCommandOption[] {
  for (const option of data) {
    if (option.options && option.options.length > 0)
      option.options = TypeConversion(option.options);
    if (typeof option.type === "string")
      option.type = type_map[
        option.type.toLowerCase() as ApplicationCommandOptionStringType
      ] as ApplicationCommandOptionType;
  }

  return data;
}
