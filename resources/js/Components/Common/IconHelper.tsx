import React from 'react';
import {
    Cpu,
    Network,
    Users,
    Leaf,
    Truck,
    Binary,
    Brain,
    Recycle,
    Zap,
    UserCheck,
    Sliders,
    FlaskConical,
    TrendingUp,
    CheckCircle,
    ShieldCheck,
    Award,
    Layers,
    FileText,
    ArrowRight,
    ExternalLink,
    Search,
    Globe,
    Calendar,
    MapPin,
    Mail,
    Phone,
    Building2,
    ChevronRight,
    ChevronDown,
    Menu,
    X,
    Sparkles,
    Check,
    LucideProps,
} from 'lucide-react';

interface IconHelperProps extends LucideProps {
    name: string;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, ...props }) => {
    switch (name) {
        case 'Cpu':
            return <Cpu {...props} />;
        case 'Network':
            return <Network {...props} />;
        case 'Users':
            return <Users {...props} />;
        case 'Leaf':
            return <Leaf {...props} />;
        case 'Truck':
            return <Truck {...props} />;
        case 'Binary':
            return <Binary {...props} />;
        case 'Brain':
            return <Brain {...props} />;
        case 'Recycle':
            return <Recycle {...props} />;
        case 'Zap':
            return <Zap {...props} />;
        case 'UserCheck':
            return <UserCheck {...props} />;
        case 'Sliders':
            return <Sliders {...props} />;
        case 'FlaskConical':
            return <FlaskConical {...props} />;
        case 'TrendingUp':
            return <TrendingUp {...props} />;
        case 'CheckCircle':
            return <CheckCircle {...props} />;
        case 'ShieldCheck':
            return <ShieldCheck {...props} />;
        case 'Award':
            return <Award {...props} />;
        case 'Layers':
            return <Layers {...props} />;
        case 'FileText':
            return <FileText {...props} />;
        case 'Building2':
            return <Building2 {...props} />;
        default:
            return <Sparkles {...props} />;
    }
};

export {
    Cpu,
    Network,
    Users,
    Leaf,
    Truck,
    Binary,
    Recycle,
    Zap,
    UserCheck,
    Sliders,
    FlaskConical,
    TrendingUp,
    CheckCircle,
    ShieldCheck,
    Award,
    Layers,
    FileText,
    ArrowRight,
    ExternalLink,
    Search,
    Globe,
    Calendar,
    MapPin,
    Mail,
    Phone,
    Building2,
    ChevronRight,
    ChevronDown,
    Menu,
    X,
    Sparkles,
    Check,
};
