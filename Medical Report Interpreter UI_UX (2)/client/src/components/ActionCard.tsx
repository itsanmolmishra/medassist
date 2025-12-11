import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  items: string[];
  variant?: 'primary' | 'accent' | 'warning' | 'destructive';
}

export function ActionCard({ icon: Icon, title, items, variant = 'primary' }: ActionCardProps) {
  const variantClasses = {
    primary: 'from-primary/10 to-primary/5 border-primary/30 text-primary',
    accent: 'from-accent/10 to-accent/5 border-accent/30 text-accent',
    warning: 'from-warning/10 to-warning/5 border-warning/30 text-warning',
    destructive: 'from-destructive/10 to-destructive/5 border-destructive/30 text-destructive',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`bg-gradient-to-br ${variantClasses[variant]} border rounded-xl p-5 hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          whileHover={{ 
            rotate: [0, -15, 15, -15, 0],
            scale: 1.1
          }}
          transition={{ duration: 0.5 }}
          className="p-2 rounded-lg bg-background/50"
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5, transition: { duration: 0.2 } }}
            className="flex items-start gap-2 text-sm text-foreground/90"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
              className="mt-1 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"
            />
            <span className="flex-1">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}