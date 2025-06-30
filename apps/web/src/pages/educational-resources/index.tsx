// src/app/educational-resources/page.tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeIcon, DownloadIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import UploadButton from "./upload-button";

const EducationalResourcesPage = () => {
  const [resources] = useState([
    { id: 1, title: "Diet Plans", fileUrl: "/assets/Diet 1.pdf" },
    { id: 2, title: "Health Monitoring", fileUrl: "/assets/Diet.pdf.pdf" },
    { id: 3, title: "Diet Details", fileUrl: "/assets/Diet 2.pdf" },
  ]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<boolean>(false);

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (fileUrl: string) => {
    console.log("Attempting to preview:", fileUrl);
    setSelectedPdf(fileUrl);
    setPdfError(false);
  };

  useEffect(() => {
    if (selectedPdf) {
      const img = new Image();
      img.src = selectedPdf;
      img.onload = () => console.log("File accessible");
      img.onerror = () => {
        console.error("Failed to load PDF:", selectedPdf);
        setPdfError(true);
      };
    }
  }, [selectedPdf]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Educational Resources</h1>
        <UploadButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end space-x-2">
                <Dialog open={selectedPdf === resource.fileUrl} onOpenChange={() => setSelectedPdf(null)}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePreview(resource.fileUrl)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle>{resource.title} Preview</DialogTitle>
                    </DialogHeader>
                    {selectedPdf ? (
                      pdfError ? (
                        <div className="text-center text-red-500">
                          <p>Failed to load PDF document.</p>
                          <a href={selectedPdf} className="text-blue-500 underline">Download instead</a>
                        </div>
                      ) : (
                        <iframe
                          src={selectedPdf}
                          title="PDF Preview"
                          width="100%"
                          height="500px"
                          style={{ border: "none" }}
                          onError={() => setPdfError(true)}
                        >
                          <p>Preview not available. <a href={selectedPdf}>Download instead</a>.</p>
                        </iframe>
                      )
                    ) : (
                      <p>Loading...</p>
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDownload(resource.fileUrl, `${resource.title}.pdf`)}
                >
                  <DownloadIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EducationalResourcesPage;