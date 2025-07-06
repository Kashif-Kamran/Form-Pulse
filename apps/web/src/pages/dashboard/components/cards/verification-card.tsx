import { CheckCircle, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useVerificationStatus } from "@/hooks/api/dashboard.hook";

export function VerificationCard() {
  const { verificationStatus, verificationRate, isLoading, error } =
    useVerificationStatus();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-gray-500" />
            Verification
          </CardTitle>
          <CardDescription>User verification status</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-gray-500" />
            Verification
          </CardTitle>
          <CardDescription>User verification status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-red-500">Error loading verification data</p>
        </CardContent>
      </Card>
    );
  }

  const verifiedCount =
    verificationStatus.find((status) => status.status === "verified")?.count ||
    0;
  const unverifiedCount =
    verificationStatus.find((status) => status.status === "unverified")
      ?.count || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-gray-500" />
          Verification
        </CardTitle>
        <CardDescription>User verification status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {verificationStatus.length === 0 ? (
          <p className="text-gray-500">No user data available</p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-green-500 rounded-full" />
                <span>Verified</span>
              </div>
              <span className="font-medium">{verifiedCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-red-500 rounded-full" />
                <span>Unverified</span>
              </div>
              <span className="font-medium">{unverifiedCount}</span>
            </div>
            <div>
              <Progress value={verificationRate} className="h-2" />
              <p className="text-sm text-gray-500 text-center mt-2">
                {verificationRate}% Verified
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
