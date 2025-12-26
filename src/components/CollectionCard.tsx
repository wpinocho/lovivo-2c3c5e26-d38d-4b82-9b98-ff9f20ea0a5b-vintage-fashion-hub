import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="group overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-[4/3] overflow-hidden relative">
          {collection.image ? (
            <>
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-xl line-clamp-1 text-foreground">
              {collection.name}
            </h3>
            {collection.featured && (
              <span className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full font-semibold">
                Featured
              </span>
            )}
          </div>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={() => onViewProducts(collection.id)}
          >
            Explore Collection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}