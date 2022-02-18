import React from 'react';
import { screen, within } from '@testing-library/react';
import rederWhitRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testando o App.js', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    rederWhitRouter(<App />);

    const contLink = 3;
    const navegation = screen.getByRole('navigation');
    const navLinks = within(navegation).getAllByRole('link'); // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/link_role
    expect(navLinks.length).toBe(contLink);
    expect(navLinks[0].textContent).toBe('Home'); // verifica se na posição 0 da Navegation, encontra-se o texto 'Home'
    expect(navLinks[1].textContent).toBe('About'); // Exemple test - https://callstack.github.io/react-native-testing-library/docs/react-navigation/
    expect(navLinks[2].textContent).toBe('Favorite Pokémons');
  });
});
//
