import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/routes";
import { queryClient } from "./lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
