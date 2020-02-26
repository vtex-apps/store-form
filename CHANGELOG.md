# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Graphql mutation to save the form input in masterdata on submit.
- Error messages when submitting goes wrong.
- Success component(`form-success`) when the form is succesfully submitted.
- Graphql query to fetch the schema automatically from MasterData

### Changed

- props of `form-input` and `form-field-group` from `path` to `pointer`. And changed how to indicate the root path and subschema paths.

## [0.1.0] - 2020-02-04

### Added

- Intial release.
