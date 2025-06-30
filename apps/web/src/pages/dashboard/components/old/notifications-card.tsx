import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
function NotificationsCard() {
  return (
    <Card className="w-1/2 flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="font-semibold text-lg">Notifications</CardTitle>
        <CardTitle className="font-semibold text-gray-400">9/24/2024</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className=" w-full max-w-xs overflow-hidden">
                <span className="truncate w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat at quam laborum dolorem architecto! Aliquid
                  voluptatibus harum perspiciatis recusandae voluptate. Cumque
                  delectus, inventore repellendus sequi dignissimos atque
                  consectetur officia doloremque nam optio laboriosam temporibus
                  animi fugit excepturi, aliquid eius ab maiores! Assumenda,
                  soluta?
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" w-full max-w-xs overflow-hidden">
                <span className="truncate w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat at quam laborum dolorem architecto! Aliquid
                  voluptatibus harum perspiciatis recusandae voluptate. Cumque
                  delectus, inventore repellendus sequi dignissimos atque
                  consectetur officia doloremque nam optio laboriosam temporibus
                  animi fugit excepturi, aliquid eius ab maiores! Assumenda,
                  soluta?
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" w-full max-w-xs overflow-hidden">
                <span className="truncate w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat at quam laborum dolorem architecto! Aliquid
                  voluptatibus harum perspiciatis recusandae voluptate. Cumque
                  delectus, inventore repellendus sequi dignissimos atque
                  consectetur officia doloremque nam optio laboriosam temporibus
                  animi fugit excepturi, aliquid eius ab maiores! Assumenda,
                  soluta?
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" w-full max-w-xs overflow-hidden">
                <span className="truncate w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat at quam laborum dolorem architecto! Aliquid
                  voluptatibus harum perspiciatis recusandae voluptate. Cumque
                  delectus, inventore repellendus sequi dignissimos atque
                  consectetur officia doloremque nam optio laboriosam temporibus
                  animi fugit excepturi, aliquid eius ab maiores! Assumenda,
                  soluta?
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" w-full max-w-xs overflow-hidden">
                <span className="truncate w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat at quam laborum dolorem architecto! Aliquid
                  voluptatibus harum perspiciatis recusandae voluptate. Cumque
                  delectus, inventore repellendus sequi dignissimos atque
                  consectetur officia doloremque nam optio laboriosam temporibus
                  animi fugit excepturi, aliquid eius ab maiores! Assumenda,
                  soluta?
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" w-full max-w-xs overflow-hidden">
                <span className="truncate w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat at quam laborum dolorem architecto! Aliquid
                  voluptatibus harum perspiciatis recusandae voluptate. Cumque
                  delectus, inventore repellendus sequi dignissimos atque
                  consectetur officia doloremque nam optio laboriosam temporibus
                  animi fugit excepturi, aliquid eius ab maiores! Assumenda,
                  soluta?
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" w-full max-w-xs overflow-hidden">
                <span className="truncate w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat at quam laborum dolorem architecto! Aliquid
                  voluptatibus harum perspiciatis recusandae voluptate. Cumque
                  delectus, inventore repellendus sequi dignissimos atque
                  consectetur officia doloremque nam optio laboriosam temporibus
                  animi fugit excepturi, aliquid eius ab maiores! Assumenda,
                  soluta?
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" w-full max-w-xs overflow-hidden">
                <span className="truncate w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat at quam laborum dolorem architecto! Aliquid
                  voluptatibus harum perspiciatis recusandae voluptate. Cumque
                  delectus, inventore repellendus sequi dignissimos atque
                  consectetur officia doloremque nam optio laboriosam temporibus
                  animi fugit excepturi, aliquid eius ab maiores! Assumenda,
                  soluta?
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" w-full max-w-xs overflow-hidden">
                <span className="truncate w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat at quam laborum dolorem architecto! Aliquid
                  voluptatibus harum perspiciatis recusandae voluptate. Cumque
                  delectus, inventore repellendus sequi dignissimos atque
                  consectetur officia doloremque nam optio laboriosam temporibus
                  animi fugit excepturi, aliquid eius ab maiores! Assumenda,
                  soluta?
                </span>
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

export default NotificationsCard;
