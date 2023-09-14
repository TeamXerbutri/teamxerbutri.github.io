# Finding the right architecture 

I want to learn about domain-driven design and have a show-case project.

The desired qualities are:
- Maintainability: Modifiable! It should be easy to maintain the website for the Xerbutri team
- Modifiability: The cost of introducing change should be as low as possible
- Performance: Loading times should be as small as possible

Challenges and desired Outcome:
- Low cost solution, preferably a static website
- Lighthouse (Google) of the new site should be as fast or better than the old one
- Backward compatibility, because of broken routes, the solution should be backwards compatible
- Merge of version 5 and version 4
- Easy to maintain the code, not dependent on a framework or language-rewrite any time soon!
- Performance and accessibility
- Multi language support for merging version 4 and 5

Forces:
- Version 5 is out-of-date soon, so we need a new solution (language version)
- Hosting is becoming very expensive the old way (DB - API - FE).

## Status
In progress

## Decision 

Use smart front end with either javascript or typescript, not a framework.
- Keep the codebase as small as possible for quick loading times
- Use smart front end. The team does not have protected logic, it is all out there.
- 

## Rationale 

...


## Consequences

### Advantages

...


### Disadvantages

- Having all these different JSON files storing the same data means eventual consistency for the CMS-app
- Having the code in a repository means the team needs to do pushes to this repo to update the website.