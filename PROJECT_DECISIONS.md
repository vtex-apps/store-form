# Motivation

This project was first thought of as a way to create a configurable formulary that can interact with [MasterData](https://help.vtex.com/tutorial/master-data-v2--3JJ1mlzuo88w22gO0gy0QS#introduction) using a pre-configured schema to build the form.

# Project decisions

## Form library

The first option we thought of using for our form library solution was [react-json-schema-form](https://github.com/rjsf-team/react-jsonschema-form) but in the end we decided not to use it due to it's size. Then we were left between [React Hook Form](https://react-hook-form.com/) and [Formik](https://jaredpalmer.com/formik/), but reading through the issues in each repository and comparing their bundled sizes we ended up with React Hook Form as our form library.

## Objectives changed

After a few days implementing the store-form we decided it would be better to split the visual part(the UI) and the logical part(the part that processes the schema) into two different libraries and link them together using hooks. The logical part will expose hooks that can help a user of the library to build upon the processed schema, with built-in validation and reconstruction of the schema when submitted, this will allow the end user of the library to show the information contained in the schema in any way they want, wether using inputs, or select or buttons, or any other kind of crazy input type the end user decides on using, and the logical part behind the hooks would handle all the validation and the parsing and handling of the JSON schema.
