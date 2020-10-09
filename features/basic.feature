Feature: Basic feature

  Scenario: Login Logout
    Given the website is open
    When I click on login menu
    And I fill in username and password
    And I click on login button
    Then I should find the user icon
    And I click on logout button

  Scenario: Login search logout
    Given the website is open
    When I click on login menu
    And I fill in username and password
    And I click on login button
    And I wait for user icon
    And I search for 'homeschooling'
    And I filter by '//input[@id="prc-<2€"]'
    And I filter by '//input[@id="ly-1. Lernjahr"]'
    Then I click on logout button
