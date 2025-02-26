import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
export default function NotifyNutritionistCard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-[1.1rem]">
          Assign Task to Nutritionist
        </CardTitle>
      </CardHeader>
      <CardContent className="grid  md:grid-cols-[1fr_1fr] gap-2">
        <Textarea
          className=" overflow-y-auto h-[8rem] border rounded p-2 resize-none"
          placeholder="Type your message here."
        />
        <div>
          <div className="grid lg:grid-cols-2 gap-2">
            <Select>
              <SelectTrigger className="py-5">
                <SelectValue placeholder="Select Nutritionist" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="py-5">
                <SelectValue placeholder="Select Animal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-3 py-6">Send Messge</Button>
        </div>
      </CardContent>
    </Card>
  );
}
