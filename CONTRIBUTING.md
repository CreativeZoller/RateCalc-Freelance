# Contributing to this repository

Freelance Ratecalculator is a private project with proprietary information and we enjoy to your contributions! There are many ways to contribute, from writing tutorials or blog posts, improving the documentation, submitting bug reports or writing code which can be incorporated into Freelance Ratecalculator itself.

## Bug reports

If you think you have found a bug in Freelance Ratecalculator, first make sure that you are testing against the latest version of Freelance Ratecalculator found in `main` branch - your issue may already have been fixed. If not, search our [issues list](https://github.com/CreativeZoller/ratecalc-freelance/issues) on GitHub in case a similar issue has already been opened.

It is very helpful if you can prepare a reproduction of the bug. In other words, provide a small test case which we can run to confirm your bug. It makes it easier to find the problem and to fix it. If the bug is not visible to the user, test cases should be provided as one or two methods. If it is visible to the user, test cases should be provided as screenshots of browser with a detailed instructions to find the bug.

Provide as much information as you can. The easier it is for us to recreate your problem, the faster it is likely to be fixed.

## Contributing code and documentation changes

If you would like to contribute to Freelance Ratecalculator, please be aware that there are particular complexities that you should know about before starting the implementation. There are often a number of ways to fix a problem, and it is important to find the right approach before spending time on a PR that cannot be merged.

### Clone the repository

You will need to clone the main Freelance Ratecalculator code to your local machine.

### Tips for code changes

Following these tips prior to raising a pull request will speed up the review cycle.

-   Add appropriate unit tests
-   Add integration tests, if applicable
-   Make sure the code you add follows the [guidelines](#guidelines)
-   Lines that are not part of your change should not be edited (e.g. don't format unchanged lines, don't reorder existing imports)

### Submitting your changes

Once your changes and tests are ready to submit for review:

-   Test your changes
    Run the test suite to make sure that nothing is broken.

-   Submit a pull request

    Push your local changes to your remote branch in the repository and [submit a pull request](https://help.github.com/articles/using-pull-requests). In the pull request,

    1. Choose a PR type followed by a `/` and then a title which sums up the changes that you have made.
    2. In the body, use the auto-generated template to express the details of your branch.

#### PR types

|  PR Type   | Title                    | Description                                                                                    |
| :--------: | ------------------------ | ---------------------------------------------------------------------------------------------- |
|   `feat`   | Features                 | A new feature                                                                                  |
|   `fix`    | Bug Fixes                | A bug fix                                                                                      |
|   `docs`   | Documentation            | Documentation only changes                                                                     |
|  `design`  | Design                   | Changes to UI that does not add a feature                                                      |
|   `i18n`   | i18n                     | Changes and additions to translations and internationalization-related.                        |
| `refactor` | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                      |
|   `perf`   | Performance Improvements | A code change that improves performance                                                        |
|   `test`   | Tests                    | All things tests. (Exception when writing tests with a new feature)                            |
|  `build`   | Builds                   | Changes that affect the build system or external dependencies (examples: algolia, docker, npm) |
|    `ci`    | Continuous Integrations  | Changes to CI configuration files and scripts (examples: gcloud Build/Run)                     |
|  `revert`  | Reverts                  | Reverts a previous commit                                                                      |

Then sit back and wait. There will probably be discussion about the pull request and, if any changes are needed, we would love to work with you to get your pull request merged into Freelance Ratecalculator.

Please adhere to the general guideline that you should never force push to a publicly shared branch. Once you have opened your pull request, you should consider your branch publicly shared. Instead of force pushing you can just add incremental commits; this is generally easier on your reviewers. If you need to pick up changes from master, you can merge master into your branch. A reviewer might ask you to rebase a long-running pull request in which case force pushing is okay for that request. Note that squashing at the end of the review process should also not be done, that can be done when the pull request is [integrated via GitHub](https://github.com/blog/2141-squash-your-commits).

## Contributing to the Freelance Ratecalculator codebase

**Repository:** [https://github.com/CreativeZoller/Freelance Ratecalculator](https://github.com/CreativeZoller/ratecalc-freelance)

### Formatting

Freelance Ratecalculator code has multiple automated formatters. Please read your specified language's formatting guideline for details. If you do not see your specified language formatting guideline, then we do not have a specific guideline. Please contact us so we can formulate a guideline.

## Guidelines

> Todo after functionality is done

Freelance Ratecalculator code has specified formatting and style guidelines. You can read specified language's guidelines [here](docs/STYLEGUIDE.md).

## Docstrings & Javadocs

Good docstrings and Javadocs can help with navigating and understanding code. Freelance Ratecalculator has some guidelines around when to write docstrings and when not to, but note that we don't want to be overly prescriptive. The intent of these guidelines is to be helpful, not to turn writing code into a chore.

### The short version

1. Always add docstrings/Javadocs to new code.
2. Add docstrings/Javadocs to existing code if you can.
3. Document the "why", not the "how", unless that's important to the "why".
4. Don't document anything trivial or obvious (e.g. getters and setters). In other words, the docstrings/Javadocs should add some value.

### The long version

1. If you add a new package, please also add package-level docstrings that explains what the package is for. This can just be a reference to a more foundational / parent package if appropriate. An example would be a package hierarchy for a new feature or plugin - the package docs could explain the purpose of the feature, any caveats, and possibly some examples of configuration and usage.
2. New classes and interfaces must have class-level docstrings that describes their purpose. There are a lot of classes in the Freelance Ratecalculator repository, and it's easier to navigate when you can quickly find out what is the purpose of a class. This doesn't apply to inner classes or interfaces, unless you expect them to be explicitly used outside their parent class.
3. New public methods must have docstrings, because they form part of the contract between the class and its consumers. Similarly, new abstract methods must have docstrings because they are part of the contract between a class and its subclasses. It's important that contributors know why they need to implement a method, and the docstrings should make this clear. You don't need to document a method if it's overriding an abstract method (either from an abstract superclass or an interface), unless your implementation is doing something " unexpected" e.g. deviating from the intent of the original method.
4. Following on from the above point, please add docs to existing public methods if you are editing them, or to abstract methods if you can.
5. Non-public, non-abstract methods don't require docstrings, but if you feel that adding some would make it easier for other developers to understand the code, or why it's written in a particular way, then please do so.
6. Properties don't need to have docstrings, but please add some if there's something useful to say.
7. Docstrings should not go into low-level implementation details unless this is critical to understanding the code e.g. documenting the subtleties of the implementation of a private method. The point here is that implementations will change over time, and the docstrings is less likely to become out-of-date if it only talks about the what is the purpose of the code, not what it does.
8. Examples in docstrings can be very useful, so feel free to add some if you can reasonably do so i.e. if it takes a whole page of code to set up an example, then docstrings probably isn't the right place for it. Longer or more elaborate examples are probably better suited to the package docs.
9. Test methods are a good place to add docstrings, because you can use it to succinctly describe e.g. preconditions, actions and expectations of the test, more easily that just using the test name alone. Please consider documenting your tests in this way.
10. Sometimes you shouldn't add docstrings:
    1. Where it adds no value, for example where a method's implementation is trivial such as with getters and setters, or a method just delegates to another object.
    2. However, you should still add docstrings if there are caveats around calling a method that are not immediately obvious from reading the method's implementation in isolation.
    3. You can omit docstrings for simple classes, e.g. where they are a simple container for some data. However, please consider whether a reader might still benefit from some additional background, for example about why the class exists at all.
11. Not all comments need to be docstrings. Sometimes it will make more sense to add comments in a method's body, for example due to important implementation decisions or "gotchas". As a general guide, if some information forms part of the contract between a method and its callers, then it should go in the docstrings, otherwise you might consider using regular comments in the code.
12. Please still try to make class, method or variable names as descriptive and concise as possible, as opposed to relying solely on docstrings to describe something.
13. If you need help writing docstrings, just ask!

Finally, use your judgement! Base your decisions on what will help other developers - including yourself, when you come back to some code 3 months in the future, having forgotten how it works.

## Reviewing and accepting your contribution

We review every contribution carefully to ensure that the change is of high quality and fits well with the rest of the Freelance Ratecalculator codebase.

If accepted, we will merge your change and usually take care of backporting it to appropriate branches ourselves.

Please discuss your change in a GitHub and/or emails before spending much time on its implementation. We sometimes have to reject contributions that duplicate other efforts, take the wrong approach to solving a problem, or attempt to solve multiple issues at once. An up-front discussion often saves a good deal of wasted time in these cases.

We sometimes reject contributions due to the low quality of the submission since low-quality submissions tend to take unreasonable effort to review properly. Quality is rather subjective, so it is hard to describe exactly how to avoid this, but there are some basic steps you can take to reduce the chances of rejection. Follow the guidelines listed above when preparing your changes. You should add tests that correspond with your changes, and your PR should free of any merge conflicts. It makes it much easier to review if your code is formatted correctly and does not include unnecessary extra changes. Remember to make a separate commit for formatting previously created files.
