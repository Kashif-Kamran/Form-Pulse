import { InfoItem } from "./common";
import { Card, CardContent } from "@/components/ui/card";

interface BasicInfoProps {
  name: string;
  id: string;
  breed: string;
  weight: number;
  age: number;
  species: string;
}

function BasicInfo({
  data,
  className,
}: {
  data: BasicInfoProps;
  className?: string;
}) {
  return (
    <Card className={`shadow-md ${className || ""}`}>
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-row">
          <div className="pb-4 w-[20%]">
            <h2 className="text-3xl font-semibold text-primary">{data.name}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoItem label="ID" value={data.id} />
            <InfoItem label="Species" value={data.species} />
            <InfoItem label="Breed" value={data.breed} />
            <InfoItem label="Weight" value={`${data.weight} kg`} />
            <InfoItem label="Age" value={`${data.age} years`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BasicInfo;
