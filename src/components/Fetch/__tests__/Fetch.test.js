import React from 'react';
import Fetch from '../Fetch';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';

afterEach(cleanup);

test('starts without any joke', () => {
  // Set a rendered `Fetch` to a deconstructed `queryByTextId`.
  // Verify that the queried element id "fetch-joke" does not have content and returns null.
});

test('when clicking on button, displays loading message', () => {
  // Set a rendered `Fetch` to a deconstructed `queryByTestId` and `getByText`.
  // Simulate a click event on the button with text "Get a Chuck Norris joke".
  // Verify that the node with id "fetch-loading" has content text of "Loading...".
});

test('when clicking on button displays joke if API succeeds', async () => {
  // Mock fetching an API implementation.
      // If call is successful return and object with a key-value "Chuck Norris counted to infinity. Twice.".
  // Set a rendered `Fetch` to a deconstructed `queryByTestId` and `getByText`.
  // Simulate a click event on the button with text "Get a Chuck Norris joke".
  // Wait until the "fetch-joke" node ID is present.
  // Verify that the node with id "fetch-joke" has content text of "Chuck Norris counted to infinity. Twice.".
  // Verify that the fetch call has been called once.
  // Verify the fetch API call url is "https://api.chucknorris.io/jokes/random".
  // Clear mock after test.
});

test('when clicking on button displays error if API fails', async () => {
  // Mock fetching an API implementation.
    // If call is unsuccessful return a 500 status.
  // Set a rendered `Fetch` to a deconstructed `queryByTestId` and `getByText`.
  // Simulate a click event on the button with text "Get a Chuck Norris joke".
  // Wait until the "fetch-error" node ID is present.
  // Verify that the node with id "fetch-error" has content text of "Failed to fetch".
  // Verify that the fetch call has been called once.
  // Verify the fetch API call url is "https://api.chucknorris.io/jokes/random".
  // Clear mock after test.
});