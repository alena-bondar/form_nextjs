import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';

describe('Home Component', () => {
    it('renders empty state when no menu items exist', () => {
        render(<Home />);
        expect(screen.getByText(/Menu jest puste/i)).toBeInTheDocument();
        expect(screen.getByText(/W tym menu nie ma jeszcze żadnych linków./i)).toBeInTheDocument();
        const addButton = screen.getAllByRole('button', { name: /Dodaj pozycję menu/i });
        expect(addButton.length).toBeGreaterThan(0);
    });

    it('opens the form when "Dodaj pozycję menu" is clicked', () => {
        render(<Home />);
        const buttons = screen.getAllByRole('button', { name: /Dodaj pozycję menu/i });
        fireEvent.click(buttons[0]);
        expect(screen.getByPlaceholderText(/np. Promocje/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Wklej lub wyszukaj/i)).toBeInTheDocument();
    });

    it('shows validation error if title is too short', async () => {
        render(<Home />);
        const buttons = screen.getAllByRole('button', { name: /Dodaj pozycję menu/i });
        fireEvent.click(buttons[0]);
        const titleInput = screen.getByPlaceholderText(/np. Promocje/i);
        fireEvent.change(titleInput, { target: { value: '1234' } });
        const submitButton = screen.getAllByRole('button', { name: /Dodaj/i });
        fireEvent.click(submitButton[0]);
        await waitFor(() => {
            expect(screen.getByText(/Must be 5 or more characters/i)).toBeInTheDocument();
        });
    });

    it('shows validation error if title is too long', async () => {
        render(<Home />);
        const buttons = screen.getAllByRole('button', { name: /Dodaj pozycję menu/i });
        fireEvent.click(buttons[0]);
        const titleInput = screen.getByPlaceholderText(/np. Promocje/i);
        fireEvent.change(titleInput, { target: { value: 'a'.repeat(51) } });
        const submitButton = screen.getAllByRole('button', { name: /Dodaj/i });
        fireEvent.click(submitButton[0]);
        await waitFor(() => {
            expect(screen.getByText(/Must be no more than 50 characters/i)).toBeInTheDocument();
        });
    });

    it('submits the form and adds a new item to the list if title is valid', async () => {
        render(<Home />);

        const addButton = screen.getAllByRole('button', { name: /Dodaj pozycję menu/i })[0];
        fireEvent.click(addButton);

        const titleInput = screen.getByPlaceholderText(/np. Promocje/i);
        fireEvent.change(titleInput, { target: { value: 'Title' } });

        const submitButton = screen.getAllByRole('button', { name: /Dodaj/i })[0];
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Title')).toBeInTheDocument();
        });
    });
});
