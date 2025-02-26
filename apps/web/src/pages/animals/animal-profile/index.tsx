import { useAnimalById } from "@/hooks/api/animal.hook";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import InputField from "@/components/custom-ui/form-feilds/input-field";

function AnimalProfile() {
  const { animalId } = useParams<{ animalId: string }>();
  const { data, isLoading, error } = useAnimalById(animalId as string);

  if (isLoading) {
    return (
      <div className="w-full text-center py-10">Loading animal data...</div>
    );
  }

  if (error) {
    console.error("Error loading animal data:", error);
    return (
      <div className="w-full text-center py-10 text-red-500">
        Error loading animal data: {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full text-center py-10">No animal data available.</div>
    );
  }

  return (
    <Card className="shadow md">
      <CardHeader>
        <CardTitle className="text-[1.3rem] text-primary-foreground text-center font-semibold bg-primary p-2 rounded-md">
          Basic Animal Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label className="text-[1.02rem]">Species</Label>
              <InputField
                type="text"
                placeholder="CategoryXYZ"
                value={data.species || ""}
                disabled
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="text-[1.02rem]">Weight (in kgs)</Label>
              <InputField
                type="text"
                placeholder="50 Kgs"
                value={data.weight ? `${data.weight}` : ""}
                disabled
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="text-[1.02rem]">Age (in years)</Label>
              <InputField
                type="text"
                placeholder="Infant"
                value={data.age !== undefined ? data.age.toString() : ""}
                disabled
              />
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label className="text-[1.02rem]">Animal</Label>
              <InputField
                type="text"
                placeholder="AnimalXYZ"
                value={data.name || ""}
                disabled
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="text-[1.02rem]">Breed</Label>
              <InputField
                type="text"
                placeholder="BreedXYZ"
                value={data.breed || ""}
                disabled
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AnimalProfile;
