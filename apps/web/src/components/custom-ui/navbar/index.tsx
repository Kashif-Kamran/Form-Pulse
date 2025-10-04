import { NavLink } from "react-router-dom";
import {
  ANIMALS_PROFILE,
  DIET_MANAGEMENT,
  EDUCATIONAL_RESOURCERS,
  FEED_INVENTORY,
  HEALTH_MONITORING,
  HOME,
  NOTIFICATIONS,
  // REPORTS, // Temporarily removed
  USER_MANAGEMENT,
} from "@/constants/app-routes";
import {
  Home,
  Users,
  UtensilsCrossed,
  Package,
  Heart,
  Bell,
  // FileText, // Temporarily removed
  BookOpen,
  UserCog,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMe } from "@/hooks/api/profile.hook";
import { useUnreadNotificationCount } from "@/hooks/api/notification.hook";
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
    label: "Notifications",
    to: NOTIFICATIONS,
    icon: Bell,
  },
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
  // {
  //   label: "Settings",
  //   to: SETTINGS,
  //   icon: SettingsIcon,
  // },
];

interface NavbarProps {
  isCollapsed?: boolean;
}

// Utility function to format notification count
const formatNotificationCount = (count: number): string => {
  if (count > 99) return "99+";
  return count.toString();
};

export default function Navbar({ isCollapsed = false }: NavbarProps) {
  const { data: profileInfo } = useMe();
  const userRole = profileInfo?.role;

  // Fetch unread notification count from API with 20-second refresh
  const { data: unreadData } = useUnreadNotificationCount();
  const unreadNotificationCount = unreadData?.unreadCount || 0;

  const isAccessAllowed = (item: NavItem): boolean => {
    const isAdmin =
      userRole === RoleType.Admin || userRole === RoleType.SuperAdmin;

    // Admins have access to everything
    if (isAdmin) {
      return true;
    }

    // If adminOnly is set (for backward compatibility), check admin access
    if (item.adminOnly) {
      return isAdmin;
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
        const isNotificationTab = item.to === NOTIFICATIONS;
        const showNotificationBadge =
          isNotificationTab && unreadNotificationCount > 0;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }: { isActive: boolean }) =>
              `p-3 border-b-2 border-gray-400 rounded-md transition-all duration-200 flex items-center gap-3 relative ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-black hover:border-[1px] hover:border-primary "
              } ${isCollapsed ? "justify-center" : ""}`
            }
            title={isCollapsed ? item.label : undefined}
          >
            {/* Icon with notification badge for collapsed state */}
            <div className="relative flex items-center">
              <IconComponent className="h-5 w-5 flex-shrink-0" />
              {showNotificationBadge && isCollapsed && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center rounded-full min-w-[20px] animate-pulse shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  {formatNotificationCount(unreadNotificationCount)}
                </Badge>
              )}
            </div>

            {/* Label and badge for expanded state */}
            {!isCollapsed && (
              <div className="flex items-center justify-between flex-1">
                <span className="truncate">{item.label}</span>
                {showNotificationBadge && (
                  <Badge
                    variant="destructive"
                    className="h-5 text-xs px-2 py-0 ml-2 rounded-full min-w-[20px] flex items-center justify-center animate-pulse shadow-lg"
                  >
                    {formatNotificationCount(unreadNotificationCount)}
                  </Badge>
                )}
              </div>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
