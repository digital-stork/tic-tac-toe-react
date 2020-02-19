import React from "react";
import Square from "./square";

const possibleCombinations = [
  //horizontal
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  // vertical
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  // diagonal
  [1, 5, 9],
  [3, 5, 7]
];

export default class Board extends React.Component {
  state = {
    grid: [...Array(9).keys()].map(n => ({ position: ++n, owner: null })),
    selectedPlayer: "X",
    selectedSquare: null,
    isOver: false,
    winnerCombination: null
  };

  init = () => {
    this.setState({
      grid: [...Array(9).keys()].map(n => ({ position: ++n, owner: null })),
      selectedPlayer: "X",
      selectedSquare: null,
      isOver: false,
      noMoreMove: false,
      winnerCombination: null
    });
  };

  switchPlayer = selectedSquare => {
    const selectedPlayer = this.state.selectedPlayer === "X" ? "O" : "X";
    const grid = [
      ...this.state.grid.filter(
        square => square.position !== selectedSquare.position
      ),
      selectedSquare
    ];
    this.isOver(selectedSquare, grid);
    this.setState({
      selectedSquare,
      selectedPlayer,
      grid
    });
  };

  isWinner = selectedSquarePosition => {
    const { winnerCombination } = this.state;
    if (winnerCombination) {
      return !!winnerCombination.find(
        combi => combi === selectedSquarePosition
      );
    }
    return false;
  };

  isOver(selectedSquare, grid) {
    if (selectedSquare) {
      for (let combi of possibleCombinations) {
        let match = true;
        combi.forEach(c => {
          match =
            match &&
            !!grid.find(square => {
              return (
                square.position === c && square.owner === selectedSquare.owner
              );
            });
        });
        if (match) {
          this.setState({ winnerCombination: combi, isOver: true });
          return;
        }
      }
      const SquaredWithoutOwner = !!grid.find(s => !s.owner);
      if (!SquaredWithoutOwner) {
        this.setState({ noMoreMove: true });
        return;
      }
    }
  }

  renderGrid() {
    const { grid, selectedPlayer, winnerCombination } = this.state;
    grid.sort((s1, s2) => s1.position - s2.position);
    return grid.map((square, idx) => (
      <Square
        key={idx}
        owner={square.owner}
        position={square.position}
        selectedPlayer={selectedPlayer}
        switchPlayer={this.switchPlayer}
        isWinner={this.isWinner(square.position)}
        disabled={!!winnerCombination}
      />
    ));
  }

  render() {
    const { selectedSquare, isOver, noMoreMove } = this.state;
    return (
      <div className="game-board">
        <div className="status">
          {isOver ? `Game Over: The winner is ${selectedSquare.owner}` : ""}
          {noMoreMove ? `Game Over: no more move` : ""}
        </div>
        <div className="game-grid">{this.renderGrid()}</div>
        {(isOver || noMoreMove) && (
          <button className="retry-button" onClick={this.init}>
            Retry
          </button>
        )}
      </div>
    );
  }
}
