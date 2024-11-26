import React from 'react';
import MultipleFetches from '../MultipleFetches';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';

afterEach(cleanup);

test('starts without any post', () => {
  // Set a rendered `MultipleFetches` to a deconstructed `queryByTestId`.
  // Verify that the queried element id "fetch-post" does not have content and returns null.
});

test('after clicking on button, displays loading message', () => {
  // Set a rendered `MultipleFetches` to a deconstructed `queryByTestId` and `getByText`.
  // Simulate a click event on the button with text "Fetch post and comments".
  // Verify that the node with id "fetch-loading-post" has content text of "Loading post...".
});

// Group all API tests together and clear each mock after each test.
describe('API tests', () => {

  test('displays post if API succeeds', async () => {
    // Mock fetching an API implementation.
      // Mock single fetch call to have more control over multiple API requests.
        // If call is successful return and object with a key of title and a value of text "How to Become a Bad Developer".
      // Mock a second fetch call to have more control over multiple API requests.
        // If call is successful return an array of objects containing two key-value pairs; the first key an incremented id on each object, and a second key of name with the first object value being "Rafael" and the second value being "Andressa".
    // Set a rendered `MultipleFetches` to a deconstructed `getByTestId`, `getByText`, and `getAllByTestId`.
    // Simulate a click event on the button with text "Fetch post and comments".
    // Wait for the next API call.
    // Verify that the fetch call has been called twice.
    // Verify the first fetch API call url is "https://jsonplaceholder.typicode.com/posts/1".
    // Verify the second fetch API call url is "https://jsonplaceholder.typicode.com/posts/1/comments".
    // Verify that the node with id "fetch-post" has content text of "How to Become a Bad Developer".
    // Verify that there is a node present with text "All fetched!".
    // Set the component id "comment-author" to an authors variable.
    // Verify that the first author's name is "Rafael".
    // Verify that the first author's name is "Andressa".
  });
  
  test('displays comments error if API fails', async () => {
    // Mock fetching an API implementation.
        // If call is successful return and object with a key of title and a value of text "How to Become a Bad Developer"
      // If call is unsuccessful return a 500 status.
    // Set a rendered `MultipleFetches` to a deconstructed `getByTestId`, `getByText`, and `queryByText`.
    // Simulate a click event on the button with text "Fetch post and comments".
    // Wait for the next API call.
    // Verify that the fetch call has been called twice.
    // Verify the first fetch API call url is "https://jsonplaceholder.typicode.com/posts/1".
    // Verify the second fetch API call url is "https://jsonplaceholder.typicode.com/posts/1/comments".
    // Verify that the node with id "fetch-post" has content text of "How to Become a Bad Developer".
    // Verify that the node with id "fetch-error-comments" has content text of "Failed to fetch".
    // Verify that there is no present node with text "All fetched!".
  });
  
  test('displays post error if API fails', async () => {
    // Mock fetching an API implementation.
      // If call is unsuccessful return a 500 status.
    // Set a rendered `MultipleFetches` to a deconstructed `getByTestId`, `getByText`, and `queryByText`.
    // Simulate a click event on the button with text "Fetch post and comments".
    // Wait until the "fetch-error-post" node ID is present.
    // Verify that the fetch call has been called once.
    // Verify the fetch API call url is "https://jsonplaceholder.typicode.com/posts/1".
    // Verify that the node with id "fetch-error-comments" has content text of "Failed to fetch".
    // Verify that there is no present node with text "All fetched!".
  });
});