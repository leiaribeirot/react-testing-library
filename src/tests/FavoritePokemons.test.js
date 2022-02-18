import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

describe('Testando FavoritePokemons.js', () => {
  test('se é exibida uma mensagem caso a pessoa não tenha pokémon favorito.', () => {
    renderWithRouter(<FavoritePokemons data={ [] } />);

    const noFound = screen.getByText('No favorite pokemon found');

    expect(noFound).toBeInTheDocument();
  });

  test('se são exibidos todos os cards de pokémon favoritados.', () => {
    const idPikachu = 25;

    const favoritePokemon = data.filter(
      ({ id }) => id === idPikachu,
    );

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
