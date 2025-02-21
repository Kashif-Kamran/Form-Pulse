import { Spinner } from "@/components/ui/spinnner";

export default function FallbackSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="text-ui-fg-interactive" />
    </div>
  );
}
