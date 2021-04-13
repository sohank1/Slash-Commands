export interface ApplicationCommandInteractionDataOption {
    name: string;
    type: number;
    // todo
    value?: any;
    options?: ApplicationCommandInteractionDataOption[];
}