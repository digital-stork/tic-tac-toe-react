import React from "react";
import Game from "../game";
import Board from "../board";
import { mount } from "enzyme";
import Square from "../square";

describe("Game", () => {
  let wrapper = mount(<Game />);

  it("should have a Board", () => {
    expect(wrapper.find(Board).length).toBe(1);
  });

  it("should have a grid of 9 squares", () => {
    expect(wrapper.find(".square").length).toBe(9);
  });

  it("should X always goes first", () => {
    // initilizing game
    wrapper = mount(<Game />);
    const square = wrapper.find(".square").first();
    expect(square.length).toBe(1);
    expect(square.text()).toEqual("");
    square.simulate("click");
    expect(square.text()).toEqual("X");
  });

  it("should Players cannot play on a played position", () => {
    // initilizing game
    wrapper = mount(<Game />);
    const board = wrapper.find(Board);
    expect(board.state().selectedPlayer).toEqual("X");
    const square = wrapper.find(".square").last();
    expect(square.length).toBe(1);
    expect(square.text()).toEqual("");
    square.simulate("click");
    expect(square.text()).toEqual("X");
    square.simulate("click");
    expect(square.text()).toEqual("X");
  });

  it("should switch player untill one player has three in a row, horizontally", () => {
    // initilizing game
    wrapper = mount(<Game />);
    const board = wrapper.find(Board);
    const squares = wrapper.find(".square");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(0).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(3).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(1).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(4).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(2).simulate("click");
    expect(board.state().isOver).toEqual(true);
    expect(board.state().winnerCombination).toEqual([1, 2, 3]);
  });

  it("should switch player untill one player has three in a row, vertically", () => {
    // initilizing game
    wrapper = mount(<Game />);
    const board = wrapper.find(Board);
    const squares = wrapper.find(".square");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(0).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(5).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(3).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(4).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(6).simulate("click");
    expect(board.state().isOver).toEqual(true);
    expect(board.state().winnerCombination).toEqual([1, 4, 7]);
  });

  it("should switch player untill one player has three in a row, diagonally", () => {
    // initilizing game
    wrapper = mount(<Game />);
    const board = wrapper.find(Board);
    const squares = wrapper.find(".square");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(0).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(3).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(4).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(2).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(8).simulate("click");
    expect(board.state().isOver).toEqual(true);
    expect(board.state().winnerCombination).toEqual([1, 5, 9]);
  });

  it("should display the restart button if all nine squares are filled and neither player has three in a row, ", () => {
    // initilizing game
    wrapper = mount(<Game />);
    const board = wrapper.find(Board);
    const squares = wrapper.find(".square");
    expect(wrapper.find(".retry-button").length).toBe(0);
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(0).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(1).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(2).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(3).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(4).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(6).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(5).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(8).simulate("click");
    expect(board.state().isOver).toEqual(false);
    expect(board.state().winnerCombination).toBe(null);
    squares.at(7).simulate("click");
    expect(board.state().noMoreMove).toEqual(true);
    expect(board.state().winnerCombination).toEqual(null);
    expect(wrapper.find(".retry-button").length).toBe(1);
  });
});
