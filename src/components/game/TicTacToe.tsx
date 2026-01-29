import { useState, useEffect } from "react";
import Board from "./Board";
import GameStatus from "./GameStatus";
import ThemeSwitcher from "./ThemeSwitcher";
import useTicTacToe from "@/hooks/useTicTacToe";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type Theme = "classic" | "neon" | "ocean" | "sunset";

const TicTacToe = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("tictactoe-theme");
    return (saved as Theme) || "classic";
  });

  const {
    cells,
    currentPlayer,
    winner,
    isDraw,
    isGameOver,
    winningLine,
    handleCellClick,
    resetGame,
  } = useTicTacToe();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-classic", "theme-neon", "theme-ocean", "theme-sunset");
    if (theme !== "classic") {
      root.classList.add(`theme-${theme}`);
    }
    localStorage.setItem("tictactoe-theme", theme);
  }, [theme]);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm mx-auto">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          Tic-Tac-Toe
        </h1>
        <p className="text-muted-foreground">Two players, one device</p>
      </header>

      <GameStatus
        currentPlayer={currentPlayer}
        winner={winner}
        isDraw={isDraw}
      />

      <Board
        cells={cells}
        onCellClick={handleCellClick}
        winningLine={winningLine}
        disabled={isGameOver}
      />

      <Button
        onClick={resetGame}
        variant="outline"
        size="lg"
        className="gap-2 font-medium"
      >
        <RotateCcw className="w-4 h-4" />
        {isGameOver ? "New Game" : "Restart"}
      </Button>

      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
    </div>
  );
};

export default TicTacToe;
