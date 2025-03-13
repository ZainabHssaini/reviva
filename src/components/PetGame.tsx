
import { useState } from 'react';
import { Heart, Fish, Coffee, Gift, Star, ThumbsUp, X, Check, Award } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PetGame = () => {
  const [happiness, setHappiness] = useState(70);
  const [hunger, setHunger] = useState(60);
  const [energy, setEnergy] = useState(80);
  const [points, setPoints] = useState(120);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<{name: string, cost: number} | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{name: string, points: number} | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);
  
  const { toast } = useToast();
  
  const feed = () => {
    if (hunger < 100) {
      setHunger(prev => Math.min(prev + 20, 100));
      setHappiness(prev => Math.min(prev + 5, 100));
      setPoints(prev => prev + 5);
      
      toast({
        title: "Pet Fed!",
        description: "+5 points for feeding your pet!",
      });
    }
  };
  
  const play = () => {
    if (energy > 20) {
      setHappiness(prev => Math.min(prev + 15, 100));
      setEnergy(prev => Math.max(prev - 10, 0));
      setHunger(prev => Math.max(prev - 5, 0));
      setPoints(prev => prev + 10);
      
      toast({
        title: "Play Time!",
        description: "+10 points for playing with your pet!",
      });
    }
  };
  
  const rest = () => {
    setEnergy(prev => Math.min(prev + 30, 100));
    setPoints(prev => prev + 5);
    
    toast({
      title: "Rest Time!",
      description: "+5 points for letting your pet rest!",
    });
  };
  
  const rewards = [
    { name: "10% Therapy Discount", cost: 200 },
    { name: "Premium Cat Costume", cost: 150 },
    { name: "Free Guided Meditation", cost: 100 }
  ];
  
  const tasks = [
    { name: "5-Minute Meditation", points: 15 },
    { name: "Gratitude Journal", points: 20 },
    { name: "Deep Breathing", points: 10 },
    { name: "Mood Check-in", points: 15 }
  ];
  
  const handleRedeemClick = (reward: {name: string, cost: number}) => {
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };
  
  const confirmRedemption = () => {
    if (selectedReward && points >= selectedReward.cost) {
      setPoints(prev => prev - selectedReward.cost);
      setRedeemedRewards(prev => [...prev, selectedReward.name]);
      
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${selectedReward.name}`,
      });
    } else {
      toast({
        title: "Not Enough Points",
        description: "You don't have enough points to redeem this reward",
        variant: "destructive",
      });
    }
    setShowRedeemModal(false);
    setSelectedReward(null);
  };
  
  const handleTaskClick = (task: {name: string, points: number}) => {
    if (completedTasks.includes(task.name)) {
      toast({
        title: "Task Already Completed",
        description: "You've already completed this task today",
        variant: "destructive",
      });
      return;
    }
    setSelectedTask(task);
    setShowTaskModal(true);
  };
  
  const confirmTaskCompletion = () => {
    if (selectedTask) {
      setPoints(prev => prev + selectedTask.points);
      setCompletedTasks(prev => [...prev, selectedTask.name]);
      setHappiness(prev => Math.min(prev + 5, 100));
      
      toast({
        title: "Task Completed!",
        description: `You've earned ${selectedTask.points} points for completing ${selectedTask.name}`,
      });
    }
    setShowTaskModal(false);
    setSelectedTask(null);
  };
  
  const cancelTaskModal = () => {
    setShowTaskModal(false);
    setSelectedTask(null);
  };
  
  const cancelRedeemModal = () => {
    setShowRedeemModal(false);
    setSelectedReward(null);
  };

  return (
    <section id="pet-game" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">
            Meet Your Virtual Companion
          </h2>
          <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
            Care for your virtual pet while building healthy mental health habits and earning rewards.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="glass-card dark:glass-card-dark rounded-2xl p-6 animate-scale-in order-2 md:order-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-reviva-deep-teal">Pet Stats</h3>
              <div className="flex items-center">
                <Gift className="h-5 w-5 text-reviva-teal mr-1" />
                <span className="font-medium">{points} points</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm flex items-center">
                    <Heart className="h-4 w-4 text-pink-500 mr-1" /> Happiness
                  </span>
                  <span className="text-sm font-medium">{happiness}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-pink-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${happiness}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm flex items-center">
                    <Fish className="h-4 w-4 text-orange-500 mr-1" /> Hunger
                  </span>
                  <span className="text-sm font-medium">{hunger}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-orange-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${hunger}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm flex items-center">
                    <Coffee className="h-4 w-4 text-blue-500 mr-1" /> Energy
                  </span>
                  <span className="text-sm font-medium">{energy}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${energy}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={feed}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors
                          ${hunger >= 100 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800' 
                          : 'bg-orange-100 text-orange-600 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300'}`}
                disabled={hunger >= 100}
              >
                <Fish className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">Feed</span>
              </button>
              
              <button 
                onClick={play}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors
                          ${energy <= 20
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800' 
                          : 'bg-pink-100 text-pink-600 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300'}`}
                disabled={energy <= 20}
              >
                <Heart className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">Play</span>
              </button>
              
              <button 
                onClick={rest}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors dark:bg-blue-900/30 dark:text-blue-300"
              >
                <Coffee className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">Rest</span>
              </button>
            </div>
          </div>
          
          <div className="relative animate-float order-1 md:order-2">
            <div className="absolute inset-0 bg-gradient-to-r from-reviva-mint/30 to-reviva-beige/30 rounded-full blur-3xl"></div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=400&ixlib=rb-4.0.3"
                alt="Virtual Cat Pet" 
                className="rounded-2xl border-4 border-white dark:border-reviva-purple/20 shadow-lg animate-pulse-gentle"
              />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-reviva-charcoal px-4 py-2 rounded-full shadow-lg">
                <p className="font-medium text-reviva-teal">Whiskers</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-xl font-medium text-reviva-deep-teal mb-4 text-center">
            Daily Mental Health Challenges
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {tasks.map((task, index) => (
              <div key={index} className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-reviva-mint/30 rounded-full">
                    <ThumbsUp className="h-5 w-5 text-reviva-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-reviva-deep-teal">{task.name}</h3>
                    <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-2">
                      Complete this task to earn points
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-reviva-teal">+{task.points} points</span>
                      {completedTasks.includes(task.name) ? (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full flex items-center gap-1">
                          <Check className="h-3 w-3" /> Completed
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleTaskClick(task)}
                          className="text-xs px-2 py-1 bg-reviva-mint/30 text-reviva-deep-teal rounded-full hover:bg-reviva-mint/50 transition-colors"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-medium text-reviva-deep-teal mb-4">
            Rewards Shop
          </h3>
          <p className="text-reviva-charcoal/80 dark:text-white/80 mb-8">
            Earn points by taking care of your pet and complete daily mental health tasks
          </p>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {rewards.map((reward, index) => (
              <div key={index} className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-medium text-reviva-deep-teal">{reward.name}</h3>
                <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-3">
                  Redeem this reward using your points
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-reviva-teal">{reward.cost} points</span>
                  {redeemedRewards.includes(reward.name) ? (
                    <span className="text-xs px-3 py-1.5 bg-green-100 text-green-600 rounded-full flex items-center gap-1">
                      <Check className="h-3 w-3" /> Redeemed
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleRedeemClick(reward)}
                      className={`text-xs px-3 py-1.5 rounded-full ${
                        points >= reward.cost 
                          ? 'bg-reviva-teal text-white hover:bg-reviva-teal/80'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700'
                      }`}
                      disabled={points < reward.cost}
                    >
                      Redeem
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Redeem Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-reviva-charcoal rounded-xl p-6 shadow-2xl max-w-md w-full mx-4 animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-reviva-deep-teal">Confirm Redemption</h3>
              <button 
                onClick={cancelRedeemModal}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              
              <h4 className="text-lg font-medium text-center mb-2">{selectedReward.name}</h4>
              <p className="text-center text-reviva-charcoal/80 dark:text-white/80 mb-4">
                You are about to redeem this reward for {selectedReward.cost} points.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-sm mb-4">
                <Gift className="h-4 w-4 text-reviva-teal" />
                <span>Your current balance: <strong>{points} points</strong></span>
              </div>
              
              {points < selectedReward.cost && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-sm text-red-700 dark:text-red-300 text-center mb-4">
                  You don't have enough points to redeem this reward.
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={cancelRedeemModal}
                className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRedemption}
                disabled={points < selectedReward.cost}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  points >= selectedReward.cost
                    ? 'bg-reviva-teal text-white hover:bg-reviva-teal/80'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700'
                }`}
              >
                <Check className="h-4 w-4" />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Task Completion Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-reviva-charcoal rounded-xl p-6 shadow-2xl max-w-md w-full mx-4 animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-reviva-deep-teal">Complete Task</h3>
              <button 
                onClick={cancelTaskModal}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              
              <h4 className="text-lg font-medium text-center mb-2">{selectedTask.name}</h4>
              <p className="text-center text-reviva-charcoal/80 dark:text-white/80 mb-4">
                Confirm that you have completed this task to earn {selectedTask.points} points.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-sm mb-4">
                <Gift className="h-4 w-4 text-reviva-teal" />
                <span>Your current balance: <strong>{points} points</strong></span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={cancelTaskModal}
                className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmTaskCompletion}
                className="flex-1 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" />
                Complete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PetGame;
