# Routing

## Context

### Version 5

The current version of the website is a PHP application. The website is hosted on a server and the content is stored in
a database. The website is a multi-language website and the content is managed by a CMS

It has 3 templates/controllers for the website:

- Home
- Avontuur (Blog)
- Maps

The backend logic constructs the pages from a data model it gets from the database.

It has a nice separation of concerns, returning html pages with the data from the model.
The version 5 javascript is just for small interactions.

### Version 4

This is a PHP website, collecting data in the backend depending on the route, and returning a php page with the data
from the collected sources.

### Version 6

The new version should be backward compatible to version 4 and 5 routes.

## Status

work in progress

## Decision

Use a state machine, the routing in this website is in fact a sort of state.
In the future, a multi-page app would be better, but for now, we will use a state machine.

The machine looks at the url and changes the state accordingly.
There are three states: home, avontuur, maps.

## Rationale

... to be added ...

## Consequences

- The website is now a single page app
