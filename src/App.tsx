import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLanguage } from "@/hooks/useLanguage";
import { ROUTE_PATHS } from "@/lib/index";

// Page Imports
import Home from "@/pages/Home";
import Cars from "@/pages/Cars";
import CarDetail from "@/pages/CarDetail";
import AddCar from "@/pages/AddCar";
import Auth from "@/pages/Auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const { dir } = useLanguage();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" richColors dir={dir} />

        <BrowserRouter>
          <Routes>
            <Route path={ROUTE_PATHS.HOME} element={<Home />} />
            <Route path={ROUTE_PATHS.CARS} element={<Cars />} />
            <Route path={ROUTE_PATHS.CAR_DETAIL} element={<CarDetail />} />
            
            {/* المسار المستهدف بعد تسجيل الدخول */}
            <Route path={ROUTE_PATHS.ADD_CAR} element={<AddCar />} />
            
            <Route path={ROUTE_PATHS.AUTH} element={<Auth />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;