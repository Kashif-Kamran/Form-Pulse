import { CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function Dashboard() {
  return (
    <div className="w-screen h-full py-2 flex justify-evenly">
      <div className="bg-gray-300 w-[20%] rounded-lg border-[1px] border-gray-500 p-4">
        {/* Avatar */}
        <div className="flex gap-4 p-4">
          <Avatar className="w-[50px] h-[50px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="font-bold p-0 ">Arslan Ahmed</h1>
            <h1 className="text-xs p-0">Admin</h1>
          </div>
        </div>
        {/* Navbar */}
        <div className="">
          <Button className="rounded-none w-full">Home</Button>
        </div>
      </div>
      {/*  */}
      <div className="bg-gray-300 h-full w-[78%] rounded-lg border-[1px] border-gray-500">
        <CardHeader></CardHeader>
        <CardContent></CardContent>
      </div>
    </div>
  );
}

export default Dashboard;
