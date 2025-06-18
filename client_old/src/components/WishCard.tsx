
import { useState } from 'react';
import { Heart, MessageSquare, MoreVertical, Edit, Trash2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LinkInput } from '@/components/LinkInput';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';

interface WishCardProps {
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
  isAuthenticated?: boolean;
  status?: string;
  onLike?: (id: string) => void;
  onMessage?: (authorId: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const WishCard = ({
  id,
  title,
  description,
  image,
  link,
  tags = [],
  likes,
  author,
  isLiked = false,
  isOwner = false,
  isAuthenticated = false,
  status,
  onLike,
  onMessage,
  onEdit,
  onDelete
}: WishCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    } else {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    }
    onLike?.(id);
  };

  const handleCopyLink = async () => {
    if (!link) return;
    
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: t.linkCopied,
        duration: 2000,
      });
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast({
        title: t.linkCopied,
        duration: 2000,
      });
    }
  };

  const shortenUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '');
      const path = urlObj.pathname;
      
      if (path.length > 15) {
        return `https://${domain}/...${path.slice(-10)}`;
      }
      return `https://${domain}${path}`;
    } catch {
      // If URL parsing fails, truncate the string
      return url.length > 25 ? `${url.slice(0, 22)}...` : url;
    }
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-background/80 backdrop-blur"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background">
                <DropdownMenuItem onClick={() => onEdit?.(id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  {t.edit}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete?.(id)} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t.delete}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1 mr-3">{title}</h3>
          {status && (
            <div className="flex items-center gap-1 ml-2 flex-shrink-0">
              {status === "completed" ? (
                <Badge className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 border-emerald-200 font-medium rounded-full">
                  {t.completed}
                </Badge>
              ) : status === "not_completed" ? (
                <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-50 text-gray-600 border-gray-200 font-medium rounded-full">
                  {t.notCompleted}
                </Badge>
              ) : null}
            </div>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium">
                {author.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span>{author.name}</span>
          </div>
        </div>

        {link && (
          <div className="border-t border-muted/30 pt-3 mt-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <LinkInput 
                    label={t.wishLinkLabel}
                    value={link}
                    onChange={() => {}} // readonly, no change handler needed
                    readonly={true}
                    showTooltip={true}
                    className="mb-0 flex-1"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 flex-shrink-0 hover:bg-muted/50 transition-colors"
                          onClick={handleCopyLink}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{t.copyLink}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex items-center space-x-1 ${liked ? 'text-red-500' : ''}`}
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
          <span>{likeCount}</span>
        </Button>

        {isAuthenticated && !isOwner && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMessage?.(author.name)}
            className="flex items-center space-x-1"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{t.message}</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WishCard;
