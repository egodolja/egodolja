import { useState } from "react";
import { TriviaCard } from "@/components/TriviaCard";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Trophy } from "lucide-react";
import romanticBg from "@/assets/romantic-bg.jpg";

// Sample questions - you can customize these with your own memories!
const questions = [
  {
    type: "multipleChoice" as const,
    question: "When did we meet?",
    options: [
      "June 25",
      "June 17",
      "June 20",
      "June 30",
    ],
    correctAnswer: 2,
    sweetNote: "Best day of my life❤️ (thank you, Alyssa!)"
  },
  {
    type: "multipleChoice" as const,
    question: "Where was our first date?",
    options: [
      "Rooftop Reds",
      "Lela Bar",
      "Tiny Cupboard Comedy",
      "Elsewhere",
    ],
    correctAnswer: 1,
    sweetNote: "I love you for not forgetting to reach out to me once you got back from your CA trip"
  },
  {
    type: "reveal" as const,
    question: "What did we drink and eat on our first date?",
    answer: "Wine and burrata.",
    sweetNote: "I love you for deciding to still come on this date even though you don't drink (I ordered wine), are gluten free (I ordered burrata), and don't eat dairy (I ordered burrata!)"
  },
  {
    type: "multipleChoice" as const,
    question: "What was the first 'olive question'?",
    options: [
      "How do you feel about death?",
      "Do you want to get married?",
      "Do you want kids?",
      "Where do you see yourself in 5 years?"
    ],
    correctAnswer: 0,
    sweetNote: "I love you for accepting my random, deep questions 🙈"
  },
  {
    type: "reveal" as const,
    question: "Who made the first move? Describe the moment.",
    answer: "I (Elsi) made the first move at Rooftop Reds. I sat next to you, told you I like you, and asked to kiss you.",
    sweetNote: "I love you for saying yes😘"
  },
  {
    type: "multipleChoice" as const,
    question: "What was our first concert?",
    options: [
      "Banks",
      "Sinead Harnett",
      "Jhene Aiko",
      "Jesse Reyez"
    ],
    correctAnswer: 1,
    sweetNote: "I love you for being my concert buddy, even though sometimes we take a dose-too-much of mushroom gummies at concerts that turn out to be unexpectedly trippy 🙃"
  },
  {
    type: "multipleChoice" as const,
    question: "First song I shared with you.",
    options: [
      "Hush by The Marias",
      "If you let me by Sinead Harnett",
      "Pontoon by Little Big Town",
      "This Hell by Rina Sawayama",
    ],
    correctAnswer: 3,
    sweetNote: "I love you for listening to my song recs, even when you dislike the artist (ahem Fletcher)"
  },
  {
    type: "reveal" as const,
    question: "Where did the term 'droplet' come from?",
    answer: "We were cuddling in bed, slightly high. I was holding you tight, and squeezing you even tighter. The only way my high brain could describe my intense need to be closer to you was to use the metaphor of two water droplets merging into one.",
    sweetNote: "I love you for being the best cuddler in the world 🥹"
  },
  {
    type: "multipleChoice" as const,
    question: "When did I first follow you on Instagram?",
    options: [
      "July 30th",
      "August 14th",
      "July 25th",
      "August 6th",
    ],
    correctAnswer: 0,
    sweetNote: "I love you for accepting my follow💋"
  },
  {
    type: "reveal" as const,
    question: "Describe the story of our first 'I love you's.",
    answer: "We made pinky rings for each other at Ringram. We both engraved phrases in the rings we gifted each other. You engraved 'Dashuria Ime' on mine, and I engraved 'I love you' on yours",
    sweetNote: "Të dua shumë, dashuria ime ❤️"
  },
  {
    type: "reveal" as const,
    question: "[Bonus] Who did I meet after you, but said 'I love you' to before you?",
    answer: "Waymo",
    sweetNote: "I love you for being my one and only true love 💖 (even if it breaks Waymo's heart)"
  },
  {
    type: "multipleChoice" as const,
    question: "Where did we go on our first trip together?",
    options: [
      "Saugerties",
      "Bradenton",
      "San Francisco",
      "Santa Barbara",
    ],
    correctAnswer: 1,
    sweetNote: "I love traveling anywhere with you ✈️"
  },
  {
    type: "reveal" as const,
    question: "Describe the elaborate meal we whipped up together on our first trip.",
    answer: "Burgers grilled on the BBQ on gluten free buns with all the fixings, sweet potato fries, and a kale salad with apples and almonds. This was accompanied by a side of charcuterie, and dirty martinis.",
    sweetNote: "I love how well we cook together 👩‍🍳👨‍🍳"
  },
  {
    type: "multipleChoice" as const,
    question: "What did we make for our first family night dinner?",
    options: [
      "Build your own tacos",
      "Sushi",
      "Risotto with scallops",
      "Build your own pizza",
    ],
    correctAnswer: 3,
    sweetNote: "I love how well you get along with my family, and I love how much they love you❤️"
  },
  {
    type: "reveal" as const,
    question: "Describe the meal we made at Saugerties that triggered the smoke alarm (and made my baby shake ☹️).",
    answer: "(I actually don't remember, I'm hoping you'll know the answer 🙈)",
    sweetNote: "I love that we've become experts at handling smoke alarms together, specifically between the hours of 1am and 3am 🔥"
  },
  {
    type: "reveal" as const,
    question: "Which of your friends did I meet in San Francisco?",
    answer: "Genna and Dan, Elyh, Taylor, Robyn, Ross, Sam, Etelle",
    sweetNote: "I love what an amazing friend you are ❤️"
  },
  {
    type: "reveal" as const,
    question: "You performed a witchy ritual in Santa Barbara. What did this ritual entail?",
    answer: "Mix together vodka, syrup (agave), and honey. Take mixture to closest body of running water, and slowly pour it in ✨",
    sweetNote: "I love your witchy ways 🔮"
  },
  {
    type: "multipleChoice" as const,
    question: "What did we make for our first Valentine's Day dinner?",
    options: [
      "Steak with a side of asparagus and caprese salad.",
      "Gluten free mushroom pizza",
      "Filet Mignon with a side of arugula salad with berries, goat cheese, and blueberry",
      "Grilled cheese sandwiches with tomato soup",
    ],
    correctAnswer: 2,
    sweetNote: "I love celebrating love with you 💘 especially when it includes eating a not fully cooked filet mignon after it splatted on the floor next to the grill"
  },
  {
    type: "reveal" as const,
    question: "We got stranded in this city during a layover.",
    answer: "Dallas, TX",
    sweetNote: "I love the way we turn inconveniences into adventures 🛫"
  },
  {
    type: "reveal" as const,
    question: "Where did we have dinner for the first official meeting with your parents?",
    answer: "Palma 💕",
    sweetNote: "I love your parents, and I love how much they love you ❤️"
  },
  {
    type: "multipleChoice" as const,
    question: "What was the first wedding we attended as a couple?",
    options: [
      "Chloe + Keetu",
      "Sophie + Joe",
      "Miranda + Andreas",
      "Vani + Sean",
    ],
    correctAnswer: 0,
    sweetNote: "I love celebrating our friends' love with you 💞"
  },
  {
    type: "reveal" as const,
    question: "Our favorite food for when we go picnic in Fort Greene Park",
    answer: "Gluten free mushroom pizza from Saraghina.",
    sweetNote: "I love our picnic dates🧺, and I love how much you love earth, my beautiful capricorn baby 🌿"
  },
  {
    type: "reveal" as const,
    question: "List out the items on the menu from our Albanian night dinner",
    answer: "Village salad, fërgesë, watermelon & feta salad, traditional byrek, girlfriend (gf) byrek, bakllava, ice cream.",
    sweetNote: "I love hosting with you 🍽️"
  },
  {
    type: "reveal" as const,
    question: "Describe our first home improvement project together",
    answer: "Your bedroom! We got rid of the squeaky bed which was no match for WD40, scrubbed the glossy used-to-be-a-door part of your wall, painted the room a beautiful blue, and installed a brand new, sturdy bed.",
    sweetNote: "I love how well we work on projects together 🛠️"
  },
  {
    type: "multipleChoice" as const,
    question: "What's our first international trip together?",
    options: [
      "Albania",
      "Mexico",
      "Canada",
      "Italy",
    ],
    correctAnswer: 0,
    sweetNote: "I love that you're curious about and celebrate my culture 🇦🇱"
  },
  {
    type: "multipleChoice" as const,
    question: "How much do I love you?",
    options: [
      "🫸" + "   " +  "🫷",
      "🫸" + "      " +  "🫷",
      "🫸" + "            " +  "🫷",
      "♾️",
    ],
    correctAnswer: 3,
    sweetNote: "I love you more than words can express 💞"
  },
];

