/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Note from './Note';
import userEvent from '@testing-library/user-event';

test('renders content', () => {
  const note = {
    content: 'This is a reminder',
    importance: true,
  };
  render(<Note note={note} />);
  const element = screen.queryByText('do not want this thing to be rendered', {
    exact: false,
  });
  expect(element).toBeNull();
});

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };
  const mockHandler = jest.fn();
  render(<Note note={note} toggleImportance={mockHandler} />);
  const user = userEvent.setup();
  const button = screen.getByText('make not important');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
