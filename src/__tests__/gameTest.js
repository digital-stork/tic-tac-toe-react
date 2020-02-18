import React from 'react';
import Game from '../game';
import Board from '../board';
import {shallow} from 'enzyme';

describe('Game', () => {
    it('should have a Board', () => {
        const game = shallow(<Game />);

        expect(game.find(Board).length).toBe(1);
    });
});