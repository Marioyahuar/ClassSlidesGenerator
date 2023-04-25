let variable =
  "Slide 1: Introducción, Contenido: Bienvenidos al taller de preparación de recetas caseras para mascotas. El propósito de este taller es enseñarles a los estudiantes cómo preparar alimentos saludables y nutritivos para sus mascotas usando los alimentos frescos y naturales adecuados. Slide 2: Beneficios, Contenido: Preparar alimentos para su mascota en su propia cocina le da a usted un mayor control sobre lo que comen y suele ser mucho más saludable, nutritivo y ahorrativo que comprar comida para mascotas pre-empaquetada. También le permite decidir los ingredientes específicos para satisfacer necesidades dietéticas específicas, como enfermedades y problemas intestinales. Slide 3: Ingredientes básicos, Contenido: Los alimentos básicos que debe incluir en su alimento para mascotas para asegurarse de que reciban las vitaminas y minerales necesarios son carne de vaca, pollo, salmón, huevos, queso, arroz, plátano, zanahoria y yogur. Slide 4: Ejemplos de recetas, Contenido: Pudín de plátano y yogur: mezcle 120 gramos de yogur natural sin grasa, un plátano mediano, aproximadamente 4 cucharadas de miel y una cucharada de aceite de oliva en un procesador de alimentos. Después, puedes servir la mezcla a tu mascota mezclada con cualquier comida para mascotas que tengas. Otra receta que podrías preparar es un risotto de salmón: hierve una taza de arroz integral junto con un poco de caldo de pollo y un puñado de perejil y zanahoria picadas. Agregue salmón desmenuzado y una cucharada de aceite de oliva y mezcle bien. Slide 5: Consideraciones finales, Contenido: Siempre es importante consultar con su veterinario antes de incorporar nuevos alimentos a la dieta de su mascota. Esto ayudará a asegurarse de que reciba los nutrientes adecuados para mantenerla saludable y feliz. Asegúrate de proporcionarle comidas equilibradas y saludables con los ingredientes adecuados para su sistema digestivo.";

// Remover espacios en blanco innecesarios
variable = variable.replace(/\s+/g, " ");

// Separar por los delimitadores
const slidesArray = variable.split("Slide");

// Crear un arreglo para almacenar los objetos de slide
const slides = [];

// Recorrer cada slide en el arreglo
for (let i = 1; i < slidesArray.length; i++) {
  // Separar el título y contenido del slide
  const slideInfo = slidesArray[i].split(",");
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

console.log(jsonSlides);

var json = `[
    {
    "Slide":1,
    "Titulo":"",
    "Contenido":"Introducción a los Frameworks de JavaScript."
},
    {"Slide":2,"Titulo":"","Contenido":"Los Frameworks de JavaScript ahorran tiempo y esfuerzo al programar."
},
{"Slide":3,"Titulo":"","Contenido":"Los Frameworks ofrecen un gran repertorio de herramientas y librerías que reducen la necesidad de escribir código desde cero."
},
{"Slide":4,"Titulo":"","Contenido":"Varias herramientas de los Frameworks ayudan al programador a mantener la consistencia y mantener el orden en el código. Algunos de los principales Frameworks de JavaScript incluyen React, Angular, Vue.js y Node.js."
},
{"Slide":5,"Titulo":"","Contenido":"Los Frameworks de JavaScript ayudan a reducir los tiempos de desarrollo, mejoran la productividad y permiten crear aplicaciones robustas con un ciclo de vida ágil. Según una encuesta de StackOverflow, el 70% de los desarrolladores utilizan un Framework de JavaScript para sus proyectos."
}
]`;

var obj = JSON.parse(json);

console.log(obj[0]);
