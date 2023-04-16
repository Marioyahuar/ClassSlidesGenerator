const express = require("express");
const router = express.Router();
const generator = require("../helpers/generator");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/generate/:subject", (req, res) => {
  const subject = req.params.subject;
  console.log(subject);
  generator
    .generateSlideContent(subject)
    .then((slideContent) => {
      // Print the generated slide content
      console.log("Slide Content:");
      console.log(slideContent);
      return res.status(400).send(slideContent);
    })
    .catch((error) => {
      console.error("Error generating slide content:", error);
    });
});

module.exports = router;

/*
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
}*/
