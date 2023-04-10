const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Set up your OpenAI API credentials
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Define your subject for the slide
const subject = "Basic JavaScript Programming";

// Generate slide content using OpenAI's GPT-3 model
async function generateSlideContent(subject) {
  const prompt = `Create a slide about ${subject}.`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 100,
  });
  //console.log(response.data);
  const slideContent = response.data.choices[0].text.trim();
  return slideContent;
}

// Call the function to generate slide content for the given subject
generateSlideContent(subject)
  .then((slideContent) => {
    // Print the generated slide content
    console.log("Slide Content:");
    console.log(slideContent);
  })
  .catch((error) => {
    console.error("Error generating slide content:", error);
  });

async function simpleTest() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data);
}

//simpleTest();
