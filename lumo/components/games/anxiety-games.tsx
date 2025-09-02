"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Flower2, Wind, TreePine, Waves, Music2, BookOpen, PenTool, Save, BarChart3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BreathingGame } from "./breathing-game";
import { ZenGarden } from "./zen-garden";
import { ForestGame } from "./forest-game";
import { OceanWaves } from "./ocean-waves";

// Emotion categories with weights for scoring
const emotionCategories = {
  positive: ["happy", "joyful", "excited", "grateful", "peaceful", "content", "optimistic", "energetic"],
  negative: ["sad", "angry", "anxious", "stressed", "frustrated", "worried", "depressed", "lonely"],
  neutral: ["calm", "neutral", "tired", "bored", "indifferent", "focused", "curious", "reflective"]
};

const games = [
  {
    id: "breathing",
    title: "Breathing Patterns",
    description: "Follow calming breathing exercises with visual guidance",
    icon: Wind,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    duration: "5 mins",
  },
  {
    id: "garden",
    title: "Zen Garden",
    description: "Create and maintain your digital peaceful space",
    icon: Flower2,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    duration: "10 mins",
  },
  {
    id: "forest",
    title: "Mindful Forest",
    description: "Take a peaceful walk through a virtual forest",
    icon: TreePine,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    duration: "15 mins",
  },
  {
    id: "waves",
    title: "Ocean Waves",
    description: "Match your breath with gentle ocean waves",
    icon: Waves,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    duration: "8 mins",
  },
  {
    id: "journaling",
    title: "Mood Journaling",
    description: "Express your thoughts and feelings in a safe space",
    icon: BookOpen,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    duration: "10 mins",
  },
];

interface JournalEntry {
  id: string;
  date: string;
  moodRating: number;
  content: string;
  emotionScore: number;
  emotionPercentage: number;
  emotions: string[];
  timestamp: number;
}

interface AnxietyGamesProps {
  onGamePlayed?: (gameName: string, description: string) => Promise<void>;
}

