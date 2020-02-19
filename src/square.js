import React from "react";
import { func, string, number, bool } from "prop-types";

export default class Square extends React.Component {
  state = {};

  static getDerivedStateFromProps(nextProps) {
    const { owner, position, selectedPlayer, isWinner, disabled } = nextProps;
    return {
      owner,
      position,
      selectedPlayer,
      isWinner,
      disabled
    };
  }

  handleSelect = () => {
    const { selectedPlayer, owner, position } = this.state;
    const { switchPlayer } = this.props;
    if (!owner) {
      this.setState({ owner: selectedPlayer });
      switchPlayer({ owner: selectedPlayer, position });
    }
  };

  render() {
    const { disabled, owner, isWinner } = this.state;
    return (
      <button
        className={`square ${isWinner ? "winner" : ""}`}
        onClick={this.handleSelect}
        disabled={disabled}
      >
        {owner}
      </button>
    );
  }
}

Square.propTypes = {
  owner: string,
  position: number.isRequired,
  selectedPlayer: string.isRequired,
  switchPlayer: func.isRequired,
  isWinner: bool,
  disabled: bool
};
