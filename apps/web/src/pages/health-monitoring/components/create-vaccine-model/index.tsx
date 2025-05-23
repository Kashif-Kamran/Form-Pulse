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

import { VaccineForm } from "../vaccine-form";

export function CreateVaccineModel() {
  const [open, setOpen] = useState(false);

  function onSubmit() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-full">Add New Vaccine</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="bg-primary rounded-md p-4 text-primary-foreground mt-4">
          <DialogTitle className="font-semibold text-center">
            Create a New Vaccine
          </DialogTitle>
          <DialogDescription className="hidden">
            Enter the vaccine details and click save.
          </DialogDescription>
        </DialogHeader>

        <VaccineForm onSubmitCb={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
