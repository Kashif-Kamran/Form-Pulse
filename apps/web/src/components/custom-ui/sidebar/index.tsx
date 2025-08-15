import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/custom-ui/navbar";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/api/profile.hook";
import { Menu, X, HelpCircle, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeAuthToken } from "@/utils/auth.utils";
import { queryClient } from "@/lib/query-client";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "@/constants/app-routes";

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
  const { data: profileInfo, refetch } = useMe();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Remove token from localStorage
      removeAuthToken();

      // Clear all queries from the cache
      queryClient.clear();

      // Navigate to login screen
      navigate(LOGIN, { replace: true });

      // Refetch the profile to trigger auth check (optional since we're navigating)
      await refetch();
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, remove the token, clear cache, and navigate
      removeAuthToken();
      queryClient.clear();
      navigate(LOGIN, { replace: true });
    }
  };

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
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none">
                      <Avatar className="w-[50px] h-[50px] cursor-pointer hover:opacity-80 transition-opacity">
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
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    side="right"
                    className="w-48"
                  >
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
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
            </Tooltip>
          ) : (
            <div className="flex gap-4 items-center w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex gap-4 items-center w-full focus:outline-none p-2 rounded-lg hover:bg-gray-400 transition-colors">
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
                    <div className="flex-1 flex flex-col justify-center overflow-hidden text-left">
                      <h1 className="font-bold p-0 truncate">
                        {profileInfo?.name ?? "No Name"}
                      </h1>
                      <h1 className="text-xs p-0 opacity-75 truncate">
                        {profileInfo?.role ?? "No Info found"}
                      </h1>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto mb-4">
          <Navbar isCollapsed={isCollapsed} />
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Sidebar;
