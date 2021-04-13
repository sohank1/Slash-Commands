import { ApplicationCommandOptionChoice } from "./ApplicationCommandOptionChoice";
import { ApplicationCommandOptionType } from "./ApplicationCommandOptionType";

export interface ApplicationCommandOption {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    required?: boolean | false;
    choices?: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOption[];
}