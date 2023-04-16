const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const generator = {};

// Set up your OpenAI API credentials
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Define your subject for the slide
//const subject = "";

// Generate slide content using OpenAI's GPT-3 model
async function generateSlideContent(subject) {
  console.log(subject);
  const prompt = `Create a slide about ${subject} that last no more than 200 words.`;
  console.log(prompt);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 200,
  });
  //console.log(response.data);
  const slideContent = response.data.choices[0].text.trim();
  return slideContent;
}

/*
generateSlideContent(subject)
  .then((slideContent) => {
    // Print the generated slide content
    console.log("Slide Content:");
    console.log(slideContent);
    return res.status(400).send(slideContent);
  })
  .catch((error) => {
    console.error("Error generating slide content:", error);
  });
*/

//Generar curricula en base a tema y numero de sesiones.
//Generar contenido de slides para cada sesion. Indicar minimo y maximo de slides por sesion.
//Generar slides basados en el contenido.

generator.generateSlideContent = generateSlideContent;

module.exports = generator;
