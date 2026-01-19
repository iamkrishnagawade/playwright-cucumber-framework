Feature: User Login

  Scenario: Successful login with valid credentials
    Given I navigate to the login page
    When I enter "standard_user" and "secret_sauce"
    Then I should see the "Products" title