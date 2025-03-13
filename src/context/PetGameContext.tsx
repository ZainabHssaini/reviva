import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

type Challenge = {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  type: 'meditation' | 'gratitude' | 'breathing' | 'mood';
  duration?: number; // in seconds
};

type Reward = {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
};

interface PetGameContextType {
  petName: string;
  setPetName: (name: string) => void;
  happiness: number;
  setHappiness: (value: number | ((prev: number) => number)) => void;
  hunger: number;
  setHunger: (value: number | ((prev: number) => number)) => void;
  energy: number;
  setEnergy: (value: number | ((prev: number) => number)) => void;
  points: number;
  setPoints: (value: number | ((prev: number) => number)) => void;
  level: number;
  setLevel: (value: number | ((prev: number) => number)) => void;
  streak: number;
  setStreak: (value: number | ((prev: number) => number)) => void;
  animation: string;
  setAnimation: (value: string) => void;
  challenges: Challenge[];
  completeChallenge: (id: string) => void;
  rewards: Reward[];
  redeemReward: (id: string) => void;
  feed: () => void;
  play: () => void;
  rest: () => void;
  levelUp: () => void;
  showLevelUp: boolean;
  setShowLevelUp: (value: boolean) => void;
  activeChallenge: Challenge | null;
  setActiveChallenge: (challenge: Challenge | null) => void;
  challengeCompleted: boolean;
  setChallengeCompleted: (value: boolean) => void;
  challengeProgress: number;
  setChallengeProgress: (value: number) => void;
  petPosition: { x: number, y: number };
}

export const PetGameContext = createContext<PetGameContextType | null>(null);

export const PetGameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  
  // Pet stats
  const [petName, setPetName] = useState("Whiskers");
  const [happiness, setHappiness] = useState(70);
  const [hunger, setHunger] = useState(60);
  const [energy, setEnergy] = useState(80);
  const [points, setPoints] = useState(120);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(3);
  const [animation, setAnimation] = useState("");
  const [showLevelUp, setShowLevelUp] = useState(false);
  
  // Challenge-related state
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [challengeProgress, setChallengeProgress] = useState(0);
  
  // Pet position
  const [petPosition, setPetPosition] = useState({ x: 0, y: 0 });
  
  // Challenges
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: '5-Minute Meditation',
      description: 'Practice mindfulness for just 5 minutes today',
      points: 15,
      completed: true,
      type: 'meditation',
      duration: 120 // 2 minutes for demo, would be 300 in production
    },
    {
      id: '2',
      title: 'Gratitude Journal',
      description: 'Write down 3 things you\'re grateful for',
      points: 20,
      completed: false,
      type: 'gratitude'
    },
    {
      id: '3',
      title: 'Deep Breathing',
      description: 'Practice deep breathing for 2 minutes',
      points: 10,
      completed: false,
      type: 'breathing',
      duration: 120
    },
    {
      id: '4',
      title: 'Mood Check-in',
      description: 'Track your mood in the mood tracker',
      points: 15,
      completed: false,
      type: 'mood'
    }
  ]);
  
  // Rewards
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      title: '10% Therapy Discount',
      description: 'Get 10% off your next therapy session',
      points: 200,
      icon: 'Star'
    },
    {
      id: '2',
      title: 'Premium Cat Costume',
      description: 'Unlock a special costume for your pet',
      points: 150,
      icon: 'Award'
    },
    {
      id: '3',
      title: 'Free Guided Meditation',
      description: 'Unlock a premium guided meditation',
      points: 100,
      icon: 'Gift'
    }
  ]);
  
  // Pet movement animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setPetPosition({
          x: Math.floor(Math.random() * 40) - 20,
          y: Math.floor(Math.random() * 20) - 10,
        });
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Pet actions
  const feed = () => {
    if (hunger < 100) {
      setHunger(prev => Math.min(prev + 20, 100));
      setHappiness(prev => Math.min(prev + 5, 100));
      setPoints(prev => prev + 5);
      setAnimation("eating");
      
      toast({
        title: "Action completed!",
        description: "+5 points for feeding your pet!",
      });
      
      setTimeout(() => {
        setAnimation("");
      }, 3000);
    }
  };
  
  const play = () => {
    if (energy > 20) {
      setHappiness(prev => Math.min(prev + 15, 100));
      setEnergy(prev => Math.max(prev - 10, 0));
      setHunger(prev => Math.max(prev - 5, 0));
      setPoints(prev => prev + 10);
      setAnimation("playing");
      
      toast({
        title: "Action completed!",
        description: "+10 points for playing with your pet!",
      });
      
      setTimeout(() => {
        setAnimation("");
      }, 3000);
    }
  };
  
  const rest = () => {
    setEnergy(prev => Math.min(prev + 30, 100));
    setPoints(prev => prev + 5);
    setAnimation("sleeping");
    
    toast({
        title: "Action completed!",
        description: "+5 points for letting your pet rest!",
    });
    
    setTimeout(() => {
      setAnimation("");
    }, 3000);
  };
  
  const levelUp = () => {
    if (points >= level * 100) {
      setPoints(prev => prev - level * 100);
      setLevel(prev => prev + 1);
      setShowLevelUp(true);
    }
  };
  
  const completeChallenge = (id: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === id 
          ? { ...challenge, completed: true } 
          : challenge
      )
    );
    
    const challenge = challenges.find(c => c.id === id);
    if (challenge) {
      setPoints(prev => prev + challenge.points);
      
      toast({
        title: "Challenge completed!",
        description: `+${challenge.points} points for completing ${challenge.title}!`,
      });
      
      // Increase happiness as a bonus for completing challenges
      setHappiness(prev => Math.min(prev + 5, 100));
    }
  };
  
  const redeemReward = (id: string) => {
    const reward = rewards.find(r => r.id === id);
    if (reward && points >= reward.points) {
      setPoints(prev => prev - reward.points);
      
      toast({
        title: "Reward redeemed!",
        description: `You've unlocked: ${reward.title}`,
      });
      
      // Happiness bonus for redeeming rewards
      setHappiness(prev => Math.min(prev + 10, 100));
    } else {
      toast({
        title: "Not enough points",
        description: "Keep earning points to redeem this reward!",
        variant: "destructive"
      });
    }
  };
  
  return (
    <PetGameContext.Provider
      value={{
        petName,
        setPetName,
        happiness,
        setHappiness,
        hunger,
        setHunger,
        energy,
        setEnergy,
        points,
        setPoints,
        level,
        setLevel,
        streak,
        setStreak,
        animation,
        setAnimation,
        challenges,
        completeChallenge,
        rewards,
        redeemReward,
        feed,
        play,
        rest,
        levelUp,
        showLevelUp,
        setShowLevelUp,
        activeChallenge,
        setActiveChallenge,
        challengeCompleted,
        setChallengeCompleted,
        challengeProgress,
        setChallengeProgress,
        petPosition,
      }}
    >
      {children}
    </PetGameContext.Provider>
  );
};

export const usePetGame = () => {
  const context = useContext(PetGameContext);
  if (context === undefined || context === null) {
    throw new Error('usePetGame must be used within a PetGameProvider');
  }
  return context;
};
