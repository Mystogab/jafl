# Just Another Functional Library (jafl)
As the title said, it is just another functional library. I always end up writing the same "utils" file with a couple of functions that helps me write the code in a more declarative-first way.
Using mainly but not only function composition.

## Introduction
This library allows you to write functional and declarative code having the KISS principle in mind.

## Install
You are good to go with:
> `yarn add jafl`

or:

> `npm i jafl`

## Usage
`pipe`
>
> It takes N functions as parameter, and return a single function
> that when is called will invoke the first function with the input, and then
> passthrough the output to the next function input, creating a pipe.


`tap`
>
> It takes a function (fn), and return and async function that when is invoked with and input
> will excecute the original function over the input (fn(input)) but instead of returning the function
> invocation output, returns the original input


`conditional`
>
> It takes two functions, a conditionalCheckFn, and a conditionalAppliedFn, and return a
> new function that takes and input and check if the resulto of apply conditionalCheckFn
> to input is true, then return conditionalAppliedFn(input), and if it is false, it
> will return the input without applying any function

## Sample
So let asume you have something like:
```javascript
const checkOnboarding = async ()//...
const trackEventToCloud = async () => //...
const isFirstTimeCompletingOnboarding = (user) => return true; // implement a real one
const sendEmail = coolEmailSenderAdapter;//
```
You could write your composition like this:
```javascript
const process = pipe(
  checkOnboarding,
  conditional(isFirstTimeCompletingOnboarding, pipe(
    tap(trackEventToCloud),
    sendEmail
  ))
);

await process(user);
```
And what we are doing in here is telling in a declarative way:

1. Check the onboarding process
2. Check if is the first time completing onboarding (`conditional`)
3. If yes, then:
    - track the event in some logs but return the input user as output instead of the traking result (`tap`)
    - send an email
4. If no, then return the same input.

This whole process happens in a pipe, where input flow from left to right. So if we got: A, B and C, and then we define pipe as P where P = P(A, B, C), P will be a function that 
given and input it will excecute A, then the result will be the input to execute B, and finally the result will be the input of C, so the finall result would be C(B(A(input))) equivalent.

## Changelog

### v1.0.2 [PATCH]
 - Fix package version on changelog
 - Add package keywords

### v1.0.1 [PATCH]
 - Fix package errors for NPM publish

### v1.0.0
 - Introduced `pipe` function
 - Introduced `tap` function
 - Introduced `conditional` function