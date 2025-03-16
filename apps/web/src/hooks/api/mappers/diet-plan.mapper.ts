import { AnimalDietPlanPublic } from "@repo/shared";
import moment from "moment";

export const mapDataToAnimalDietPlanPublic = (
  data: any
): AnimalDietPlanPublic => {
  return {
    id: data.id,
    animal: data.animal,
    startTime: moment(data.startTime).toDate(),
    endTime: moment(data.endTime).toDate(),
    recipes: data.recipes,
  };
};
