import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const appointments = [
  { animal: "Animal XYZ", date: "9/24/2024", with: "Nutritionist" },
  { animal: "Animal XYZ", date: "9/24/2024", with: "Veteran" },
  { animal: "Baby Horses", date: "9/24/2024", with: "Veteran" },
  { animal: "Baby Horses", date: "9/24/2024", with: "Veteran" },
  { animal: "Baby Horses", date: "9/24/2024", with: "Veteran" },
];

export function Appointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Animal(s)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>With</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell>{appointment.animal}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.with}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}