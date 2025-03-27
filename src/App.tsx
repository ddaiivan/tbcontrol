
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { AuthProvider } from '@/context/AuthContext'; // Import AuthProvider
import ProtectedRoute from '@/components/ProtectedRoute'; // Import ProtectedRoute
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Info from "./pages/Info";
import Screening from "./pages/Screening";
import AdvancedScreening from "./pages/AdvancedScreening";
import BmiCalculator from "./pages/BmiCalculator";
import TbDiagnostic from "./pages/TbDiagnostic"; // Renamed import
import ChestXray from "./pages/ChestXray"; // Import the new component
import Facilities from "./pages/Facilities";
import Login from './pages/Login';
import QnA from './pages/QnA'; // Import the new QnA component
import MdrTb from './pages/MdrTb'; // Import the new MDR-TB component
import Navigation from './components/Navigation';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider> {/* Wrap with AuthProvider */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation /> {/* Navigation might need auth context later */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/info" element={<Info />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/screening" element={<ProtectedRoute><Screening /></ProtectedRoute>} />
            <Route path="/advanced-screening" element={<ProtectedRoute><AdvancedScreening /></ProtectedRoute>} />
            <Route path="/bmi-calculator" element={<ProtectedRoute><BmiCalculator /></ProtectedRoute>} />
            <Route path="/tb-diagnostic" element={<ProtectedRoute><TbDiagnostic /></ProtectedRoute>} />
            <Route path="/chest-xray" element={<ProtectedRoute><ChestXray /></ProtectedRoute>} />
            <Route path="/facilities" element={<ProtectedRoute><Facilities /></ProtectedRoute>} />
            <Route path="/qna" element={<ProtectedRoute><QnA /></ProtectedRoute>} />
            <Route path="/mdr-tb" element={<ProtectedRoute><MdrTb /></ProtectedRoute>} /> {/* Add MDR-TB route */}

            {/* Catch-all Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
