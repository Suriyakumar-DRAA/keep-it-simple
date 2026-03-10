export interface ISubHeadermenu {
    id: string;
    label: string;
    route: string;
    icon: string;
    role?: string;
    permission: boolean;
}

export interface ISidebarMenu {
    id: string;
    label: string;
    route: string;
    icon: string;
    permission: boolean;
    role?: string;
    submenuData?: ISubHeadermenu[];
}