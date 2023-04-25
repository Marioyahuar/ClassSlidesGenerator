const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const generator = {};

// Set up your OpenAI API credentials
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//Generate Curriculum for the course. Right now is for fixed 8 lessons.
async function generateCurriculum(subject) {
  console.log(subject);
  const prompt = `Could you develop a curriculum for an 8-session course on ${subject}. Please start each session content with the word Session`;
  console.log(prompt);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 300,
  });
  //console.log(response.data);
  let curriculum = response.data.choices[0].text.trim();
  curriculum = curriculum.match(/:(.*?)(?=\n|$)/g).map(function (linea) {
    return linea.slice(1).trim(); // Eliminar el primer carácter (los dos puntos) y eliminar espacios en blanco al inicio y al final
  });
  return curriculum;
}

// Generatie slide content based on the session objective and course.
async function generateSlideContent(subject, course) {
  const prompt = `You're the teacher of the course "${course}". Please create content for 3 slides about "${subject}". Return the answer as two javascript const arrays. The first one called "Titles" with the title of each slide. The second one called "Contents" with the content of each slide. Please return just the arrays without any kind of clarification.`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 500,
  });
  //console.log(response.data);
  let slides = response.data.choices[0].text.trim();
  return slides;
}

async function generateSlideContentv2(subject, quantity, details) {
  //const prompt = `Por favor genera contenido para ${quantity} slides acerca del tema "${subject}". Ten en consideración los siguientes detalles: "${details}"`;
  const prompt = `Por favor, genera un contenido para ${quantity} slides sobre "${subject}" siguiendo el formato: "Slide: Titulo | Contenido: ". Considera los siguientes detalles para elaborar el contenido: "${details}". Puedes utilizar datos, estadísticas, ejemplos u otra información relevante para respaldar tus puntos.`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2000,
  });
  let slides = response.data.choices[0].text.trim();
  console.log(slides);
  slidesFinal = responseToJSON(slides);
  return slidesFinal;
}

function responseToJSON(response) {
  // Remover espacios en blanco innecesarios
  let variable = response.replace(/\s+/g, " ");

  // Separar por los delimitadores
  const slidesArray = variable.split("Slide");

  // Crear un arreglo para almacenar los objetos de slide
  const slides = [];

  // Recorrer cada slide en el arreglo
  for (let i = 1; i < slidesArray.length; i++) {
    // Separar el título y contenido del slide
    const slideInfo = slidesArray[i].split("|");
    const titulo = slideInfo[0].split(":")[1].trim();
    const contenido = slideInfo[1].split(":")[1].trim();

    // Crear un objeto slide con la información
    const slide = {
      Slide: i,
      Titulo: titulo,
      Contenido: contenido,
    };

    // Agregar el objeto slide al arreglo de slides
    slides.push(slide);
  }

  // Crear el objeto JSON final
  const jsonSlides = JSON.stringify(slides);

  return jsonSlides;
}

//Generar curricula en base a tema y numero de sesiones.
//Generar contenido de slides para cada sesion. Indicar minimo y maximo de slides por sesion.
//Generar slides basados en el contenido.

generator.generateSlideContent = generateSlideContent;
generator.generateCurriculum = generateCurriculum;
generator.generateSlideContentv2 = generateSlideContentv2;

module.exports = generator;

/*
Modelo: text-davinci-003

Tema: [Indica el tema específico para el cual necesitas contenido para las slides]

Detalles: [Proporciona detalles específicos sobre los puntos o conceptos que deseas abordar en las slides. Puedes incluir datos, estadísticas, ejemplos o cualquier información relevante que quieras que se incluya en el contenido.]

Formato de respuesta esperado: [Indica el formato específico que deseas para las respuestas, por ejemplo: "Por favor, proporciona un párrafo introductorio, seguido de 3 puntos principales con descripciones breves y una conclusión breve de una oración."]

Instrucciones adicionales: [Si hay alguna instrucción adicional o requisitos específicos para el contenido de las slides, por favor inclúyelos aquí.]
Modelo: text-davinci-003

Instrucción: Por favor, genera un contenido para slides sobre [indica el tema específico] siguiendo el formato: [indica el formato de respuesta esperado, por ejemplo: "un párrafo introductorio, seguido de 3 puntos principales con descripciones breves y una conclusión breve de una oración"]. Incluye [indica cualquier detalle o requisito adicional que desees] en el contenido. Puedes utilizar datos, estadísticas, ejemplos u otra información relevante para respaldar tus puntos. 



*/
