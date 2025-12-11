import { Award, TrendingUp, Target, Star, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from './ui/card';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  earned: boolean;
  progress?: number;
  color: string;
}

const badges: Badge[] = [
  {
    id: '1',
    name: 'First Report',
    description: 'Uploaded your first medical report',
    icon: Star,
    earned: true,
    color: 'text-yellow-500',
  },
  {
    id: '2',
    name: 'Health Tracker',
    description: 'Uploaded 5 reports',
    icon: TrendingUp,
    earned: true,
    progress: 5,
    color: 'text-blue-500',
  },
  {
    id: '3',
    name: 'Improving',
    description: 'Showed improvement in test results',
    icon: Target,
    earned: true,
    color: 'text-green-500',
  },
  {
    id: '4',
    name: 'Consistent',
    description: 'Tracked health for 30 days',
    icon: Award,
    earned: false,
    progress: 65,
    color: 'text-purple-500',
  },
  {
    id: '5',
    name: 'Health Champion',
    description: 'All tests in normal range',
    icon: Zap,
    earned: false,
    progress: 80,
    color: 'text-orange-500',
  },
];

// Function: Badge Glow Effect
function BadgeGlowEffect() {
  return (
    <motion.div
      animate={{
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-2xl blur-xl -z-10"
    />
  );
}

// Function: Floating Particles
function FloatingParticles() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, (i - 1) * 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut"
          }}
          className="absolute top-0 left-1/2 w-1 h-1 bg-yellow-400 rounded-full -z-10"
          style={{ transform: `translateX(-50%)` }}
        />
      ))}
    </>
  );
}

// Function: Animated Border Glow
function AnimatedBorderGlow() {
  return (
    <motion.div
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-20 blur-sm"
      style={{ zIndex: -1 }}
    />
  );
}

// Function: Badge Icon with Animation
function BadgeIcon({ icon: Icon, color }: { icon: any; color: string }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        rotate: [0, 15, -15, 0],
        y: [0, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut"
      }}
      whileHover={{
        rotate: [0, 360],
        scale: 1.4,
        transition: { duration: 0.8 }
      }}
      className={`${color} drop-shadow-lg filter relative`}
    >
      <Icon className="w-8 h-8" />
      
      {/* Icon glow */}
      <motion.div
        animate={{
          opacity: [0, 0.6, 0],
          scale: [0.8, 1.5, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute inset-0 ${color} blur-md -z-10`}
      />
    </motion.div>
  );
}

// Function: Progress Bar
function ProgressBar({ progress, index }: { progress: number; index: number }) {
  return (
    <div className="w-full bg-border rounded-full h-1.5 relative overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
        className="bg-gradient-to-r from-primary to-accent h-full rounded-full relative"
      >
        {/* Progress shine */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
      </motion.div>
    </div>
  );
}

// Function: Badge Tooltip
function BadgeTooltip({ description }: { description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      whileHover={{ opacity: 1, y: 0, scale: 1 }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
    >
      {description}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground" />
    </motion.div>
  );
}

// Function: Horizontal Shine Effect
function HorizontalShineEffect() {
  return (
    <motion.div
      animate={{
        x: ['-100%', '200%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatDelay: 5,
        ease: "easeInOut"
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl"
      style={{ pointerEvents: 'none' }}
    />
  );
}

// Function: Diagonal Shine Effect
function DiagonalShineEffect() {
  return (
    <motion.div
      animate={{
        x: ['-150%', '250%'],
        y: ['-150%', '250%'],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatDelay: 6,
        ease: "easeInOut",
        delay: 1
      }}
      className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-300/20 to-transparent rounded-2xl"
      style={{ pointerEvents: 'none' }}
    />
  );
}

// Function: Click Ripple Effect
function ClickRippleEffect() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 1 }}
      whileTap={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 rounded-2xl bg-primary/20"
      style={{ pointerEvents: 'none' }}
    />
  );
}

// Function: Badge Title
function BadgeTitle({ name }: { name: string }) {
  return (
    <motion.p
      whileHover={{ scale: 1.05 }}
      className="text-xs font-semibold text-foreground mb-1"
    >
      {name}
    </motion.p>
  );
}

// Function: Progress Area (with or without progress)
function ProgressArea({ hasProgress, progress, index }: { hasProgress: boolean; progress?: number; index: number }) {
  return (
    <div className="w-full h-[22px] mt-2 flex items-center justify-center">
      {hasProgress && progress ? (
        <ProgressBar progress={progress} index={index} />
      ) : (
        <div className="h-1.5" />
      )}
    </div>
  );
}

// Function: Header with rotating icon
function GamificationHeader({ earnedCount, totalCount }: { earnedCount: number; totalCount: number }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
        <p className="text-sm text-muted-foreground">
          {earnedCount} of {totalCount} unlocked
        </p>
      </div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="p-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
      >
        <Award className="w-6 h-6" />
      </motion.div>
    </div>
  );
}

// Function: Single Badge Card
function BadgeCard({ badge, index }: { badge: Badge; index: number }) {
  return (
    <motion.div
      key={badge.id}
      initial={{ opacity: 0, scale: 0.3, rotate: -360, y: 50 }}
      animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
      transition={{ 
        delay: index * 0.15,
        type: "spring",
        stiffness: 150,
        damping: 12
      }}
      whileHover={{ 
        scale: 1.15,
        rotate: [0, -8, 8, -8, 0],
        rotateY: 15,
        z: 50,
        transition: { duration: 0.6, type: "spring" }
      }}
      whileTap={{ 
        scale: 0.95,
        rotate: -5,
        transition: { duration: 0.1 }
      }}
      className="relative group perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <BadgeGlowEffect />
      <FloatingParticles />

      <div className="p-6 rounded-2xl border-2 transition-all relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border-primary/50 shadow-lg h-full min-h-[140px] flex flex-col">
        <AnimatedBorderGlow />

        <div className="flex flex-col items-center text-center gap-3 flex-1 justify-center">
          <BadgeIcon icon={badge.icon} color={badge.color} />
          
          <div className="w-full">
            <BadgeTitle name={badge.name} />
            <ProgressArea 
              hasProgress={!badge.earned && !!badge.progress} 
              progress={badge.progress} 
              index={index} 
            />
          </div>
        </div>

        <BadgeTooltip description={badge.description} />
        <HorizontalShineEffect />
        <DiagonalShineEffect />
        <ClickRippleEffect />
      </div>
    </motion.div>
  );
}

// Main Component
export function GamificationBadge() {
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <Card className="p-6">
      <GamificationHeader earnedCount={earnedCount} totalCount={badges.length} />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {badges.map((badge, index) => (
          <BadgeCard key={badge.id} badge={badge} index={index} />
        ))}
      </div>
    </Card>
  );
}