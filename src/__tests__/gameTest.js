import React from "react";
import Game from "../game";
import Board from "../board";
import { mount } from "enzyme";
import Square from "../square";

describe("Game", () => {
  const wrapper = mount(<Game />);

  it("should have a Board", () => {
    expect(wrapper.find(Board).length).toBe(1);
  });

  it("should have a grid of 9 squares", () => {
    expect(wrapper.find(".square").length).toBe(9);
  });

  it("should X always goes first", () => {});

  it("should Players cannot play on a played position", () => {});

  it("should switch player untill one player has three in a row, horizontally, vertically or diagonally", () => {});

  it("should game over if one player has three in a row", () => {});

  it("should display the restart button if all nine squares are filled and neither player has three in a row, ", () => {});
});
