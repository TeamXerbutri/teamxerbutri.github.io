# Finding the right architecture

The desired qualities are:

- Modifiability: The cost of introducing change should be as low as possible
- Performance: Loading times should be as small as possible

Challenges and desired Outcome:

- Low cost solution, preferably a static website
- Backward compatibility, because of broken routes, the solution should be backwards compatible
- Easy to maintain the code, not dependent on a framework or language-rewrite any time soon!

Wishlist:

- Lighthouse (Google) of the new site should be as fast or better than the old one
- Merge of version 5 and version 4
- Performance and accessibility
- Multi language support for merging version 4 and 5

Forces:

- Version 5 is out-of-date soon, so we need a new solution (language version)
- Hosting is becoming very expensive the old way (DB - API - FE).

## Status

Go!

## Decision

Use smart front end with javascript, not a framework.

## Rationale

- Fast 1:1 translate the logic from PHP to Javascript
- Use vite (experience with vite and github pages)

## Consequences

### Advantages

Speed!
Simplicity.
No learning curve for new framework

### Disadvantages

- Having all these different JSON files storing the same data means eventual consistency for the CMS-app
- Having the code in a repository means the team needs to do pushes to this repo to update the website.