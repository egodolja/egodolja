import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, CheckCircle2, XCircle } from "lucide-react";

interface Question {
  question: string;
  type: "multipleChoice" | "reveal";
  options?: string[];
  correctAnswer?: number;
  answer?: string;
  sweetNote?: string;
}

interface TriviaCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const TriviaCard = ({ question, onAnswer, questionNumber, totalQuestions }: TriviaCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);
    setShowNext(true);
  };

  const handleReveal = () => {
    setRevealed(true);
    setShowNext(true);
  };

  const handleNext = () => {
    const isCorrect = question.type === "multipleChoice" 
      ? selectedAnswer === question.correctAnswer 
      : true;
    
    onAnswer(isCorrect);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setRevealed(false);
    setShowNext(false);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <Card className="relative overflow-hidden bg-card/95 backdrop-blur-sm border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:shadow-[0_8px_40px_hsl(var(--primary)/0.2)]">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-muted overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      <div className="p-8 pt-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
        </div>

        <h2 className="text-2xl font-semibold text-foreground mb-8 leading-relaxed">
          {question.question}
        </h2>

        {question.type === "multipleChoice" ? (
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === question.correctAnswer;
              
              let buttonVariant: "outline" | "default" | "secondary" = "outline";
              let extraClasses = "";
              
              if (showFeedback && isSelected) {
                if (isCorrect) {
                  extraClasses = "border-primary bg-primary/10 text-primary";
                } else {
                  extraClasses = "border-destructive bg-destructive/10 text-destructive";
                }
              } else if (showFeedback && isCorrectAnswer) {
                extraClasses = "border-primary bg-primary/10 text-primary";
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full justify-start text-left h-auto py-4 px-6 text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${extraClasses}`}
                >
                  <span className="flex-1">{option}</span>
                  {showFeedback && isSelected && (
                    isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 ml-2" />
                    ) : (
                      <XCircle className="w-5 h-5 ml-2" />
                    )
                  )}
                </Button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {!revealed ? (
              <Button
                onClick={handleReveal}
                size="lg"
                className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent hover:shadow-[0_8px_30px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105"
              >
                Reveal Answer
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <div className="p-6 rounded-lg bg-primary/10 border-2 border-primary animate-in fade-in-50 slide-in-from-bottom-3">
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-primary fill-primary flex-shrink-0 mt-1" />
                  <p className="text-xl font-semibold text-foreground">{question.answer}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {((showFeedback && question.type === "multipleChoice") || (revealed && question.type === "reveal")) && question.sweetNote && (
          <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border animate-in fade-in-50 slide-in-from-bottom-3">
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground italic">{question.sweetNote}</p>
            </div>
          </div>
        )}

        {showNext && (
          <div className="mt-6 animate-in fade-in-50 slide-in-from-bottom-3">
            <Button
              onClick={handleNext}
              size="lg"
              className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent hover:shadow-[0_8px_30px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105"
            >
              Next Question
              <Heart className="w-5 h-5 ml-2 fill-current" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
