import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
import JestTest from '@/app/jest-test/page';

describe('JestTest', () => {
  it('should have the header text', () => {
    render(<JestTest />); // Arrange

    const element = screen.getByText('Page'); // Act

    expect(element).toBeInTheDocument(); // Assert
  })

  it('should have the sam is xx text', () => {
    render(<JestTest />); // Arrange

    const element = screen.getByText(/Sam is /i); // Act

    expect(element).toBeInTheDocument(); // Assert
  })

  it('should have the search section title', () => {
    render(<JestTest />); // Arrange

    const element = screen.getByRole('heading', {
      name: "Search section"
    }); // Act

    expect(element).toBeInTheDocument(); // Assert
  })

  it('should have the search input', () => {
    render(<JestTest />); // Arrange

    const element = screen.getByRole('searchBox'); // Act

    expect(element).toHaveAccessibleName('Search'); // Assert
  })
})
