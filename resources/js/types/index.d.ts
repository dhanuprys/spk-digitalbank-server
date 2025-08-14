import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface EventYear {
    id: number;
    year: number;
    title: string;
    description: string | null;
    registration_start: string;
    registration_end: string;
    submission_start_date: string;
    submission_end_date: string;
    show_start: string | null;
    show_end: string | null;
    event_guide_document: string | null;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    eventYears?: EventYear[];
    categories?: Category[];
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type CriteriaTemplateForm = {
    name: string;
    description: string;

    // Level 2 Criteria Group 1 Values
    l2_cg1_a_value: string;
    l2_cg1_b_value: string;
    l2_cg1_c_value: string;
    l2_cg1_d_value: string;
    l2_cg1_e_value: string;

    // Level 2 Criteria Group 1 Max Flags
    l2_cg1_a_max: boolean;
    l2_cg1_b_max: boolean;
    l2_cg1_c_max: boolean;
    l2_cg1_d_max: boolean;
    l2_cg1_e_max: boolean;

    // Level 2 Criteria Group 2 Values
    l2_cg2_a_value: string;
    l2_cg2_b_value: string;
    l2_cg2_c_value: string;
    l2_cg2_d_value: string;

    // Level 2 Criteria Group 2 Max Flags
    l2_cg2_a_max: boolean;
    l2_cg2_b_max: boolean;
    l2_cg2_c_max: boolean;
    l2_cg2_d_max: boolean;

    // Level 2 Criteria Group 3 Values
    l2_cg3_a_value: string;
    l2_cg3_b_value: string;
    l2_cg3_c_value: string;
    l2_cg3_d_value: string;
    l2_cg3_e_value: string;

    // Level 2 Criteria Group 3 Max Flags
    l2_cg3_a_max: boolean;
    l2_cg3_b_max: boolean;
    l2_cg3_c_max: boolean;
    l2_cg3_d_max: boolean;
    l2_cg3_e_max: boolean;

    // Level 1 Criteria Group 1 Values
    l1_cg1_a_value: string;
    l1_cg1_b_value: string;
    l1_cg1_c_value: string;

    // Level 1 Criteria Group 1 Max Flags
    l1_cg1_a_max: boolean;
    l1_cg1_b_max: boolean;
    l1_cg1_c_max: boolean;

    // Result settings
    limit: number;
    ascending: boolean;
};

export type ObjectMetricForm = {
    name: string;

    // Level 2 Criteria Group 1
    l2_cg1_a: string;
    l2_cg1_b: string;
    l2_cg1_c: string;
    l2_cg1_d: string;
    l2_cg1_e: string;

    // Level 2 Criteria Group 2
    l2_cg2_a: string;
    l2_cg2_b: string;
    l2_cg2_c: string;
    l2_cg2_d: string;

    // Level 2 Criteria Group 3
    l2_cg3_a: string;
    l2_cg3_b: string;
    l2_cg3_c: string;
    l2_cg3_d: string;
    l2_cg3_e: string;
};
