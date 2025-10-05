import { useState } from "react";
import { ResourcesList } from "./components/resources-list";
import { UploadResourceModal } from "./components/upload-resource-modal";
import { PDFViewerModal } from "./components/pdf-viewer-modal";
import { Button } from "@/components/ui/button";
import { Upload, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useResources, refreshResourcesCache } from "@/hooks/api/resources.hook";
import { useMe } from "@/hooks/api/profile.hook";
import { ResourceDocumentPublic, RoleType } from "@repo/shared";

export default function ResourcesPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] =
    useState<ResourceDocumentPublic | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { toast } = useToast();

  // Get current user for role-based access control
  const { data: currentUser } = useMe();

  // Use the API hook for fetching resources
  const { results: documents = [], isLoading } = useResources();

  // Check if user is admin or super admin
  const isAdmin = currentUser?.role === RoleType.Admin || currentUser?.role === RoleType.SuperAdmin;

  const handleUploadSuccess = () => {
    // The query will be invalidated automatically by the upload mutation
    toast({
      title: "Upload successful!",
      description: "Document has been added to the resource library.",
    });
  };

  const handleRefresh = () => {
    refreshResourcesCache();
    toast({
      title: "Refreshed!",
      description: "Resource library has been updated.",
    });
  };

  const handleViewDocument = (document: ResourceDocumentPublic) => {
    setSelectedDocument(document);
    setIsViewerOpen(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resource Library</h1>
          <p className="text-gray-600 mt-1">
            Access and manage farm management documents and guides
          </p>
        </div>
        {/* Only show upload button to admins */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          {isAdmin && (
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              className="w-full sm:w-auto"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          )}
        </div>
      </div>

      {/* Documents List */}
      <ResourcesList
        documents={documents}
        isLoading={isLoading}
        onViewDocument={handleViewDocument}
        isAdmin={isAdmin}
      />

      {/* Upload Modal - only render for admins */}
      {isAdmin && (
        <UploadResourceModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      {/* PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={isViewerOpen}
        onClose={() => {
          setIsViewerOpen(false);
          setSelectedDocument(null);
        }}
        document={selectedDocument}
      />
    </div>
  );
}
