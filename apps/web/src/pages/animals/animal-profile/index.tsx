import { useAnimalById } from "@/hooks/api/animal.hook";
import { useParams } from "react-router-dom";
import BasicInfo from "../components/profile-cards/basic-info";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { MedicalHistory } from "../components/profile-cards/medical-health-tab";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { DietHistory } from "../components/profile-cards/feed-history-tab";

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
    <div className="h-[100%]">
      <ScrollArea className="h-full">
        <div className="flex flex-col h-full space-y-2">
          <BasicInfo data={{ ...data }} />

          <Tabs
            defaultValue="medical-history"
            className="flex-1 overflow-auto rounded-lg"
          >
            <TabsList className="flex h-10">
              <TabsTrigger value="medical-history" className="w-full">
                Medical History
              </TabsTrigger>
              <TabsTrigger value="food-management" className="w-full">
                Food History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="medical-history" className="">
              <MedicalHistory animalId={animalId!} />
            </TabsContent>
            <TabsContent value="food-management">
              <DietHistory animalId={animalId!} />
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}

export default AnimalProfile;
