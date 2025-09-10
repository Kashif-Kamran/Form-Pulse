import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  HealthRecordFormType,
  HealthRecordSchema,
  transformHealthRecordForBackend,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import {
  AnimalPublic,
  IVaccine,
  PublicUser,
  RoleType,
  PopulatedAnimalHealthRecord,
} from "@repo/shared";
import { useToggleState } from "@/hooks/use-toggle-state";
import InputField from "@/components/custom-ui/form-feilds/input-field";
import { Button } from "@/components/ui/button";
import { ChooseAnimalDialog } from "@/pages/diet-management/components/dialogs/choose-animal-dialog-box";
import { ChooseUserDialog } from "@/dialogs/choose-user-dialog-box";
import { ChooseVaccineDialog } from "@/dialogs/choose-vaccine-dialog-box";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import DatePicker from "@/components/date-picker";
import { CircleMinus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useCreateAnimalHealthRecord,
  useUpdateHealthRecord,
} from "@/hooks/api/animal-health-record.hook";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { HEALTH_MONITORING } from "@/constants/app-routes";
import { useEffect } from "react";

interface HealthRecordFormProps {
  healthRecord?: PopulatedAnimalHealthRecord;
  mode?: "create" | "edit";
}

export function HealthRecordForm({
  healthRecord,
  mode = "create",
}: HealthRecordFormProps) {
  const { mutateAsync: createHealthRecord, isPending: isCreating } = useCreateAnimalHealthRecord();
  const { mutateAsync: updateHealthRecord, isPending: isUpdating } = useUpdateHealthRecord();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isLoading = isCreating || isUpdating;

  const getValidationErrorMessage = (fieldName: string, error: any): string => {
    // Handle nested field errors (e.g., veterinarian.id, animal.name, etc.)
    const baseFieldName = fieldName.split(".")[0];

    // Always use our custom messages for main fields
    switch (baseFieldName) {
      case "animal":
        return "Please select an animal for this health record";
      case "veterinarian":
        return "Please assign a veterinarian to this health record";
      case "vaccination":
        return "Please select a vaccine for this health record";
      case "vaccinationType":
        return "Please select the type of vaccination";
      case "medicationDoses":
        return "Please add at least one vaccination schedule";
      default:
        // If error has custom message and it's not a main field, use it
        if (error?.message) {
          return error.message;
        }
        return `Please provide a valid value for ${fieldName}`;
    }
  };

  const form = useForm<HealthRecordFormType>({
    resolver: zodResolver(HealthRecordSchema),
    defaultValues: {
      animal: {
        id: "",
      },
      vaccination: {
        id: "",
      },
      vaccinationType: undefined,
      medicationDoses: [],
    },
  });

  // Pre-populate form when in edit mode
  useEffect(() => {
    if (mode === "edit" && healthRecord) {
      form.reset({
        animal: {
          id: healthRecord.animal.id,
          name: healthRecord.animal.name,
          breed: healthRecord.animal.breed,
          age: healthRecord.animal.age,
          weight: healthRecord.animal.weight,
        },
        veterinarian: {
          id: healthRecord.veterinarian.id,
          name: healthRecord.veterinarian.name,
          email: healthRecord.veterinarian.email,
          role: healthRecord.veterinarian.role,
        },
        vaccination: {
          id: healthRecord.vaccine.id,
          name: healthRecord.vaccine.name,
          type: healthRecord.vaccine.type,
        },
        vaccinationType: healthRecord.vaccine.type,
        medicationDoses: healthRecord.schedule.map((schedule, index) => ({
          id: `${healthRecord.id}-${index}`,
          deliveryDate: new Date(schedule.dateTime),
          quantity: schedule.quantity,
        })),
      });
    }
  }, [mode, healthRecord, form]);

  const handleSubmit = form.handleSubmit(
    async (formData: HealthRecordFormType) => {
      try {
        console.log(mode === "edit" ? "Update : " : "Creation : ", formData);
        const transformedData = transformHealthRecordForBackend(formData);

        if (mode === "edit" && healthRecord) {
          await updateHealthRecord({
            healthRecordId: healthRecord.id,
            payload: transformedData,
          });
          
          toast({
            title: "Health record updated successfully!",
            description: "All changes have been saved.",
            variant: "default",
          });
          navigate(HEALTH_MONITORING);
          
        } else {
          await createHealthRecord(transformedData);
          
          toast({
            title: "Animal health record created successfully!",
            description: "The health record has been saved and scheduled.",
            variant: "default",
          });
          
          // Reset form after successful creation
          form.reset();
        }
      } catch (error: any) {
        console.log(`Error on Health Record ${mode === "edit" ? "Update" : "Creation"}:`, error);
        toast({
          title: `Unable to ${mode === "edit" ? "update" : "create"} health record`,
          description: error.message || "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    },
    (errors) => {
      // Handle validation errors - show only the first error
      const errorEntries = Object.entries(errors);

      if (errorEntries.length === 0) return;

      // Get the first error from the list
      const [fieldName, error] = errorEntries[0];
      const errorMessage = getValidationErrorMessage(fieldName, error);

      // Show only the first validation error
      toast({
        title: "Validation Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  );

  return (
    <Form {...form}>
      <form
        className="space-y-4 max-h-full flex flex-col"
        onSubmit={handleSubmit}
      >
        <Card className="pt-2 px-6 pb-6">
          <CardTitle className="bg-primary rounded-md p-2 text-primary-foreground mt-4 text-center text-lg">
            {mode === "edit"
              ? "Edit Health Record"
              : "Create New Health Record"}
          </CardTitle>
          <CardContent className="p-0">
            <div className="space-y-2 flex flex-row gap-4 justify-center items-center">
              <AnimalSelectionDialog form={form} />
              <UserSelectingDialog form={form} />
              <VaccineSelectDialog form={form} />
            </div>
          </CardContent>
        </Card>
        <VaccineItemsList form={form} />
        <div className="px-4 flex justify-end gap-4">
          {mode === "edit" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(HEALTH_MONITORING)}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" className="p-6 px-16" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                {mode === "edit" ? "Updating..." : "Saving..."}
              </>
            ) : (
              mode === "edit" ? "Update" : "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

const VaccineItemsList = ({
  form,
}: {
  form: ReturnType<typeof useForm<HealthRecordFormType>>;
}) => {
  const { control } = form;

  const { fields, remove, append } = useFieldArray({
    control,
    name: "medicationDoses",
  });

  return (
    <Card className="pt-2 px-6 pb-6 flex-1 flex flex-col overflow-auto">
      <div className="flex gap-2">
        <div className="flex-1">
          <CardTitle className="text-lg">Schedule</CardTitle>
          <CardDescription className="">
            Add new vaccine schedules, each schedule represents a vaccination
            plan item
          </CardDescription>
        </div>
        <div className="h-full">
          <Button
            type="button"
            className="p-6"
            onClick={() => {
              append({
                deliveryDate: new Date(),
                quantity: 125,
                id: (fields.length + 1).toString(),
              });
            }}
          >
            Add Schedule
          </Button>
        </div>
      </div>
      <CardContent className="flex-1 overflow-y-auto p-0">
        <div className="flex flex-col overflow-hidden bg-white rounded-xl">
          <ScrollArea>
            <Table className="h-full">
              <TableBody className="flex-1">
                {fields.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No schedule added yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  fields.map((item, index) => (
                    <TableRow className="p-0 " key={item.id}>
                      <TableCell className="p-0 px-2">{index + 1}</TableCell>
                      <TableCell className="p-0 px-2">
                        <Controller
                          name={`medicationDoses.${index}.quantity`}
                          control={control}
                          render={({ field }) => (
                            <InputField
                              type="number"
                              value={field.value}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value);
                                field.onChange(newQuantity);
                                form.setValue(
                                  `medicationDoses.${index}.quantity`,
                                  newQuantity
                                );
                              }}
                              placeholder="Quantity"
                              className="p-0 px-2"
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell className="p-0 px-2">
                        <Controller
                          name={`medicationDoses.${index}.deliveryDate`}
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              selectedDate={field.value}
                              onSelectDate={(date) => field.onChange(date)}
                              buttonProps={{ className: "w-full py-5" }}
                              className="w-full"
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(index)}
                        >
                          <CircleMinus className="w-6 h-6 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

const VaccineSelectDialog = ({
  form,
}: {
  form: ReturnType<typeof useForm<HealthRecordFormType>>;
}) => {
  const [selectedVaccine, setSelectedVaccine] = useState<IVaccine | null>(null);
  const [isVaccineDialogOpen, openVaccineDialog, closeVaccineDialog] =
    useToggleState();
  const handleSelectVaccine = (vaccine: IVaccine) => {
    if (!vaccine?.id) return;
    setSelectedVaccine(vaccine);
    form.setValue("vaccination", {
      id: vaccine._id,
      name: vaccine.name,
      type: vaccine.type,
    });
    form.clearErrors("veterinarian");
  };
  const { vaccination } = form.watch();
  return (
    <div className="flex w-full flex-col md:flex-row">
      <FormField
        control={form.control}
        name="vaccination"
        render={() => {
          return (
            <FormItem className="w-full">
              <FormLabel className="p-0 m-0">Select Vaccine </FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Button
                    variant={"outline"}
                    type="button"
                    className={cn(
                      "justify-start text-left font-normal w-full py-6",
                      !vaccination?.name && "text-muted-foreground"
                    )}
                    onClick={openVaccineDialog}
                  >
                    {vaccination?.name ? vaccination.name : "Select Vaccine"}
                  </Button>
                </FormControl>
              </div>
            </FormItem>
          );
        }}
      />

      <ChooseVaccineDialog
        isOpen={isVaccineDialogOpen}
        onClose={closeVaccineDialog}
        onSelectUser={handleSelectVaccine}
        selectedUserId={selectedVaccine?.id}
      />
    </div>
  );
};

const AnimalSelectionDialog = ({
  form,
}: {
  form: ReturnType<typeof useForm<HealthRecordFormType>>;
}) => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalPublic | null>(
    null
  );
  const [isAnimalDialogOpen, openAnimalDialog, closeAnimalDialog] =
    useToggleState();

  const handleSelectAnimal = (animal: AnimalPublic) => {
    if (!animal?.id) return;
    setSelectedAnimal(animal);
    form.setValue("animal", animal);
    form.clearErrors("animal");
  };

  const { animal } = form.watch();
  return (
    <div className="flex flex-col md:flex-row w-full">
      <FormField
        control={form.control}
        name="animal"
        render={() => {
          return (
            <FormItem className="w-full  pt-2">
              <FormLabel className="p-0 m-0">Patient Animal</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Button
                    type="button"
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal w-full py-6",
                      !animal.name && "text-muted-foreground"
                    )}
                    onClick={openAnimalDialog}
                  >
                    {animal.name ? animal.name : "Browse Animal"}
                  </Button>
                </FormControl>
              </div>
              {/* <FormMessage /> Removed */}
            </FormItem>
          );
        }}
      />

      <ChooseAnimalDialog
        isOpen={isAnimalDialogOpen}
        onClose={closeAnimalDialog}
        onSelectAnimal={handleSelectAnimal}
        selectedAnimalId={selectedAnimal?.id}
      />
    </div>
  );
};

const UserSelectingDialog = ({
  form,
}: {
  form: ReturnType<typeof useForm<HealthRecordFormType>>;
}) => {
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);
  const [isUserDialogOpen, openUserDialog, closeUserDialog] = useToggleState();

  const handleSelectUser = (user: PublicUser) => {
    if (!user?.id) return;
    setSelectedUser(user);
    form.setValue("veterinarian", user);
    form.clearErrors("veterinarian");
  };

  const { veterinarian } = form.watch();
  return (
    <div className="flex w-full flex-col md:flex-row">
      <FormField
        control={form.control}
        name="animal"
        render={() => {
          return (
            <FormItem className="w-full">
              <FormLabel className="p-0 m-0">Assigne Veterinarian</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Button
                    variant={"outline"}
                    type="button"
                    className={cn(
                      "justify-start text-left font-normal w-full py-6",
                      !veterinarian && "text-muted-foreground"
                    )}
                    onClick={openUserDialog}
                  >
                    {veterinarian ? veterinarian.name : "Select Veterinarian"}
                  </Button>
                </FormControl>
              </div>
            </FormItem>
          );
        }}
      />

      <ChooseUserDialog
        isOpen={isUserDialogOpen}
        onClose={closeUserDialog}
        onSelectUser={handleSelectUser}
        selectedUserId={selectedUser?.id}
        role={RoleType.Veterinarian}
      />
    </div>
  );
};
