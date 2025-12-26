import { Card, CardContent } from '@/components/ui/card'
import { Zap, Shield, Clock, CreditCard } from 'lucide-react'

export const MarketBizFeatures = () => {
  const features = [
    {
      icon: Zap,
      title: 'Pagos Instantáneos',
      description: 'Procesamiento en tiempo real con confirmación inmediata',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Shield,
      title: '100% Seguro',
      description: 'Encriptación de nivel bancario y protección total',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: Clock,
      title: 'Sistema de Apartados',
      description: 'Reserva con solo 10% y paga en 7 días',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: CreditCard,
      title: 'Pago a Crédito',
      description: '3 meses sin intereses, aprobación instantánea',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Zap className="h-5 w-5 fill-current" />
            <span className="font-semibold">Market Biz Difference</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            La forma más inteligente de comprar vintage
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Combinamos tecnología de pago de última generación con opciones flexibles 
            para que compres sin límites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stripe trust badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-card border rounded-full px-6 py-3">
            <Shield className="h-5 w-5 text-success" />
            <span className="text-sm font-medium">Powered by Stripe</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">Procesamiento instantáneo</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">PCI DSS Compliant</span>
          </div>
        </div>
      </div>
    </section>
  )
}