const Index = () => {
  const [gameState, setGameState] = useState<"welcome" | "playing" | "complete">("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 100);
    } else {
      setTimeout(() => setGameState("complete"), 100);
    }
  };

  const handleRestart = () => {
    setGameState("welcome");
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${romanticBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-sm" />
      
      <div className="relative z-10 container max-w-3xl mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
        {gameState === "welcome" && (
          <div className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 space-y-8">
            <div className="flex justify-center gap-2 mb-6">
              <Heart className="w-8 h-8 text-primary fill-primary animate-pulse" />
              <Sparkles className="w-8 h-8 text-accent animate-pulse delay-150" />
              <Heart className="w-8 h-8 text-primary fill-primary animate-pulse delay-300" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
              One Year of Us
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
              365 days of joy, so much love, and unforgettable memories.
              Let's see how well you remember our journey together! 💕
            </p>
            
            <div className="pt-8">
              <Button 
                onClick={handleStart}
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-[0_8px_30px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105"
              >
                Start Our Journey
                <Heart className="w-5 h-5 ml-2 fill-current" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-8">
              {questions.length} questions about our beautiful year together
            </p>
          </div>
        )}

        {gameState === "playing" && (
          <div className="w-full animate-in fade-in-0 slide-in-from-right-4 duration-500">
            <TriviaCard
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
            />
          </div>
        )}

        {gameState === "complete" && (
          <div className="text-center animate-in fade-in-0 zoom-in-95 duration-700 space-y-8">
            <div className="flex justify-center mb-6">
              <Trophy className="w-20 h-20 text-accent animate-bounce" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
              You're Amazing!
            </h1>
            
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 max-w-md mx-auto shadow-[0_8px_30px_hsl(var(--primary)/0.2)]">
              <p className="text-3xl font-bold text-foreground mb-2">
                You got {score} out of {questions.length}
              </p>
              <p className="text-muted-foreground">
                {score === questions.length 
                  ? "Perfect score! You know us so well 🥰" 
                  : score >= questions.length * 0.7
                  ? "Amazing! Our memories are special to both of us 💕"
                  : "We've made so many memories together! 💖"}
              </p>
            </div>

            <div className="max-w-xl mx-auto space-y-4 pt-4">
              <p className="text-lg text-foreground leading-relaxed">
                Having the opportunity to discover the person you are, and falling in love with every bit of you has been a fulfilling journey that I never want to end.
                I'm so grateful for the way we understand each other so deeply, for the way we support, encourage, and celebrate each other, for this love we've created together.
                Your love has been a key that's unlocked dreams and desires I didn't even think I wanted, and I cannot wait to fulfill them together, baby❤️ 
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Happy Anniversary, cutie! I love you so much 💝
              </p>
            </div>

            <div className="flex gap-4 justify-center pt-8">
              <Button 
                onClick={handleRestart}
                variant="outline"
                size="lg"
                className="px-6 hover:scale-105 transition-transform"
              >
                Play Again
              </Button>
            </div>

            <div className="flex justify-center gap-2 pt-8">
              <Heart className="w-6 h-6 text-primary fill-primary animate-pulse" />
              <Heart className="w-6 h-6 text-accent fill-accent animate-pulse delay-150" />
              <Heart className="w-6 h-6 text-primary fill-primary animate-pulse delay-300" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
