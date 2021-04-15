import { ApplicationCommandOptionChoice } from "./ApplicationCommandOptionChoice";
import {
  ApplicationCommandOptionType,
  ApplicationCommandOptionStringType,
} from "./ApplicationCommandOptionType";

export interface ApplicationCommandOption {
  type: ApplicationCommandOptionType | ApplicationCommandOptionStringType;
  name: string;
  description: string;
  required?: boolean | false;
  choices?: ApplicationCommandOptionChoice[];
  options?: ApplicationCommandOption[];
}
