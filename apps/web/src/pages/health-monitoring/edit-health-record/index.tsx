import { useParams, useNavigate } from "react-router-dom";
import { useHealthRecordById } from "@/hooks/api/animal-health-record.hook";
import FallbackSpinnerScreen from "@/components/custom-ui/fallback-spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { HEALTH_MONITORING } from "@/constants/app-routes";
import { HealthRecordForm } from "../components/health-record-form";

function EditHealthRecord() {
  const { healthRecordId } = useParams<{ healthRecordId: string }>();
  const navigate = useNavigate();

  const {
    data: healthRecord,
    isLoading,
    error,
  } = useHealthRecordById(healthRecordId!);

  if (isLoading) {
    return <FallbackSpinnerScreen />;
  }

  if (error || !healthRecord) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Health Record Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The health record you're looking for doesn't exist or has been
          deleted.
        </p>
        <Button onClick={() => navigate(HEALTH_MONITORING)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Health Monitoring
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden bg-white rounded-lg border border-gray-300 p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(HEALTH_MONITORING)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Health Record</h1>
      </div>

      <div className="h-full">
        <HealthRecordForm healthRecord={healthRecord} mode="edit" />
      </div>
    </div>
  );
}

export default EditHealthRecord;
