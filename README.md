# Developer Documentation
## Components

### React Tree of dataShow App

![React Tree](https://github.com/luis2605/dataShow/blob/test_users/dataShow/src/assets/img/react_tree.png)

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



### FilterComponent  React Component

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

### LanguageSelector React Component

The `LanguageSelector` component is responsible for providing language selection functionality in the application. It allows users to choose from a list of supported languages and dynamically updates the application's language using the `i18n` internationalization library. This documentation provides an overview of the component's state variables, functions, and associated UI elements.

#### State Variables

1. `currentLang`: A state variable that stores the currently selected language, initialized with "English" by default.
2. `showDropdown`: A state variable that controls the visibility of the language selection dropdown menu.
3. `i18n`: An instance of the `i18n` object obtained using the `useTranslation` hook to manage translations.

#### Language Data

The component defines an array of language objects, each containing the following properties:

- `name`: The name of the language (e.g., "English").
- `flag`: The URL of an image representing the flag of the respective language.

#### Functions

1. `handleLanguageChange(language)`: A function that handles language selection. It updates the `currentLang` state, changes the application's language using `i18n.changeLanguage()`, and hides the language selection dropdown.

2. `toggleDropdown()`: A function that toggles the visibility of the language selection dropdown menu.

#### Rendered UI

The component renders the following UI elements:

- The currently selected language displayed as a flag and text.
- A dropdown menu containing language options with flags and language names.

#### Conditional Styling

The component applies conditional CSS classes based on the presence of data in `onJsonData` (a prop passed to the component). This allows for different styles when displaying language selection in different contexts.

- `currentLangClasses`: Conditional class for the currently selected language element.
- `langTextClasses`: Conditional class for the language text.
- `langDropdownClasses`: Conditional class for the language dropdown.

#### Usage

The `LanguageSelector` component can be easily integrated into your application to provide multilingual support. Users can select their preferred language, and the component will update the application's language accordingly. You can extend the `languages` array to support additional languages and their respective flags.

#### CSS Styles

The component uses CSS modules for styling. The CSS classes are imported from an external CSS module file (`languageSelector.module.css`) and applied to various UI elements to control their appearance.

### FilterComponentTutorial React Component

The `FilterComponentTutorial` component is responsible for providing an interactive tutorial for users on how to use filtering features within the application. It utilizes the "intro.js-react" library to create step-by-step guides for different actions and elements. This documentation provides an overview of the component's state variables, functions, and usage.

#### State Variables

1. `steps`: A state variable that holds an array of tutorial steps. Each step object contains two properties:
   - `element`: A selector that specifies the HTML element to highlight during that step.
   - `intro`: A text description providing guidance to the user for the current step.

2. `initialStep`: A state variable that determines the starting step of the tutorial.

#### Translation and Language Support

The component uses the `useTranslation` hook from the "react-i18next" library to support multiple languages. It dynamically updates the tutorial steps based on the resolved language (`i18n.resolvedLanguage`) to ensure that users receive instructions in their preferred language.

The `steps` array is updated according to the resolved language to provide instructions in English, Spanish, or German.

#### Functions

1. `useEffect`: An effect hook that listens for changes in the resolved language (`i18n.resolvedLanguage`) and updates the `steps` array with language-specific instructions.

#### Rendered UI

The component renders the tutorial using the "intro.js-react" library, allowing for step-by-step guidance to users. It can be enabled or disabled based on the `onStepsEnabled` prop, and it can start from a specified step using the `initialStep` prop.

#### Usage

The `FilterComponentTutorial` component is intended to be used as a part of the filtering interface to provide users with an interactive guide on how to use the filtering features effectively. It helps users understand the various actions they can perform within the application, such as filtering data, displaying additional information, and exporting data.

#### Dependencies

- "intro.js": The component relies on the "intro.js" library to create interactive tutorials.
- "intro.js-react": The "intro.js-react" library is used to integrate "intro.js" with React components.

#### Translation and Localization

The component supports multiple languages by dynamically updating tutorial text based on the user's language preference. Developers can extend the `steps` array to include translations for additional languages as needed.

### CustomSelectedData React Component

The `CustomSelectedData` component is responsible for exporting data from the application. It provides functions to export filtered table data, raw data, and selected data into Excel files. Additionally, it allows users to include custom metadata, such as the username and project amount, in the exported Excel files. This documentation provides an overview of the component's functions and usage.

#### Functions

1. `convertArraysToStrings(array)`: This function takes an array of objects and converts any properties that are arrays into JSON strings. It is used to prepare data for export by ensuring that nested arrays are represented as strings.

2. `handleRawDataExport()`: This function exports raw data from the `onMultipleFilterData` prop to an Excel file named "RawDataToExcel.xlsx." It modifies the original data by extracting and formatting specific properties like `PriceAmount`.

3. `handleSelectionExport()`: This function exports selected data from the `onCustomSelectedData` prop to an Excel file named "SelectedDataToExcel.xlsx." It modifies the data by parsing the `hasVideoOnSocialbnb` property, adding custom metadata (e.g., username and project amount), and formatting various properties.

4. `handleTableExport()`: This function exports table data to an Excel file named "TableToExcel.xlsx." It converts the table content into JSON format, calculates the "Price + Commission" column, formats nested JSON strings, and extracts and formats individual activities. It also includes custom metadata (e.g., username and project amount) in the exported file.

#### Usage

The `CustomSelectedData` component is used to provide users with the ability to export different types of data from the application. It offers the following export options:

- Exporting the filtered table data with additional calculations.
- Exporting raw data from the `onMultipleFilterData` prop.
- Exporting selected data from the `onCustomSelectedData` prop.

The component renders export buttons that trigger the corresponding export functions when clicked.

#### Translation and Localization

The component uses the `useTranslation` hook to provide translations for button labels and metadata keys. Developers can use this component to support multiple languages by configuring translations using the `t` function from the hook.




