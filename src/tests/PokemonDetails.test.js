import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testando PokemonDetails', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });

  test('se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    const header = screen.getByRole('heading', { level: 2, name: 'Pikachu Details',
    });

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const pokemonDetails = screen.getByText(
      'This intelligent Pokémon roasts hard berries with electricity to make'
          + ' them tender enough to eat.',
    );

    const link = screen.queryByText('More details');

    expect(header).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonDetails).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
  });

  test('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const locationsHeader = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    const locations = [
      screen.getByText('Kanto Viridian Forest'),
      screen.getByText('Kanto Power Plant'),
    ];

    const locationImages = screen.getAllByAltText('Pikachu location');
    const expectedImages = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];

    expect(locationsHeader).toBeInTheDocument();

    locations.forEach((location) => {
      expect(location).toBeInTheDocument();
    });

    locationImages.forEach((image, index) => {
      expect(image.src).toBe(expectedImages[index]);
    });
  });
  test('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const locationsHeader = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    const locations = [
      screen.getByText('Kanto Viridian Forest'),
      screen.getByText('Kanto Power Plant'),
    ];

    const locationImages = screen.getAllByAltText('Pikachu location');
    const expectedImages = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];

    expect(locationsHeader).toBeInTheDocument();

    locations.forEach((location) => {
      expect(location).toBeInTheDocument();
    });

    locationImages.forEach((image, index) => {
      expect(image.src).toBe(expectedImages[index]);
    });
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const favoritePokemon = screen.getByRole('checkbox');

    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();

    userEvent.click(favoritePokemon);

    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();

    userEvent.click(favoritePokemon);
    expect(star).not.toBeInTheDocument();
  });
});
