import { useState, useEffect } from 'react';
import { Heart, Fish, Coffee, Gift, Star, Crown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';


const PetGame = () => {
  const { toast } = useToast();
  const [petName, setPetName] = useState("Whiskers");
  const [happiness, setHappiness] = useState(70);
  const [hunger, setHunger] = useState(60);
  const [energy, setEnergy] = useState(80);
  const [points, setPoints] = useState(120);
  const [level, setLevel] = useState(1);
  const [animation, setAnimation] = useState("");
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [id, setId] = useState(null);
  
  // Randomize pet image positions for more lively pet
  const [petPosition, setPetPosition] = useState({ x: 0, y: 0 });

  const sendPetData = async () => {
    const petData = {
      id,
      name: petName,
      pictureURL: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=400&ixlib=rb-4.0.3",
      happiness,
      energy,
      hunger,
      level,
      experience: points,
    };
    
    try {
      if(petData.id == null) {
        await axios.post("http://localhost:8082/pets/new", petData)
        .then((response) => {
          console.log(response.data);
          setId(response.data.id);

        });
        console.log("Pet data sent successfully");
      }
      else {
        await axios.put(`http://localhost:8082/pets/update/${petData.id}`, petData).then((response) => {
          console.log(response.data);
        });
        console.log("Pet data updated successfully");
      }
    } catch (error) {
      console.error("Error sending pet data", error);
    }
  };
  
  
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
      sendPetData();
      
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
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-medium text-reviva-deep-teal">{petName}'s Stats</h3>
                <button 
                  onClick={() => {
                    const newName = prompt("Enter a new name for your pet", petName);
                    if (newName) setPetName(newName);
                  }}
                  className="text-xs px-2 py-1 bg-reviva-mint/50 text-reviva-deep-teal rounded-full transition-all hover:bg-reviva-mint/70 hover:scale-105 active:scale-95"
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
                <div className="w-40 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-reviva-teal h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${(points / (level * 100)) * 100}%` }}
                  ></div>
                </div>
                <button 
                  onClick={levelUp}
                  disabled={points < level * 100}
                  className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                    points >= level * 100
                      ? 'bg-reviva-teal text-white hover:bg-reviva-teal/90 hover:scale-105 active:scale-95'
                      : 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                  }`}
                >
                  Level Up
                </button>
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
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
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
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
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
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
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
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300
                          ${hunger >= 100 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800' 
                          : 'bg-orange-100 text-orange-600 hover:bg-orange-200 hover:scale-105 active:scale-95 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/50'}`}
                disabled={hunger >= 100}
              >
                <Fish className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">Feed</span>
              </button>
              
              <button 
                onClick={play}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300
                          ${energy <= 20
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800' 
                          : 'bg-pink-100 text-pink-600 hover:bg-pink-200 hover:scale-105 active:scale-95 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/50'}`}
                disabled={energy <= 20}
              >
                <Heart className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">Play</span>
              </button>
              
              <button 
                onClick={rest}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300 hover:scale-105 active:scale-95 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
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
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=400&ixlib=rb-4.0.3"
                  alt="Virtual Cat Pet" 
                  className={`rounded-2xl border-4 border-white dark:border-reviva-purple/20 shadow-lg w-full max-w-md mx-auto transition-all duration-300
                            ${animation === "playing" ? "animate-bounce" : ""} 
                            ${animation === "eating" ? "animate-pulse" : ""} 
                            ${animation === "sleeping" ? "opacity-70" : ""}`}
                  loading="lazy"
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
                
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-reviva-charcoal px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
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
        
        <div className="mt-12 text-center">
          <p className="text-reviva-charcoal/80 dark:text-white/80 mb-4">
            Earn points by taking care of your pet and complete daily mental health tasks
          </p>
          <button 
            onClick={() => {
              toast({
                title: "Coming Soon!",
                description: "The rewards shop will be available in the next update.",
              });
            }}
            className="reviva-button animate-scale-in hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Redeem Rewards
          </button>
        </div>
      </div>
      
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
              className="reviva-button hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PetGame;