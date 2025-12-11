import { ArrowUp, ArrowDown, Minus, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { StatusBadge } from './StatusBadge';

interface ComparisonData {
  parameter: string;
  oldValue: number;
  newValue: number;
  unit: string;
  normalRange: string;
  oldStatus: 'normal' | 'attention' | 'critical';
  newStatus: 'normal' | 'attention' | 'critical';
}

interface ComparisonViewProps {
  oldDate: string;
  newDate: string;
  data: ComparisonData[];
}

export function ComparisonView({ oldDate, newDate, data }: ComparisonViewProps) {
  const getTrendIndicator = (oldVal: number, newVal: number) => {
    const change = ((newVal - oldVal) / oldVal) * 100;
    if (Math.abs(change) < 1) {
      return {
        icon: Minus,
        color: 'text-muted-foreground',
        text: 'No change',
        value: '0%'
      };
    }
    if (change > 0) {
      return {
        icon: ArrowUp,
        color: 'text-destructive',
        text: 'Increased',
        value: `+${change.toFixed(1)}%`
      };
    }
    return {
      icon: ArrowDown,
      color: 'text-accent',
      text: 'Decreased',
      value: `${change.toFixed(1)}%`
    };
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="bg-muted/50 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Previous: {oldDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Current: {newDate}</span>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Test Name</TableHead>
            <TableHead className="font-semibold">Previous</TableHead>
            <TableHead className="font-semibold">Current</TableHead>
            <TableHead className="font-semibold">Change</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            const trend = getTrendIndicator(item.oldValue, item.newValue);
            const TrendIcon = trend.icon;
            
            return (
              <TableRow key={index} className="hover:bg-muted/30">
                <TableCell className="font-medium">{item.parameter}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.oldValue} {item.unit}</span>
                    <span className="text-xs text-muted-foreground">Normal: {item.normalRange}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.newValue} {item.unit}</span>
                    <span className="text-xs text-muted-foreground">Normal: {item.normalRange}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`flex items-center gap-1 ${trend.color}`}>
                    <TrendIcon className="w-4 h-4" />
                    <span className="font-semibold text-sm">{trend.value}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Was:</span>
                      <StatusBadge status={item.oldStatus} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Now:</span>
                      <StatusBadge status={item.newStatus} />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
