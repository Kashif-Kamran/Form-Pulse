import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const appointments = [
  { animal: "Animal XYZ", date: "9/24/2024", with: "Nutritionist" },
  { animal: "Animal XYZ", date: "9/24/2024", with: "Veteran" },
  { animal: "Baby Horses", date: "9/24/2024", with: "Veteran" },
  { animal: "Baby Horses", date: "9/24/2024", with: "Veteran" },
  { animal: "Baby Horses", date: "9/24/2024", with: "Veteran" },
  { animal: "Baby Horses", date: "9/24/2024", with: "Veteran" },
  { animal: "Baby Horses", date: "9/24/2024", with: "Veteran" },
  { animal: "Baby Horses", date: "9/24/2024", with: "Veteran" },
  { animal: "Baby Horses", date: "9/24/2024", with: "Veteran" },
  { animal: "Baby Horses", date: "9/24/2024", with: "Veteran" }
];

interface AppointmentsProps {
  className?: string;
}




// If the component overflowws then it should scroll vertically.
export function Appointments({ className }: AppointmentsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[150px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="sticky top-0 bg-white z-10">
                <TableHead>Animal</TableHead>
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
        </div>
      </CardContent>
    </Card>
  );
}