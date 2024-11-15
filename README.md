
# Example Test Suite
[![Webdriverio API](https://img.shields.io/badge/webdriverio-docs-40b5a4)](https://webdriver.io/docs/api.html)

## Project Setup
After creating a new project, please add the project name (i.e. 'eReader-test-suite') to these files:
```bash
- Lambdatest folder all files
- .dataConfigrc.js
- package.json
- .versionrc.json

For simplicity we have two default tags for test execution @regression and @integration.
As a rule of thumb we use the @integration tag on at least one Scenario per Feature file.
```
## Usage
After checking out the template go to the project root and run:
```bash
yarn install 
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
--wdProtocol                        the switch to change the browser option from using devtools to webdriver
--browserOpen                       this leaves the browser open after the session completes, useful when debugging test. defaults to false', false
--dlink                             the switch for projects with their test suite, within a Test folder of the repo
--dryRun                            the effect is that Cucumber will still do all the aggregation work of looking at your feature files, loading your support code etc but without actually executing the tests
--utam                              this launches the compiler for salesforce scripts
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
// Load a URL, returning only when the <body> tag is present
await helpers.loadPage('https://duckduckgo.com');

// writing content to a text file
await helpers.writeToTxtFile(filepath, output);

// reading content froma text file
await helpers.readFromFile(filepath);

// applying the current date to files
await helpers.currentDate();

// get current date and time (dd-mm-yyyy-00:00:00)
await helpers.getCurrentDateTime();

// clicks an element (or multiple if present) that is not visible, useful in situations where a menu needs a hover before a child link appears
await helpers.clickHiddenElement(selector, textToMatch);

// This method is useful for dropdown boxes as some of them have default 'Please select' option on index 0
await helpers.getRandomIntegerExcludeFirst(range);

// Get the href link from an element
await helpers.getLink(selector);

//wait until and element is visible and click it
await helpers.waitAndClick(selector);

// wait until element to be in focus and set the value
await helpers.waitAndSetValue(selector, value);

// function to get element from frame or frameset
await helpers.getElementFromFrame(frameName, selector);

// This will assert 'equal' text being returned
await helpers.assertText(selector, expected);

// This will assert text being returned includes
await helpers.expectToIncludeText(selector, expectedText);

// this asserts that the returned url is the correct one
await helpers.assertUrl(expected);

//reading from a json file
await helpers.readFromJson();

//writing data to testData json file in shared objects folder
await helpers.write();

//writing data to a json file 
await helpers.writeToJson();

//writing json data from above to UrlData json file
await helpers.writeToUrlsData();

//merging json files
await helpers.mergeJson();

//converting a json file to excel. Wrting the json data generated using above functions to an excel file. Useful to get stats of URLs loading times.
await helpers.convertJsonToExcel();

//Taking visual baselines
await helpers.takeImage();

//compare visual baselines
await helpers.compareImage();

//hide elements
await helpers.hideElements();

//show elements
await helpers.showElements();

//reporting the current date and time
await helpers.reportDateTime();

//get the start time of a run
await helpers.getEndDateTime();

//get the end time of a run
await helpers.getStartDateTime();

//API call for GET, PUT, POST and DELETE functionality using PactumJS for API testing
await helpers.apiCall();

//function for recording Accessibility logs from the test run
await helpers.accessibilityReport();

//function for recording total errors from the Accessibility test run
await helpers.accessibilityError();

//Get the href link from an element
await helpers.getLink();

//function to get element from frame or frameset
await helpers.getElementFromFrame();

//Generate random integer from a given range
await helpers.generateRandomInteger();

//this generates the full execution time for a full scenario run
await helpers.executeTime();

//Generates a random 13 digit number
await helpers.randomNumberGenerator();

//Reformats date string into string
await helpers.reformatDateString();

//Sorts results by date
await helpers.sortByDate();

//this filters an item from a list of items
await helpers.filterItem();

//this filters an item from a list of items and clicks on it
await helpers.filterItemAndClick();

//this uploads a file from local system or project folder. Helpful to automate uploading a file when there are system dialogues exist.
await helpers.fileUpload();
```

## Browser usage
By default, the test run using Google Chrome/devtools protocol, to run tests using another browser locally you'll need a local selenium server running, supply the browser name along with the `--wdProtocol and --browser` switch

| Browser | Example |
| :--- | :--- |
| Chrome | `--wdProtocol --browser chrome` |
| Firefox | `--wdProtocol --browser firefox` |

All other browser configurations are available via 3rd party services (i.e. lambdatest | browserstack | sourcelab)

Selenium Standalone Server installation
```bash
// for Mac / Linux
yarn global add selenium-standalone@latest
selenium-standalone install && selenium-standalone start

// for Windows
npm install -g selenium-standalone@latest
selenium-standalone install
selenium-standalone start
```

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
