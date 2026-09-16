export interface ResearchMetric {
    id: number;
    value: string;
    label: string;
    description: string;
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
    slug: string;
    icon: string;
    summary: string;
    link: string;
}

export interface ResearchProject {
    id: number;
    category: string;
    category_tag: string;
    title: string;
    slug: string;
    image_url: string;
    lead_researcher: string;
    summary: string;
    featured: boolean;
}

export interface Publication {
    id: number;
    badge: string;
    badge_type: 'green' | 'gray' | 'blue';
    year: number;
    venue: string;
    doi: string;
    title: string;
    authors: string;
    pdf_url?: string;
    doi_url?: string;
}

export interface EnterpriseService {
    id: number;
    service_number: string;
    title: string;
    summary: string;
    icon: string;
    action_label: string;
}

export interface Partner {
    id: number;
    name: string;
    category: string;
    logo_text?: string;
    logo_url?: string;
}

export interface Article {
    id: number;
    tag: string;
    date: string;
    title: string;
    slug: string;
    summary: string;
    read_time: string;
}

export interface UpcomingEvent {
    id: number;
    tag: string;
    date_display: string;
    title: string;
    description: string;
    location: string;
    primary_action_text: string;
    secondary_action_text: string;
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
    social_links: {
        linkedin?: string;
        github?: string;
        youtube?: string;
        twitter?: string;
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
