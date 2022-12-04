import { render, fireEvent } from '@testing-library/react'
import { Square } from './Square'
import { SquarePageObject } from './Square.po'

it('renders X content', () => {
  const testId = 'square1'
  const stub = jest.fn()
  render(<Square data-testid={testId} onClick={stub} owner={1} />)
  const square = new SquarePageObject(testId)

  expect(square.element).toHaveTextContent('X')
})

it('renders O content', () => {
  const stub = jest.fn()
  const testId = 'square1'
  render(<Square data-testid={testId} onClick={stub} owner={2} />)
  const square = new SquarePageObject(testId)

  expect(square.element).toHaveTextContent('O')
})

it('renders empty content', () => {
  const testId = 'square1'
  const stub = jest.fn()
  render(<Square data-testid={testId} onClick={stub} owner={undefined} />)
  const square = new SquarePageObject(testId)

  expect(square.element).not.toHaveTextContent('X')
  expect(square.element).not.toHaveTextContent('O')
})

it('onClick callback is called', () => {
  const testId = 'square1'
  const stub = jest.fn()
  render(<Square data-testid={testId} onClick={stub} owner={1} />)
  const square = new SquarePageObject(testId)

  fireEvent.click(square.element)
  expect(stub).toBeCalled()
})
