import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";    

const UploadButton = () => {
  return (
    <Button className="h-full flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Upload Resource
    </Button>
  )
}

export default UploadButton