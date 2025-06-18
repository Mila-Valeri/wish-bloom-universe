import { useState } from 'react';
import { Plus, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import WishCard from './WishCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Author {
  name: string;
  avatar?: string;
}

interface Wish {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  tags?: string[];
  likes: number;
  author: Author;
  isLiked?: boolean;
  isOwner?: boolean;
  status?: string;
}

interface WishGridProps {
  wishes: Wish[];
  isAuthenticated?: boolean;
  showAddButton?: boolean;
  loading?: boolean;
  onAddWish?: () => void;
  onLike?: (id: string) => void;
  onMessage?: (authorName: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
  currentLanguage?: string;
  texts?: any;
}

// Remove the hardcoded WISH_STATUS array as we'll use translations instead
const WishGrid = ({
  wishes,
  isAuthenticated = false,
  showAddButton = true,
  loading = false,
  onAddWish,
  onLike,
  onMessage,
  onEdit,
  onDelete,
  isAdmin = false,
  currentLanguage = 'en',
  texts
}: WishGridProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Default texts if not provided
  const defaultTexts = {
    wishCollection: 'Wish Collection',
    discoverDreams: 'Discover amazing dreams and aspirations',
    searchWishes: 'Search wishes...',
    filter: 'Filter',
    clear: 'Clear',
    addWish: 'Add Wish',
    noWishesMatch: 'No wishes match your filters',
    tryAdjusting: 'Try adjusting your search or filter criteria',
    noWishesYet: 'No wishes yet',
    beFirst: 'Be the first to share your dreams!',
    loading: 'Loading...',
    filters: 'Filters',
    allWishes: 'All wishes',
    priorityWishes: 'Priority wishes',
    completedWishes: 'Completed wishes',
    unfulfilledWishes: 'Unfulfilled wishes'
  };

  const t = texts || defaultTexts;

  // Create status options using translations
  const WISH_STATUS = [
    { label: t.allWishes, value: "all" },
    { label: t.completedWishes, value: "completed" },
    { label: t.notCompletedWishes || 'Невиконані мрії', value: "not_completed" },
  ];

  // Filter wishes by status only
  const filteredWishes = wishes.filter((wish) => {
    if (selectedStatus === "all") return true;
    if (selectedStatus === "completed") return wish.status === "completed";
    if (selectedStatus === "not_completed") return wish.status === "not_completed";
    return false;
  });

  const clearFilters = () => {
    setSelectedStatus("all");
  };

  const hasActiveFilters = selectedStatus !== "all";

  if (loading) {
    return (
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{t.wishCollection}</h2>
            <p className="text-muted-foreground text-sm md:text-lg mb-6 md:mb-8">
              {t.discoverDreams}
            </p>
          </div>
          
          <div className="flex items-center justify-center py-12 md:py-20">
            <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{t.wishCollection}</h2>
          <p className="text-muted-foreground text-sm md:text-lg mb-6 md:mb-8">{t.discoverDreams}</p>

          {wishes.length > 0 && (
            <div className="flex justify-center mb-6 md:mb-8">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48 rounded-xl shadow bg-gradient-to-r from-indigo-500/75 to-sky-500/75 dark:from-slate-800 dark:to-purple-800 text-white dark:text-white focus:ring-2 focus:ring-violet-300 transition-all">
                  <span className="flex-1 text-left">{t.filters}</span>
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-2xl border p-2 bg-white dark:bg-neutral-900 transition-all">
                  {WISH_STATUS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="rounded-lg px-3 py-2 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-indigo-50 dark:hover:bg-slate-700 transition focus:bg-indigo-100 focus:text-gray-900 data-[state=checked]:bg-indigo-100 pl-3 pr-2 [&>span:first-child]:hidden"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {filteredWishes.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center transition-colors ${
                      isAdmin
                        ? "cursor-pointer hover:bg-muted/80"
                        : "cursor-not-allowed opacity-70"
                    }`}
                    onClick={() => {
                      if (isAdmin && onAddWish) onAddWish();
                    }}
                    data-testid="add-wish-plus"
                  >
                    <Plus className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-center">
                  {isAdmin
                    ? (t.addWish || "Add Wish")
                    : "Только для администратора. Войдите как администратор, чтобы добавить желание."}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h3 className="text-lg md:text-2xl font-semibold mb-4">
              {hasActiveFilters ? t.noWishesMatch : t.noWishesYet}
            </h3>
            <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
              {hasActiveFilters 
                ? t.tryAdjusting
                : t.beFirst
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredWishes.map((wish) => (
              <WishCard
                key={wish.id}
                id={wish.id}
                title={wish.title}
                description={wish.description}
                image={wish.image}
                link={wish.link}
                tags={wish.tags}
                likes={wish.likes}
                author={wish.author}
                isLiked={wish.isLiked}
                isOwner={wish.isOwner}
                isAuthenticated={isAuthenticated}
                onLike={onLike}
                onMessage={onMessage}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishGrid;
