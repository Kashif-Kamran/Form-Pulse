import { Button } from "@/components/ui/button";
import { useToggleState } from "@/hooks/use-toggle-state";
import { AnimalPublic, FeedItemPublic } from "@repo/shared";
import { useState } from "react";
import { ChooseAnimalDialog } from "../dialogs/choose-animal-dialog-box";
import DatePicker from "@/components/date-picker";
import { Label } from "@/components/ui/label";
import InputField from "@/components/custom-ui/form-feilds/input-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CircleMinus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChooseFeedItemDialog from "../dialogs/choose-products.dialog";

function DietPlanForm() {
  return (
    <div className="space-y-4 max-h-full flex flex-col">
      <Card className="pt-2 px-6 pb-6">
        <CardTitle className="bg-primary rounded-md p-2 text-primary-foreground mt-4 text-center text-lg">
          Create New Diet Plan
        </CardTitle>
        <CardContent className="p-0">
          <div className="space-y-2">
            <AnimalSummary />
            <DurationSelection />
          </div>
        </CardContent>
      </Card>
      <FeedItemsTable />
      <div className="px-4 flex justify-end">
        <Button className="p-6 px-16">Save</Button>
      </div>
    </div>
  );
}

export default DietPlanForm;

const DurationSelection = () => {
  return (
    <div className=" grid grid-cols-2 gap-4">
      <DatePicker
        label="Select Start Date"
        buttonProps={{ className: "w-full py-5" }}
        className="w-full"
      />
      <DatePicker
        label="Select End Date"
        buttonProps={{ className: "w-full py-5" }}
      />
    </div>
  );
};

const AnimalSummary = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalPublic | null>(
    null
  );
  const [isAnimalDialogOpen, openAnimalDialog, closeAnimalDialog] =
    useToggleState();

  const handleSelectAnimal = (animal: AnimalPublic) => {
    if (!animal?.id) return;

    setSelectedAnimal(animal);
  };

  return (
    <div className="flex gap-4 w-full flex-col md:flex-row border-2 ">
      <div className="w-full">
        <Label className="block text-sm font-medium text-gray-700 black">
          Animal
        </Label>
        <div className="flex gap-2">
          <InputField
            type="text"
            value={selectedAnimal ? selectedAnimal.name : ""}
            placeholder="Select an animal"
            readOnly
          />
          <Button
            type={"button"}
            className="py-6 px-8"
            onClick={openAnimalDialog}
          >
            Browse
          </Button>
        </div>
      </div>

      <ChooseAnimalDialog
        isOpen={isAnimalDialogOpen}
        onClose={closeAnimalDialog}
        onSelectAnimal={handleSelectAnimal}
        selectedAnimalId={selectedAnimal?.id}
      />
    </div>
  );
};

interface FeedItem {
  id: string;
  name: string;
  quantity: number;
}

export function FeedItemsTable() {
  const handleSelectAnimal = (animal: FeedItemPublic) => {
    if (!animal?.id) return;
  };

  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    { id: "feed1", name: "Corn Feed", quantity: 10 },
    { id: "feed2", name: "Soy Feed", quantity: 20 },
    { id: "feed3", name: "Corn Feed", quantity: 10 },
    { id: "feed26", name: "Soy Feed", quantity: 20 },
    { id: "feed17", name: "Corn Feed", quantity: 10 },
    { id: "feed29", name: "Soy Feed", quantity: 20 },
  ]);

  const removeItem = (index: number) => {
    setFeedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    setFeedItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <Card className="pt-2 px-6 pb-6 flex-1 flex flex-col overflow-auto">
      <div className="flex gap-2 ">
        <div className="flex-1">
          <CardTitle className="text-lg">Feed Items</CardTitle>
          <CardDescription className="">
            Add new feed items, each feed item represents feed inventory item
          </CardDescription>
        </div>
        <div className="border-2">
          <ChooseFeedItemDialog onSelectItem={handleSelectAnimal} />
        </div>
      </div>
      <CardContent className="flex-1 overflow-y-auto p-0">
        <div className="flex flex-col overflow-hidden bg-white rounded-xl">
          <ScrollArea>
            <Table className="h-full">
              <TableBody className="flex-1">
                {feedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No feed items added yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  feedItems.map((item, index) => (
                    <TableRow className="p-0" key={item.id}>
                      <TableCell className="p-0">{item.id}</TableCell>
                      <TableCell className="p-0">{item.name}</TableCell>
                      <TableCell className="p-0">
                        <InputField
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              parseInt(e.target.value)
                            )
                          }
                          placeholder="Quantity"
                          className="p-0 px-2"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          onClick={() => removeItem(index)}
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
