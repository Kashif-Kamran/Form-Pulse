import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Utensils,
  Scale,
  CheckCircle,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Hash,
  Leaf,
  Timer,
} from "lucide-react";
import { differenceInDays, format, isBefore, isWithinInterval } from "date-fns";
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
import { useAnimalDietPlan } from "@/hooks/api/diet-plan.hook";
import { AnimalDietPlanPublic } from "@repo/shared";

interface DietHistoryProps {
  animalId: string;
}

export const DietHistory = ({ animalId }: DietHistoryProps) => {
  // Use mock data if no results provided, otherwise use provided results
  const { results: dietPlans = [], isLoading } = useAnimalDietPlan(animalId);

  if (isLoading) return <h1>Animal Diet Plan is Loading</h1>;

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Diet Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dietPlans.length > 0 ? (
            <div className="space-y-4">
              {dietPlans.map((dietPlan) => (
                <DietPlanCard key={dietPlan.id} dietPlan={dietPlan} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No diet plans found
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface DietPlanCardProps {
  dietPlan: AnimalDietPlanPublic;
  onCardClick?: (dietPlan: AnimalDietPlanPublic) => void;
  defaultExpanded?: boolean;
}

export const DietPlanCard: React.FC<DietPlanCardProps> = ({
  dietPlan,
  onCardClick,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const getDietPlanStatus = (startDate: Date, endDate: Date) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isBefore(now, start)) {
      return "upcoming";
    } else if (isWithinInterval(now, { start, end })) {
      return "active";
    } else {
      return "completed";
    }
  };

  const getDaysRemaining = (endDate: Date): number => {
    return differenceInDays(new Date(endDate), new Date());
  };

  const getStatusVariant = (startDate: Date, endDate: Date) => {
    const status = getDietPlanStatus(startDate, endDate);
    const daysRemaining = getDaysRemaining(endDate);

    switch (status) {
      case "active":
        if (daysRemaining <= 3) {
          return {
            badge: "secondary" as const,
            badgeClass: "bg-orange-100 text-orange-800 hover:bg-orange-200",
            icon: AlertTriangle,
            iconColor: "text-orange-600",
            label: "Ending Soon",
            borderColor: "border-l-orange-500",
            cardClass: "bg-orange-50/30",
          };
        }
        return {
          badge: "default" as const,
          badgeClass: "bg-green-100 text-green-800 hover:bg-green-200",
          icon: CheckCircle,
          iconColor: "text-green-600",
          label: "Active",
          borderColor: "border-l-green-500",
          cardClass: "bg-green-50/30",
        };
      case "upcoming":
        return {
          badge: "outline" as const,
          badgeClass: "bg-blue-100 text-blue-800 hover:bg-blue-200",
          icon: Clock,
          iconColor: "text-blue-600",
          label: "Upcoming",
          borderColor: "border-l-blue-500",
          cardClass: "bg-blue-50/30",
        };
      case "completed":
        return {
          badge: "secondary" as const,
          badgeClass: "bg-gray-100 text-gray-800 hover:bg-gray-200",
          icon: CheckCircle,
          iconColor: "text-gray-600",
          label: "Completed",
          borderColor: "border-l-gray-500",
          cardClass: "bg-gray-50/30",
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

  const getStatusText = (startDate: Date, endDate: Date): string => {
    const status = getDietPlanStatus(startDate, endDate);
    const daysRemaining = getDaysRemaining(endDate);

    switch (status) {
      case "active":
        if (daysRemaining <= 0) {
          return "Ends today";
        } else if (daysRemaining === 1) {
          return "Ends tomorrow";
        } else {
          return `${daysRemaining} days remaining`;
        }
      case "upcoming":
        const daysUntilStart = differenceInDays(
          new Date(startDate),
          new Date()
        );
        if (daysUntilStart === 0) {
          return "Starts today";
        } else if (daysUntilStart === 1) {
          return "Starts tomorrow";
        } else {
          return `Starts in ${daysUntilStart} days`;
        }
      case "completed":
        const daysAgo = Math.abs(daysRemaining);
        if (daysAgo === 0) {
          return "Ended today";
        } else if (daysAgo === 1) {
          return "Ended yesterday";
        } else {
          return `Ended ${daysAgo} days ago`;
        }
      default:
        return "Unknown";
    }
  };

  const getProgressValue = (startDate: Date, endDate: Date): number => {
    const status = getDietPlanStatus(startDate, endDate);
    if (status === "completed") return 100;
    if (status === "upcoming") return 0;

    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDuration = differenceInDays(end, start);
    const elapsed = differenceInDays(now, start);

    return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
  };

  const calculateTotalNutrition = () => {
    return dietPlan.recipes.reduce(
      (total, recipe) => {
        const nutrition = recipe.feed.nutritionInfo;
        if (nutrition) {
          total.calories += (nutrition.calories * recipe.quantity) / 100;
          total.protein += (nutrition.protein * recipe.quantity) / 100;
          total.carbs += (nutrition.carbs * recipe.quantity) / 100;
          total.fats += (nutrition.fats * recipe.quantity) / 100;
        }
        total.weight += recipe.quantity;
        return total;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0, weight: 0 }
    );
  };

  const statusInfo = getStatusVariant(dietPlan.startTime, dietPlan.endTime);
  const totalNutrition = calculateTotalNutrition();

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    if (onCardClick) {
      onCardClick(dietPlan);
    }
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
                      <Utensils className="h-4 w-4 text-primary" />
                      <span className="truncate">
                        Diet Plan ({dietPlan.recipes.length} ingredients)
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {Math.round(totalNutrition.weight)}g total
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(dietPlan.startTime), "MMM dd")} -{" "}
                        {format(new Date(dietPlan.endTime), "MMM dd, yyyy")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Scale className="h-3 w-3" />
                        {Math.round(totalNutrition.calories)} kcal
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
                    <p className="text-xs mt-1 font-medium text-gray-600">
                      {getStatusText(dietPlan.startTime, dietPlan.endTime)}
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

            {/* Timeline and Progress */}
            <Card className="border-blue-200 bg-blue-50/50 mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Timer className="h-4 w-4 text-blue-600" />
                  Timeline
                </CardTitle>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">Start Date</p>
                      <p className="text-muted-foreground">
                        {format(
                          new Date(dietPlan.startTime),
                          "EEEE, MMM dd, yyyy"
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">End Date</p>
                      <p className="text-muted-foreground">
                        {format(
                          new Date(dietPlan.endTime),
                          "EEEE, MMM dd, yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>
                        {Math.round(
                          getProgressValue(dietPlan.startTime, dietPlan.endTime)
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={getProgressValue(
                        dietPlan.startTime,
                        dietPlan.endTime
                      )}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Nutrition Overview */}
            <Card className="border-green-200 bg-green-50/50 mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Scale className="h-4 w-4 text-green-600" />
                  Nutrition Overview
                </CardTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-lg">
                      {Math.round(totalNutrition.calories)}
                    </p>
                    <p className="text-muted-foreground">Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">
                      {Math.round(totalNutrition.protein)}g
                    </p>
                    <p className="text-muted-foreground">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">
                      {Math.round(totalNutrition.carbs)}g
                    </p>
                    <p className="text-muted-foreground">Carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">
                      {Math.round(totalNutrition.fats)}g
                    </p>
                    <p className="text-muted-foreground">Fat</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Recipe Details */}
            <Card className="border-purple-200 bg-purple-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-purple-600" />
                  Ingredients ({dietPlan.recipes.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {dietPlan.recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-purple-600">
                          <AvatarFallback className="bg-purple-600 text-white text-xs">
                            {recipe.feed.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {recipe.feed.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">
                          {recipe.quantity}g
                        </p>
                        {recipe.feed.nutritionInfo && (
                          <p className="text-xs text-muted-foreground">
                            {Math.round(
                              (recipe.feed.nutritionInfo.calories *
                                recipe.quantity) /
                                100
                            )}{" "}
                            kcal
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Separator className="my-4" />

            {/* Footer with ID */}
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  Plan ID: {dietPlan.id.slice(-8)}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                {isExpanded ? "Collapse" : "Expand"} details
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
