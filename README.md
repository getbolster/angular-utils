# Angular Utils

We've been using Angularjs for a while, so we thought it'd be good to give something back to the community. In this repo we'll add various directives, services, and other utilities that have made our lives easier, and release them under an MIT license. Feel free to fork and send pull requests if you refactor anything or find bugs in our original code!

All snippets will be accompanied by some sample html and css, to show where they'd be used in your app. In the future we'll probably have something fancier like actual working examples.

## Directives

### Blur

I like how easy Angular's form validation is to use, but I feel like showing red borders and error messages on keypress is way too agressive. Using the blur custom directive, we can show warnings using Angular's native validation and show error messages onblur.