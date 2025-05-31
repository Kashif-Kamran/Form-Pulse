import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { HealthRecordFormType } from "./schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { AnimalPublic, IVaccine, PublicUser } from "@repo/shared";
import { useToggleState } from "@/hooks/use-toggle-state";
import InputField from "@/components/custom-ui/form-feilds/input-field";
import { Button } from "@/components/ui/button";
import { ChooseAnimalDialog } from "@/pages/diet-management/components/dialogs/choose-animal-dialog-box";
import { ChooseUserDialog } from "@/dialogs/choose-user-dialog-box";
import { ChooseVaccineDialog } from "@/dialogs/choose-vaccine-dialog-box";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import DatePicker from "@/components/date-picker";
import { CircleMinus } from "lucide-react";
import { cn } from "@/lib/utils";

export function HealthRecordForm() {
  const form = useForm<HealthRecordFormType>({
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

  const handleSubmit = form.handleSubmit(
    async (formData: HealthRecordFormType) => {
      console.log("Form Data :", formData);
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
            Create New Health Record
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
        <div className="px-4 flex justify-end">
          <Button type="submit" className="p-6 px-16">
            Save
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
                      !selectedVaccine && "text-muted-foreground"
                    )}
                    onClick={openVaccineDialog}
                  >
                    {selectedVaccine ? selectedVaccine.name : "Select Vaccine"}
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
                      !selectedAnimal && "text-muted-foreground"
                    )}
                    onClick={openAnimalDialog}
                  >
                    {selectedAnimal ? selectedAnimal.name : "Browse Animal"}
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
  const [isAnimalDialogOpen, openAnimalDialog, closeAnimalDialog] =
    useToggleState();

  const handleSelectAnimal = (user: PublicUser) => {
    if (!user?.id) return;
    setSelectedUser(user);
    form.setValue("veterinarian", user);
    form.clearErrors("veterinarian");
  };

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
                      !selectedUser && "text-muted-foreground"
                    )}
                    onClick={openAnimalDialog}
                  >
                    {selectedUser ? selectedUser.name : "Select Veterinarian"}
                  </Button>
                </FormControl>
              </div>
            </FormItem>
          );
        }}
      />

      <ChooseUserDialog
        isOpen={isAnimalDialogOpen}
        onClose={closeAnimalDialog}
        onSelectUser={handleSelectAnimal}
        selectedUserId={selectedUser?.id}
      />
    </div>
  );
};
