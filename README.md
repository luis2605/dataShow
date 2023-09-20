# Developer Documentation
## Components

### CSVToJSON React Component
The `CSVToJSON` component is the core component of the application, responsible for handling CSV file input, conversion to JSON, and rendering the user interface. This documentation provides an overview of its state variables, functions, and associated components.

#### State Variables

1. `userName`: A state variable to store the user's name input.
2. `userNameSubmitted`: A state variable to track whether the user's name has been submitted.
3. `jsonData`: A state variable to store the JSON data parsed from the CSV file containing listings.
4. `jsonUserData`: A state variable to store the JSON data parsed from the CSV file containing user data.
5. `overlay`: A state variable to manage the visibility of an overlay when no CSV data is loaded.
6. `openHelpInitial`: A state variable to control the visibility of the help modal for listings.
7. `openHelpUsersInitial`: A state variable to control the visibility of the help modal for user data.
8. `drawerVisible`: A state variable to toggle the visibility of a side drawer.
9. `fileName`: A state variable to store the name of the CSV file containing listings.
10. `fileUserName`: A state variable to store the name of the CSV file containing user data.

#### Functions

1. `handleMouseDown(e)`: A function to handle the mouse down event and apply a style transformation to an element.
2. `capitalizeEachWord(str)`: A utility function that takes a string as input and returns a new string with the first letter of each word capitalized.
3. `handleChange(event)`: A function to handle changes in the user's name input and update the `userName` state.
4. `handleSubmit(event)`: A function to handle form submission and set `userNameSubmitted` to `true` if the user's name is not empty.
5. `goBackToNameInput()`: A function to reset the user name input when the user clicks back.
6. `handleListingsFileUpload(e)`: A function to handle the upload of a CSV file containing listings, parse it into JSON, and set the `jsonData` state.
7. `handleUserFileUpload(e)`: A function to handle the upload of a CSV file containing user data, parse it into JSON, and set the `jsonUserData` state.
8. `removeListingCsvFile()`: A function to clear the listings data and reset related state variables.
9. `removeUserCsvFile()`: A function to clear the user data and reset related state variables.
10. `toggleDrawer()`: A function to toggle the visibility of the side drawer and overlay.

#### Rendered UI

The component renders various UI elements, including file upload inputs, buttons, modals for help, and other interface components like language selectors.

#### Other Components and Libraries

1. `FilterComponent`: This component receives JSON data and file metadata as props and is responsible for filtering and displaying data. More detailed documentation is recommended within this component.
2. `Modal`: This component is used to display modals for providing help and instructions to users.
3. `LanguageSelector`: This component is responsible for allowing users to select their preferred language.

#### CSS Styles

The component uses CSS modules for styling. The CSS classes are imported from an external CSS module file (`csvToJson.module.css`) and applied to various UI elements to control their appearance.

Please note that while this documentation provides an overview of the component and its functionalities, more detailed documentation and comments within the code itself are recommended for developers who will be working on or maintaining this codebase. Additionally, documentation should be kept up-to-date as the code evolves.



### FilterComponent

The `FilterComponent` is a React component responsible for rendering various filtering and display options for data. It consists of the following sub-components:

- `FilterComponentTutorial`: This sub-component provides a tutorial and guidance on using the filtering features.

- `Modal`: Modal components are used to display pop-up windows for actions like viewing help, charts, and selections.

- `CustomSelectedData`: This sub-component displays custom selected data based on filtering.

#### Functions

- `handleShow`: This function is called to show the filtering options.

- `showHideMore`: Toggles the display of extra categories.

- `toggleSteps`: Toggles the display of tutorial steps.

- `clearSelection`: Clears the selected items.

- `openModalCharts`: Opens the modal for displaying charts.

- `openModalSelection`: Opens the modal for displaying selections.

- `closeModalHelp`: Closes the help modal.

- `closeModalCharts`: Closes the charts modal.

- `closeModalSelection`: Closes the selection modal.

- `handleMouseDown` and `handleMouseUp`: Handle mouse events for buttons.

#### BarChart

The `BarChart` component is responsible for rendering bar chart visualizations using data from `countryCount`.

#### CustomSelectedData

This component displays custom selected data based on the applied filters.

#### Usage

The `FilterComponent` is used to provide a user-friendly interface for filtering and displaying data. It allows users to:

- Filter data based on various criteria such as status, continent, country, room type, and more.

- View data in a tabular format with sorting and pagination.

- Display charts based on filtered data.

- Clear selections and reset filters.

- Access tutorials and help.
  
#### CSS Styles

The component uses CSS modules for styling. The CSS classes are imported from an external CSS module file (`filterComponent.module.css`) and applied to various UI elements to control their appearance.

Please refer to the code for specific styles applied to each component.
