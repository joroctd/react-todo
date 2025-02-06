## Deployed at: [https://johnoro-ctd-todo.netlify.app](https://johnoro-ctd-todo.netlify.app)

# Requirements

## General

- [x] Project is published on public GitHub repository
- [x] Project includes "Vite + React template" boilerplate structure
- [x] Project includes necessary dependencies
- [x] Code compiles without errors
- [x] Code executes without run-time errors in the browser
- [x] (Bonus) Code compiles and runs without warnings

## Project Structure

Repository includes `src/` directory with the following structure:

- [x] `index.js` or `main.jsx` (application entry-point)
- [x] `App.jsx` (root component)

- [x] `components/` directory with the following files:
  - [x] `AddTodoForm.jsx`
  - [x] `InputWithLabel.jsx`
  - [x] `TodoList.jsx`
  - [x] `TodoListItem.jsx`
  - [x] One or more CSS modules associated with the components above

## App Component

`App.jsx` contains the following:

- [x] Functional React component named `App`
- [x] Return statement that renders the following JSX:
  - [x] `Switch` component with two or more `Routes` that are navigable
    - [x] One route for "home" or "landing" page
    - [x] One or more routes which render a TodoList component
  - [x] (Bonus) Navigation menu
- [x] State variable named `todoList` with default value of an empty Array ([])
- [x] State variable named `isLoading` with default value of `true`
- [x] `useEffect` hook with dependency tableName and callback function that does the following:
  - [x] Using Fetch API, GET table records from Airtable for the given tableName
  - [x] Parse JSON response
  - [x] Sort response data by one or more properties
  - [x] Set todoList state to sorted data
  - [x] Set isLoading to false
- [x] Function named `addTodo` with parameter title that does the following:
  - [x] Using Fetch API, POST new record to Airtable with the given title field value
  - [x] Parse JSON response
  - [x] Set `todoList` state to new Array containing the added record
  - [x] (Bonus) Re-sort list data
- [x] Function named `removeTodo` with parameter id that does the following:
  - [x] Using Fetch API, DELETE record from Airtable given id
  - [x] Parse JSON response
  - [x] Set `todoList` state to new Array NOT containing the removed record
- [x] Return statement that renders the following JSX:
  - [x] Heading level-one with dynamic tableName
  - [x] `AddTodoForm` Component
  - [x] Conditional rendering based on isLoading state:
    - [x] If true, paragraph that reads "Loading..." or some equivalent message
    - [x] If false, `TodoList` Component

## AddTodoForm Component

`AddTodoForm.js` contains the following:

- [x] Functional React component named `AddTodoForm` with one prop: `onAddTodo`
- [x] Correct propTypes for the prop(s) listed
- [x] State variable named `todoTitle` with default value of an empty String ("")
- [x] Function named `handleTitleChange` with parameter event that does the following:
  - [x] Set `todoTitle` to given value from event
- [x] Function named `handleAddTodo` with parameter event that does the following:
  - [x] Prevent default event behavior (i.e. page refresh)
  - [x] Invoke callback prop `onAddTodo` and pass `todoTitle` from state
  - [x] Reset `todoTitle` value to an empty String ("")
- [x] Return statement that renders the following JSX:
  - [x] Form element with submit event handler
  - [x] `InputWithLabel` Component
  - [x] Button element with type "submit"

## InputWithLabel Component

`InputWithLabel.js` contains the following:

- [x] Functional React component named `InputWithLabel` with: `todoTitle`, `handleTitleChange`, and `children`
- [x] Correct propTypes for the prop(s) listed
- [x] Ref for Input element
- [x] `useEffect` hook with empty dependency list and callback function that does the following:
  - [x] Focus input ref
- [x] Return statement that renders the following JSX:
  - [x] Label element which renders text from `children` prop
  - [x] Input element which is configured as a "controlled component" with `value` and `onChange` attributes

## TodoList Component

`TodoList.js` contains the following:

- [x] Functional React component named `TodoList` with: `todoList` and `onRemoveTodo`
- [x] Correct propTypes for the prop(s) listed
- [x] Return statement that renders the following JSX:
  - [x] Unordered list element
  - [x] `map` statement which loops through todoList Array and returns TodoListItem Component

## TodoListItem Component

`TodoListItem.js` contains the following:

- [x] Functional React component named TodoListItem with: todo and onRemoveTodo
- [x] Correct propTypes for the prop(s) listed
- [x] Return statement that renders the following JSX:
  - [x] List-item element
  - [x] Title from todo Object
  - [x] Button element with text "Remove" and "onClick" event handler

## Styling

Use of third-party CSS libraries is discouraged for this project, we want to see your understanding of basic CSS concepts like rulesets, properties, and media queries

- [x] Project includes at least one CSS module (though, it is encouraged that you have a different module for each React component)
- [x] Application follows the style requirements outlines below:
  - [x] Change the background color of the page body
  - [x] Change the default text color
  - [x] Customize the font family
  - [x] (Bonus) Load in a font family from Google Fonts
  - [x] (Bonus) Customize style of navigation items
  - [x] Add spacing (padding/margin) between elements
  - [x] Change the font size, weight, and color of all headings
  - [x] Customize input and button styles
  - [x] Use Media Queries to make sure the application is responsive for all device sizes (mobile, tablet, desktop, etc.)
  - [x] (Bonus) Add multi-media usage (i.e. iconography)

## Extra:

- [x] Set up component directories to use an index file for exports (per [https://github.com/joroctd/react-todo/pull/11#discussion_r1924101718](https://github.com/joroctd/react-todo/pull/11#discussion_r1924101718))
- [x] Address the coupling of `sortData` with `fetchData` (per [https://github.com/joroctd/react-todo/pull/12#issuecomment-2605971857](https://github.com/joroctd/react-todo/pull/12#issuecomment-2605971857))
      I do realize that the `sortData` function still utilizes the `fetchData` function heavily, but I think it is better organzied and clearer in how and why it's doing so now. I wanted to maintain the options for both server and client side sorting just for the sake of it mostly. I'd probably just remove the server side rendering altogether in a production application if given the option.
- [x] Clean up types
- [x] Deploy
