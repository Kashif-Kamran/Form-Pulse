// src/app/settings/page.tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const SettingsPage = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOpenModal = (option: string) => {
    setOpenModal(option);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const renderModalContent = () => {
    switch (openModal) {
      case "Reset Password":
        return <div>Reset Password functionality here</div>;
      case "Create Users":
        return <div>Create Users functionality here</div>;
      case "Manage Roles & Privileges":
        return <div>Manage Roles & Privileges functionality here</div>;
      case "Backup Data with Google Drive":
        return <div>Backup Data with Google Drive functionality here</div>;
      case "Export Data":
        return <div>Export Data functionality here</div>;
      case "Performance Settings":
        return <div>Performance Settings functionality here</div>;
      case "Report Issue":
        return <div>Report Issue functionality here</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Dialog open={openModal === "Reset Password"} onOpenChange={handleCloseModal}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-2 border-b"
                onClick={() => handleOpenModal("Reset Password")}
              >
                Reset Password
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
              </DialogHeader>
              {renderModalContent()}
            </DialogContent>
          </Dialog>

          <Dialog open={openModal === "Create Users"} onOpenChange={handleCloseModal}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-2 border-b"
                onClick={() => handleOpenModal("Create Users")}
              >
                Create Users
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Users</DialogTitle>
              </DialogHeader>
              {renderModalContent()}
            </DialogContent>
          </Dialog>

          <Dialog open={openModal === "Manage Roles & Privileges"} onOpenChange={handleCloseModal}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-2 border-b"
                onClick={() => handleOpenModal("Manage Roles & Privileges")}
              >
                Manage Roles & Privileges
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Roles & Privileges</DialogTitle>
              </DialogHeader>
              {renderModalContent()}
            </DialogContent>
          </Dialog>

          <Dialog open={openModal === "Backup Data with Google Drive"} onOpenChange={handleCloseModal}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-2 border-b"
                onClick={() => handleOpenModal("Backup Data with Google Drive")}
              >
                Backup Data with Google Drive
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Backup Data with Google Drive</DialogTitle>
              </DialogHeader>
              {renderModalContent()}
            </DialogContent>
          </Dialog>

          <Dialog open={openModal === "Export Data"} onOpenChange={handleCloseModal}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-2 border-b"
                onClick={() => handleOpenModal("Export Data")}
              >
                Export Data
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Data</DialogTitle>
              </DialogHeader>
              {renderModalContent()}
            </DialogContent>
          </Dialog>

          <Dialog open={openModal === "Performance Settings"} onOpenChange={handleCloseModal}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-2 border-b"
                onClick={() => handleOpenModal("Performance Settings")}
              >
                Performance Settings
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Performance Settings</DialogTitle>
              </DialogHeader>
              {renderModalContent()}
            </DialogContent>
          </Dialog>

          <Dialog open={openModal === "Report Issue"} onOpenChange={handleCloseModal}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-2 border-b"
                onClick={() => handleOpenModal("Report Issue")}
              >
                Report Issue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Issue</DialogTitle>
              </DialogHeader>
              {renderModalContent()}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;