@integration @regression
Feature: Searching for apps with duckduckgo
  As an internet user
  In order to find out more about certain user apps
  I want to be able to search for information about the required apps

  @test
  Scenario Outline: User inputs a <searchword> and searches for data
    Given The user is on the site search page
    When they enter the <searchword>
    Then they should see the results <searchword>

    Examples:
      |searchword  |
      |space         |
#      |mango |
