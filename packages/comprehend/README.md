# Google Play Store Review Sentiment Analysis
<!-- section: Introduction -->
<!-- Describe briefly what your software is. What problem does it solve? At what target audience is it aimed? -->

This is a sample project for the AWS Comprehend. This service is capable of performing sentiment analysis, key word extraction, language inferring and many more. This sample project illustrates sentiment analysis in particular. It downloads the latest reviews for an app on the google play store and analysis whether the reviews are written in a positive, negative, neutral or mixed way (i.e. positive and negative aspects). It summarizes its findings by showing the distribution of the classes and gives the maximum and minimum value of the given class. Finally it exports reviews and their respective sentiments to a file called `result.json`.

## Overview
<!-- section: Overview -->
<!-- Give an architectural overview of your software. Is is interesting for other developers, who wants to catch on and want to developer features or fix bugs of your software. Do not go into too much detail. There are other documents for this. -->
The full coded is under src/index.ts and documented thoroughly. 


## Development
<!-- section: Development -->
<!-- If you software is developed within a team you shhould include this section. Describe how to setup thhe project. Include dependencies, conventions and other things to know in order to start developing. In short: After reading this section everyone should be able to develop this piece of software. -->
<!--
Possible subsections

### How to setup and run this project
### Commit messages
### How to publish a release
### Tests
-->
### How to setup and run this project
Checkout this project and run 

```bash
npm install
npm run bootstrap
cd packages/comprehend
```

Create a file called `.env` and add the following environment variables

| Name                  | Description                                                                                                                                                    | Example            | Required |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------- | :------- |
| AWS_SERVICE_VERSION   | The version od the AWS Poly client                                                                                                                             | 2017-11-27         | Yes      |
| AWS_ACCESS_KEY_ID     | The access key id for the AWS account polly is using                                                                                                           |                    | Yes      |
| AWS_SECRET_ACCESS_KEY | The secret access key for the AWS account polly is using                                                                                                       |                    | Yes      |
| AWS_REGION            | The region for the AWS account polly is using                                                                                                                  | eu-central-1       | Yes      |
| GOOGLE_PLAY_APP_ID    | The package id of the app you want to fetch reviews for                                                                                                        | com.android.chrome | Yes      |
| GOOGLE_PLAY_LOCALE    | The locale of the reviews you want to fetch. Must be in the format lang-country, where lang is ISO 639-1 compatible and country is ISO 3166 ALPHA-2 compatible | de-DE              | No       |
| GOOGLE_PLAY_LIMIT     | The maximum number of reviews you want to fetch                                                                                                                | 50                 | No       |

Finally run `npm run start:dev` for running the example. You can build the example using `npm run build`.

## Contributing
<!-- section: Contributing -->
<!-- Describe what action one should take in order to contribute. Does a certain styleguide has to be adhered. How can one apply changes (i.e. push vs. pull request)? -->
Bug reports and pull requests are welcome on GitHub at [https://github.com/nanogiants/aws-ai-playground](https://github.com/nanogiants/aws-ai-playground). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

## License
<!-- section: License -->
<!-- Describe the license under which your software is published. Note that an unlicensed piece of software is most likely never used. So do not skip tihs part! -->
```
The MIT License (MIT)
=====================

Copyright © `2020` `NanoGiants GmbH`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
```