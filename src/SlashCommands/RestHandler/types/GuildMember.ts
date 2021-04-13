import { User } from "./User";

export interface GuildMember {
    user?: User;
    nick?: string;
    roles: string[];
    joinedAt: string;
    premium_since?: string;
    deaf: boolean;
    mute: boolean;
    pending?: boolean;
    permissions: string;
}