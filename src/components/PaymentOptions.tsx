import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Calendar, Wallet, Info } from 'lucide-react'
import { useSettings } from '@/contexts/SettingsContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator'

interface PaymentOptionsProps {
  price: number
  onSelectPaymentMethod: (method: 'full' | 'layaway' | 'credit') => void
}

export const PaymentOptions = ({ price, onSelectPaymentMethod }: PaymentOptionsProps) => {
  const { formatMoney } = useSettings()
  const [selectedMethod, setSelectedMethod] = useState<'full' | 'layaway' | 'credit'>('full')
  
  const layawayDeposit = price * 0.1 // 10% inicial
  const layawayBalance = price - layawayDeposit
  const creditMonthly = price / 3 // 3 meses ejemplo

  const handleSelect = (method: 'full' | 'layaway' | 'credit') => {
    setSelectedMethod(method)
    onSelectPaymentMethod(method)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Opciones de Pago</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Info className="h-4 w-4 mr-2" />
              Info
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Cómo funcionan los pagos?</DialogTitle>
              <DialogDescription className="space-y-4 pt-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Wallet className="h-4 w-4 mr-2" />
                    Pago Completo
                  </h4>
                  <p className="text-sm">Paga el total ahora y recibe tu producto de inmediato.</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Apartado (10%)
                  </h4>
                  <p className="text-sm">
                    • Paga solo el 10% para apartar tu producto<br />
                    • Tienes 7 días para completar el pago<br />
                    • El producto se reserva exclusivamente para ti<br />
                    • Si no completas el pago, recuperas el 50% del anticipo
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pago a Crédito
                  </h4>
                  <p className="text-sm">
                    • Divide tu pago en 3 meses sin intereses<br />
                    • Pago mensual fijo<br />
                    • Sin comisiones ocultas<br />
                    • Aprobación instantánea
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {/* Pago Completo */}
        <Card 
          className={`cursor-pointer transition-all ${
            selectedMethod === 'full' 
              ? 'ring-2 ring-primary shadow-md' 
              : 'hover:border-primary/50'
          }`}
          onClick={() => handleSelect('full')}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedMethod === 'full' 
                      ? 'border-primary bg-primary' 
                      : 'border-muted-foreground'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-primary" />
                    <span className="font-semibold">Pago Completo</span>
                    <Badge variant="secondary" className="text-xs">Recomendado</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Paga ahora y recibe tu producto de inmediato
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{formatMoney(price)}</p>
                <p className="text-xs text-muted-foreground">Total ahora</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Apartado */}
        <Card 
          className={`cursor-pointer transition-all ${
            selectedMethod === 'layaway' 
              ? 'ring-2 ring-warning shadow-md' 
              : 'hover:border-warning/50'
          }`}
          onClick={() => handleSelect('layaway')}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedMethod === 'layaway' 
                      ? 'border-warning bg-warning' 
                      : 'border-muted-foreground'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-warning" />
                    <span className="font-semibold">Apartado</span>
                    <Badge className="text-xs bg-warning text-warning-foreground">10% inicial</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reserva por 7 días con solo el 10%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-warning">{formatMoney(layawayDeposit)}</p>
                <p className="text-xs text-muted-foreground">Hoy</p>
                <p className="text-xs font-medium mt-1">{formatMoney(layawayBalance)} restante</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pago a Crédito */}
        <Card 
          className={`cursor-pointer transition-all ${
            selectedMethod === 'credit' 
              ? 'ring-2 ring-accent shadow-md' 
              : 'hover:border-accent/50'
          }`}
          onClick={() => handleSelect('credit')}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedMethod === 'credit' 
                      ? 'border-accent bg-accent' 
                      : 'border-muted-foreground'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-accent" />
                    <span className="font-semibold">Pago a Crédito</span>
                    <Badge className="text-xs bg-accent text-accent-foreground">Sin intereses</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    3 pagos mensuales sin intereses
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-accent">{formatMoney(creditMonthly)}</p>
                <p className="text-xs text-muted-foreground">Por mes</p>
                <p className="text-xs font-medium mt-1">3 meses • {formatMoney(price)} total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nota de seguridad y tiempo real */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-3 flex items-start gap-2">
        <Info className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-medium text-success mb-1">
            ⚡ Procesamiento en Tiempo Real
          </p>
          <p className="text-xs text-muted-foreground">
            Todos los pagos se procesan instantáneamente con confirmación inmediata. 
            Tu información está protegida con encriptación de nivel bancario mediante Stripe.
          </p>
        </div>
      </div>
    </div>
  )
}