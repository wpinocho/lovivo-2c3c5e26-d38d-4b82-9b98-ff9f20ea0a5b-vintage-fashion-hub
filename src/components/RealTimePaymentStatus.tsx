import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react'

interface RealTimePaymentStatusProps {
  status: 'processing' | 'succeeded' | 'failed' | 'pending'
  amount?: number
  currency?: string
  message?: string
}

export const RealTimePaymentStatus = ({ 
  status, 
  amount, 
  currency = 'MXN',
  message 
}: RealTimePaymentStatusProps) => {
  const [dots, setDots] = useState('')

  // Animación de puntos para estado de procesamiento
  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.')
      }, 500)
      return () => clearInterval(interval)
    }
  }, [status])

  const statusConfig = {
    processing: {
      icon: Loader2,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      label: 'Procesando',
      description: `Procesando pago en tiempo real${dots}`
    },
    succeeded: {
      icon: CheckCircle2,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      label: 'Exitoso',
      description: '¡Pago confirmado instantáneamente!'
    },
    failed: {
      icon: AlertCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/20',
      label: 'Fallido',
      description: 'El pago no pudo procesarse'
    },
    pending: {
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      label: 'Pendiente',
      description: 'Esperando confirmación'
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Card className={`${config.borderColor} border-2`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`${config.bgColor} p-3 rounded-full`}>
            <Icon className={`h-6 w-6 ${config.color} ${status === 'processing' ? 'animate-spin' : ''}`} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">Estado del Pago</span>
              <Badge variant="secondary" className={config.color}>
                {config.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {message || config.description}
            </p>
            {amount && (
              <p className="text-lg font-bold mt-2">
                {new Intl.NumberFormat('es-MX', {
                  style: 'currency',
                  currency: currency
                }).format(amount / 100)}
              </p>
            )}
          </div>
        </div>

        {status === 'processing' && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Verificación en tiempo real con tu banco</span>
            </div>
          </div>
        )}

        {status === 'succeeded' && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center gap-2 text-xs text-success">
              <CheckCircle2 className="h-3 w-3" />
              <span>Confirmación instantánea • Procesado por Stripe</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}