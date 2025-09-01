import SearchInputFeild from "@/components/custom-ui/search-input-feild";
import DietListTable from "../components/diet-table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CREATE_DIET_PLAN } from "@/constants/app-routes";
import { useDietPlan } from "@/hooks/api/diet-plan.hook";
import { useMe } from "@/hooks/api/profile.hook";
import { RoleType } from "@repo/shared";
import { NotifyNutritionistDialog } from "../components/notify-nutritionist-dialog";
import { useToggleState } from "@/hooks/use-toggle-state";
import { Bell, Info, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function AnimalList() {
  const { results = [] } = useDietPlan();
  const { data: currentUser, isLoading: isUserLoading } = useMe();
  const [isNotifyDialogOpen, openNotifyDialog, closeNotifyDialog] =
    useToggleState();

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  const isNutritionist = currentUser?.role === RoleType.Nutritionist;
  const isCareTaker = currentUser?.role === RoleType.CareTaker;
  const isAdmin =
    currentUser?.role === RoleType.Admin ||
    currentUser?.role === RoleType.SuperAdmin;

  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex justify-center items-center gap-2">
        <SearchInputFeild placeholder="Search Animal..." />

        {/* Show Create Diet Plan button for Nutritionists and Admins */}
        {(isNutritionist || isAdmin) && (
          <Link className="h-full" to={CREATE_DIET_PLAN}>
            <Button className="h-full flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Diet Plan
            </Button>
          </Link>
        )}

        {/* Show Notify button for Care Takers and Admins */}
        {(isCareTaker || isAdmin) && (
          <Button
            className="h-full flex items-center gap-2"
            onClick={openNotifyDialog}
            variant="outline"
          >
            <Bell className="h-4 w-4" />
            Notify Nutritionist
          </Button>
        )}
      </div>

      {isNutritionist && !isAdmin && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Info className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-green-800">
                As a Nutritionist, you can create and manage diet plans for
                animals. Click "Create Diet Plan" to design customized nutrition
                programs.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <DietListTable results={results} />

      {/* Notify Nutritionist Dialog */}
      <NotifyNutritionistDialog
        isOpen={isNotifyDialogOpen}
        onOpenChange={closeNotifyDialog}
      />
    </div>
  );
}

export default AnimalList;
