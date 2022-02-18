import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../utils/renderWithRouter';

import About from '../components/About';

describe('Testando o About.js', () => {
  test('se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pokedex = screen.getByText(/digital encyclopedia/);

    expect(pokedex).toBeInTheDocument();
  });

  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const header = screen.getByRole('heading', { level: 2 });

    expect(header.textContent).toBe('About Pokédex');
  });

  test('se a página contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImage = screen.getByAltText('Pokédex');

    expect(pokedexImage.src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
