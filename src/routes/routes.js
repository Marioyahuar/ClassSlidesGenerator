const express = require("express");
const router = express.Router();
const generator = require("../helpers/generator");
const curricula = [];

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/generate/:subject", (req, res) => {
  const subject = req.params.subject;
  console.log(subject);
  generator
    .generateCurriculum(subject)
    .then((curriculum) => {
      // Print the generated slide content
      console.log("Curriculum:");
      console.log(curriculum);
      return res.status(400).send(curriculum);
    })
    .catch((error) => {
      console.error("Error generating curriculum:", error);
    });
});

router.get("/generateSlides/:subject/:course", (req, res) => {
  const { subject, course } = req.params;
  generator
    .generateSlideContent(subject, course)
    .then((slideContent) => {
      console.log("Slide Content: ");
      //console.log(slideContent);
      return res.status(400).send(slideContent);
    })
    .catch((error) => {
      console.error("Error generating slide content:", error);
    });
});

router.get("/generateSlidesv2/:subject/:quantity/:details", (req, res) => {
  const { subject, quantity, details } = req.params;
  generator
    .generateSlideContentv2(subject, quantity, details)
    .then((slideContent) => {
      return res.status(400).json(slideContent);
    })
    .catch((error) => {
      console.error("Error generando el contenido", error);
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
