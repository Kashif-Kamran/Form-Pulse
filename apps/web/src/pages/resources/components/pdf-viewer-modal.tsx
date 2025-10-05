import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Maximize2,
  Minimize2,
  FileText,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/utils/common.utils";

// Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    filename: string;
    originalName: string;
    url: string;
  } | null;
}

export function PDFViewerModal({
  isOpen,
  onClose,
  document,
}: PDFViewerModalProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { toast } = useToast();

  // Helper function to get full file URL
  const getFullFileUrl = (url: string) => {
    if (url.startsWith("http")) {
      return url; // Already a full URL
    }
    return `${apiUrl}${url}`; // Combine with API base URL
  };

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setPageNumber(1);
      setIsLoading(false);
      setLoadError(null);
    },
    []
  );

  const onDocumentLoadError = useCallback(
    (error: Error) => {
      console.error("PDF load error:", error);
      setLoadError("Failed to load PDF document");
      setIsLoading(false);
      toast({
        title: "Error loading PDF",
        description: "There was an error loading the PDF document.",
        variant: "destructive",
      });
    },
    [toast]
  );

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.max(1, Math.min(newPageNumber, numPages));
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale((prev) => Math.min(prev * 1.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev / 1.2, 0.5));
  const resetZoom = () => setScale(1.0);

  const rotate = () => setRotation((prev) => (prev + 90) % 360);

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value);
    if (!isNaN(page) && page >= 1 && page <= numPages) {
      setPageNumber(page);
    }
  };

  const handleDownload = () => {
    if (document?.url) {
      const fullUrl = getFullFileUrl(document.url);
      const link = window.document.createElement("a");
      link.href = fullUrl;
      link.download = document.originalName;
      link.click();

      toast({
        title: "Download started",
        description: `Downloading ${document.originalName}`,
      });
    }
  };

  const handleClose = () => {
    // Reset state when closing
    setPageNumber(1);
    setScale(1.0);
    setRotation(0);
    setIsLoading(true);
    setLoadError(null);
    setIsFullscreen(false);
    onClose();
  };

  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`${
          isFullscreen
            ? "max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh]"
            : "max-w-4xl max-h-[90vh] w-full"
        } p-0 flex flex-col`}
      >
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span className="truncate">{document.originalName}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              {/* Navigation */}
              <Button
                variant="outline"
                size="sm"
                onClick={previousPage}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1 px-2">
                <Input
                  type="number"
                  value={pageNumber}
                  onChange={handlePageInputChange}
                  className="w-16 h-8 text-center"
                  min={1}
                  max={numPages}
                />
                <span className="text-sm text-gray-500">of {numPages}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Zoom Controls */}
              <div className="h-4 w-px bg-gray-300 mx-1" />

              <Button variant="outline" size="sm" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm" onClick={resetZoom}>
                {Math.round(scale * 100)}%
              </Button>

              <Button variant="outline" size="sm" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>

              {/* Other Controls */}
              <div className="h-4 w-px bg-gray-300 mx-1" />

              <Button variant="outline" size="sm" onClick={rotate}>
                <RotateCw className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* PDF Content */}
        <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-4">
          {isLoading && (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-sm text-gray-600">Loading PDF...</p>
            </div>
          )}

          {loadError && (
            <div className="flex flex-col items-center gap-2 text-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <p className="text-sm text-red-600">{loadError}</p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          )}

          {!loadError && (
            <div className="bg-white shadow-lg">
              <Document
                file={getFullFileUrl(
                  "http://localhost:3001/resources/files/1759673005314-uy8zw5.pdf"
                )}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                error={null}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  rotate={rotation}
                  loading={
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                    </div>
                  }
                />
              </Document>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
