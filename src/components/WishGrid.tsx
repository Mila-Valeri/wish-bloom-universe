
import { useState } from 'react';
import WishCard from './WishCard';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Wish {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  tags?: string[];
  likes: number;
  author: {
    name: string;
    avatar?: string;
  };
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
  onMessage?: (authorId: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const WishGrid = ({
  wishes = [],
  isAuthenticated = false,
  showAddButton = false,
  loading = false,
  onAddWish,
  onLike,
  onMessage,
  onEdit,
  onDelete
}: WishGridProps) => {
  const [filter, setFilter] = useState('all');

  const filteredWishes = wishes.filter(wish => {
    if (filter === 'all') return true;
    if (filter === 'popular') return wish.likes > 5;
    if (filter === 'recent') return true; // Add timestamp logic later
    return true;
  });

  if (loading) {
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded-md mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Wish Collection</h2>
            <p className="text-muted-foreground">Discover amazing dreams and aspirations</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background">
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  All Wishes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('popular')}>
                  Popular
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('recent')}>
                  Recent
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {showAddButton && (
              <Button onClick={onAddWish} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>{isAuthenticated ? 'Add Wish' : 'Sign Up to Add'}</span>
              </Button>
            )}
          </div>
        </div>

        {filteredWishes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No wishes yet</h3>
            <p className="text-muted-foreground mb-6">Be the first to share your dreams!</p>
            {isAuthenticated && (
              <Button onClick={onAddWish}>Create Your First Wish</Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWishes.map((wish) => (
              <WishCard
                key={wish.id}
                {...wish}
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
