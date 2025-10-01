import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NotificationPublic } from "@repo/shared";
import { formatDistanceToNow, format } from "date-fns";
import {
  Clock,
  User,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface NotificationCardProps {
  notification: NotificationPublic;
  showActions?: boolean;
  defaultExpanded?: boolean;
  onMarkAsRead?: (id: string) => void;
  onUpdateStatus?: (id: string, status: string) => void;
  onDelete?: (id: string) => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Urgent":
      return "bg-red-100 text-red-800 border-red-200";
    case "High":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Accepted":
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
    case "In Progress":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "Rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "Overdue":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle2 className="w-4 h-4" />;
    case "Overdue":
    case "Rejected":
      return <XCircle className="w-4 h-4" />;
    case "In Progress":
      return <Clock className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDueDate = (date: Date | string) => {
  const dueDate = new Date(date);
  const now = new Date();
  const isOverdue = dueDate < now;

  return {
    formatted: format(dueDate, "MMM dd, yyyy"),
    distance: formatDistanceToNow(dueDate, { addSuffix: true }),
    isOverdue,
  };
};

export function NotificationCard({
  notification,
  showActions = true,
  defaultExpanded = false,
  onMarkAsRead,
  onUpdateStatus,
  onDelete,
}: NotificationCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isUnread = !notification.readAt;
  const dueInfo = notification.taskDetails?.dueDateTime
    ? formatDueDate(notification.taskDetails.dueDateTime)
    : null;

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // Quick actions for collapsed state
  const renderQuickActions = () => {
    if (!showActions || isExpanded) return null;

    return (
      <div className="flex items-center gap-2 ml-auto">
        {notification.status === "Pending" && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStatus?.(notification.id, "Accepted");
              }}
              className="text-xs text-green-600 border-green-200 hover:bg-green-50 px-2 py-1 h-7"
            >
              Accept
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStatus?.(notification.id, "Rejected");
              }}
              className="text-xs text-red-600 border-red-200 hover:bg-red-50 px-2 py-1 h-7"
            >
              Reject
            </Button>
          </>
        )}
        {notification.status === "Accepted" && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus?.(notification.id, "In Progress");
            }}
            className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50 px-2 py-1 h-7"
          >
            Start
          </Button>
        )}
        {notification.status === "In Progress" && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onUpdateStatus?.(notification.id, "Completed");
            }}
            className="text-xs text-green-600 border-green-200 hover:bg-green-50 px-2 py-1 h-7"
          >
            Complete
          </Button>
        )}
      </div>
    );
  };

  return (
    <Card
      className={`transition-all hover:shadow-md cursor-pointer ${isUnread ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""}`}
    >
      <CardHeader className="pb-3">
        <div
          className="flex items-start justify-between gap-3"
          onClick={toggleExpanded}
        >
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {isExpanded && (
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src="" />
                <AvatarFallback className="text-sm font-medium">
                  {getInitials(notification.sender.name)}
                </AvatarFallback>
              </Avatar>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm text-gray-900 truncate">
                  {notification.title}
                </h3>
                {isUnread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge
                  className={`text-xs ${getPriorityColor(notification.priority)}`}
                >
                  {notification.priority}
                </Badge>
                <Badge
                  className={`text-xs ${getStatusColor(notification.status)}`}
                >
                  <span className="flex items-center gap-1">
                    {getStatusIcon(notification.status)}
                    {notification.status}
                  </span>
                </Badge>
                {!isExpanded && (
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {renderQuickActions()}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded();
              }}
              className="h-8 w-8 p-0"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Sender info */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>
                {notification.sender.name} ({notification.sender.role})
              </span>
              <span>•</span>
              <span>
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            {/* Description */}
            {notification.description && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  {notification.description}
                </p>
              </div>
            )}

            {/* Animal info */}
            {notification.animal && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>
                  {notification.animal.name} ({notification.animal.species} -{" "}
                  {notification.animal.breed})
                </span>
              </div>
            )}

            {/* Due date */}
            {dueInfo && (
              <div
                className={`flex items-center gap-2 text-sm ${dueInfo.isOverdue ? "text-red-600" : "text-gray-600"}`}
              >
                <Calendar className="w-4 h-4" />
                <span>
                  Due: {dueInfo.formatted} ({dueInfo.distance})
                </span>
              </div>
            )}

            {/* Notes */}
            {notification.taskDetails?.notes && (
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{notification.taskDetails.notes}</span>
              </div>
            )}

            {/* Expanded actions */}
            {showActions && (
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                {isUnread && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onMarkAsRead?.(notification.id)}
                    className="text-xs"
                  >
                    Mark as Read
                  </Button>
                )}

                {notification.status === "Pending" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onUpdateStatus?.(notification.id, "Accepted")
                      }
                      className="text-xs text-green-600 border-green-200 hover:bg-green-50"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onUpdateStatus?.(notification.id, "Rejected")
                      }
                      className="text-xs text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Reject
                    </Button>
                  </>
                )}

                {notification.status === "Accepted" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onUpdateStatus?.(notification.id, "In Progress")
                    }
                    className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    Start Task
                  </Button>
                )}

                {notification.status === "In Progress" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onUpdateStatus?.(notification.id, "Completed")
                    }
                    className="text-xs text-green-600 border-green-200 hover:bg-green-50"
                  >
                    Complete
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete?.(notification.id)}
                  className="text-xs text-red-600 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
