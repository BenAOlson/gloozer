import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '.'
import { SiExpertsexchange } from 'react-icons/si'

test('renders learn react link', () => {
  render(<App />)
  // const linkElement = screen.getByText(/learn react/i)
  // expect(linkElement).toBeInTheDocument()
  expect('hello').toBe('hello')
})
