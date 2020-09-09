# Image Mock Data Generator
<!-- section: Introduction -->
<!-- Describe briefly what your software is. What problem does it solve? At what target audience is it aimed? -->

**AWS Rekognition - image detection:**
This is a sample project for the AWS Rekognition service. Rekognition is a powerful ai service and is capable of (amongst other) label detection in images and videos, face and sentiment detection, face matching in several images and many more. This sample project focuses on label detection within images. If you need mock or placeholder images, you usually refer to one of the many APIs avilable. You can fetch a random image from there and display it to the user. Usually you have some sort of parametrization like size, color or type of image (e.g. sport, nature, ...). The image type may be useful dependengin on your usecase, but is not available for every api. So let's write an application, which fetches a number of images from such an API and determines the type of the image using AWS Rekognition. We can then use this labels to categorize our images and offer them to the user instead of always fetching a new random image.

**Why this matters:**
Images and videos are unstructured data, providing a tremendious amount of valuable information. Processing these kind of information is usually easy for human beings, but hard for machines. However, we can derive many usecases from image and video processing, such as 

* Sentiment analysis in images and videos
* Automatically categorizes and cluster images
* Check files for unsuitable content
* Find associations between images and videos (i.e. is the same person on different images)
* Generally speaking: actually understand what is shown on the image / video

AWS Rekognition offers a wider variety of image and video detection tasks and is one of the more mature AI services, AWS has to offer. With this service, many manual tasks can be automated, and otherwise impossible features can be implemented. 

## Overview
<!-- section: Overview -->
<!-- Give an architectural overview of your software. Is is interesting for other developers, who wants to catch on and want to developer features or fix bugs of your software. Do not go into too much detail. There are other documents for this. -->
The full coded is under src/index.ts and documented thoroughly. What the app does is the following:

* It fetches n images from a random image API (called picsum)
* It send the images to AWS Rekognition and detects labels within the image up to a certain confidence threshhold
* It then creates a directory located under ./output with the given label(s) as foldername and moves the image to the respective folder(s)
* In the end you have a lot of images within folders, which describe what the type of the image is most likely to be (e.g. sport, nature, ...)

Here is an example output file structure:

* output
  * architecture
    * image1.png
    * image2.png
  * abstract
    * image3.png
  * building
    * image1.png
  * city
    * image2.png

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
cd packages/rekognition
```

Create a file called `.env` and add the following environment variables

| Name                           | Description                                                                              | Example      |
| :----------------------------- | :--------------------------------------------------------------------------------------- | :----------- |
| AWS_SERVICE_VERSION            | The version od the AWS Rekognition client                                                | 2016-06-27   |
| AWS_ACCESS_KEY_ID              | The access key id for the AWS account Rekognition is using                               |              |
| AWS_SECRET_ACCESS_KEY          | The secret access key for the AWS account Rekognition is using                           |              |
| AWS_REGION                     | The region for the AWS account Rekognition is using                                      | eu-central-1 |
| AWS_REKOGNITION_MAX_LABELS     | The max count of labels returned by AWS Rekognition                                      | 5            |
| AWS_REKOGNITION_MIN_CONFIDENCE | The confidence threshhold AWS Rekognition is using to actually return the detected label | 0.7          |
| IMAGE_COUNT                    | The number of images you want to fetch from the api and detect labels from               | 10           |

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