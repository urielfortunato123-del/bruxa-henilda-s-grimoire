import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WhatsAppButton from "./components/WhatsAppButton";
import MagicalEffects from "./components/MagicalEffects";
import InstallPrompt from "./components/InstallPrompt";
import SplashScreen from "./components/SplashScreen";

import Chat from "./pages/Chat";
import Grimoire from "./pages/Grimoire";
import GrimoireModule from "./pages/GrimoireModule";
import LunarCalendar from "./pages/LunarCalendar";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashScreen onFinish={() => setSplashDone(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/grimorio" element={<Grimoire />} />
            <Route path="/grimorio/:module" element={<GrimoireModule />} />
            <Route path="/calendario" element={<LunarCalendar />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
          <MagicalEffects />
          <InstallPrompt />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
