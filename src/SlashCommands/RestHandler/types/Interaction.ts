import { ApplicationCommandInteractionData } from "./ApplicationCommandInteractionData";
import { GuildMember } from "./GuildMember";
import { InteractionType } from "./InteractionType";
import { User } from "./User";

export interface Interaction {
    id: string;
    application_id: string;
    type: InteractionType;
    data?: ApplicationCommandInteractionData;
    guild_id?: string;
    channel_id?: string;
    member?: GuildMember;
    user?: User;
    token: string;
    version: number
}