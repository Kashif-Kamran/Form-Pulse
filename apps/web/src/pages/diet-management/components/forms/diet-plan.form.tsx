import { Button } from "@/components/ui/button";
import { useToggleState } from "@/hooks/use-toggle-state";
import {
  AnimalPublic,
  IFeedInventory,
  PublicUser,
  RoleType,
} from "@repo/shared";
import { useState } from "react";
import { ChooseAnimalDialog } from "../dialogs/choose-animal-dialog-box";
import DatePicker from "@/components/date-picker";
import InputField from "@/components/custom-ui/form-feilds/input-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { CircleMinus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChooseFeedItemDialog from "../dialogs/choose-products.dialog";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  DietPlanData,
  DietPlanSchema,
  transformDietPlanForBackend,
} from "../zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useCreateDietPlan } from "@/hooks/api/diet-plan.hook";
import { cn } from "@/lib/utils";
import { ChooseUserDialog } from "@/dialogs/choose-user-dialog-box";

function DietPlanForm() {
  const { mutateAsync: createDietPlan } = useCreateDietPlan();
  const { toast } = useToast();
  const form = useForm<DietPlanData>({
    resolver: zodResolver(DietPlanSchema),
    defaultValues: {
      animal: undefined,
      startTime: new Date(),
      endTime: new Date(),
      careTaker: { _id: "", name: "", role: RoleType.CareTaker },
      noOfTimesPerDay: 0,
      recipes: [],
    },
  });

  const onSubmit = form.handleSubmit(
    async (formData: DietPlanData) => {
      const transformedData = transformDietPlanForBackend(formData);
      createDietPlan(
        {
          animalId: formData.animal.id,
          payload: transformedData,
        },
        {
          onSuccess: () => {
            toast({
              title: "Diet plan created successfully!",
              variant: "default",
            });
          },
          onError: (error) => {
            console.log("Error on Diet Plan Creation :", error);
            toast({
              title: "Unable to create diet plan",
              description: error.message,
              variant: "destructive",
            });
          },
        }
      );
    },
    (errors) => {
      // Handle validation errors
      Object.entries(errors).forEach(([fieldName, error]) => {
        console.log({ fieldName, error });
        if (fieldName === "animal" && error) {
          console.log("Shoud Be selected ");
          return toast({
            title: "Please Select Animal",
            variant: "destructive",
          });
        }
        toast({
          title: error.message,
          variant: "destructive",
        });
      });
    }
  );

  return (
    <Form {...form}>
      <form className="space-y-4 max-h-full flex flex-col" onSubmit={onSubmit}>
        <Card className="pt-2 px-6 pb-6">
          <CardTitle className="bg-primary rounded-md p-2 text-primary-foreground mt-4 text-center text-lg">
            Create New Diet Plan
          </CardTitle>
          <CardContent className="p-0">
            <div className="space-y-2 flex gap-4 justify-center items-center">
              <AnimalSummary form={form} />
              <UserSummary form={form} />
              <TimesPerDayInput form={form} />
            </div>
            <DurationSelection form={form} />
          </CardContent>
        </Card>
        <FeedItemsTable form={form} />
        <div className="px-4 flex justify-end">
          <Button type="submit" className="p-6 px-16">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default DietPlanForm;

const DurationSelection = ({
  form,
}: {
  form: ReturnType<typeof useForm<DietPlanData>>;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-2">
      {/* Start Date */}
      <FormField
        name="startTime"
        control={form.control}
        render={({ field }) => (
          <FormItem className="">
            <FormControl>
              <DatePicker
                label="Select Start Date"
                selectedDate={field.value}
                onSelectDate={(date) => field.onChange(date)}
                buttonProps={{ className: "w-full py-5" }}
                className="w-full"
              />
            </FormControl>
            {/* <FormMessage /> Removed */}
          </FormItem>
        )}
      />

      {/* End Date */}
      <FormField
        name="endTime"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <DatePicker
                label="Select End Date"
                selectedDate={field.value}
                onSelectDate={(date) => field.onChange(date)}
                buttonProps={{ className: "w-full py-5" }}
                className="w-full"
              />
            </FormControl>
            {/* <FormMessage /> Removed */}
          </FormItem>
        )}
      />
    </div>
  );
};

