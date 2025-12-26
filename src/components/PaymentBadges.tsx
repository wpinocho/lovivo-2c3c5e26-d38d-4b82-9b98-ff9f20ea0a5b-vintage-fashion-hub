import { Badge } from '@/components/ui/badge'
import { Calendar, CreditCard } from 'lucide-react'

interface PaymentBadgesProps {
  price: number
  compact?: boolean
}

export const PaymentBadges = ({ price, compact = false }: PaymentBadgesProps) => {
  const layawayAmount = price * 0.1
  const creditMonthly = price / 3

  if (compact) {
    return (
      <div className="flex gap-1.5">
        <Badge 
          variant="outline" 
          className="text-[10px] px-1.5 py-0 h-5 bg-warning/10 text-warning border-warning/20"
        >
          <Calendar className="h-2.5 w-2.5 mr-0.5" />
          Apartado
        </Badge>
        <Badge 
          variant="outline" 
          className="text-[10px] px-1.5 py-0 h-5 bg-accent/10 text-accent border-accent/20"
        >
          <CreditCard className="h-2.5 w-2.5 mr-0.5" />
          Crédito
        </Badge>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Badge 
        variant="outline" 
        className="text-xs bg-warning/10 text-warning border-warning/20"
      >
        <Calendar className="h-3 w-3 mr-1" />
        Desde ${layawayAmount.toFixed(2)} (Apartado)
      </Badge>
      <Badge 
        variant="outline" 
        className="text-xs bg-accent/10 text-accent border-accent/20"
      >
        <CreditCard className="h-3 w-3 mr-1" />
        ${creditMonthly.toFixed(2)}/mes (Crédito)
      </Badge>
    </div>
  )
}