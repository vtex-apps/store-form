# Motivation

This project was first thought of as a way to create a configurable formulary that can interact with [MasterData](https://help.vtex.com/tutorial/master-data-v2--3JJ1mlzuo88w22gO0gy0QS#introduction) using a pre-configured schema to build the form.

# Project decisions

## Form library

The first option we thought of using for our form library solution was [react-json-schema-form](https://github.com/rjsf-team/react-jsonschema-form) but in the end we decided not to use it due to it's size. Then we were left between [React Hook Form](https://react-hook-form.com/) and [Formik](https://jaredpalmer.com/formik/), but reading through the issues in each repository and comparing their bundled sizes we ended up with React Hook Form as our form library.
