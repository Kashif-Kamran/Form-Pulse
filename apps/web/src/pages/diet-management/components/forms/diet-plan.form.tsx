import { Button } from "@/components/ui/button";
import { useToggleState } from "@/hooks/use-toggle-state";
import { AnimalPublic, IFeedInventory } from "@repo/shared";
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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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

function DietPlanForm() {
  const { toast } = useToast();
  const form = useForm<DietPlanData>({
    resolver: zodResolver(DietPlanSchema),
    defaultValues: {
      animal: {
        id: "",
      },
      startTime: new Date(),
      endTime: new Date(),
      recipes: [],
    },
  });

  const onSubmit = form.handleSubmit(
    async (formData: DietPlanData) => {
      // console.log("Data : ", formData);
      const transformedData = transformDietPlanForBackend(formData);
      console.log(transformedData);

      // toast({
      //   title: "Success",
      //   description: "Diet plan created successfully!",
      //   variant: "default",
      // });
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
              <DurationSelection form={form} />
            </div>
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
    <div className="grid grid-cols-2 gap-4 w-1/2">
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
    <div className="flex  w-1/2 flex-col md:flex-row">
      <FormField
        control={form.control}
        name="animal"
        render={() => {
          return (
            <FormItem className="w-full">
              <FormLabel className="p-0 m-0">Animal</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <InputField
                    type="text"
                    value={selectedAnimal ? selectedAnimal.name : ""}
                    placeholder="Select an animal"
                    readOnly
                  />
                </FormControl>
                <Button
                  type="button"
                  className="p-6 "
                  onClick={openAnimalDialog}
                >
                  Browse Animal
                </Button>
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

export function FeedItemsTable({
  form,
}: {
  form: ReturnType<typeof useForm<DietPlanData>>;
}) {
  const { control } = form;

  const { fields, remove } = useFieldArray({
    control,
    name: "recipes",
  });

  const handleSelectRecipe = (recipe: IFeedInventory) => {
    if (!recipe?.id) return;

    const existingRecipeIndex = fields.findIndex(
      (r) => r.feed.id === recipe.id
    );

    if (existingRecipeIndex !== -1) {
      const updatedRecipes = [...fields];
      updatedRecipes[existingRecipeIndex].quantity += 1;

      form.setValue("recipes", updatedRecipes);
    } else {
      const newRecipe = {
        id: recipe.id,
        feed: recipe,
        quantity: 1,
      };
      form.setValue("recipes", [...fields, newRecipe]);
    }
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    form.setValue(`recipes.${index}.quantity`, newQuantity);
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
                    <TableCell colSpan={4} className="text-center">
                      No recipes added yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  fields.map((item, index) => (
                    <TableRow className="p-0" key={item.feed.id}>
                      <TableCell className="p-0">{item.feed.id}</TableCell>
                      <TableCell className="p-0">{item.feed.name}</TableCell>
                      <TableCell className="p-0">
                        <Controller
                          name={`recipes.${index}.quantity`}
                          control={control}
                          render={({ field }) => (
                            <InputField
                              type="number"
                              value={field.value}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value);
                                field.onChange(newQuantity);
                                handleQuantityChange(index, newQuantity);
                              }}
                              placeholder="Quantity"
                              className="p-0 px-2"
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell className="px-10">
                        {item.feed.remainingStock}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          onClick={() => removeRecipe(index)}
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
}
