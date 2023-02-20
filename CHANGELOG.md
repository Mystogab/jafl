### v3.0.0
- <b>BREAKING CHANGE</b>:
  - `take` now is `pick` to keep coherence with other libraries
- Pump up dev dependencies
- Modular refactor: split each function in their own file
- Feature: it should be tree-shakeable now
- Test: Add tap test
- Add `engine` requirement to Node >= 17
- updated readme & changelog
- improve docs a bit
- included new section of "next breaking change"

### v2.1.0
- Introduced `applier` function
- Moved changelog to another file
- Pump up dev dependencies
- Minnor docs improvements

### v2.0.0  
- <b>BREAKING CHANGE</b>:
  - `take` function signature now can receive multiple string "keys" and will return an array with same-order-as-requested values over an object. see [take](#usage)
- Add unit test to `take` function
- Fixed some documentation typos

### v1.2.0 [FEATURE]
- Introduced `curry` function
- Introduce `_` placeholder for using with curry
- Add unit test for `curry` and its placeholder `_`

### v1.1.1 [PATCH]
- Fix documentation typo

### v1.1.0 [FEATURE]
- Introduced `take` function

### v1.0.4 [PATCH]
- Trying to get github workflow to work

### v1.0.3 [PATCH]
 - Add missing github repo to package.json
 - Add github worflow

### v1.0.2 [PATCH]
 - Fix package version on changelog
 - Add package keywords

### v1.0.1 [PATCH]
 - Fix package errors for NPM publish

### v1.0.0
 - Introduced `pipe` function
 - Introduced `tap` function
 - Introduced `conditional` function