const AnimalSummary = ({
  form,
}: {
  form: ReturnType<typeof useForm<DietPlanData>>;
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
    <div className="flex w-1/2 flex-col md:flex-row mt-2">
      <FormField
        control={form.control}
        name="animal"
        render={() => {
          return (
            <FormItem className="w-full">
              <FormLabel className="p-0 m-0">Animal</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Button
                    variant={"outline"}
                    type="button"
                    className={cn(
                      "justify-start text-left font-normal w-full py-6",
                      !selectedAnimal?.name && "text-muted-foreground"
                    )}
                    onClick={openAnimalDialog}
                  >
                    {selectedAnimal?.name
                      ? selectedAnimal.name
                      : "Select Animal"}
                  </Button>
                </FormControl>
              </div>
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

const UserSummary = ({
  form,
}: {
  form: ReturnType<typeof useForm<DietPlanData>>;
}) => {
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);
  const [isUserDialogOpen, openUserDialog, closeUserDialog] = useToggleState();

  const handleSelectAnimal = (user: PublicUser) => {
    if (!user?.id) return;
    setSelectedUser(user);
    form.setValue("careTaker", {
      id: user.id,
      _id: user.id,
      role: user.role,
      name: user.name,
    });
    form.clearErrors("careTaker");
  };

  return (
    <div className="flex w-1/2 flex-col md:flex-row mt-0">
      <FormField
        control={form.control}
        name="careTaker"
        render={() => {
          return (
            <FormItem className="w-full">
              <FormLabel className="p-0 m-0">Care Taker</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Button
                    variant={"outline"}
                    type="button"
                    className={cn(
                      "justify-start text-left font-normal w-full py-6",
                      !selectedUser?.name && "text-muted-foreground"
                    )}
                    onClick={openUserDialog}
                  >
                    {selectedUser?.name ? selectedUser.name : "Select User"}
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
        onSelectUser={handleSelectAnimal}
        selectedUserId={selectedUser?.id}
        role={RoleType.CareTaker}
      />
    </div>
  );
};

export function FeedItemsTable({
  form,
}: {
  form: ReturnType<typeof useForm<DietPlanData>>;
}) {
  const { control, watch } = form;
  const { fields, remove } = useFieldArray({
    control,
    name: "recipes",
  });

  // Watch form values for calculation
  const startTime = watch("startTime");
  const endTime = watch("endTime");
  const noOfTimesPerDay = watch("noOfTimesPerDay");

  // Calculate number of days between start and end date
  const calculateDays = (start: Date, end: Date): number => {
    if (!start || !end) return 0;
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  // Calculate total quantity for a recipe
  const calculateTotalQuantity = (perTimeQuantity: number): number => {
    const days = calculateDays(startTime, endTime);
    const timesPerDay = noOfTimesPerDay || 0;
    const perTime = perTimeQuantity || 0;

    if (days === 0 || timesPerDay === 0 || perTime === 0) {
      return 0;
    }

    return days * timesPerDay * perTime;
  };

  const handleSelectRecipe = (recipe: IFeedInventory) => {
    if (!recipe?.id) return;

    const existingRecipeIndex = fields.findIndex(
      (r) => r.feed.id === recipe.id
    );

    if (existingRecipeIndex !== -1) {
      // If recipe already exists, increment perTimeQuantity
      const currentPerTimeQuantity =
        fields[existingRecipeIndex].perTimeQuantity || 0;
      form.setValue(
        `recipes.${existingRecipeIndex}.perTimeQuantity`,
        currentPerTimeQuantity + 1
      );
    } else {
      const newRecipe = {
        id: recipe.id,
        feed: recipe,
        quantity: 1, // This will be calculated
        perTimeQuantity: 1,
      };
      form.setValue("recipes", [...fields, newRecipe]);
    }
  };

  const handlePerTimeQuantityChange = (
    index: number,
    newPerTimeQuantity: number
  ) => {
    form.setValue(`recipes.${index}.perTimeQuantity`, newPerTimeQuantity);
    // Calculate and update total quantity
    const totalQuantity = calculateTotalQuantity(newPerTimeQuantity);
    form.setValue(`recipes.${index}.quantity`, totalQuantity);
  };

  const removeRecipe = (index: number) => {
    remove(index);
  };

  return (
    <Card className="pt-2 px-6 pb-6 flex-1 flex flex-col overflow-auto">
      <div className="flex gap-2">
        <div className="flex-1">
          <CardTitle className="text-lg">Recipes</CardTitle>
          <CardDescription className="">
            Add new recipes, each recipe represents a dietary plan item
          </CardDescription>
        </div>
        <div className="h-full">
          <ChooseFeedItemDialog onSelectItem={handleSelectRecipe} />
        </div>
      </div>
      <CardContent className="flex-1 overflow-y-auto p-0">
        <div className="flex flex-col overflow-hidden bg-white rounded-xl">
          <ScrollArea>
            <Table className="h-full">
              <TableBody className="flex-1">
                {fields.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No recipes added yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  fields.map((item, index) => {
                    const perTimeQuantity =
                      watch(`recipes.${index}.perTimeQuantity`) || 0;
                    const totalQuantity =
                      calculateTotalQuantity(perTimeQuantity);
                    const hasCalculationError =
                      !startTime ||
                      !endTime ||
                      !noOfTimesPerDay ||
                      perTimeQuantity === 0;

                    return (
                      <TableRow className="p-0" key={item.feed.id}>
                        <TableCell className="p-2 font-medium">
                          {item.feed.name}
                        </TableCell>
                        <TableCell className="p-2">
                          <Controller
                            name={`recipes.${index}.perTimeQuantity`}
                            control={control}
                            render={({ field }) => (
                              <InputField
                                type="number"
                                value={field.value || ""}
                                onChange={(e) => {
                                  const newPerTimeQuantity =
                                    parseInt(e.target.value) || 0;
                                  field.onChange(newPerTimeQuantity);
                                  handlePerTimeQuantityChange(
                                    index,
                                    newPerTimeQuantity
                                  );
                                }}
                                placeholder="Per time qty"
                                className="text-center"
                                min="0"
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell className="p-2 text-center">
                          <div
                            className={`px-2 py-1 rounded ${hasCalculationError ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                          >
                            {hasCalculationError ? "N/A" : totalQuantity}
                          </div>
                          {hasCalculationError && (
                            <div className="text-xs text-gray-500 mt-1">
                              Missing: {!startTime || !endTime ? "dates" : ""}
                              {(!startTime || !endTime) && !noOfTimesPerDay
                                ? ", "
                                : ""}
                              {!noOfTimesPerDay ? "times/day" : ""}
                              {perTimeQuantity === 0 ? ", per-time qty" : ""}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="p-2 text-center">
                          <span
                            className={`px-2 py-1 rounded ${item.feed.remainingStock < totalQuantity ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                          >
                            {item.feed.remainingStock}
                          </span>
                        </TableCell>
                        <TableCell className="p-2 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRecipe(index)}
                          >
                            <CircleMinus className="w-5 h-5 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

const TimesPerDayInput = ({
  form,
}: {
  form: ReturnType<typeof useForm<DietPlanData>>;
}) => {
  return (
    <div className="flex w-1/3 flex-col">
      <FormField
        control={form.control}
        name="noOfTimesPerDay"
        render={({ field }) => {
          return (
            <FormItem className="w-full">
              <FormLabel className="p-0 m-0">Times Per Day</FormLabel>
              <FormControl>
                <InputField
                  type="number"
                  placeholder="Enter times per day"
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    field.onChange(value);
                  }}
                  className="w-full py"
                  min="1"
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
    </div>
  );
};
