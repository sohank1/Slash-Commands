import { ApplicationCommandOption } from "./ApplicationCommandOption";

export interface ApplicationCommand {
    id?: string;
    application_id?: string;
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
    default_permissions?: boolean | true;
}