import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should have all items', () => {
    render(<JestTest />); // Arrange

    const element = screen.getByRole('list', {
      name: /items/i
    }); // Act

    const { getAllByRole } = within(element);
    const listitems = getAllByRole('listitem');

    expect(listitems).toHaveLength(2); // Assert
  })

  it('should show all categories', () => {
    render(<JestTest />); // Arrange

    const element = screen.getByRole('list', {
      name: /categories/i
    }); // Act

    const { getAllByRole } = within(element);
    const listitems = getAllByRole('listitem', {
      name: /category/i
    });

    expect(listitems).toHaveLength(2); // Assert
  })

  it('the search input should work', async () => {
    render(<JestTest />); // Arrange

    // const searchBox = screen.getByRole('searchBox'); // Act
    const searchBox = screen.getByPlaceholderText('Search...'); // Act
    userEvent.type(searchBox, 'hello world');
    expect(searchBox).toBeInTheDocument(); // Assert

    await waitFor(() => {
      const word = screen.getByText(/have input!!/i); // Act
      expect(word).toBeVisible(); // Assert
    });

  })

})
