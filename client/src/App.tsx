
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "wouter";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WishProvider } from "@/contexts/WishContext";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import EditWishPage from "./pages/EditWish";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <WishProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Route path="/" component={Index} />
            <Route path="/profile">
              {() => (
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/settings">
              {() => (
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              )}
            </Route>
            <Route path="/edit-wish/:id">
              {() => (
                <ProtectedRoute>
                  <EditWishPage />
                </ProtectedRoute>
              )}
            </Route>
            <Route>
              {() => <NotFound />}
            </Route>
          </TooltipProvider>
        </WishProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
