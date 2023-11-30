import React from 'react';
import MultipleFetches from '../MultipleFetches';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';

afterEach(cleanup);

test('starts without any post', () => {
  // Set a rendered `MultipleFetches` to a deconstructed `queryByTestId`.
  const { queryByTestId } = render(<MultipleFetches />);
  // Verify that the queried element id "fetch-post" does not have content and returns null.
  expect(queryByTestId("fetch-post")).toBeNull();
});

test('after clicking on button, displays loading message', () => {
  // Set a rendered `MultipleFetches` to a deconstructed `queryByTestId` and `getByText`.
  const { getByTestId, getByText } = render(<MultipleFetches />);
  // Simulate a click event on the button with text "Fetch post and comments".
  fireEvent.click(getByText("Fetch post and comments"));
  // Verify that the node with id "fetch-loading-post" has content text of "Loading post...".
  expect(getByTestId("fetch-loading-post").textContent).toBe("Loading post...");
});

// Group all API tests together and clear each mock after each test.
describe('API tests', () => {
  afterEach(() => global.fetch.mockClear());

  test('displays post if API succeeds', async () => {
    // Mock fetching an API implementation.
    jest.spyOn(global, 'fetch')
      // Mock single fetch call to have more control over multiple API requests.
      .mockImplementationOnce(() => Promise.resolve({
        // If call is successful return and object with a key of title and a value of text "How to Become a Bad Developer".
        status: 200,
        json: () => Promise.resolve({
          title: "How to Become a Bad Developer"
        })
      }))
      // Mock a second fetch call to have more control over multiple API requests.
      .mockImplementationOnce(() => Promise.resolve({
        // If call is successful return an array of objects containing two key-value pairs; the first key an incremented id on each object, and a second key of name with the first object value being "Rafael" and the second value being "Andressa".
        status: 200,
        json: () => Promise.resolve([
          { id: 1, name: "Rafael" },
          { id: 2, name: "Andressa" }
        ])
      }));
    // Set a rendered `MultipleFetches` to a deconstructed `getByTestId`, `getByText`, and `getAllByTestId`.
    const { getByTestId, getByText, getAllByTestId } = render(<MultipleFetches />);
    // Simulate a click event on the button with text "Fetch post and comments".
    fireEvent.click(getByText("Fetch post and comments"));
    // Wait for the next API call.
    await waitFor();
    // Verify that the fetch call has been called twice.
    expect(global.fetch).toHaveBeenCalledTimes(2);
    // Verify the first fetch API call url is "https://jsonplaceholder.typicode.com/posts/1".
    expect(global.fetch.mock.calls[0][0]).toBe("https://jsonplaceholder.typicode.com/posts/1");
    // Verify the second fetch API call url is "https://jsonplaceholder.typicode.com/posts/1/comments".
    expect(global.fetch.mock.calls[1][0]).toBe("https://jsonplaceholder.typicode.com/posts/1/comments");
    // Verify that the node with id "fetch-post" has content text of "How to Become a Bad Developer".
    expect(getByTestId("fetch-post").textContent).toBe("How to Become a Bad Developer");
    // Verify that there is a node present with text "All fetched!".
    expect(getByText("All fetched!")).toBeTruthy();
    // Set the component id "comment-author" to an authors variable.
    const authors = getAllByTestId("comment-author");
    // Verify that the first author's name is "Rafael".
    expect(authors[0].textContent).toBe("Rafael");
    // Verify that the first author's name is "Andressa".
    expect(authors[1].textContent).toBe("Andressa");
  });
  
  test('displays comments error if API fails', async () => {
    // Mock fetching an API implementation.
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve({
        // If call is successful return and object with a key of title and a value of text "How to Become a Bad Developer"
        status: 200,
        json: () => Promise.resolve({
          title: "How to Become a Bad Developer"
        })
      }))
      // If call is unsuccessful return a 500 status.
      .mockImplementationOnce(() => ({
        status: 500
      }));
    // Set a rendered `MultipleFetches` to a deconstructed `getByTestId`, `getByText`, and `queryByText`.
    const { getByTestId, getByText, queryByText } = render(<MultipleFetches />);
    // Simulate a click event on the button with text "Fetch post and comments".
    fireEvent.click(getByText("Fetch post and comments"));
    // Wait for the next API call.
    await waitFor();
    // Verify that the fetch call has been called twice.
    expect(global.fetch).toHaveBeenCalledTimes(2);
    // Verify the first fetch API call url is "https://jsonplaceholder.typicode.com/posts/1".
    expect(global.fetch.mock.calls[0][0]).toBe("https://jsonplaceholder.typicode.com/posts/1");
    // Verify the second fetch API call url is "https://jsonplaceholder.typicode.com/posts/1/comments".
    expect(global.fetch.mock.calls[1][0]).toBe("https://jsonplaceholder.typicode.com/posts/1/comments");
    // Verify that the node with id "fetch-post" has content text of "How to Become a Bad Developer".
    expect(getByTestId("fetch-post").textContent).toBe("How to Become a Bad Developer");
    // Verify that the node with id "fetch-error-comments" has content text of "Failed to fetch".
    expect(getByTestId("fetch-error-comments").textContent).toBe("Failed to fetch");
    // Verify that there is no present node with text "All fetched!".
    expect(queryByText("All fetched!")).toBeNull();
  });
  
  test('displays post error if API fails', async () => {
    // Mock fetching an API implementation.
    jest.spyOn(global, 'fetch')
      // If call is unsuccessful return a 500 status.
      .mockImplementation(() => Promise.resolve({
        status: 500,
      }));
    // Set a rendered `MultipleFetches` to a deconstructed `getByTestId`, `getByText`, and `queryByText`.
    const { getByTestId, getByText, queryByText } = render(<MultipleFetches />);
    // Simulate a click event on the button with text "Fetch post and comments".
    fireEvent.click(getByText("Fetch post and comments"));
    // Wait until the "fetch-error-post" node ID is present.
    await waitFor(() => getByTestId("fetch-error-post"));
    // Verify that the fetch call has been called once.
    expect(global.fetch).toHaveBeenCalledTimes(1);
    // Verify the fetch API call url is "https://jsonplaceholder.typicode.com/posts/1".
    expect(global.fetch.mock.calls[0][0]).toBe("https://jsonplaceholder.typicode.com/posts/1");
    // Verify that the node with id "fetch-error-comments" has content text of "Failed to fetch".
    expect(getByTestId("fetch-error-post").textContent).toBe("Failed to fetch");
    // Verify that there is no present node with text "All fetched!".
    expect(queryByText("All fetched!")).toBeFalsy();
  });
});