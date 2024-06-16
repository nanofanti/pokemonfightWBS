import { useState, useContext, useEffect } from "react";

import { PokemonAPIContext } from "../Context/PokemonAPIContext";
import "./BattleGame.css"; // Ensure this path matches your updated CSS file

const BattleGame = () => {
  const { userChosenPokemon } = useContext(PokemonAPIContext);
  const { allPokemons, loading } = useContext(PokemonAPIContext);
  const [userPokemon, setUserPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [userPokemonHPCurrent, setUserPokemonHPCurrent] = useState(null);
  const [opponentPokemonHPCurrent, setOpponentPokemonHPCurrent] =
    useState(null);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [battleMessage, setBattleMessage] = useState("");
  const [isAttacking, setIsAttacking] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerName, setPlayerName] = useState(" ");
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    if (userPokemon) {
      setUserPokemonHPCurrent(userPokemon.base.HP);
    }
  }, [userPokemon]);

  useEffect(() => {
    if (userChosenPokemon) {
      setUserPokemon(userChosenPokemon);
      setUserPokemonHPCurrent(userChosenPokemon.base.HP);
      const randomIndex = Math.floor(Math.random() * allPokemons.length);
      setOpponentPokemon(allPokemons[randomIndex]);
      setOpponentPokemonHPCurrent(allPokemons[randomIndex].base.HP);
    }
  }, [userChosenPokemon, allPokemons]);

  useEffect(() => {
    if (opponentPokemon) {
      setOpponentPokemonHPCurrent(opponentPokemon.base.HP);
    }
  }, [opponentPokemon]);

  const handleAttack = () => {
    if (playerTurn && opponentPokemonHPCurrent !== null && userPokemon) {
      const baseDamage = 5;
      const damageDealt = Math.max(
        1,
        (userPokemon.base.Attack / opponentPokemon.base.Defense) * baseDamage
      );
      const newHealth = Math.max(0, opponentPokemonHPCurrent - damageDealt);

      setOpponentPokemonHPCurrent(newHealth);
      setBattleMessage(
        `${userPokemon.name.english} attacked ${
          opponentPokemon.name.english
        } for ${damageDealt.toFixed(0)} damage!`
      );
      setPlayerTurn(false);
      setIsAttacking(true);
      setTimeout(() => {
        setIsAttacking(false);
      }, 800); // Time for animation
    }
  };

  const handleHeal = () => {
    if (playerTurn && userPokemonHPCurrent !== null) {
      const newHealth = Math.min(
        userPokemonHPCurrent + 20,
        userPokemon.base.HP
      );
      setUserPokemonHPCurrent(newHealth);
      setBattleMessage("Player healed their Pokémon!");
      setPlayerTurn(false);
    }
  };

  useEffect(() => {
    const aiTurn = () => {
      if (userPokemonHPCurrent <= 0 || opponentPokemonHPCurrent <= 0) {
        return; // End the AI turn if the game is over
      }

      if (!playerTurn && opponentPokemonHPCurrent !== null) {
        const aiAction = Math.random() < 0.5 ? "attack" : "heal";
        let newHealth;
        if (aiAction === "attack") {
          newHealth = Math.max(0, userPokemonHPCurrent - 10);
          setUserPokemonHPCurrent(newHealth);
          setBattleMessage(`${opponentPokemon.name.english} attacked!`);
        } else {
          newHealth = Math.min(
            opponentPokemonHPCurrent + 20,
            opponentPokemon.base.HP
          );
          setOpponentPokemonHPCurrent(newHealth);
          setBattleMessage(`${opponentPokemon.name.english} ate a Berry!`);
        }
        setPlayerTurn(true);
      }
    };

    if (!playerTurn) {
      const timeoutId = setTimeout(aiTurn, 1000);
      return () => clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [playerTurn, userPokemonHPCurrent, opponentPokemonHPCurrent]);

  const handleKeepFighting = () => {
    // Increment player score for winning
    setPlayerScore((prevScore) => prevScore + 100); // Increment score after a win

    // Reset player turn, battle message, and attack status
    setPlayerTurn(true);
    setBattleMessage("");
    setIsAttacking(false);

    // Select a new opponent without changing the user's Pokémon
    const randomIndex = Math.floor(Math.random() * allPokemons.length);
    setOpponentPokemon(allPokemons[randomIndex]);
    setOpponentPokemonHPCurrent(allPokons[randomIndex].base.HP);
  };

  // Then make sure this function is used in the respective win/lose screen render functions

  const submitScore = async () => {
    try {
      const response = await fetch(
        "https://pokenode-56qg.onrender.com/leaderboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playername: playerName, score: playerScore }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit score");
      }
      console.log("Score submitted successfully");
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  useEffect(() => {
    // Check if the game is won and if the playerName should be set
    if (!playerName && opponentPokemonHPCurrent <= 0) {
      setShowNameInput(true);
      submitScore();
    } else {
      setShowNameInput(false);
    }
  }, [opponentPokemonHPCurrent, playerName, playerScore, submitScore]);

  const handleSelectPokemon = (pokemon) => {
    setUserPokemon(pokemon);
    const randomIndex = Math.floor(Math.random() * allPokemons.length);
    setOpponentPokemon(allPokemons[randomIndex]);
  };

  useEffect(() => {
    if (opponentPokemonHPCurrent <= 0) {
      setPlayerScore(playerScore + 100);
    }
  }, [opponentPokemonHPCurrent]);

  const renderPokemonSelectMenu = () => (
    <div className="pokemon-menu">
      <div className="pokemon-menuSub">
        <h1 className="instructionsh1">Select Your Pokemon:</h1>
        <div className="instructions">
          <h3>How to Play:</h3>
          <p className="pmenue">
            Select your Pokémon and use 'Attack' to weaken your opponent or{" "}
            <br />
            'Heal' to restore your HP. Win by reducing your opponent's HP to
            zero!
          </p>
        </div>
      </div>
      <div className="pokemon-list">
        {allPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-option"
            onClick={() => handleSelectPokemon(pokemon)}
          >
            <img
              src={pokemon.url}
              alt={pokemon.name.english}
              className="pokeOptPic"
            />
            <button className="SelectPokeBut">{pokemon.name.english}</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBattleScreen = () => (
    <div className="battle-screen">
      <div className="PokemonDisplays">
        <div className="pokemon">
          <img
            src={userPokemon.url}
            alt={userPokemon.name.english}
            id="pokemon_attacking"
            className={`pokemon-image ${
              isAttacking ? "pokemon-attacking" : ""
            }`}
          />
          <h3 className="pokemon_name_h3">{userPokemon.name.english}</h3>
          <progress
            value={userPokemonHPCurrent}
            max={userPokemon ? userPokemon.base.HP : 0}
          ></progress>
        </div>
        <div className="pokemon">
          <img
            id="pokemon_opponent_pic"
            src={opponentPokemon.url}
            alt={opponentPokemon.name.english}
          />
          <h3 className="pokemon_name_h3">{opponentPokemon.name.english}</h3>
          <progress
            value={opponentPokemonHPCurrent}
            max={opponentPokemon ? opponentPokemon.base.HP : 0}
          ></progress>
        </div>
      </div>
      <div className="LogicDisplay">
        <div className="ActionContainer">
          <button
            className="ActionButtons"
            onClick={handleAttack}
            disabled={!playerTurn}
          >
            Attack
          </button>
          <button
            className="ActionButtons"
            onClick={handleHeal}
            disabled={!playerTurn}
          >
            Heal
          </button>
        </div>
        <div className="BattleMessage">{battleMessage}</div>
      </div>
    </div>
  );

  const renderPokemonWinScreen = () => {
    const handleNameSubmit = async () => {
      if (playerName.trim() !== "") {
        await submitScore();
      } else {
        alert("Please enter a name.");
      }

      setUserPokemon(null);
      setOpponentPokemon(null);
    };

    return (
      <div className="pokemon-win-screen">
        <img className="endImg" src="/won.png" alt="You Win!" />
        <input
          type="text"
          className="nameInput" // Apply the class here
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          className="submitScoreBtn" // And here
          onClick={handleNameSubmit}
        >
          Submit Score
        </button>
        <button className="submitScoreBtn" onClick={handleKeepFighting}>
          Keep fighting
        </button>
      </div>
    );
  };

  const renderPokemonLoseScreen = () => {
    const handleNameSubmit = async () => {
      if (playerName.trim() !== "") {
        await submitScore();
      } else {
        alert("Please enter a name.");
      }

      setUserPokemon(null);
      setOpponentPokemon(null);
    };

    return (
      <div className="container_lose_screen">
        <div className="pokemon-lose-screen">
          <img className="endImg" src="/lost.png" alt="You Lose!" />
          <input
            type="text"
            className="nameInput" // Apply the class here
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button
            className="submitScoreBtn" // And here
            onClick={handleNameSubmit}
          >
            Submit Score
          </button>
          <button
            className="TryagainButton"
            onClick={() => {
              setUserPokemon(null);
              setOpponentPokemon(null);
              setBattleMessage("");
            }}
          >
            <img className="endImgT" src="/try.png" alt="Try Again?" />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="LoadingDisplay">
        <img src="Loading.gif" />
        <h1 style={{ marginTop: "5rem" }}>Loading...</h1>
      </div>
    );
  }

  if (!allPokemons || allPokemons.length === 0) {
    return <div>Error: Unable to fetch Pokémon data</div>;
  }

  if (!userPokemon) {
    return renderPokemonSelectMenu();
  }

  if (opponentPokemonHPCurrent <= 0) {
    return renderPokemonWinScreen();
  }

  if (userPokemonHPCurrent <= 0) {
    return renderPokemonLoseScreen();
  }

  return <div className="battle-game-container">{renderBattleScreen()}</div>;
};

export default BattleGame;
