import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NotificationCard } from "@/components/notifications/notification-card";
import { CreateNotificationModal } from "@/components/notifications/create-notification-modal";
import {
  useNotificationsDualList,
  useMarkNotificationAsRead,
  useUpdateNotificationStatus,
  useDeleteNotification,
  useMarkAllNotificationsAsRead,
} from "@/hooks/api/notification.hook";
import {
  Bell,
  CheckCircle2,
  Send,
  ListTodo,
  Filter,
  XCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

const NotificationsDashboard = () => {
  const [activeTab, setActiveTab] = useState("received");

  // Fetch notifications from API
  const {
    data: notificationsData,
    isLoading,
    error,
    refetch,
  } = useNotificationsDualList();

  // Mutation hooks for actions
  const markAsReadMutation = useMarkNotificationAsRead();
  const updateStatusMutation = useUpdateNotificationStatus();
  const deleteNotificationMutation = useDeleteNotification();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-gray-600">Loading notifications...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h3 className="text-lg font-medium text-gray-900">
              Failed to load notifications
            </h3>
            <p className="text-gray-600 max-w-md">
              {error.message ||
                "An error occurred while fetching notifications"}
            </p>
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const allReceivedNotifications = notificationsData?.received || [];
  const allSentNotifications = notificationsData?.sent || [];

  // Filter notifications based on status for each tab
  const getFilteredNotifications = () => {
    return {
      received: allReceivedNotifications.filter((n) => n.status === "Pending"),
      todo: allReceivedNotifications.filter(
        (n) => n.status === "Accepted" || n.status === "In Progress"
      ),
      completed: allReceivedNotifications.filter(
        (n) => n.status === "Completed"
      ),
      rejected: allReceivedNotifications.filter((n) => n.status === "Rejected"),
      sent: allSentNotifications,
    };
  };

  const notifications = getFilteredNotifications();

  // Calculate counts for tabs
  const counts = {
    received: {
      total: notifications.received.length,
      unread: notifications.received.filter((n) => !n.readAt).length,
    },
    todo: notifications.todo.length,
    completed: notifications.completed.length,
    rejected: notifications.rejected.length,
    sent: {
      total: notifications.sent.length,
      inProgress: notifications.sent.filter((n) => n.status === "In Progress")
        .length,
      completed: notifications.sent.filter((n) => n.status === "Completed")
        .length,
    },
  };

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id, {
      onError: (error) => {
        console.error("Failed to mark notification as read:", error);
      },
    });
  };

  const handleUpdateStatus = (id: string, status: string) => {
    updateStatusMutation.mutate(
      {
        id,
        data: { status: status as any },
      },
      {
        onError: (error) => {
          console.error("Failed to update notification status:", error);
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteNotificationMutation.mutate(id, {
      onError: (error) => {
        console.error("Failed to delete notification:", error);
      },
    });
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate(undefined, {
      onError: (error) => {
        console.error("Failed to mark all notifications as read:", error);
      },
    });
  };

  const EmptyState = ({
    icon: Icon,
    title,
    description,
  }: {
    icon: any;
    title: string;
    description: string;
  }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="w-16 h-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md">{description}</p>
    </div>
  );

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Notifications Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your notifications, tasks, and team communications
          </p>
        </div>
        <CreateNotificationModal
          onNotificationCreated={(data) => {
            console.log("New notification created:", data);
            // Refetch notifications to show the new one
            refetch();
          }}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-3xl grid-cols-5 mb-6">
          <TabsTrigger value="received" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>Received</span>
            {counts.received.unread > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {counts.received.unread}
              </Badge>
            )}
          </TabsTrigger>

          <TabsTrigger value="todo" className="flex items-center gap-2">
            <ListTodo className="w-4 h-4" />
            <span>Todo</span>
            {counts.todo > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {counts.todo}
              </Badge>
            )}
          </TabsTrigger>

          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed</span>
            {counts.completed > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {counts.completed}
              </Badge>
            )}
          </TabsTrigger>

          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            <span>Rejected</span>
            {counts.rejected > 0 && (
              <Badge variant="outline" className="ml-1 text-xs">
                {counts.rejected}
              </Badge>
            )}
          </TabsTrigger>

          <TabsTrigger value="sent" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            <span>Sent</span>
            {counts.sent.total > 0 && (
              <Badge variant="outline" className="ml-1 text-xs">
                {counts.sent.total}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Received Notifications
              </h2>
              <p className="text-gray-600 text-sm">
                New notifications waiting for your response (
                {counts.received.unread} unread)
              </p>
            </div>
            <div className="flex gap-2">
              {counts.received.unread > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  disabled={markAllAsReadMutation.isPending}
                >
                  {markAllAsReadMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Marking...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark All Read
                    </>
                  )}
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              {notifications.received.length > 0 ? (
                <div className="space-y-4">
                  {notifications.received.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                      onUpdateStatus={handleUpdateStatus}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Bell}
                  title="No pending notifications"
                  description="All caught up! No new notifications waiting for your response."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="todo" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
              <p className="text-gray-600 text-sm">
                Accepted tasks that you're working on
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              {notifications.todo.length > 0 ? (
                <div className="space-y-4">
                  {notifications.todo.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                      onUpdateStatus={handleUpdateStatus}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={ListTodo}
                  title="No active tasks"
                  description="Great! You have no tasks in progress at the moment."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Completed Tasks
              </h2>
              <p className="text-gray-600 text-sm">
                All your completed tasks and notifications ({counts.completed}{" "}
                total)
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              {notifications.completed.length > 0 ? (
                <div className="space-y-4">
                  {notifications.completed.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      showActions={false}
                      defaultExpanded={false}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={CheckCircle2}
                  title="No completed tasks yet"
                  description="Completed tasks and notifications will appear here for your reference."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Rejected Tasks
              </h2>
              <p className="text-gray-600 text-sm">
                Tasks and notifications you've rejected ({counts.rejected}{" "}
                total)
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              {notifications.rejected.length > 0 ? (
                <div className="space-y-4">
                  {notifications.rejected.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      showActions={false}
                      defaultExpanded={false}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={XCircle}
                  title="No rejected tasks"
                  description="Tasks and notifications you reject will appear here."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Sent Notifications
              </h2>
              <p className="text-gray-600 text-sm">
                Messages and tasks you've sent to others (
                {counts.sent.inProgress} in progress, {counts.sent.completed}{" "}
                completed)
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              {notifications.sent.length > 0 ? (
                <div className="space-y-4">
                  {notifications.sent.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      showActions={false} // Don't show actions for sent notifications
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Send}
                  title="No messages sent"
                  description="You haven't sent any notifications yet. Messages and tasks you send to others will appear here."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsDashboard;
