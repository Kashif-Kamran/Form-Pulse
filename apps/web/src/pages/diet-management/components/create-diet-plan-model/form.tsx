import { Button } from "@/components/ui/button";
import { useToggleState } from "@/hooks/use-toggle-state";
import { AnimalPublic, IAnimal } from "@repo/shared";
import { useState } from "react";
import { ChooseAnimalDialog } from "../../dialogs/choose-animal-dialog-box";

function Form() {
  return (
    <div className="">
      <div className="flex flex-row items-end gap-2">
        <AnimalSummary />
      </div>
    </div>
  );
}

export default Form;

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
    <div className="flex gap-4 w-full flex-col md:flex-row">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          Animal
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={selectedAnimal ? selectedAnimal.name : ""}
            placeholder="Select an animal"
            readOnly
            className="border rounded p-2 w-full"
          />
          <Button type={"button"} onClick={openAnimalDialog}>
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
