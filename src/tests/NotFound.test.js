import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando NotFound.js', () => {
  test('se página contém um heading h2 com um texto específico.', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/ });

    expect(notFoundText).toBeInTheDocument();
  });

  test('se página mostra uma imagem.', () => {
    renderWithRouter(<NotFound />);

    const notFoundImage = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
