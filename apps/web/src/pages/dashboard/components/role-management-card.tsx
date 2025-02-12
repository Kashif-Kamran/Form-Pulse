import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

function RoleManagementCard() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="font-semibold text-lg">Assign Roles</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Arsalan</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Caretaker
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nutritionist
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Veterinarian
                  </Label>
                </div>
              </TableCell>
              <TableCell className="flex justify-end  ">
                <button className="text-primary hover:text-green-700 transition-colors duration-200 p-2 rounded-md hover:bg-green-100 focus:outline-none">
                  <Trash2 className="w-5 h-5" />
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ahmad</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Caretaker
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nutritionist
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Veterinarian
                  </Label>
                </div>
              </TableCell>
              <TableCell className="flex justify-end  ">
                <button className="text-primary hover:text-green-700 transition-colors duration-200 p-2 rounded-md hover:bg-green-100 focus:outline-none">
                  <Trash2 className="w-5 h-5" />
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Awais</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Caretaker
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nutritionist
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Veterinarian
                  </Label>
                </div>
              </TableCell>
              <TableCell className="flex justify-end  ">
                <button className="text-primary hover:text-green-700 transition-colors duration-200 p-2 rounded-md hover:bg-green-100 focus:outline-none">
                  <Trash2 className="w-5 h-5" />
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kamran</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Caretaker
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nutritionist
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Veterinarian
                  </Label>
                </div>
              </TableCell>
              <TableCell className="flex justify-end  ">
                <button className="text-primary hover:text-green-700 transition-colors duration-200 p-2 rounded-md hover:bg-green-100 focus:outline-none">
                  <Trash2 className="w-5 h-5" />
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rehan</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Caretaker
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nutritionist
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Veterinarian
                  </Label>
                </div>
              </TableCell>
              <TableCell className="flex justify-end  ">
                <button className="text-primary hover:text-green-700 transition-colors duration-200 p-2 rounded-md hover:bg-green-100 focus:outline-none">
                  <Trash2 className="w-5 h-5" />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end pb-3">
        <Button variant={"link"}>View All</Button>
      </CardFooter>
    </Card>
  );
}

export default RoleManagementCard;
