import { Card, CardContent } from '@/components/ui/card'
import { Droplets, Wind, Shirt, Heart } from 'lucide-react'

/**
 * EDITABLE UI COMPONENT - CareGuide
 * 
 * Care guide section for vintage fashion items with sustainability tips.
 */

export const CareGuide = () => {
  const tips = [
    {
      icon: Droplets,
      title: 'Wash with Care',
      description: 'Cold water & gentle cycle preserve vintage fabrics longer'
    },
    {
      icon: Wind,
      title: 'Air Dry',
      description: 'Skip the dryer - hang dry to maintain shape and quality'
    },
    {
      icon: Shirt,
      title: 'Store Properly',
      description: 'Use padded hangers and breathable garment bags'
    },
    {
      icon: Heart,
      title: 'Love & Repair',
      description: 'Small fixes extend life - embrace imperfections'
    }
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Vintage Care Guide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Keep your pre-loved pieces looking their best with sustainable care practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <tip.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {tip.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tip.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}