import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface UserCredentials {
  email: string;
  password: string;
  temporaryPassword: boolean;
}

interface CredentialsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  credentials: UserCredentials | null;
  userName?: string;
}

export function CredentialsModal({
  open,
  onOpenChange,
  credentials,
  userName,
}: CredentialsModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: "email" | "password") => {
    try {
      await navigator.clipboard.writeText(text);

      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPassword(true);
        setTimeout(() => setCopiedPassword(false), 2000);
      }

      toast({
        title: "Copied!",
        description: `${type === "email" ? "Email" : "Password"} copied to clipboard`,
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const copyAllCredentials = async () => {
    if (!credentials) return;

    const credentialsText = `Login Credentials for ${userName || "New User"}
Email: ${credentials.email}
Password: ${credentials.password}`;

    try {
      await navigator.clipboard.writeText(credentialsText);
      toast({
        title: "All credentials copied!",
        description: "Complete login information copied to clipboard",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy credentials to clipboard",
        variant: "destructive",
      });
    }
  };

  if (!credentials) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            User Created Successfully
          </DialogTitle>
          <DialogDescription>
            {userName && (
              <span className="font-medium text-gray-900">{userName}</span>
            )}{" "}
            has been created. Please copy these credentials and share them
            securely.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Security Warning */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-orange-800">
                    Security Notice
                  </p>
                  <p className="text-xs text-orange-700">
                    These credentials will only be shown once. Please copy them
                    now and share securely.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="flex gap-2">
              <Input value={credentials.email} readOnly className="flex-1" />
              <Button
                variant={copiedEmail ? "default" : "outline"}
                size="icon"
                onClick={() => copyToClipboard(credentials.email, "email")}
                className={copiedEmail ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {copiedEmail ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              {credentials.temporaryPassword && (
                <Badge variant="secondary" className="text-xs">
                  Temporary
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  readOnly
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                variant={copiedPassword ? "default" : "outline"}
                size="icon"
                onClick={() =>
                  copyToClipboard(credentials.password, "password")
                }
                className={
                  copiedPassword ? "bg-green-600 hover:bg-green-700" : ""
                }
              >
                {copiedPassword ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-4">
            <Button
              onClick={copyAllCredentials}
              className="w-full"
              variant="default"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy All Credentials
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="w-full"
            >
              Done
            </Button>
          </div>

          {/* Additional Instructions */}
          <div className="text-xs text-gray-500 space-y-1 pt-2 border-t">
            <p>• Share these credentials through a secure channel</p>
            <p>• Ask the user to change the password after first login</p>
            <p>• The user can now login without email verification</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
