# Just Another Functional Library (jafl)
As the title said, it is just another functional programming library. I always end up writing the same "utils" file with a couple of functions that helps me write the code in a more declarative-first way.
Using mainly but not only function composition.

### <b>Notes:</b>
> Next breaking change (v4 candidate)
>
> Item: Pipe rework<br>
> ETA: Q3 2023

## Introduction
This library allows you to write functional and declarative code having the KISS principle in mind.

It provide flow-control utils like, [pipe](#pipe), [conditional](#conditional), or [tap](#tap). Functions wraping helpers, that could be used as adapters, like [curry](#curry), [pick](#pick) or [applier](#applier).

## Install
You are good to go with:
> `yarn add jafl`

or:

> `npm i jafl`

## Usage
### `pipe`

It takes N functions as parameter, and return a single function
that when is called will invoke the first function with the input, and then
passthrough the output to the next function input, creating a pipe.


### `tap`

It takes a function (fn), and return and async function that when is invoked with and input
will excecute the original function over the input (fn(input)) but instead of returning the function
invocation output, returns the original input


### `conditional`

It takes two functions, a conditionalCheckFn, and a conditionalAppliedFn, and return a
new function that takes and input and check if the resulto of apply conditionalCheckFn
to input is true, then return conditionalAppliedFn(input), and if it is false, it
will return the input without applying any function

### `pick`

It pick a key that could be a string like 'name', or a chained access like: 'address.number'
and return a function that takes an object and return the value of that key.

In addition it can take multiple of this keys as multiple arguments, and in that case
it will return an array with every value in the same order as requested
i.e:
```typescript
const obj = { name: 'Some', address: { number: 33, isReal: false }};

pick('name')(obj); // -> 'Some'
pick('address.number')(obj) // -> 33
pick('address.number', 'id', 'name')(obj) // -> [33, undefined, 'Some']
```

### `curry`
_This curry implementation works thanks to [@cbroeren](https://www.github.com/cbroeren) code (thank you!)_

Currying is a bit hard to understand but sometime when you are using a pipe you most likely will need to "trick" some function to be prefilled with a first argument and have a function that only receive the rest of the parameters, well that when curry kicks in.

```typescript
const sendEmail = ; // we have this implemented and has the following signature: (to: string, topic: string, message: string)
const sendEmailWithCurry = curry(sendEmail);
const sendElonWithCurry = sendEmailWithCurry(_, _, 'You are fired!'); // now this function is prefilled with the third argument, message.

const sendElonMsg = (users: [User]) => {
  const process = pipe(
    conditional(IHaveTheRightMood, pipe(
      tap(logEmailSendtTriggered),
      pick('emailAddress'),
      sendElonWithCurry(_, 'I Have a lovely message for you') // Now is filled with message, and topic, so it will return a function that receive a "to" and excecute the original function
    ))
  );

  await Promise.all(users.map(process));
}
```

### `applier`

It takes a function (fn) and return a function that receive a list of arguments
in an array-like format and call fn with those args as it was a non array receiving function
i.e:
```typescript
const greeter = (greetMsg: string, userName: string) => `Hey, ${greetMsg} ${userName}!`;

applier(greeter)(['hello there', 'fellow friend']); // -> 'Hey, hello there fellow friend!' 
```

## Integration Sample
So let asume you have something like:
```javascript
const findUser = async () => User //ie: { name: 'John', mail: { address: foo@bar.com, foo: true } }
const checkOnboarding = async () => //...
const trackEventToCloud = async () => //...
const isFirstTimeCompletingOnboarding = (user) => true; // implement a real one
const sendEmail = curry(_sendEmail);// where _sendEmail = (to, topic, msg) => {...};
```
You could write your composition like this:
```javascript
const process = pipe(
  findUser, // we get the User from DB
  checkOnboarding, //We check onboarding status
  conditional(isFirstTimeCompletingOnboarding, pipe( //as it is the first time, so this pipe wil run
    tap(trackEventToCloud), // we track the event but return the same input using tap
    pick(['mail.adress', 'name']),// we only need the mail adress and the name for the user
    applier(sendEmail(_, _, "Welcome!")) // applier will give sendEmail the two remains parameters from the input array (the pick's output)
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

Latest Release:
### v3.1.0
TBD

You can view full changelog here: -> [CHANGELOG](./CHANGELOG.md) <-
