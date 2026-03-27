export type Role = {
    role_title: string;
    date_range: string;
    description: string;
    tags: string[];
    sort_order: number;
};

export type Experience = {
    company: string;
    roles: Role[];
    sort_order: number;
};
