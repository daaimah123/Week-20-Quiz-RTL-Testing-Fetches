# RTL Testing a setTimeout

## Add GIF of expected behavior here!!!

### Helpful Tips to Get You Started

##### Setup Commands
```
git clone <repo>
# install dependencies
npm i
# run and view application ui in browser
npm run start
# run and view test output 
npm run test
```

##### Syntax
- `jest.spyOn(global, "fetch")` to mock `fetch` implementation
- `await wait(() ={'>'} getByTestId("my-async-element"))` to wait until element is visible
- `global.fetch.mockClear` to clear mock after test
- `global.fetch.mock.calls` returns an array of function invocations, which in turn returns an array with the `args` used in each invocation
- `describe` to group API tests and clear mock after each
- `mockImplementationOnce` to have more control over multiple API requests
- `await wait()` holds until the next tick, e.g. API call or `setTimeout`
- Before setting up your test suites, you should use `afterEach(cleanup)` (after imports) in order to unmount any React trees that were mounted with render

### Testing MultipleFetches
Create five tests for the Counter component.

- The first test should verify that component starts without any post.
  - Set a rendered `MultipleFetches` to a deconstructed `queryByTestId`.
  - Verify that the queried element id "fetch-post" does not have content and returns null.
- The second test should handle a button click that displays a loading message.
  - Set a rendered `MultipleFetches` to a deconstructed `queryByTestId` and `getByText`.
  - Simulate a click event on the button with text "Fetch post and comments".
  - Verify that the node with id "fetch-loading-post" has content text of "Loading post...".
- The third test should group all API tests together and clear each mock after each test.
  - Mock fetching an API implementation.
  - Mock single fetch call to have more control over multiple API requests.
  - If call is successful return and object with a key of title and a value of text "How to Become a Bad Developer".
  - Mock a second fetch call to have more control over multiple API requests.
  - If call is successful return an array of objects containing two key-value pairs; the first key an incremented id on each object, and a second key of name with the first object value being "Rafael" and the second value being "Andressa".
  - Set a rendered `MultipleFetches` to a deconstructed `getByTestId`, `getByText`, and `getAllByTestId`.
  - Simulate a click event on the button with text "Fetch post and comments".
  - Wait for the next API call.
  - Verify that the fetch call has been called twice.
  - Verify the first fetch API call url is "https://jsonplaceholder.typicode.com/posts/1".
  - Verify the second fetch API call url is "https://jsonplaceholder.typicode.com/posts/1/comments".
  - Verify that the node with id "fetch-post" has content text of "How to Become a Bad Developer".
  - Verify that there is a node present with text "All fetched!".
  - Set the component id "comment-author" to an authors variable.
  - Verify that the first author's name is "Rafael".
  - Verify that the first author's name is "Andressa".
- The fourth test should handle displaying comment if API fails.
  - Mock fetching an API implementation.
  - If call is successful return and object with a key of title and a value of text "How to Become a Bad Developer"
  - If call is unsuccessful return a 500 status.
  - Set a rendered `MultipleFetches` to a deconstructed `getByTestId`, `getByText`, and `queryByText`.
  - Simulate a click event on the button with text "Fetch post and comments".
  - Wait for the next API call.
  - Verify that the fetch call has been called twice.
  - Verify the first fetch API call url is "https://jsonplaceholder.typicode.com/posts/1".
  - Verify the second fetch API call url is "https://jsonplaceholder.typicode.com/posts/1/comments".
  - Verify that the node with id "fetch-post" has content text of "How to Become a Bad Developer".
  - Verify that the node with id "fetch-error-comments" has content text of "Failed to fetch".
  - Verify that there is no present node with text "All fetched!".
- The fifth test should handle displaying post error if API fails.
  - Mock fetching an API implementation.
  - If call is unsuccessful return a 500 status.
  - Set a rendered `MultipleFetches` to a deconstructed `getByTestId`, `getByText`, and `queryByText`.
  - Simulate a click event on the button with text "Fetch post and comments".
  - Wait until the "fetch-error-post" node ID is present.
  - Verify that the fetch call has been called once.
  - Verify the fetch API call url is "https://jsonplaceholder.typicode.com/posts/1".
  - Verify that the node with id "fetch-error-comments" has content text of "Failed to fetch".
  - Verify that there is no present node with text "All fetched!".

  ### Testing Fetch
  Create four tests for the Counter component.

- The first test should verify that the component starts without any joke.
  - Set a rendered `Fetch` to a deconstructed `queryByTextId`.
  - Verify that the queried element id "fetch-joke" does not have content and returns null.
- The second test should handle a button click that displays a loading message.
  - Set a rendered `Fetch` to a deconstructed `queryByTestId` and `getByText`.
  - Simulate a click event on the button with text "Get a Chuck Norris joke".
  - Verify that the node with id "fetch-loading" has content text of "Loading...".
- The third test should handle displaying a joke if API succeeds, upon button click.
  - Mock fetching an API implementation.
  - If call is successful return and object with a key-value "Chuck Norris counted to infinity. Twice.".
  - Set a rendered `Fetch` to a deconstructed `queryByTestId` and `getByText`.
  - Simulate a click event on the button with text "Get a Chuck Norris joke".
  - Wait until the "fetch-joke" node ID is present.
  - Verify that the node with id "fetch-joke" has content text of "Chuck Norris counted to infinity. Twice.".
  - Verify that the fetch call has been called once.
  - Verify the fetch API call url is "https://api.chucknorris.io/jokes/random".
  - Clear mock after test.
- The fourth test should handle displaying an error if API fails, upon button click.
  - Mock fetching an API implementation.
  - If call is unsuccessful return a 500 status.
  - Set a rendered `Fetch` to a deconstructed `queryByTestId` and `getByText`.
  - Simulate a click event on the button with text "Get a Chuck Norris joke".
  - Wait until the "fetch-error" node ID is present.
  - Verify that the node with id "fetch-error" has content text of "Failed to fetch".
  - Verify that the fetch call has been called once.
  - Verify the fetch API call url is "https://api.chucknorris.io/jokes/random".
  - Clear mock after test.
