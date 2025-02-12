import NotificationsCard from "./components/notifications-card";
import RemindersCard from "./components/remindars-card";
import RoleManagementCard from "./components/role-management-card";

function Dashboard() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex gap-2 h-1/2 max-h-[500px] min-h-[200px]">
        <RemindersCard />
        <NotificationsCard />
      </div>
      <div className="h-1/2">
        <RoleManagementCard />
      </div>
    </div>
  );
}

export default Dashboard;
