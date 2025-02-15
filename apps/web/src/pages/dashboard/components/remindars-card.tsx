import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

function RemindersCard() {
  return (
    <Card className="w-1/2 shadow-md flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center ">
        <CardTitle className="font-semibold text-lg">Reminders</CardTitle>
        <CardTitle className="font-semibold text-gray-400 ">
          9/24/2024
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Vet Appointment</TableCell>
              <TableCell>9:00AM</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vet Appointment</TableCell>
              <TableCell>9:00AM</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vet Appointment</TableCell>
              <TableCell>9:00AM</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vet Appointment</TableCell>
              <TableCell>9:00AM</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vet Appointment</TableCell>
              <TableCell>9:00AM</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vet Appointment</TableCell>
              <TableCell>9:00AM</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vet Appointment</TableCell>
              <TableCell>9:00AM</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vet Appointment</TableCell>
              <TableCell>9:00AM</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vet Appointment</TableCell>
              <TableCell>9:00AM</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vet Appointment</TableCell>
              <TableCell>9:00AM</TableCell>
              <TableCell>
                <Switch />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vet Appointment</TableCell>
              <TableCell>9:00AM</TableCell>
              <TableCell>
                <Switch />
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

export default RemindersCard;
