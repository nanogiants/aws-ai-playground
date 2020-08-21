# Chuck Norris Fact Reader
<!-- section: Introduction -->
<!-- Describe briefly what your software is. What problem does it solve? At what target audience is it aimed? -->

**AWS Polly - text to speech:**
Chuck Norris Fact Reader fetches random chuck norris facts (sometimes referred to as *joke*), sends the data to AWS Polly. Polly then analyzes the text and converts it to speech. This services offers various voices and also a whole markup language called SSML (Speech Synthesis Markup Language), which enabled you to add breaks, custom pronunciations and many more. See https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html for more information. Polly sends some sort of audio bytes in return, which then can be read out loud using node-player.

**Why this matters:**
We are currently experiencing a change in the way we handle technology. In the early days we used to operate computers mainly by keyboard, which demanded a lot of knowledge from us. In 1983 Lisa was released by Apple and offered a GUI and a mouse for the mass market. In the mid 2000s the era of touch devices began and showed us how to handle computers (now we have to ay devices) intuitively. We can expect that immersion will get stronger and that we interact with machines even more intuitively in the future. A logical step in this process is communication via speech. Alexa was first published by Amazon in 2015 and makes exactly this possible. 

Communication via speech is something very natural for us humans. For computers, however, it is a scientific discipline in its own right. The conversion of text into speech is a significant part of it. Computer voices have been around for a very long time and were already delivered with certain operating systems or programs in the early 2000s. However, these sounded awkward and unnatural. Amazon Polly promises life-like speech without the complex and highly mathematical technology behind it - at least for us developers. 

This leads to interesting usecases. From talking chat bots, improved accessability for apps, to applications in medicine (e.g. reading medical data for ECG) and home automation (e.g. voice interaction with smart home devices) many use cases are possible. 

See [this thread](https://www.readspeaker.com/tts-software-use-cases/) for more information on this topic.

We are excited what the future of human-machine-interaction will be and how we will comunicate with computers in the next years.

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
cd packages/polly
```

Create a file called `.env` and add the following environment variables

| Name                  | Description                                              | Example      |
| :-------------------- | :------------------------------------------------------- | :----------- |
| AWS_SERVICE_VERSION   | The version od the AWS Polly client                      | 2016-06-10   |
| AWS_ACCESS_KEY_ID     | The access key id for the AWS account Polly is using     |              |
| AWS_SECRET_ACCESS_KEY | The secret access key for the AWS account Polly is using |              |
| AWS_REGION            | The region for the AWS account Polly is using            | eu-central-1 |

Check that thw AWS account associated with the access key id and secret access key is allowed to interact with AWS Polly. Finally run `npm run start:dev` for running the example. You can build the example using `npm run build`.

## Contributing
<!-- section: Contributing -->
<!-- Describe what action one should take in order to contribute. Does a certain styleguide has to be adhered. How can one apply changes (i.e. push vs. pull request)? -->
Bug reports and pull requests are welcome on GitHub at [https://github.com/nanogiants/aws-ai-playground](https://github.com/nanogiants/aws-ai-playground). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

## License
<!-- section: License -->
<!-- Describe the license under which your software is published. Note that an unlicensed piece of software is most likely never used. So do not skip tihs part! -->
```
Copyright © 2020 NanoGiants GmbH

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