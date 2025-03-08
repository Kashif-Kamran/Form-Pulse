import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "./form";

function CreateDietPlanModel() {
  return (
    <Dialog open={true}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="h-full"> Create Diet Plan</Button>
      </DialogTrigger>
      {/* Opening Content */}
      <DialogContent className="sm:max-w-[800px] max-h-[90%]">
        <DialogHeader className="bg-primary rounded-md p-4 text-primary-foreground mt-4 ">
          <DialogTitle className="font-semibold text-center">
            Create Diet Plan
          </DialogTitle>
          <DialogDescription className="hidden">
            Make sure you the data you provide is unique
          </DialogDescription>
        </DialogHeader>
        <Form />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDietPlanModel;
