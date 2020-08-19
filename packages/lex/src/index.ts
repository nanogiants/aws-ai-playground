require('dotenv').config();

// Importing dependencies
import * as inquirer from 'inquirer';
import Chatbot from './chatbot';

const chatbot = new Chatbot();

const chatbotPrompt = async (question: string) => {
    try {
        const answers = await inquirer.prompt({
            type: 'input',
            message: question,
            name: 'userInput'
        });

        const { userInput } = answers;
        const result = await chatbot.postUserInput(userInput, 'user');
        const answer = await chatbot.processUserInput(result);

        console.log(`${answer}\n`);

        chatbotPrompt('How can I help you?\n');
    } catch (error) {
        console.log(`I ran into an error. Beep Bob Beeb Booo! ${error}`);
        console.error(error);
        process.exit(-1);
    }
}

chatbotPrompt('How can I help you?\n> ');
