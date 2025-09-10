import { Button } from "@/components/ui/button";
import { useToggleState } from "@/hooks/use-toggle-state";
import {
  AnimalPublic,
  AnimalDietPlanPublic,
  IFeedInventory,
  PublicUser,
  RoleType,
} from "@repo/shared";
import { useState, useEffect } from "react";
import { ChooseAnimalDialog } from "../dialogs/choose-animal-dialog-box";
import DatePicker from "@/components/date-picker";
import InputField from "@/components/custom-ui/form-feilds/input-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CircleMinus, Loader2 } from "lucide-react";
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
import {
  useCreateDietPlan,
  useUpdateDietPlan,
} from "@/hooks/api/diet-plan.hook";
import { cn } from "@/lib/utils";
import { ChooseUserDialog } from "@/dialogs/choose-user-dialog-box";

interface DietPlanFormProps {
  mode?: "create" | "edit";
  dietPlan?: AnimalDietPlanPublic;
  dietPlanId?: string;
}

function DietPlanForm({
  mode = "create",
  dietPlan,
  dietPlanId,
}: DietPlanFormProps) {
  const { mutateAsync: createDietPlan, isPending: isCreating } =
    useCreateDietPlan();
  const { mutateAsync: updateDietPlan, isPending: isUpdating } =
    useUpdateDietPlan();
  const { toast } = useToast();

  const isLoading = isCreating || isUpdating;

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

  // Populate form with existing data when in edit mode
  useEffect(() => {
    if (mode === "edit" && dietPlan) {
      form.setValue("animal", dietPlan.animal);
      form.setValue("startTime", new Date(dietPlan.startTime));
      form.setValue("endTime", new Date(dietPlan.endTime));

      // Create a proper careTaker object for the form
      const careTakerFormData = {
        _id: dietPlan.careTaker.id,
        id: dietPlan.careTaker.id,
        name: dietPlan.careTaker.name,
        role: dietPlan.careTaker.role,
      };
      form.setValue("careTaker", careTakerFormData);
      form.setValue("noOfTimesPerDay", dietPlan.noOfTimesPerDay);

      // Transform recipes to match form structure
      const formRecipes = dietPlan.recipes.map((recipe) => ({
        id: recipe.feed.id,
        feed: recipe.feed,
        quantity: recipe.quantity,
        perTimeQuantity: recipe.perTimeQuantity,
      }));
      form.setValue("recipes", formRecipes);
    }
  }, [mode, dietPlan, form]);

  const getValidationErrorMessage = (fieldName: string, error: any): string => {
    // Handle nested field errors (e.g., careTaker.id, animal.name, etc.)
    const baseFieldName = fieldName.split(".")[0];

    // Always use our custom messages for main fields
    switch (baseFieldName) {
      case "animal":
        return "Please select an animal for this diet plan";
      case "careTaker":
        return "Please select a care taker for this diet plan";
      case "noOfTimesPerDay":
        return "Please enter how many times per day to feed (minimum 1)";
      case "recipes":
        return "Please add at least one feed item to the diet plan";
      case "startTime":
        return "Please select a start date for the diet plan";
      case "endTime":
        return "Please select an end date for the diet plan";
      default:
        // If error has custom message and it's not a main field, use it
        if (error?.message) {
          return error.message;
        }
        return `Please provide a valid value for ${fieldName}`;
    }
  };

  const onSubmit = form.handleSubmit(
    async (formData: DietPlanData) => {
      try {
        const transformedData = transformDietPlanForBackend(formData);

        if (mode === "create") {
          await createDietPlan({
            animalId: formData.animal.id,
            payload: transformedData,
          });

          toast({
            title: "Diet plan created successfully!",
            description: "The diet plan has been saved and is now active.",
            variant: "default",
          });

          // Reset form after successful creation
          form.reset();
        } else if (mode === "edit" && dietPlanId) {
          await updateDietPlan({
            dietPlanId: dietPlanId,
            payload: transformedData,
          });

          toast({
            title: "Diet plan updated successfully!",
            description: "All changes have been saved.",
            variant: "default",
          });
        }
      } catch (error: any) {
        console.log(
          `Error on Diet Plan ${mode === "create" ? "Creation" : "Update"}:`,
          error
        );
        toast({
          title: `Unable to ${mode === "create" ? "create" : "update"} diet plan`,
          description:
            error.message || "An unexpected error occurred. Please try again.",
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
      <form className="space-y-4 max-h-full flex flex-col" onSubmit={onSubmit}>
        <Card className="pt-2 px-6 pb-6">
          <CardTitle className="bg-primary rounded-md p-2 text-primary-foreground mt-4 text-center text-lg">
            {mode === "create" ? "Create New Diet Plan" : "Edit Diet Plan"}
          </CardTitle>
          <CardContent className="p-0">
            <div className="space-y-2 flex gap-4 justify-center items-center">
              <AnimalSummary form={form} mode={mode} dietPlan={dietPlan} />
              <UserSummary form={form} mode={mode} dietPlan={dietPlan} />
              <TimesPerDayInput form={form} />
            </div>
            <DurationSelection form={form} />
          </CardContent>
        </Card>
        <FeedItemsTable form={form} />
        <div className="px-4 flex justify-end">
          <Button type="submit" className="p-6 px-16" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                {mode === "create" ? "Saving..." : "Updating..."}
              </>
            ) : mode === "create" ? (
              "Save"
            ) : (
              "Update"
            )}
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
  mode,
  dietPlan,
}: {
  form: ReturnType<typeof useForm<DietPlanData>>;
  mode?: "create" | "edit";
  dietPlan?: AnimalDietPlanPublic;
}) => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalPublic | null>(
    null
  );
  const [isAnimalDialogOpen, openAnimalDialog, closeAnimalDialog] =
    useToggleState();

  // Watch form values for animal
  const animalValue = form.watch("animal");

  // Initialize and sync selectedAnimal
  useEffect(() => {
    if (mode === "edit" && dietPlan?.animal) {
      setSelectedAnimal(dietPlan.animal);
    }
  }, [mode, dietPlan]);

  // Sync selectedAnimal with form value changes
  useEffect(() => {
    if (animalValue && animalValue.id) {
      setSelectedAnimal(animalValue as AnimalPublic);
    }
  }, [animalValue]);

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
  mode,
  dietPlan,
}: {
  form: ReturnType<typeof useForm<DietPlanData>>;
  mode?: "create" | "edit";
  dietPlan?: AnimalDietPlanPublic;
}) => {
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);
  const [isUserDialogOpen, openUserDialog, closeUserDialog] = useToggleState();

  // Watch form values for careTaker
  const careTakerValue = form.watch("careTaker");

  // Initialize and sync selectedUser
  useEffect(() => {
    if (mode === "edit" && dietPlan?.careTaker) {
      setSelectedUser(dietPlan.careTaker);
    }
  }, [mode, dietPlan]);

  // Sync selectedUser with form value changes
  useEffect(() => {
    if (careTakerValue && careTakerValue.id && careTakerValue.name) {
      // Create a compatible user object for display
      const userForDisplay = {
        id: careTakerValue.id,
        name: careTakerValue.name,
        role: careTakerValue.role,
        email: "", // Not available in form schema
        isVerified: true, // Default for display
      } as PublicUser;
      setSelectedUser(userForDisplay);
    }
  }, [careTakerValue]);

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
