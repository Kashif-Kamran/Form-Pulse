import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HealthRecordForm } from "../health-record-form";

export function AddHealthRecordModel() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-full">Add Health Record</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="bg-primary rounded-md p-4 text-primary-foreground mt-4">
          <DialogTitle className="font-semibold text-center">
            Create a New Health Record For Animal
          </DialogTitle>
          <DialogDescription className="hidden">
            Enter the vaccine details and click save.
          </DialogDescription>
        </DialogHeader>
        <HealthRecordForm />
      </DialogContent>
    </Dialog>
  );
}
