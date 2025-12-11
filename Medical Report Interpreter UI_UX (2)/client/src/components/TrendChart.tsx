import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendData {
  date: string;
  value: number;
}

interface TrendChartProps {
  title: string;
  data: TrendData[];
  normalRange: { min: number; max: number };
  unit: string;
  currentValue: number;
}

export function TrendChart({ title, data, normalRange, unit, currentValue }: TrendChartProps) {
  const firstValue = data[0]?.value || currentValue;
  const lastValue = data[data.length - 1]?.value || currentValue;
  const percentChange = ((lastValue - firstValue) / firstValue) * 100;
  const isImproving = 
    (currentValue > normalRange.max && percentChange < 0) || 
    (currentValue < normalRange.min && percentChange > 0) ||
    (currentValue >= normalRange.min && currentValue <= normalRange.max);

  const getTrendIcon = () => {
    if (Math.abs(percentChange) < 1) return Minus;
    return percentChange > 0 ? TrendingUp : TrendingDown;
  };

  const TrendIcon = getTrendIcon();
  const trendColor = isImproving ? 'text-accent' : 'text-warning';

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">Last 6 readings</p>
        </div>
        <div className={`flex items-center gap-1 ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            domain={[
              Math.min(normalRange.min * 0.8, ...data.map(d => d.value)),
              Math.max(normalRange.max * 1.2, ...data.map(d => d.value))
            ]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [`${value} ${unit}`, title]}
          />
          {/* Normal range reference lines */}
          <ReferenceLine 
            y={normalRange.max} 
            stroke="hsl(var(--accent))" 
            strokeDasharray="3 3"
            label={{ value: 'Max Normal', position: 'right', fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <ReferenceLine 
            y={normalRange.min} 
            stroke="hsl(var(--accent))" 
            strokeDasharray="3 3"
            label={{ value: 'Min Normal', position: 'right', fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">Normal Range</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Your Values</span>
          </div>
        </div>
        <div className="text-muted-foreground">
          Current: <span className="font-semibold text-foreground">{currentValue} {unit}</span>
        </div>
      </div>
    </div>
  );
}
