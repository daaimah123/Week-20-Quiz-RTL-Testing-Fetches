import React from 'react';
import Fetch from '../Fetch';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';

afterEach(cleanup);

test('starts without any joke', () => {
  // Set a rendered `Fetch` to a deconstructed `queryByTextId`.
  const { queryByTestId } = render(<Fetch />);
  // Verify that the queried element id "fetch-joke" does not have content and returns null.
  expect(queryByTestId("fetch-joke")).toBeNull();
});

test('when clicking on button, displays loading message', () => {
  // Set a rendered `Fetch` to a deconstructed `queryByTestId` and `getByText`.
  const { getByTestId, getByText } = render(<Fetch />);
  // Simulate a click event on the button with text "Get a Chuck Norris joke".
  fireEvent.click(getByText("Get a Chuck Norris joke"));
  // Verify that the node with id "fetch-loading" has content text of "Loading...".
  expect(getByTestId("fetch-loading").textContent).toBe("Loading...");
});

test('when clicking on button displays joke if API succeeds', async () => {
  // Mock fetching an API implementation.
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      // If call is successful return and object with a key-value "Chuck Norris counted to infinity. Twice.".
      status: 200,
      json: () => Promise.resolve({
        value: "Chuck Norris counted to infinity. Twice."
      })
    }));
  // Set a rendered `Fetch` to a deconstructed `queryByTestId` and `getByText`.
  const { getByTestId, getByText } = render(<Fetch />);
  // Simulate a click event on the button with text "Get a Chuck Norris joke".
  fireEvent.click(getByText("Get a Chuck Norris joke"));
  // Wait until the "fetch-joke" node ID is present.
  await waitFor(() => getByTestId("fetch-joke"));
  // Verify that the node with id "fetch-joke" has content text of "Chuck Norris counted to infinity. Twice.".
  expect(getByTestId("fetch-joke").textContent).toBe("Chuck Norris counted to infinity. Twice.");
  // Verify that the fetch call has been called once.
  expect(global.fetch).toHaveBeenCalledTimes(1);
  // Verify the fetch API call url is "https://api.chucknorris.io/jokes/random".
  expect(global.fetch.mock.calls[0][0]).toBe("https://api.chucknorris.io/jokes/random");
  // Clear mock after test.
  global.fetch.mockClear();
});

test('when clicking on button displays error if API fails', async () => {
  // Mock fetching an API implementation.
  jest.spyOn(global, 'fetch')
    // If call is unsuccessful return a 500 status.
    .mockImplementation(() => Promise.resolve({
      status: 500,
    }));
  // Set a rendered `Fetch` to a deconstructed `queryByTestId` and `getByText`.
  const { getByTestId, getByText } = render(<Fetch />);
  // Simulate a click event on the button with text "Get a Chuck Norris joke".
  fireEvent.click(getByText("Get a Chuck Norris joke"));
  // Wait until the "fetch-error" node ID is present.
  await waitFor(() => getByTestId("fetch-error"));
  // Verify that the node with id "fetch-error" has content text of "Failed to fetch".
  expect(getByTestId("fetch-error").textContent).toBe("Failed to fetch");
  // Verify that the fetch call has been called once.
  expect(global.fetch).toHaveBeenCalledTimes(1);
  // Verify the fetch API call url is "https://api.chucknorris.io/jokes/random".
  expect(global.fetch.mock.calls[0][0]).toBe("https://api.chucknorris.io/jokes/random");
  // Clear mock after test.
  global.fetch.mockClear();
});