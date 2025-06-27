import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NotifyNutritionistDialog } from "../notify-nutritionist-dialog";
import { useToggleState } from "@/hooks/use-toggle-state";
import { Bell, MessageSquare } from "lucide-react";

export default function NotifyNutritionistCard() {
  const [isDialogOpen, openDialog, closeDialog] = useToggleState();

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="text-[1.1rem] flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          Need Dietary Assistance?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">
              As a caretaker, you can notify nutritionists about specific
              dietary needs or concerns for any animal in your care.
            </p>
            <p className="text-xs text-blue-600 font-medium">
              Get expert nutritional guidance for optimal animal health
            </p>
          </div>
          <Button
            onClick={openDialog}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Bell className="h-4 w-4" />
            Notify Nutritionist
          </Button>
        </div>
      </CardContent>

      <NotifyNutritionistDialog
        isOpen={isDialogOpen}
        onOpenChange={closeDialog}
      />
    </Card>
  );
}
