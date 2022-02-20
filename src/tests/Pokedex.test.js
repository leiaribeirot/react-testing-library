import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../utils/renderWithRouter';
import data from '../data';

describe('Testando Pokedex.js', () => {
  const pokemonTypeId = 'pokemon-type-button';
  const nextPokemonId = 'next-pokemon';
  const pokemonNameId = 'pokemon-name';

  test('se página contém um heading h2 com um texto específico.', () => {
    renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ { 25: true } } />,
    );

    const header = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/ });
    expect(header).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [data[0], data[1], data[2]] }
        isPokemonFavoriteById={ { 25: true, 4: true, 23: true } }
      />,
    );
    const nextPokemon = screen.getByTestId(nextPokemonId);
    expect(nextPokemon.textContent).toBe('Próximo pokémon');
    userEvent.click(nextPokemon);
  });

  test('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ [data[0], data[1], data[2]] }
        isPokemonFavoriteById={ { 25: true, 4: true, 23: true } }
      />,
    );

    const onePokemon = 1;
    const pokemon = screen.getAllByTestId(pokemonNameId);
    expect(pokemon.length).toBe(onePokemon);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ { 25: true, 4: true, 23: true } }
      />,
    );

    const countFilter = 7;
    const filterButtons = screen.getAllByTestId(pokemonTypeId);
    expect(filterButtons.length).toBe(countFilter);

    const fireButton = filterButtons[0];
    expect(fireButton.textContent).toBe('Electric');

    userEvent.click(fireButton);
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ { 25: true, 4: true, 23: true } }
      />,
    );

    const resetFilter = screen.getByText('All');
    userEvent.click(resetFilter);
  });
});
