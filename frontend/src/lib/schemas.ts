export type RoleResponse = {
    role_id: string;
    experience_id: string;
    role_title: string;
    date_range: string;
    description: string;
    tags: string[];
    sort_order: number;
};

export type ExperienceResponse = {
    experience_id: string;
    company: string;
    roles: RoleResponse[];
    sort_order: number;
};
