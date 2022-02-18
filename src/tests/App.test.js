import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

function testLink(linkText) {
  const { history } = renderWithRouter(<App />);

  const link = screen.getByText(linkText);

  userEvent.click(link);

  const { pathname } = history.location;

  return { pathname };
}

describe('Testando o App.js', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const contLink = 3;
    const navegation = screen.getByRole('navigation');
    const navLinks = within(navegation).getAllByRole('link'); // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/link_role
    expect(navLinks.length).toBe(contLink);
    expect(navLinks[0].textContent).toBe('Home'); // verifica se na posição 0 da Navegation, encontra-se o texto 'Home'
    expect(navLinks[1].textContent).toBe('About'); // Exemple test - https://callstack.github.io/react-native-testing-library/docs/react-navigation/
    expect(navLinks[2].textContent).toBe('Favorite Pokémons');
  });

  test('se a aplicação é redirecionada corretamente ao clicar no link Home', () => {
    const { pathname } = testLink('Home');

    expect(pathname).toBe('/');
  });

  test('se a aplicação é redirecionada corretamente ao clicar no link About', () => {
    const { pathname } = testLink('About');

    expect(pathname).toBe('/about');
  });

  test('se a aplicação é redirecionada ao clicar no link Favorite Pokémons', () => {
    const { pathname } = testLink('Favorite Pokémons');

    expect(pathname).toBe('/favorites');
  });

  test('se a aplicação é redirecionada para a página Not Found se necessário', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/teste');

    const notFound = screen.getByText(/^Page requested not found.*/);

    expect(notFound).toBeInTheDocument();
  });
});
