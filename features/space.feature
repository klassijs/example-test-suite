@integration @regression
Feature: Searching for apps with duckduckgo
  As an internet user
  In order to find out more about certain user apps
  I want to be able to search for information about the required apps

  @space
  Scenario Outline: User inputs a <searchword> and searches for data
    Given The user is on the search page
    When they enter a <searchword>
    Then they should see a list of results <searchword>

    Examples:
      |searchword  |
      |space         |
      |mango |
