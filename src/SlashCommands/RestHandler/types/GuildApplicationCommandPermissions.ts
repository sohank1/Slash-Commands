import { ApplicationCommandPermissions } from "./ApplicationCommandPermissions";

export interface GuildApplicationCommandPermissions {
    id: string;
    application_id: string;
    guild_id: string;
    permissions: ApplicationCommandPermissions[];
}
