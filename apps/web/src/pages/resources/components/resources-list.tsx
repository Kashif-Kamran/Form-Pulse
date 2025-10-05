import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Trash2, Eye } from "lucide-react";
import { ResourceDocumentPublic } from "@repo/shared";
import { useDeleteResource } from "@/hooks/api/resources.hook";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/utils/common.utils";

interface ResourcesListProps {
  documents: ResourceDocumentPublic[];
  isLoading: boolean;
  onViewDocument: (document: ResourceDocumentPublic) => void;
  isAdmin?: boolean;
}

const getFullUrl = (url: string) => {
  return `${apiUrl}${url}`;
};

export function ResourcesList({
  documents,
  isLoading,
  onViewDocument,
  isAdmin = false,
}: ResourcesListProps) {
  const { toast } = useToast();
  const deleteResourceMutation = useDeleteResource({
    onSuccess: () => {
      toast({
        title: "Document deleted",
        description: "Document has been removed from the library.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Delete failed",
        description:
          error?.message || "Failed to delete the document. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteDocument = (filename: string) => {
    deleteResourceMutation.mutate(filename);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <div className="h-5 w-5 bg-gray-300 rounded" />
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 bg-gray-200 rounded flex-1" />
                  <div className="h-8 w-8 bg-gray-200 rounded" />
                  <div className="h-8 w-8 bg-gray-200 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Documents Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {documents.map((document) => (
            <Card
              key={document.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg leading-tight line-clamp-2">
                        {document.originalName}
                      </CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Document Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Size:</span>
                    <Badge variant="secondary">
                      {formatFileSize(document.size)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Uploaded:</span>
                    <span className="text-gray-900 font-medium">
                      {formatDate(document.uploadDate)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    // onClick={() => onViewDocument(document)}
                    onClick={() =>
                      window.open(getFullUrl(document.url), "_blank")
                    }
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>

                  {/* Only show delete button to admins */}
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteDocument(document.filename)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      disabled={deleteResourceMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && documents.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No documents uploaded yet
            </h3>
            <p className="text-gray-500">
              Use the Upload Document button above to get started with the
              resource library.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
