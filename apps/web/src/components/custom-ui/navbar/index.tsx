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

type NavItem = {
  label: string;
  to: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", to: HOME },
  {
    label: "Animal Profiles",
    to: ANIMALS_PROFILE,
  },
  {
    label: "Diet Management",
    to: DIET_MANAGEMENT,
  },
  {
    label: "Feed Inventory",
    to: FEED_INVENTORY,
  },
  {
    label: "Health Monitoring",
    to: HEALTH_MONITORING,
  },
  {
    label: "Reports",
    to: REPORTS,
  },
  {
    label: "Educational Resources",
    to: EDUCATIONAL_RESOURCERS,
  },
  {
    label: "Settings",
    to: SETTINGS,
  },
];

export default function Sidebar() {
  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }: { isActive: boolean }) =>
            `p-3 border-b-2 border-gray-400 ${
              isActive
                ? "bg-gray-400 text-white"
                : "bg-transparent text-black hover:border-[1px] hover:border-gray-400 "
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
