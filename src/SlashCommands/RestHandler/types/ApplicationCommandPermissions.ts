import { ApplicationCommandPermissionType } from "./ApplicationCommandPermissionType";

export interface ApplicationCommandPermissions {
    id: string;
    type: ApplicationCommandPermissionType;
    permission: boolean;
}