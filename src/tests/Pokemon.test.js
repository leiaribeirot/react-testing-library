import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import data from '../data';

describe('Testando Pokemon.js', () => {
  test('se é renderizado um card com as informações de determinado pokémon.', () => {
    const testPokemon = data[0];
    const { averageWeight: testPokemonWeight } = testPokemon;

    renderWithRouter(<Pokemon pokemon={ testPokemon } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(`${testPokemon.name} sprite`);

    expect(pokemonName.textContent).toBe(testPokemon.name);
    expect(pokemonType.textContent).toBe(testPokemon.type);
    expect(pokemonWeight.textContent).toBe(
      `Average weight: ${testPokemonWeight.value} ${testPokemonWeight.measurementUnit}`,
    );
    expect(pokemonImage.src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  test('se é renderizado um link de mais detalhes.', () => {
    renderWithRouter(<App />);

    const moreDetailsText = 'More details';
    const detailsLink = screen.getByRole('link', { name: moreDetailsText });
    const linkRegex = new RegExp('.*/pokemons/25');

    expect(detailsLink.textContent).toBe(moreDetailsText);
    expect(detailsLink.href).toMatch(linkRegex);

    userEvent.click(detailsLink);
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });

    userEvent.click(detailsLink);

    const favoritePokemon = screen.getByRole('checkbox');

    userEvent.click(favoritePokemon);

    history.push('/');

    const star = screen.getByAltText('Pikachu is marked as favorite');

    expect(star).toBeInTheDocument();
    expect(star.src).toMatch(/\/star-icon.svg/);
  });
});
