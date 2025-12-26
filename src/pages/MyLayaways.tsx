import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Calendar, Clock, Package, CreditCard, AlertCircle } from 'lucide-react'
import { useSettings } from '@/contexts/SettingsContext'
import { useNavigate } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Mock data - en producción vendría de Supabase
const mockLayaways = [
  {
    id: '1',
    product_name: 'Vintage Levi\'s Denim Jacket',
    product_image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=400&fit=crop',
    total_amount: 89.99,
    deposit_paid: 8.99,
    remaining_balance: 81.00,
    due_date: '2025-02-05',
    status: 'active',
    created_at: '2025-01-29'
  },
  {
    id: '2',
    product_name: 'Designer Leather Handbag',
    product_image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    total_amount: 159.99,
    deposit_paid: 16.00,
    remaining_balance: 143.99,
    due_date: '2025-02-03',
    status: 'expiring_soon',
    created_at: '2025-01-27'
  }
]

const MyLayaways = () => {
  const { formatMoney } = useSettings()
  const navigate = useNavigate()

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const getStatusBadge = (status: string, daysRemaining: number) => {
    if (daysRemaining <= 0) {
      return <Badge variant="destructive">Expirado</Badge>
    }
    if (daysRemaining <= 2) {
      return <Badge className="bg-warning text-warning-foreground">Por vencer</Badge>
    }
    return <Badge className="bg-success text-success-foreground">Activo</Badge>
  }

  return (
    <EcommerceTemplate pageTitle="Mis Apartados">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mis Apartados</h1>
          <p className="text-muted-foreground">
            Gestiona tus productos apartados y completa tus pagos
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Tienes <strong>7 días</strong> para completar el pago desde la fecha de apartado. 
            Si no completas el pago a tiempo, se reembolsará el 50% de tu anticipo.
          </AlertDescription>
        </Alert>

        {/* Apartados List */}
        <div className="space-y-6">
          {mockLayaways.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">No tienes apartados activos</h3>
                <p className="text-muted-foreground mb-6">
                  Explora nuestro catálogo y aparta tus piezas favoritas
                </p>
                <Button onClick={() => navigate('/')}>
                  Explorar Productos
                </Button>
              </CardContent>
            </Card>
          ) : (
            mockLayaways.map((layaway) => {
              const daysRemaining = getDaysRemaining(layaway.due_date)
              const progress = (layaway.deposit_paid / layaway.total_amount) * 100

              return (
                <Card key={layaway.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <img 
                          src={layaway.product_image} 
                          alt={layaway.product_name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <CardTitle className="text-xl mb-2">
                            {layaway.product_name}
                          </CardTitle>
                          {getStatusBadge(layaway.status, daysRemaining)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progreso de pago</span>
                        <span className="font-semibold">{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <Separator />

                    {/* Payment Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="font-semibold text-lg">{formatMoney(layaway.total_amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Anticipo pagado</p>
                        <p className="font-semibold text-lg text-success">{formatMoney(layaway.deposit_paid)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Saldo pendiente</p>
                        <p className="font-semibold text-lg text-warning">{formatMoney(layaway.remaining_balance)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Días restantes
                        </p>
                        <p className={`font-semibold text-lg ${
                          daysRemaining <= 2 ? 'text-warning' : 'text-success'
                        }`}>
                          {daysRemaining > 0 ? `${daysRemaining} días` : 'Expirado'}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Dates */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Apartado: {new Date(layaway.created_at).toLocaleDateString('es-MX')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Vence: {new Date(layaway.due_date).toLocaleDateString('es-MX')}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <Button 
                        className="flex-1"
                        disabled={daysRemaining <= 0}
                        onClick={() => {
                          // En producción: crear checkout con el saldo pendiente
                          alert('Redirigiendo a completar pago...')
                        }}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Completar Pago
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          if (window.confirm('¿Seguro que deseas cancelar este apartado? Se reembolsará el 50% de tu anticipo.')) {
                            alert('Apartado cancelado')
                          }
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Summary Card */}
        {mockLayaways.length > 0 && (
          <Card className="mt-6 bg-muted/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold">{mockLayaways.length}</p>
                  <p className="text-sm text-muted-foreground">Apartados activos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">
                    {formatMoney(mockLayaways.reduce((sum, l) => sum + l.deposit_paid, 0))}
                  </p>
                  <p className="text-sm text-muted-foreground">Total pagado</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">
                    {formatMoney(mockLayaways.reduce((sum, l) => sum + l.remaining_balance, 0))}
                  </p>
                  <p className="text-sm text-muted-foreground">Total pendiente</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </EcommerceTemplate>
  )
}

export default MyLayaways