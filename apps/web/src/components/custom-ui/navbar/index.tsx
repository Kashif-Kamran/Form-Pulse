import { NavLink } from "react-router-dom";
import {
  ANIMALS_PROFILE,
  DIET_MANAGEMENT,
  EDUCATIONAL_RESOURCERS,
  FEED_INVENTORY,
  HEALTH_MONITORING,
  HOME,
  REPORTS,
  SETTINGS,
} from "@/constants/app-routes";
import {
  Home,
  Users,
  UtensilsCrossed,
  Package,
  Heart,
  FileText,
  BookOpen,
  Settings as SettingsIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { label: "Dashboard", to: HOME, icon: Home },
  {
    label: "Animal Profiles",
    to: ANIMALS_PROFILE,
    icon: Users,
  },
  {
    label: "Diet Management",
    to: DIET_MANAGEMENT,
    icon: UtensilsCrossed,
  },
  {
    label: "Feed Inventory",
    to: FEED_INVENTORY,
    icon: Package,
  },
  {
    label: "Health Monitoring",
    to: HEALTH_MONITORING,
    icon: Heart,
  },
  {
    label: "Reports",
    to: REPORTS,
    icon: FileText,
  },
  {
    label: "Educational Resources",
    to: EDUCATIONAL_RESOURCERS,
    icon: BookOpen,
  },
  {
    label: "Settings",
    to: SETTINGS,
    icon: SettingsIcon,
  },
];

interface NavbarProps {
  isCollapsed?: boolean;
}

export default function Navbar({ isCollapsed = false }: NavbarProps) {
  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }: { isActive: boolean }) =>
              `p-3 border-b-2 border-gray-400 rounded-md transition-all duration-200 flex items-center gap-3 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-black hover:border-[1px] hover:border-primary "
              } ${isCollapsed ? "justify-center" : ""}`
            }
            title={isCollapsed ? item.label : undefined}
          >
            <IconComponent className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        );
      })}
    </nav>
  );
}
