import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import AllRoutes from "./routes/AllRoutes";
import AuthProvider from "./context/auth/AuthProvider";
import DeviceProvider from "./context/userDeviceInfo/DeviceProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <DeviceProvider>
          <BrowserRouter>
            <AllRoutes />
          </BrowserRouter>
        </DeviceProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
