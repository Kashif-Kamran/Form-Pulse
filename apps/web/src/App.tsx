import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/routes";
import { queryClient } from "./lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
