# Configurations

A `configuration` is a package that contains a `.hintrc` configuration
file. This makes it easier and faster for users to have `webhint` up and
running and it also facilitates sharing configurations for different things
such as: related hints, urls to ignore, etc.
When installing a `configuration`, all its dependencies (`hint`s,
`connnector`s, `formatter`s, `parser`s) should be installed automatically
as well.

To use a `configuration`, you have to:

1. After installing `webhint`, install a configuration package. When running
   `--init`, the wizard will list you the official configuration packages but
   you can search on `npm`. Any package `@hint/configuration-` or
   `webhint-configuration-` should be a valid candidate.
2. Once installed, update your `.hintrc` to use it (this step is not needed
   if you are using the wizard):

```json
{
    "extends": ["configuration1"]
}
```

3. You are done!

The property `extends` is `Array<string>` so you can extend from multiple
configuration packages:

```json
{
    "extends": ["configuration1", "configuration2"]
}
```

The priority applies from left to right. Any values in your `.hintrc` file
will take precedence. For example, the following will always use the `summary`
formatter:

```json
{
    "extends": ["configuration1", "configuration2"],
    "formatters": ["summary"]
}
```