export const AnxietyGames = ({ onGamePlayed }: AnxietyGamesProps) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [moodRating, setMoodRating] = useState(5);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [showJournalHistory, setShowJournalHistory] = useState(false);

  // Load journal entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodJournalEntries');
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save journal entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('moodJournalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Analyze text for emotions and calculate score
  const analyzeEmotions = (text: string): { score: number; percentage: number; emotions: string[] } => {
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;
    const foundEmotions: string[] = [];

    words.forEach(word => {
      if (emotionCategories.positive.includes(word)) {
        positiveCount++;
        foundEmotions.push(word);
      } else if (emotionCategories.negative.includes(word)) {
        negativeCount++;
        foundEmotions.push(word);
      } else if (emotionCategories.neutral.includes(word)) {
        neutralCount++;
        foundEmotions.push(word);
      }
    });

    // Calculate emotion score (0-100)
    const totalWords = words.length;
    if (totalWords === 0) return { score: 50, percentage: 50, emotions: [] };

    const positiveRatio = positiveCount / totalWords;
    const negativeRatio = negativeCount / totalWords;
    const neutralRatio = neutralCount / totalWords;

    // Score calculation: positive emotions boost score, negative emotions reduce it
    let score = 50; // Start at neutral (50)
    score += (positiveRatio * 50); // Positive emotions can add up to 50 points
    score -= (negativeRatio * 50); // Negative emotions can subtract up to 50 points

    // Clamp score between 0 and 100
    score = Math.max(0, Math.min(100, score));

    return {
      score: Math.round(score),
      percentage: Math.round(score),
      emotions: foundEmotions
    };
  };

  const handleGameStart = async (gameId: string) => {
    setSelectedGame(gameId);
    setShowGame(true);

    // Log the activity
    if (onGamePlayed) {
      try {
        await onGamePlayed(
          gameId,
          games.find((g) => g.id === gameId)?.description || ""
        );
      } catch (error) {
        console.error("Error logging game activity:", error);
      }
    }
  };

  const handleJournalSave = async () => {
    if (journalEntry.trim()) {
      // Analyze emotions in the journal entry
      const emotionAnalysis = analyzeEmotions(journalEntry);
      
      // Create new journal entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        moodRating,
        content: journalEntry,
        emotionScore: emotionAnalysis.score,
        emotionPercentage: emotionAnalysis.percentage,
        emotions: emotionAnalysis.emotions,
        timestamp: Date.now()
      };

      // Add to journal entries
      setJournalEntries(prev => [newEntry, ...prev]);

      // Log the journaling activity
      if (onGamePlayed) {
        try {
          await onGamePlayed(
            "journaling",
            `Mood journaling session - Rating: ${moodRating}/10, Emotion Score: ${emotionAnalysis.score}%`
          );
        } catch (error) {
          console.error("Error logging journaling activity:", error);
        }
      }
      
      // Clear the form and close
      setJournalEntry("");
      setMoodRating(5);
      setShowGame(false);
      setSelectedGame(null);
    }
  };

  const getEmotionColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getEmotionLabel = (score: number) => {
    if (score >= 70) return "Positive";
    if (score >= 40) return "Neutral";
    return "Negative";
  };

  const renderGame = () => {
    switch (selectedGame) {
      case "breathing":
        return <BreathingGame />;
      case "garden":
        return <ZenGarden />;
      case "forest":
        return <ForestGame />;
      case "waves":
        return <OceanWaves />;
      case "journaling":
        return (
          <div className="space-y-6 p-6">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Mood Journaling</h3>
              <p className="text-muted-foreground">
                Take a moment to reflect on your day and express your feelings
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="mood-rating" className="text-base font-medium">
                  How are you feeling today? (1-10)
                </Label>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-muted-foreground">😢</span>
                  <input
                    type="range"
                    id="mood-rating"
                    min="1"
                    max="10"
                    value={moodRating}
                    onChange={(e) => setMoodRating(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-sm text-muted-foreground">😊</span>
                  <span className="text-lg font-semibold text-purple-600 w-8 text-center">
                    {moodRating}
                  </span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="journal-entry" className="text-base font-medium">
                  What's on your mind today?
                </Label>
                <Textarea
                  id="journal-entry"
                  placeholder="Write about your thoughts, feelings, or anything that's been on your mind..."
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className="mt-2 min-h-[200px] resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Tip: Use words like "happy", "sad", "anxious", "peaceful" to get better emotion analysis
                </p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleJournalSave}
                  disabled={!journalEntry.trim()}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Entry
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setJournalEntry("");
                    setMoodRating(5);
                    setShowGame(false);
                    setSelectedGame(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-primary" />
          Wellness Activities & Games
        </CardTitle>
        <CardDescription>
          Take a break with these calming activities designed to reduce anxiety and promote mindfulness
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
            >
              <Card
                className={`p-4 hover:shadow-md transition-all duration-200 border-2 border-transparent hover:border-primary/20 ${game.bgColor}`}
                onClick={() => handleGameStart(game.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${game.bgColor}`}>
                    <game.icon className={`w-6 h-6 ${game.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{game.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {game.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Music2 className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {game.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Journal History Button */}
        {journalEntries.length > 0 && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => setShowJournalHistory(true)}
              className="gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              View Journal History ({journalEntries.length} entries)
            </Button>
          </div>
        )}

        <Dialog open={showGame} onOpenChange={setShowGame}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {games.find((g) => g.id === selectedGame)?.title}
              </DialogTitle>
            </DialogHeader>
            {renderGame()}
          </DialogContent>
        </Dialog>

        {/* Journal History Dialog */}
        <Dialog open={showJournalHistory} onOpenChange={setShowJournalHistory}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Journal History
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <Card key={entry.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          {entry.date}
                        </span>
                        <span className="text-sm">
                          Mood: {entry.moodRating}/10
                        </span>
                        <span className={`text-sm font-semibold ${getEmotionColor(entry.emotionScore)}`}>
                          {getEmotionLabel(entry.emotionScore)} ({entry.emotionPercentage}%)
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{entry.content}</p>
                      {entry.emotions.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entry.emotions.map((emotion, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
                            >
                              {emotion}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
