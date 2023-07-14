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

console.log(chalk.yellow("Olá, você está online com o gerador de imagens!"))

userInterface.prompt()
userInterface.on("line", async input => {
  const res = await openai.createImage({
    prompt: input,
    n: 1,
    size: "256x256"
  })

  console.log(chalk.blue(res.data.data[0].url))
  console.log("\n")
  userInterface.prompt()
})
