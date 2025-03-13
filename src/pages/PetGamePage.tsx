import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, Fish, Coffee, Gift, Star, Award, Crown, ThumbsUp, Check, ChevronUp, XCircle, X } from 'lucide-react';
import { usePetGame } from '@/contexts/PetGameContext';

const PetGamePage = () => {
  const { 
    petName, setPetName,
    happiness, hunger, energy,
    points, level, streak,
    animation, challenges, completeChallenge,
    rewards, redeemReward, feed, play, rest,
    levelUp, showLevelUp, setShowLevelUp,
    petPosition
  } = usePetGame();
  
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const handleChallengeClick = (id: string) => {
    const challenge = challenges.find(c => c.id === id);
    if (challenge && !challenge.completed) {
      setSelectedChallenge(id);
      setShowChallengeModal(true);
    }
  };

  const handleRewardClick = (id: string) => {
    const reward = rewards.find(r => r.id === id);
    if (reward) {
      setSelectedReward(id);
      setShowRewardModal(true);
    }
  };

  const confirmChallengeCompletion = () => {
    if (selectedChallenge) {
      completeChallenge(selectedChallenge);
      setShowChallengeModal(false);
      setSelectedChallenge(null);
    }
  };

  const confirmRewardRedemption = () => {
    if (selectedReward) {
      redeemReward(selectedReward);
      setShowRewardModal(false);
      setSelectedReward(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-reviva-charcoal">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center p-2 bg-reviva-mint/30 rounded-full mb-4">
              <Heart className="h-6 w-6 text-reviva-teal" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-reviva-purple mb-4">
              My Lovely Cat
            </h1>
            <p className="text-lg text-reviva-charcoal/80 dark:text-white/80 max-w-3xl mx-auto">
              Care for your virtual pet while building healthy mental health habits and earning rewards.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div className="glass-card dark:glass-card-dark rounded-2xl p-6 animate-scale-in order-2 md:order-1">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-medium text-reviva-deep-teal">{petName}'s Stats</h3>
                  <button 
                    onClick={() => {
                      const newName = prompt("Enter a new name for your pet", petName);
                      if (newName) setPetName(newName);
                    }}
                    className="text-xs px-2 py-1 bg-reviva-mint/50 text-reviva-deep-teal rounded-full"
                  >
                    Rename
                  </button>
                </div>
                <div className="flex items-center">
                  <Gift className="h-5 w-5 text-reviva-teal mr-1" />
                  <span className="font-medium">{points} points</span>
                </div>
              </div>
              
              <div className="mb-4 p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-reviva-mint/50 rounded-full mr-2">
                    <Crown className="h-4 w-4 text-reviva-teal" />
                  </div>
                  <span>Level {level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-reviva-teal h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(points / (level * 100)) * 100}%` }}
                    ></div>
                  </div>
                  <button 
                    onClick={levelUp}
                    disabled={points < level * 100}
                    className={`text-xs px-2 py-1 rounded-full ${
                      points >= level * 100
                        ? 'bg-reviva-teal text-white'
                        : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                    }`}
                  >
                    Level Up
                  </button>
                </div>
              </div>
              
              <div className="mb-3 p-3 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-lg flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-reviva-teal" />
                <span className="text-sm">Daily Streak: {streak} days</span>
                <div className="flex items-center gap-1 ml-auto">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div 
                      key={day}
                      className={`w-3 h-3 rounded-full ${
                        day <= streak 
                          ? 'bg-reviva-teal' 
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    ></div>
                  ))}
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
              <div 
                className="relative transition-all duration-300"
                style={{ 
                  transform: `translate(${petPosition.x}px, ${petPosition.y}px)`,
                }}
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1582562124811-c09040d0a901"
                    alt="Virtual Cat Pet" 
                    className={`rounded-2xl border-4 border-white dark:border-reviva-purple/20 shadow-lg w-full max-w-md mx-auto
                              ${animation === "playing" && "animate-bounce"} 
                              ${animation === "eating" && "animate-pulse"} 
                              ${animation === "sleeping" && "opacity-70"}`}
                  />
                  
                  {animation === "eating" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="text-4xl animate-scale-in">🍣</div>
                    </div>
                  )}
                  
                  {animation === "sleeping" && (
                    <div className="absolute top-1/3 right-1/4">
                      <div className="text-4xl animate-float">💤</div>
                    </div>
                  )}
                  
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-reviva-charcoal px-4 py-2 rounded-full shadow-lg">
                    <p className="font-medium text-reviva-teal flex items-center">
                      {petName}
                      <span className="ml-2 bg-reviva-mint/50 text-reviva-deep-teal text-xs px-2 py-0.5 rounded-full">
                        Lvl {level}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-reviva-purple mb-6 text-center">
              Daily Mental Health Challenges
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 ${challenge.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-reviva-mint/30'} rounded-full`}>
                      {challenge.completed ? (
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-reviva-teal" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-reviva-deep-teal">{challenge.title}</h3>
                      <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-2">
                        {challenge.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-reviva-teal">+{challenge.points} points</span>
                        {challenge.completed ? (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                            Completed
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleChallengeClick(challenge.id)}
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
          
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-reviva-purple mb-4">
              Rewards Shop
            </h2>
            <p className="text-reviva-charcoal/80 dark:text-white/80 mb-8 max-w-2xl mx-auto">
              Earn points by taking care of your pet and completing daily mental health tasks
            </p>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="glass-card dark:glass-card-dark p-4 rounded-xl animate-scale-in">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    {reward.icon === 'Star' && <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />}
                    {reward.icon === 'Award' && <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
                    {reward.icon === 'Gift' && <Gift className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
                  </div>
                  <h3 className="font-medium text-reviva-deep-teal">{reward.title}</h3>
                  <p className="text-sm text-reviva-charcoal/80 dark:text-white/80 mb-3">
                    {reward.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-reviva-teal">{reward.points} points</span>
                    <button 
                      onClick={() => handleRewardClick(reward.id)}
                      className={`text-xs px-3 py-1.5 rounded-full ${
                        points >= reward.points 
                          ? 'bg-reviva-teal text-white hover:bg-reviva-teal/80' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700'
                      }`}
                      disabled={points < reward.points}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Challenge Completion Modal */}
      {showChallengeModal && selectedChallenge && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-reviva-charcoal rounded-xl p-6 shadow-2xl max-w-md w-full mx-4 animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-reviva-deep-teal">Complete Challenge</h3>
              <button 
                onClick={() => setShowChallengeModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-6">
              {(() => {
                const challenge = challenges.find(c => c.id === selectedChallenge);
                return challenge ? (
                  <>
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    
                    <h4 className="text-lg font-medium text-center mb-2">{challenge.title}</h4>
                    <p className="text-center text-reviva-charcoal/80 dark:text-white/80 mb-4">
                      Confirm that you have completed this challenge to earn {challenge.points} points.
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-sm mb-4">
                      <Gift className="h-4 w-4 text-reviva-teal" />
                      <span>Your current balance: <strong>{points} points</strong></span>
                    </div>
                  </>
                ) : null;
              })()}
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowChallengeModal(false)}
                className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmChallengeCompletion}
                className="flex-1 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" />
                Complete Task
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Reward Redemption Modal */}
      {showRewardModal && selectedReward && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-reviva-charcoal rounded-xl p-6 shadow-2xl max-w-md w-full mx-4 animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-reviva-deep-teal">Confirm Redemption</h3>
              <button 
                onClick={() => setShowRewardModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-6">
              {(() => {
                const reward = rewards.find(r => r.id === selectedReward);
                return reward ? (
                  <>
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      {reward.icon === 'Star' && <Star className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />}
                      {reward.icon === 'Award' && <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
                      {reward.icon === 'Gift' && <Gift className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
                    </div>
                    
                    <h4 className="text-lg font-medium text-center mb-2">{reward.title}</h4>
                    <p className="text-center text-reviva-charcoal/80 dark:text-white/80 mb-4">
                      You are about to redeem this reward for {reward.points} points.
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-sm mb-4">
                      <Gift className="h-4 w-4 text-reviva-teal" />
                      <span>Your current balance: <strong>{points} points</strong></span>
                    </div>
                    
                    {points < reward.points && (
                      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-sm text-red-700 dark:text-red-300 text-center mb-4">
                        You don't have enough points to redeem this reward.
                      </div>
                    )}
                  </>
                ) : null;
              })()}
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowRewardModal(false)}
                className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRewardRedemption}
                disabled={(() => {
                  const reward = rewards.find(r => r.id === selectedReward);
                  return reward ? points < reward.points : true;
                })()}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  (() => {
                    const reward = rewards.find(r => r.id === selectedReward);
                    return reward && points >= reward.points
                      ? 'bg-reviva-teal text-white hover:bg-reviva-teal/80'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700';
                  })()
                }`}
              >
                <Check className="h-4 w-4" />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Level up notification */}
      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-reviva-charcoal rounded-xl p-8 shadow-2xl animate-scale-in max-w-md text-center">
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Crown className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-reviva-purple mb-2">Level Up!</h2>
            <p className="text-lg font-medium text-reviva-teal mb-1">
              {petName} is now level {level}!
            </p>
            <p className="text-reviva-charcoal/80 dark:text-white/80 mb-6">
              Congratulations on reaching the next level!
            </p>
            <button 
              onClick={() => setShowLevelUp(false)}
              className="bg-reviva-teal text-white px-4 py-2 rounded-lg hover:bg-reviva-teal/80 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default PetGamePage;
