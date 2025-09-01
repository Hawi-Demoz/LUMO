"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Flower2, Wind, TreePine, Waves, Music2, BookOpen, PenTool } from "lucide-react";
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

interface AnxietyGamesProps {
  onGamePlayed?: (gameName: string, description: string) => Promise<void>;
}

export const AnxietyGames = ({ onGamePlayed }: AnxietyGamesProps) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [moodRating, setMoodRating] = useState(5);

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
      // Log the journaling activity
      if (onGamePlayed) {
        try {
          await onGamePlayed(
            "journaling",
            `Mood journaling session - Rating: ${moodRating}/10`
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
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleJournalSave}
                  disabled={!journalEntry.trim()}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <PenTool className="w-4 h-4 mr-2" />
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
      </CardContent>
    </Card>
  );
};
