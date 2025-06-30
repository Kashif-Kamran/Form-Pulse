import { useParams } from "react-router-dom";
import { useDietPlanById } from "@/hooks/api/diet-plan.hook";
import DietPlanForm from "./components/forms/diet-plan.form";
import FallbackSpinnerScreen from "@/components/custom-ui/fallback-spinner";

function EditDietPlanPage() {
  const { dietPlanId } = useParams<{ dietPlanId: string }>();
  const { data: dietPlan, isLoading, isError } = useDietPlanById(dietPlanId!);

  if (isLoading) {
    return <FallbackSpinnerScreen />;
  }

  if (isError || !dietPlan) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Diet Plan Not Found
          </h2>
          <p className="text-gray-600">
            The diet plan you're looking for could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DietPlanForm mode="edit" dietPlan={dietPlan} dietPlanId={dietPlanId} />
  );
}

export default EditDietPlanPage;
