import { config } from "dotenv";
config()
import { Configuration, OpenAIApi } from 'openai'
import readline from 'readline'
import chalk from "chalk";

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.API_KEY
}))

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log(chalk.yellow("Olá, você está online com o chatgpt!"))

userInterface.prompt()
userInterface.on("line", async input => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input}]
  })

  console.log(chalk.blue(res.data.choices[0].message.content))
  console.log("\n")
  userInterface.prompt()
})

