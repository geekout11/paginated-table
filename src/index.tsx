import React from "react";
import ReactDOM from "react-dom/client";
// React Query Essentials
import './index.css'
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

// React Query Config
const queryClient = new QueryClient(); // Global Store Instance

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
 // Provide access to Global Store
 <QueryClientProvider client={queryClient}>
   <React.StrictMode>
     <App />
   </React.StrictMode>
 </QueryClientProvider>,
);