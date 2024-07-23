import OpenAI from "openai";
import readlineSync from "readline-sync";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": prompt }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    return `Error: ${error.response ? error.response.data : error.message}`;
  }
}

async function main() {
  console.log("Welcome to the GPT CLI! Type 'exit' to quit.");

  while (true) {
    const userInput = readlineSync.question('You: ');

    if (userInput.toLowerCase() === 'exit') {
      console.log("Goodbye!");
      break;
    }

    const response = await getResponse(userInput);
    
    console.log('GPT: ' + response);
  }
}

main();