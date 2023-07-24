# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.10.2] - 2023-07-24

### Fixed

- I18n fixes on readme.

## [0.10.1] - 2023-07-06

### Added
- Prop `value` to the documentation

## [0.10.0] - 2023-02-28

### Added
- Bulgarian, Catalan, Danish, German, Greek, Finnish, French, Italian, Dutch, Norwegian, Polish, Romanian, Russian, Slovakian, Swedish, Thai and Ukrainian translations.

### Fixed
- English translation.

## [0.9.0] - 2022-12-23

### Added
- Indonesian translation.

## [0.8.0] - 2022-07-22

### Added
- Arabic translation.

## [0.7.1] - 2021-08-10
### Fixed
- the value of date-time input field to UTC.

## [0.7.0] - 2021-07-13

### Added 
- Crowdin file. 

## [0.6.0] - 2021-03-25

### Added
- New prop `accept` to `form-input.upload`.

## [0.5.1] - 2021-03-17
### Fixed
- Change `form-input.upload` to render only on client since it breaks SSR.

## [0.5.0] - 2021-02-12

### Added
- Adding upload input.

## [0.4.0] - 2020-11-13
### Added
- Prop `placeholder` for text and textarea inputs.

## [0.3.9] - 2020-10-30
### Fixed
- Docs of block names.

## [0.3.8] - 2020-10-05
### Fixed
- Handle common errors in MasterData schemas.

## [0.3.7] - 2020-09-25
### Fixed
- Readme code block

## [0.3.6] - 2020-08-19
### Fixed
- Prop `label` of `form-input.textarea`.

## [0.3.5] - 2020-05-13
### Added
- Eslint configuration.

### Fixed
- Test errors.

### Security
- Bump dependencies versions.

## [0.3.4] - 2020-04-15

## [0.3.3] - 2020-04-07
### Fixed
- Docs typo

## [0.3.2] - 2020-03-02

### Fixed
- Docs typo

## [0.3.1] - 2020-02-28

## [0.3.0] - 2020-02-27

## [0.2.0] - 2020-02-24

### Added

- Graphql mutation to save the form input in masterdata on submit.
- Error messages when submitting goes wrong.
- Success component(`form-success`) when the form is succesfully submitted.
- Graphql query to fetch the schema automatically from MasterData

### Changed

- props of `form-input` and `form-field-group` from `path` to `pointer`. And changed how to indicate the root path and subschema paths.
- `form-input.input` to `form-input.text`

## [0.1.0] - 2020-02-04

### Added

- Intial release.
