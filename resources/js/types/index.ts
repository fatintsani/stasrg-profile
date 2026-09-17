export interface ResearchMetric {
    id: number;
    value: string;
    label: string;
    label_id?: string;
    description: string;
    description_id?: string;
    icon?: string;
    source_type?: string;
    order?: number;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface AboutHighlight {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export interface ResearchDomain {
    id: number;
    domain_number: string;
    title: string;
    title_id?: string;
    slug: string;
    icon: string;
    summary: string;
    summary_id?: string;
    focus_areas?: string[];
    lead_researcher?: string;
    link: string;
    order?: number;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface ResearchProject {
    id: number;
    category: string;
    category_tag: string;
    title: string;
    title_id?: string;
    slug: string;
    image_url: string;
    lead_researcher: string;
    summary: string;
    summary_id?: string;
    tech_stack?: string[];
    case_study_url?: string;
    funding_source?: string;
    start_year?: number;
    end_year?: number;
    featured: boolean;
    is_active?: boolean;
    order?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Publication {
    id: number;
    badge: string;
    badge_type: 'green' | 'gray' | 'blue';
    quartile?: string;
    indexing?: string;
    domain_tag?: string;
    year: number;
    venue: string;
    doi: string;
    title: string;
    title_id?: string;
    abstract?: string;
    abstract_id?: string;
    authors: string;
    pdf_url?: string;
    doi_url?: string;
    citation_count?: number;
    is_featured?: boolean;
    is_active?: boolean;
    slug?: string;
    order?: number;
    created_at?: string;
    updated_at?: string;
}

export interface EnterpriseService {
    id: number;
    service_number: string;
    title: string;
    title_id?: string;
    summary: string;
    summary_id?: string;
    icon: string;
    action_label: string;
    action_label_id?: string;
    features?: string[];
    target_industry?: string;
    lead_advisor?: string;
    link?: string;
    is_featured?: boolean;
    is_active?: boolean;
    order?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Partner {
    id: number;
    name: string;
    category: string; // 'SOE' | 'Industry' | 'Government' | 'Academic' | 'Technology' | 'Other'
    partnership_type?: string;
    description?: string;
    description_id?: string;
    logo_text?: string;
    logo_url?: string;
    website_url?: string;
    established_year?: number;
    is_featured?: boolean;
    is_active?: boolean;
    order?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Article {
    id: number;
    tag: string;
    date: string;
    title: string;
    title_id?: string;
    slug: string;
    summary: string;
    summary_id?: string;
    content?: string;
    content_id?: string;
    image_url?: string;
    author?: string;
    read_time: string;
    external_url?: string;
    is_featured?: boolean;
    is_active?: boolean;
    order?: number;
    published_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UpcomingEvent {
    id: number;
    tag: string;
    title: string;
    title_id?: string;
    description: string;
    description_id?: string;
    date_display: string;
    time_display?: string;
    location: string;
    speaker_name?: string;
    speaker_title?: string;
    registration_link?: string;
    brochure_url?: string;
    image_url?: string;
    quota_text?: string;
    primary_action_text: string;
    secondary_action_text: string;
    is_featured?: boolean;
    is_active?: boolean;
    order?: number;
    event_date?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Researcher {
    id: number;
    name: string;
    title_degree?: string;
    role: string;
    role_id?: string;
    specialization: string;
    specialization_id?: string;
    department?: string;
    institution?: string;
    email?: string;
    phone?: string;
    bio?: string;
    bio_id?: string;
    avatar_url?: string;
    scholar_url?: string;
    scopus_id?: string;
    orcid?: string;
    linkedin_url?: string;
    focus_areas?: string[];
    publications_count?: number;
    projects_count?: number;
    is_featured?: boolean;
    is_active?: boolean;
    order?: number;
    created_at?: string;
    updated_at?: string;
}

export interface SiteConfig {
    center_name: string;
    tagline: string;
    institution: string;
    sub_institution: string;
    director_quote: string;
    director_name: string;
    director_title: string;
    contact_email: string;
    contact_phone: string;
    address: string;
    maps_url?: string;
    university_url?: string;
    social_links: {
        linkedin?: string;
        github?: string;
        youtube?: string;
        twitter?: string;
        instagram?: string;
    };
}

export interface HomePageProps {
    metrics: ResearchMetric[];
    aboutHighlights: AboutHighlight[];
    domains: ResearchDomain[];
    projects: ResearchProject[];
    publications: Publication[];
    services: EnterpriseService[];
    partners: Partner[];
    articles: Article[];
    events: UpcomingEvent[];
    siteConfig: SiteConfig;
}

export interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    organization?: string | null;
    category: 'collaboration' | 'research' | 'enterprise' | 'academic' | 'general';
    subject: string;
    message: string;
    status: 'unread' | 'in_progress' | 'resolved' | 'archived';
    priority: 'normal' | 'high' | 'urgent';
    admin_notes?: string | null;
    replied_at?: string | null;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at: string;
    updated_at?: string;
}

