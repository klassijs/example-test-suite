
# Example Test Project
[![Webdriverio API](https://img.shields.io/badge/webdriverio-docs-40b5a4)](https://webdriver.io/docs/api.html)

## How to use
Each tested feature should add two files, at minimum:
- Feature file in [`/features`](/features), called `<name>.feature`
- Step definition file in [`/step_definitions`](/step_definitions), called `<name>-steps.js`

### Feature
A feature file is a Gherkin document, describing the steps taken to perform tests. It should contain one `Feature` and at least one `Scenario`. Each scenario is comprised of a series of steps, each preceded with a keyword: `Given`, `When`, `Then`, `And` or `But`.

`Feature`s and `Scenario`s are usually run according to their tags. Tags are placed on the line above, and always start with an `@` symbol. `Feature`-level tags apply to all its `Scenario`s; `Scenario`-level tags apply to only that specific one.

Please see the [Cucumber Gherkin reference](https://cucumber.io/docs/gherkin/reference).

### Step Definition
A step definition file is a JavaScript implementation of the respective **feature** file. Each step used in the feature should be matched with an equivalent JavaScript method.

We use the Page Object Model for constructing tests: direct control of web pages under test should be abstracted into page objects (in [`/page-objects`](/page-objects)). Step definition files should NOT contain any code that directly interacts with a webpage. Calls to page object methods should be made via the globally-defined `pageObjects.getMethod`.

### Page Object
Page objects contain all the code relating to manipulation of the web pages being tested, to abstract it away from the step definitions. The goal is that, if a page is completely redesigned, no step or feature file should need to be rewritten, only its respective page object file.

There should be no more than one page object file per page to be tested: please check that no relevant file exists before creating a new one. A single file might also cover interactions with many pages in the case of common features, for example to provide controls over a shared header.

### Code guidelines:
- Use [eslint](https://eslint.org/) with the provided `.eslintrc` to ensure best practices are always applied
- Ensure that [selectors](http://beta.webdriver.io/docs/selectors.html) are unique and unlikely to change
- Use [helper methods](#helpers) to simplify common tasks. These are global, so no `require` is necessary, just call them as shown.
  - Do NOT copy code from the OAF helpers file. Call the relevant method instead.
- Limit the use of `$` and `$$` commands
- Don't hard-code any values into tests: use variables or json to store test data
- Don't pause: to wait for something to happen, use the relevant wait command
- Keep it simple

## Project Setup
After creating a new project, please add the project name (i.e. 'eReader-test-suite') to these files:
```bash
- Lambdatest folder - all files
- .dataConfigrc.js
- package.json
- .versionrc.json

For simplicity we have two default tags for test execution @regression and @integration.
As a rule of thumb we use the @integration tag on at least one Scenario per Feature file.
```
## Usage
After checking out the template go to the project root and run:
```bash
pnpm install 

```

## Test Execution
```bash

Run the following command to execute the tests:
pnpm run dev @search

On completion **DELETE** all files in the page-objects, shared-objects, step_definitions and features folders, expect s3Report.feature and s3Report-steps.js
```

## Options

```bash
--help                              output usage information
--version                           output the version number
--browser <name>                    name of browser to use (chrome, firefox). defaults to chrome
--tags <@tagName>                   name of cucumber tags to run - Multiple TAGS usage
--steps <path>                      path to step definitions. defaults to ./step_definitions
--featureFiles <path>               path to feature definitions. defaults to ./features
--pageObjects <path>                path to page objects. defaults to ./page-objects
--sharedObjects <paths>             path to shared objects - repeatable. defaults to ./shared-objects
--reports <path>                    output path to save reports. defaults to ./reports
--disableReport                     disables the test report from opening after test completion
--email                             sends email reports to stakeholders
--env <path>                        name of environment to run the framework/test in. default to dev
--reportName <optional>             name of what the report would be called i.e. 'Automated Test'
--remoteService <optional>          which remote driver service, if any, should be used e.g. lambdatest
--extraSettings <optional>          further piped configs split with pipes
--updateBaselineImages              automatically update the baseline image after a failed comparison
--browserOpen                       this leaves the browser open after the session completes, useful when debugging test. defaults to false', false
--dlink                             the switch for projects with their test suite, within a Test folder of the repo
--dryRun                            the effect is that Cucumber will still do all the aggregation work of looking at your feature files, loading your support code etc but without actually executing the tests
--useProxy                          this is in-case you need to use the proxy server while testing'
--skipTag <@tagName>                provide a tag and all tests marked with it will be skipped automatically.
```
## Options Usage
```bash
  --tags @get,@put || will execute the scenarios tagged with the values provided. If multiple are necessary, separate them with a comma (no blank space in between).
  --featureFiles features/utam.feature,features/getMethod.feature || provide specific feature files containing the scenarios to be executed. If multiple are necessary, separate them with a comma (no blank space in between).
```

## Helpers
OAF contains a few helper methods to help along the way, these methods are:
```js
// This will assert 'equal' text being returned
await helpers.assertText(selector, expected);

// This will assert text being returned includes
await helpers.expectToIncludeText(selector, expectedText);

// this asserts that the returned url is the correct one
await helpers.assertUrl(expected);

//writing json data from above to UrlData json file
await helpers.writeToUrlsData();

//converting a json file to excel. Wrting the json data generated using above functions to an excel file. Useful to get stats of URLs loading times.
await helpers.convertJsonToExcel();



```

## Helpers
OAF contains a few helper methods to help along the way, these methods are:

| Function                                                | Description                                                                         |
|:--------------------------------------------------------|:------------------------------------------------------------------------------------|
| await helpers.loadPage('url', timeout)                  | Loads the required page                                                             |
| await helpers.writeToTxtFile(filepath, output)          | Writes content to a text file                                                       |
| await helpers.readFromFile(filepath)                    | Reads content from a text file                                                      |
| await helpers.currentDate()                             | Applies the current date to files                                                   |
| await helpers.getCurrentDateTime()                      | Get current date and time                                                           |
| await helpers.clickHiddenElement(selector, textToMatch) | Clicks an element that is not visible                                               |
| await helpers.getRandomIntegerExcludeFirst(range)       | Get a random integer from a given range                                             |
| await helpers.getLink(selector)                         | Get the href link from an element                                                   |
| await helpers.waitAndClick(selector)                    | Wait until and element is visible and click it                                      |
| await helpers.waitAndSetValue(selector, value)          | Wait until element to be in focus and set the value                                 |
| await helpers.getElementFromFrame(frameName, selector)  | Get element from frame or frameset                                                  |
| await helpers.readFromJson()                            | Read from a json file                                                               |
| await helpers.writeToJson()                             | Write data to a json file                                                           |
| await helpers.mergeJson()                               | Merge json files                                                                    |
| await helpers.reportDateTime()                          | Reporting the current date and time                                                 |
| await helpers.apiCall(url, meethod, auth, form, body)   | API call for GET, PUT, POST and DELETE functionality using PactumJS for API testing |
| await helpers.getElementFromFrame()                     | Get element from frame or frameset                                                  |
| await helpers.generateRandomInteger(range)              | Generate random integer from a given range                                          |
| await helpers.randomNumberGenerator(length = 13)        | Generates a random 13 digit number                                                  |
| await helpers.reformatDateString()                      | Reformats date string into string                                                   |
| await helpers.sortByDate()                              | Sorts results by date                                                               |
| await helpers.filterItem(selector, itemToFilter)        | Filters an item from a list of items                                                |
| await helpers.filterItemAndClick()                      | Filters an item from a list of items and clicks on it                               |
| await helpers.fileUpload(selector, filePath)            | Uploads a file from local system or project folder                                  |
| await helpers.uploadFiles(filePath, locator)            | Upload multiple files with extension from local system or project folder            |
| await helpers.switchWindowTabs(tabId)                   | Switches between browser window tabs                                                |
| await helpers.verifyDownload(fileName)                  | Verifies the download of a file                                                     |
| await helpers.pageView(selector)                        | Bring element on the page into view                                                 |
| await helpers.getDisplayedElement(locator)              | Gets the displayed element among multiple matches                                   |
| await helpers.getStartDateTime()                        | Gets the start date and time of the test run                                        |
| await helpers.getEndDateTime()                          | Gets the end date and time of the test run                                          |


## Browser usage
By default, the test run using Google Chrome/devtools protocol, to run tests using another browser locally you'll need a local selenium server running, supply the browser name along with the `--browser` switch

| Browser | Example |
| :--- | :--- |
| Chrome | `--browser chrome` |
| Firefox | `--browser firefox` |

All other browser configurations are available via 3rd party services (i.e. lambdatest | browserstack | sourcelab)


## How to debug

Most webdriverio methods return a [JavaScript Promise](https://spring.io/understanding/javascript-promises "view JavaScript promise introduction") that is resolved when the method completes. The easiest way to step in with a debugger is to add a ```.then``` method to the function and place a ```debugger``` statement within it, for example:

```js
  When(/^I search DuckDuckGo for "([^"]*)"$/, function (searchQuery, done) {
    elem = browser.$('#search_form_input_homepage').then(function(input) {
      expect(input).to.exist;
      debugger; // <<- your IDE should step in at this point, with the browser open
      return input;
    })
       done(); // <<- let cucumber know you're done
  });
```

## Commit conventions

To enforce best practices in using Git for version control, this project includes a **Husky** configuration. Note that breaking the given rules will block the commit of the code.

### Commits
 After committing the staged code, the Husky scripts will enforce the implementation of the [**Conventional Commits specification**](https://www.conventionalcommits.org/en/v1.0.0/#summary).

To summarize them, all commits should follow the following schema:

```
git commit -m "<type>: <subject>"
```

Where **type** is one of the following:

- **fix**: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
- **feat**: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
- **BREAKING CHANGE**: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
- Types other than **fix:** and **feat:** are allowed, for example @commitlint/Tconfig-conventional (based on the Angular convention) recommends **build:, chore:, ci:, docs:, style:, refactor:, perf:, test:**, and others.
footers other than **BREAKING CHANGE:** may be provided and follow a convention similar to git trailer format.

Please keep in mind that the **subject** must be written in lowercase.

### Branch naming

The same script will also verify the naming convention. Please remember that we only allow for two possible branch prefixes:

- **testfix/**
- **automation/**

## License

Licenced under [MIT License](LICENSE) &copy; 2016 [Larry Goddard](https://www.linkedin.com/in/larryg)
