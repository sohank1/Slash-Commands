import { ApplicationCommandInteractionDataOption } from "./ApplicationCommandInteractionDataOption";

export interface ApplicationCommandInteractionData {
    id: string;
    name: string;
    // todo
    resolved?: any;
    options?: ApplicationCommandInteractionDataOption[];
}