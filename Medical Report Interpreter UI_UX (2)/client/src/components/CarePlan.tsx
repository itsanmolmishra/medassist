import { Clock, Calendar, TrendingUp, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';

interface CarePlanProps {
  immediate: string[];
  shortTerm: string[];
  longTerm: string[];
}

export function CarePlan({ immediate, shortTerm, longTerm }: CarePlanProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Your Personalized Care Plan
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Follow these steps to improve your health
        </p>
      </div>

      <Tabs defaultValue="immediate" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-none bg-muted/50">
          <TabsTrigger value="immediate" className="gap-2">
            <Clock className="w-4 h-4" />
            Next 24 Hours
          </TabsTrigger>
          <TabsTrigger value="short" className="gap-2">
            <Calendar className="w-4 h-4" />
            This Week
          </TabsTrigger>
          <TabsTrigger value="long" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Long-term
          </TabsTrigger>
        </TabsList>

        <TabsContent value="immediate" className="p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-1 rounded-full bg-destructive animate-pulse" />
              <span className="text-sm font-medium text-destructive">Urgent Actions</span>
            </div>
            {immediate.map((item, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-destructive bg-destructive/5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="short" className="p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-1 rounded-full bg-warning" />
              <span className="text-sm font-medium text-warning">Weekly Goals</span>
            </div>
            {shortTerm.map((item, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-warning bg-warning/5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="long" className="p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-sm font-medium text-accent">Lifestyle Changes</span>
            </div>
            {longTerm.map((item, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-accent bg-accent/5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
