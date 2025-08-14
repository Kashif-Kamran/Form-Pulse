import { NavLink } from "react-router-dom";
import {
  ANIMALS_PROFILE,
  DIET_MANAGEMENT,
  EDUCATIONAL_RESOURCERS,
  FEED_INVENTORY,
  HEALTH_MONITORING,
  HOME,
  // REPORTS, // Temporarily removed
  SETTINGS,
  USER_MANAGEMENT,
} from "@/constants/app-routes";
import {
  Home,
  Users,
  UtensilsCrossed,
  Package,
  Heart,
  // FileText, // Temporarily removed
  BookOpen,
  Settings as SettingsIcon,
  UserCog,
} from "lucide-react";
import { useMe } from "@/hooks/api/profile.hook";
import { RoleType } from "@repo/shared";

type NavItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
  allowedRoles?: RoleType[];
};

const navItems: NavItem[] = [
  { label: "Dashboard", to: HOME, icon: Home },
  {
    label: "Animal Profiles",
    to: ANIMALS_PROFILE,
    icon: Users,
    allowedRoles: [RoleType.SuperAdmin, RoleType.Admin, RoleType.CareTaker],
  },
  {
    label: "Diet Management",
    to: DIET_MANAGEMENT,
    icon: UtensilsCrossed,
    allowedRoles: [RoleType.SuperAdmin, RoleType.Admin, RoleType.Nutritionist],
  },
  {
    label: "Feed Inventory",
    to: FEED_INVENTORY,
    icon: Package,
    allowedRoles: [RoleType.SuperAdmin, RoleType.Admin, RoleType.CareTaker],
  },
  {
    label: "Health Monitoring",
    to: HEALTH_MONITORING,
    icon: Heart,
    allowedRoles: [RoleType.SuperAdmin, RoleType.Admin, RoleType.Veterinarian],
  },
  {
    label: "User Management",
    to: USER_MANAGEMENT,
    icon: UserCog,
    allowedRoles: [RoleType.SuperAdmin, RoleType.Admin],
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
  const { data: profileInfo } = useMe();
  const userRole = profileInfo?.role;

  const isAccessAllowed = (item: NavItem): boolean => {
    // If adminOnly is set (for backward compatibility), check admin access
    if (item.adminOnly) {
      return userRole === RoleType.Admin || userRole === RoleType.SuperAdmin;
    }

    // If allowedRoles is specified, check if user role is in the list
    if (item.allowedRoles) {
      return item.allowedRoles.includes(userRole as RoleType);
    }

    // If no restrictions, allow access
    return true;
  };

  return (
    <nav className="flex flex-col gap-2">
      {navItems.filter(isAccessAllowed).map((item) => {
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
