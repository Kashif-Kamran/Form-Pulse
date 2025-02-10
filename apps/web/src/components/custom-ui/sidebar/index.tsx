import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/custom-ui/navbar";

function Sidebar({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gray-300 w-full rounded-lg border-[1px] border-gray-500 p-4 ${className}`}
    >
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
      <div className="navbar">
        <Navbar />
      </div>
    </div>
  );
}

export default Sidebar;
