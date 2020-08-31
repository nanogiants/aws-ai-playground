# Crypto Currency Chatbot (CCC)
<!-- section: Introduction -->
<!-- Describe briefly what your software is. What problem does it solve? At what target audience is it aimed? -->

**AWS Lex - AI powered chatbots:**
This is a sample project for the AWS Lex service. This service powers Amazon Alexa and provides a system for intent inferation, which can then be used to trigger actions (either as response or as AWS Lambda). We use this to create a basic crypto currency chatbot. We will add three commands, which are

* Get a list of known crypto currencies
* Get more information about a given crypto currency
* Get a 45 day ticker of a given crypto currency prices (in USD)

Happy chatting :) 

**Why this matters:**
When examinging recent statistics for chatbots we find that
* Chatbots can cut operational costs by up to 30%. (Statistic by Chatbots Live)
* 37% of people use a customer service bot to get a quick answer in emergencies. (Statistic by Drift)
* 85% of customer interactions will be handled without human agents by 2021. (Statistic by Chatbots Live)

AI powered chatbots are a breakthrough in customer service. They are cost effective, provide crucial information about the most common tasks for your business and are available 24/7. As a matter of fact, we are getting used for dealing with AI in a context, where we expected human interaction. This holds for all age groups (Forbes, Apiumhub).

There are other fields where conversial AIs (i.e. chatbots) might be useful. Future chatbots can act as assistant or secretary. Actually Google Duplex is already mature in this field. See [this video](https://www.youtube.com/watch?v=D5VN56jQMWM) as an example. Consider knowledge transfer in general. Chatbots have a huge potential to revolutionize the way we live, work and learn.

## Overview
<!-- section: Overview -->
<!-- Give an architectural overview of your software. Is is interesting for other developers, who wants to catch on and want to developer features or fix bugs of your software. Do not go into too much detail. There are other documents for this. -->
The full coded is under src and documented thoroughly. 


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
cd packages/lex
```

Import `CryptoCurrencyBot_Export.json` into AWS Lex (see https://docs.aws.amazon.com/lex/latest/dg/import-from-lex.html for mote information). After you successfully imported your bot, you have to build and publish it. See https://docs.aws.amazon.com/de_de/lex/latest/dg/gs2-build-and-test.html and https://docs.aws.amazon.com/de_de/lex/latest/dg/gettingstarted-ex3.html for more information.

Create a file called `.env` and add the following environment variables

| Name                  | Description                                            | Example           |
| :-------------------- | :----------------------------------------------------- | :---------------- |
| AWS_SERVICE_VERSION   | The version od the AWS Lex client                      | 2016-06-10        |
| AWS_ACCESS_KEY_ID     | The access key id for the AWS account Lex is using     |                   |
| AWS_SECRET_ACCESS_KEY | The secret access key for the AWS account Lex is using |                   |
| AWS_REGION            | The region for the AWS account Lex is using            | eu-central-1      |
| AWS_LEX_BOT_NAME      | The name of your AWS Lex bot                           | CryptoCurrencyBot |
| AWS_LEX_BOT_ALIAS     | The alias of your AWS Lex bot, after you published it  | Development       |

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