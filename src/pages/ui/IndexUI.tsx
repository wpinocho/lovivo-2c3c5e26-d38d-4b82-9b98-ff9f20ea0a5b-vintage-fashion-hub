import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Recycle, ShoppingBag, Calendar, CreditCard, Shield } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { CareGuide } from '@/components/CareGuide';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { Card, CardContent } from '@/components/ui/card';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * 
 * Interfaz completamente editable para la página principal.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section */}
      <section className="relative bg-foreground text-background py-24 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'url(/hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/95 to-foreground/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full">
                <Recycle className="h-5 w-5" />
                <span className="font-semibold">Sustainable Fashion</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Buy & Sell
              <br />
              <span className="text-primary">Pre-Loved Fashion</span>
            </h1>
            
            <p className="text-xl mb-8 text-background/90 leading-relaxed">
              Discover unique vintage pieces and give them a second life. Shop sustainable, 
              look amazing, save the planet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8"
                onClick={() => {
                  document.getElementById('products')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explore Finds
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-background/10 border-2 border-background text-background hover:bg-background hover:text-foreground text-lg px-8"
                onClick={() => {
                  document.getElementById('collections')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                View Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Curated Collections
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Handpicked vintage pieces organized by style, era, and vibe
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {selectedCollectionId 
                  ? collections.find(c => c.id === selectedCollectionId)?.name || 'Collection' 
                  : 'Shop Pre-Loved Fashion'
                }
              </h2>
              <p className="text-muted-foreground">
                {selectedCollectionId 
                  ? 'Curated vintage pieces from this collection' 
                  : 'Unique vintage finds with a story to tell'
                }
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline"
                size="lg"
                onClick={handleShowAllProducts}
                className="border-2"
              >
                View All Products
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products available.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Opciones de Pago Flexibles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hacemos que sea fácil conseguir las piezas vintage que amas con opciones de pago seguras y flexibles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Apartado */}
            <Card className="border-2 border-warning/20 hover:border-warning transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-warning" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sistema de Apartados</h3>
                <p className="text-muted-foreground mb-4">
                  Aparta tu pieza favorita con solo el 10% de anticipo
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-warning mr-2">✓</span>
                    <span>Paga solo 10% para reservar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">✓</span>
                    <span>7 días para completar el pago</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">✓</span>
                    <span>Producto reservado exclusivamente</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">✓</span>
                    <span>Reembolso del 50% si cancelas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Crédito */}
            <Card className="border-2 border-accent/20 hover:border-accent transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pago a Crédito</h3>
                <p className="text-muted-foreground mb-4">
                  Divide tu pago en 3 meses sin intereses
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>3 pagos mensuales fijos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Sin intereses ni comisiones</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Aprobación instantánea</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">✓</span>
                    <span>Recibe tu producto de inmediato</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Seguridad */}
            <Card className="border-2 border-success/20 hover:border-success transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pagos Seguros</h3>
                <p className="text-muted-foreground mb-4">
                  Tu información está protegida con la mejor tecnología
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span>Encriptación nivel bancario</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span>Procesado por Stripe</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span>Garantía de compra segura</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span>Soporte 24/7 disponible</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Care Guide Section */}
      <CareGuide />

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};