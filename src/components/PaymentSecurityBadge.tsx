import { Shield, Zap, Lock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const PaymentSecurityBadge = () => {
  return (
    <Card className="border-success/20 bg-success/5">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="bg-success/10 p-2 rounded-full">
            <Shield className="h-5 w-5 text-success" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">Pagos en Tiempo Real</span>
              <div className="flex items-center gap-1 text-success">
                <Zap className="h-3 w-3 fill-current" />
                <span className="text-xs font-medium">Instantáneo</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Procesamiento inmediato y confirmación en segundos
            </p>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-success/10 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-success" />
            <span className="text-xs text-muted-foreground">Encriptado SSL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-success" />
            <span className="text-xs text-muted-foreground">PCI DSS</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}