import { HealthRecordResponseItem } from "@repo/shared";
import {
  Calendar,
  Clock,
  Syringe,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MapPin,
  Hash,
  ChevronUp,
  ChevronDown,
  Stethoscope,
  PawPrint,
} from "lucide-react";
import { differenceInDays, format } from "date-fns";
import {
  VaccineStatuses,
  VaccineStatusValues,
} from "@repo/shared/dist/cjs/types/enum.types";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  useHealthRecordsByAnimalId,
  useUpdateHealthRecordStatus,
} from "@/hooks/api/animal-health-record.hook";
import { useMe } from "@/hooks/api/profile.hook";

interface MedicalHistoryProps {
  animalId: string;
}

export const MedicalHistory = ({ animalId }: MedicalHistoryProps) => {
  const { results: vaccinations = [], isLoading, error } = useHealthRecordsByAnimalId(
    animalId!
  );

  if (isLoading) return <h1>Animal Health Record is Loading</h1>;

  if (error) {
    console.error("Error loading health records:", error);
    return (
      <div className="">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-red-600">
              Error Loading Medical History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500 text-center py-4">
              Unable to load medical history: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log("Medical History - Vaccinations:", vaccinations);

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Vaccinations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {vaccinations.length > 0 ? (
            <div className="space-y-4">
              {vaccinations.map((vaccination) => (
                <VaccinationCard
                  key={vaccination.id}
                  vaccination={vaccination}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No recent vaccinations found
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface VaccinationCardProps {
  vaccination: HealthRecordResponseItem;
  onCardClick?: (vaccination: HealthRecordResponseItem) => void;
  defaultExpanded?: boolean;
}

export const VaccinationCard: React.FC<VaccinationCardProps> = ({
  vaccination,
  onCardClick,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { data: loggedInUser } = useMe();
  const updateHealthRecordStatus = useUpdateHealthRecordStatus();

  console.log("LoggedIn User : ", loggedInUser);

  const getDaysLeft = (dueDate: Date): number => {
    return differenceInDays(new Date(dueDate), new Date());
  };

  const getStatusVariant = (status: VaccineStatusValues, dueDate: Date) => {
    const daysLeft = getDaysLeft(dueDate);

    switch (status) {
      case "Completed":
        return {
          badge: "default" as const,
          badgeClass: "bg-green-100 text-green-800 hover:bg-green-200",
          icon: CheckCircle,
          iconColor: "text-green-600",
          label: "Completed",
          borderColor: "border-l-green-500",
          cardClass: "bg-green-50/30",
        };
      case "Pending":
        if (daysLeft < 0) {
          return {
            badge: "destructive" as const,
            badgeClass: "",
            icon: XCircle,
            iconColor: "text-red-600",
            label: "Overdue",
            borderColor: "border-l-red-500",
            cardClass: "bg-red-50/30",
          };
        } else if (daysLeft <= 7) {
          return {
            badge: "secondary" as const,
            badgeClass: "bg-orange-100 text-orange-800 hover:bg-orange-200",
            icon: AlertTriangle,
            iconColor: "text-orange-600",
            label: "Due Soon",
            borderColor: "border-l-orange-500",
            cardClass: "bg-orange-50/30",
          };
        }
        return {
          badge: "outline" as const,
          badgeClass: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
          icon: Clock,
          iconColor: "text-yellow-600",
          label: "Pending",
          borderColor: "border-l-yellow-500",
          cardClass: "bg-yellow-50/30",
        };
      case "Overdue":
        return {
          badge: "destructive" as const,
          badgeClass: "",
          icon: XCircle,
          iconColor: "text-red-600",
          label: "Overdue",
          borderColor: "border-l-red-500",
          cardClass: "bg-red-50/30",
        };
      default:
        return {
          badge: "secondary" as const,
          badgeClass: "",
          icon: Clock,
          iconColor: "text-gray-600",
          label: "Unknown",
          borderColor: "border-l-gray-500",
          cardClass: "",
        };
    }
  };

  const getDaysLeftText = (
    dueDate: Date,
    status: VaccineStatusValues
  ): string => {
    const daysLeft = getDaysLeft(dueDate);

    if (status === "Completed") {
      return "Completed";
    }

    if (daysLeft < 0) {
      return `${Math.abs(daysLeft)} days overdue`;
    } else if (daysLeft === 0) {
      return "Due today";
    } else if (daysLeft === 1) {
      return "Due tomorrow";
    } else {
      return `${daysLeft} days left`;
    }
  };

  const getProgressValue = (
    dueDate: Date,
    status: VaccineStatusValues
  ): number => {
    if (status === "Completed") return 100;
    const daysLeft = getDaysLeft(dueDate);
    if (daysLeft < 0) return 100;
    return Math.max(10, Math.min(100, ((30 - daysLeft) / 30) * 100));
  };

  const statusInfo = getStatusVariant(vaccination.status, vaccination.dueDate);
  const daysLeft = getDaysLeft(vaccination.dueDate);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    if (onCardClick) {
      onCardClick(vaccination);
    }
  };

  const handleMarkAsCompleted = async () => {
    try {
      await updateHealthRecordStatus.mutateAsync({
        recordId: vaccination.healthRecordId,
        scheduleId: vaccination.id,
        payload: {
          newStatus: VaccineStatuses.COMPLETED,
        },
      });
      console.log("Vaccination marked as completed successfully");
    } catch (error) {
      console.error("Failed to mark vaccination as completed:", error);
    }
  };

  const handleMarkAsPending = async () => {
    try {
      await updateHealthRecordStatus.mutateAsync({
        recordId: vaccination.healthRecordId,
        scheduleId: vaccination.id,
        payload: {
          newStatus: VaccineStatuses.PENDING,
        },
      });
      console.log("Vaccination marked as pending successfully");
    } catch (error) {
      console.error("Failed to mark vaccination as pending:", error);
    }
  };

  // Check if vaccination was completed within the last 10 minutes
  const canRevertToPending = () => {
    if (
      vaccination.status !== VaccineStatuses.COMPLETED ||
      !vaccination.administeredDate
    ) {
      return false;
    }

    const now = new Date();
    const administeredTime = new Date(vaccination.administeredDate);
    const timeDifferenceInMinutes =
      (now.getTime() - administeredTime.getTime()) / (1000 * 60);

    return timeDifferenceInMinutes <= 10;
  };

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md border-l-4 ${statusInfo.borderColor} ${statusInfo.cardClass}`}
    >
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="cursor-pointer" onClick={handleCardClick}>
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Syringe className="h-4 w-4 text-primary" />
                      <span className="truncate">
                        {vaccination.vaccine.name}
                      </span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {vaccination.vaccine.type}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(vaccination.dueDate), "MMM dd, yyyy")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Stethoscope className="h-3 w-3" />
                        Dr. {vaccination.veterinarian.name.split(" ")[0]}
                      </span>
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <Badge
                      variant={statusInfo.badge}
                      className={statusInfo.badgeClass}
                    >
                      {statusInfo.label}
                    </Badge>
                    <p
                      className={`text-xs mt-1 font-medium ${
                        vaccination.status === "Completed"
                          ? "text-green-600"
                          : daysLeft < 0
                            ? "text-red-600"
                            : daysLeft <= 7
                              ? "text-orange-600"
                              : "text-blue-600"
                      }`}
                    >
                      {getDaysLeftText(vaccination.dueDate, vaccination.status)}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="p-1">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <Separator className="mb-4" />

            {/* Detailed Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Animal Information */}
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-blue-600">
                      <AvatarFallback className="bg-blue-600 text-white font-bold">
                        <PawPrint className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">
                        {vaccination.animal.name}
                      </CardTitle>
                      <CardDescription>
                        {vaccination.animal.species} •{" "}
                        {vaccination.animal.breed}
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mt-1">
                        Age: {vaccination.animal.age} years • Weight:{" "}
                        {vaccination.animal.weight}kg
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Veterinarian Information */}
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-green-600">
                      <AvatarFallback className="bg-green-600 text-white font-bold">
                        {vaccination.veterinarian.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">
                        Dr. {vaccination.veterinarian.name}
                      </CardTitle>
                      <CardDescription>Veterinarian</CardDescription>
                      <p className="text-xs text-muted-foreground mt-1">
                        {vaccination.veterinarian.email}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Vaccine Details and Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Vaccine Details */}
              <Card className="border-purple-200 bg-purple-50/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-purple-600">
                      <AvatarFallback className="bg-purple-600 text-white">
                        <Syringe className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">
                        {vaccination.vaccine.name}
                      </CardTitle>
                      <CardDescription className="capitalize">
                        {vaccination.vaccine.type} Vaccine
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mt-1">
                        Quantity: {vaccination.quantity} ml
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Timeline Information */}
              <Card className="border-amber-200 bg-amber-50/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    Timeline
                  </CardTitle>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Due Date</p>
                      <p className="text-sm text-muted-foreground">
                        {format(
                          new Date(vaccination.dueDate),
                          "EEEE, MMM dd, yyyy"
                        )}
                      </p>
                    </div>

                    {vaccination.administeredDate && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-sm font-medium text-green-700 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Administered
                            {canRevertToPending() && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-xs border-orange-300 text-orange-600"
                              >
                                Can Revert
                              </Badge>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(
                              new Date(vaccination.administeredDate),
                              "EEEE, MMM dd, yyyy 'at' HH:mm"
                            )}
                          </p>
                          {canRevertToPending() && (
                            <p className="text-xs text-orange-600 mt-1">
                              Can be reverted to pending (completed within 10
                              minutes)
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Progress Bar for Pending Vaccinations */}
            {vaccination.status === "Pending" && daysLeft >= 0 && (
              <Card className="border-gray-200 bg-gray-50/50">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">
                      Vaccination Timeline
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        daysLeft <= 7
                          ? "border-orange-500 text-orange-700"
                          : "border-blue-500 text-blue-700"
                      }
                    >
                      {daysLeft <= 7 ? "Urgent" : "On Schedule"}
                    </Badge>
                  </div>
                  <Progress
                    value={getProgressValue(
                      vaccination.dueDate,
                      vaccination.status
                    )}
                    className="h-2"
                  />
                </CardContent>
              </Card>
            )}

            <Separator className="my-4" />

            {/* Footer with IDs */}
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  Schedule: {vaccination.id.slice(-8)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Record: {vaccination.healthRecordId.slice(-8)}
                </span>
              </div>
              {loggedInUser?.id === vaccination.veterinarian._id && (
                <div className="flex gap-2">
                  {vaccination.status !== VaccineStatuses.COMPLETED && (
                    <Button
                      type="button"
                      variant={"outline"}
                      className="text-xs h-auto p-2 hover:bg-primary hover:text-primary-foreground"
                      onClick={handleMarkAsCompleted}
                      disabled={updateHealthRecordStatus.isPending}
                    >
                      {updateHealthRecordStatus.isPending
                        ? "Updating..."
                        : "Mark as Completed"}
                    </Button>
                  )}

                  {vaccination.status === VaccineStatuses.COMPLETED &&
                    canRevertToPending() && (
                      <Button
                        type="button"
                        variant={"outline"}
                        className="text-xs h-auto p-2 hover:bg-orange-500 hover:text-white border-orange-300 text-orange-600"
                        onClick={handleMarkAsPending}
                        disabled={updateHealthRecordStatus.isPending}
                      >
                        {updateHealthRecordStatus.isPending
                          ? "Updating..."
                          : "Revert to Pending"}
                      </Button>
                    )}
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
