import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/custom-ui/navbar";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/api/profile.hook";

function Sidebar({ className }: { className?: string }) {
  const { data: profileInfo } = useMe();
  return (
    <div
      className={`bg-gray-300 w-full rounded-lg border-[1px] border-gray-500 p-4 h-full ${className}`}
    >
      {/* Avatar */}
      <div className="flex gap-4 p-2">
        <Avatar className="w-[50px] h-[50px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-bold p-0 ">{profileInfo?.name ?? "No Name"}</h1>
          <h1 className="text-xs p-0">
            {profileInfo?.role ?? "No Info found"}
          </h1>
        </div>
      </div>
      <Navbar />
      <div className="absolute bottom-6 left-4">
        <Button className="text-black" variant={"link"}>
          Help Center
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
