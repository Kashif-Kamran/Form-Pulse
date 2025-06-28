import SearchInputFeild from "@/components/custom-ui/search-input-feild";
import NotifyNutritionistCard from "../components/notify-nutritionist-card";
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
  const isVeterinarian = currentUser?.role === RoleType.Veterinarian;

  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex justify-center items-center gap-2">
        <SearchInputFeild placeholder="Search Animal..." />

        {/* Show Create Diet Plan button only for Nutritionists */}
        {isNutritionist && (
          <Link className="h-full" to={CREATE_DIET_PLAN}>
            <Button className="h-full flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Diet Plan
            </Button>
          </Link>
        )}

        {/* Show Notify button only for Care Takers */}
        {isCareTaker && (
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

      {/* Role-specific information alerts */}
      {isVeterinarian && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                As a Veterinarian, you can view all diet plans to understand
                animal nutrition as part of your medical assessments.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {isNutritionist && (
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

      {/* Show NotifyNutritionistCard only for Care Takers */}
      {isCareTaker && <NotifyNutritionistCard />}

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
