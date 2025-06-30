import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/custom-ui/navbar";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/api/profile.hook";
import { Menu, X, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

function Sidebar({
  className,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const { data: profileInfo } = useMe();

  return (
    <TooltipProvider>
      <div
        className={`bg-gray-300 w-full rounded-lg border-[1px] border-gray-500 p-4 h-full flex flex-col transition-all duration-300 ease-in-out ${className}`}
      >
        {/* Toggle Button */}
        <div
          className={`flex ${isCollapsed ? "justify-center mb-2" : "justify-end mb-2"}`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className="h-8 w-8 p-0 hover:bg-gray-400 z-10"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <Menu className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Avatar Section */}
        <div
          className={`flex gap-4 p-2 mb-4 ${isCollapsed ? "justify-center" : ""}`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="w-[50px] h-[50px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {profileInfo?.name
                    ? profileInfo.name.substring(0, 2).toUpperCase()
                    : "CN"}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <div className="text-center">
                  <p className="font-semibold">
                    {profileInfo?.name ?? "No Name"}
                  </p>
                  <p className="text-xs opacity-75">
                    {profileInfo?.role ?? "No Role"}
                  </p>
                </div>
              </TooltipContent>
            )}
          </Tooltip>

          {!isCollapsed && (
            <div className="flex-1 flex flex-col justify-center overflow-hidden">
              <h1 className="font-bold p-0 truncate">
                {profileInfo?.name ?? "No Name"}
              </h1>
              <h1 className="text-xs p-0 opacity-75 truncate">
                {profileInfo?.role ?? "No Info found"}
              </h1>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto mb-4">
          <Navbar isCollapsed={isCollapsed} />
        </div>

        {/* Help Center Button */}
        <div className={`${isCollapsed ? "flex justify-center" : ""}`}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-400"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Help Center</TooltipContent>
            </Tooltip>
          ) : (
            <Button className="text-black w-full" variant={"link"}>
              Help Center
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Sidebar;
