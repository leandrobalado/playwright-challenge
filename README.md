# DESAFIO MONNET - Automation Repo

## Getting Started

This project requires the following:

- Tests are written in `TypeScript`.
- This framework utilizes `PlayWright` for test execution.
- IDE: The one of your preference.

## Installation:

1. Clone this repository:

```bash
    git clone https://github.com/leandrobalado/playwright-challenge
```

2. Install dependencies:

Using `npm` package manager:

```bash
    npm install
```

## Project Structure

- `/tests`: Contains specs file to run UI (Front-end) tests of the challenge.
- `/pages`: Contains file to handle POM.
- `/playwright.config.ts`: File which contains all Playwright configurations.

## Handle captcha

Running tests with browsers in incognito mode may need to handle captcha in the baseURL.
In order to aviod it, you will need to copy and paste the `handle-captcha.json` file provided in the submission section of the assignment.

> [!NOTE]
> Please, paste the file in the project root directory in order to be consumed by the specs files.

## Running Tests

To run all tests, run this command in your terminal:
```bash
npm run test
```
To run the First Exercise test, run this command in your terminal:
```bash
npm run test:firstPart
```
To run the Second Exercise test, run this command in your terminal:
```bash
npm run test:secondPart
```
To show the report of the last test execution, run this command in your terminal:
```bash
npm run test:report
```