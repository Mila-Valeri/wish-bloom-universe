
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
}

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
}: WishGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags from wishes
  const allTags = Array.from(
    new Set(wishes.flatMap(wish => wish.tags || []))
  ).sort();

  // Filter wishes based on search term and selected tag
  const filteredWishes = wishes.filter(wish => {
    const matchesSearch = wish.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wish.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || (wish.tags && wish.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag(null);
  };

  const hasActiveFilters = searchTerm || selectedTag;

  if (loading) {
    return (
      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Wish Collection</h2>
            <p className="text-muted-foreground text-sm md:text-lg mb-6 md:mb-8">
              Discover amazing dreams and aspirations
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
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Wish Collection</h2>
          <p className="text-muted-foreground text-sm md:text-lg mb-6 md:mb-8">
            Discover amazing dreams and aspirations
          </p>
          
          {/* Search and Filter Controls - only show if there are wishes */}
          {wishes.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6 md:mb-8">
              <div className="relative flex-1">
                <Input
                  placeholder="Search wishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 text-sm md:text-base"
                />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 text-sm md:text-base">
                      <Filter className="h-4 w-4" />
                      Filter
                      {selectedTag && (
                        <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
                          {selectedTag}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background">
                    <DropdownMenuItem onClick={() => setSelectedTag(null)}>
                      All Tags
                    </DropdownMenuItem>
                    {allTags.map((tag) => (
                      <DropdownMenuItem 
                        key={tag} 
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2">
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
                
                {showAddButton && (
                  <Button onClick={onAddWish} className="flex items-center gap-2 text-sm md:text-base">
                    <Plus className="h-4 w-4" />
                    {isAuthenticated ? 'Add Wish' : 'Log in to add'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {filteredWishes.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg md:text-2xl font-semibold mb-4">
              {hasActiveFilters ? 'No wishes match your filters' : 'No wishes yet'}
            </h3>
            <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
              {hasActiveFilters 
                ? 'Try adjusting your search or filter criteria'
                : 'Be the first to share your dreams!'
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
