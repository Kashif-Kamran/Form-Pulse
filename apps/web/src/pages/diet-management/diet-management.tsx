import InputField from "@/components/custom-ui/form-feilds/input-field"
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateAnimalModel } from "../animals/components/create-animal-model"

const DietManagement = () => {
  return (
    <div className="flex items-center gap-4">
        <InputField
          className="rounded-full bg-white pr-0 border-0 shadow-md"
          leftIcon={<SearchIcon />}
          placeholder="Search Animal..."
          rightIcon={
            <Button
              size={"icon"}
              className="rounded-r-full py-6 px-12 [&_svg]:size-none"
            >
              Search
            </Button>
          }
        />
        <CreateAnimalModel />
      </div>
  )
}

export default DietManagement