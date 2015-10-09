# ngAlertify

[![Build Status](https://semaphoreci.com/api/v1/projects/21b3774a-8f48-4d33-a51b-b939a879de7d/565625/badge.svg)](https://semaphoreci.com/alertifyjs/ngalertify)

Angular JS module that wraps the Alertify.js global window function.

## Usage

angular.module("myModule", ["ngAlertify"]).controller("myCtrl", ["alertify", function(alertify) {

    // Use alertify here as you normally would.
    alertify.alert("Hello, world!");

}]);

## Developing

The package version should match the underlying Alertify.js version.
Alertify.js code is a submodule, so update it when necessary:

```bash
git submodule update
```

Changes to Alertify.js itself should be done via
[the Alertify.js repo](https://github.com/alertifyjs/alertify.js).

The workflow is Gulp powerered, so just run the following to develop:

```bash
gulp
```

## Contributing

Contributions are welcomed. Make sure to follow the ESlint style guide and
add tests for all changes. Thanks in advance!

## License

This code is licensed under the MPL-2.0 license, while the Alertify.js module
has it's own licensing (MIT and MPL-2.0 mixed).
