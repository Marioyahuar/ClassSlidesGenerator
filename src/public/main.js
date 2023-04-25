function fetchCurriculum(subject) {
  fetch(`/generate/${subject}`)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("curriculum").innerHTML = data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function fetchSlides(subject, theme) {
  fetch(`/generateSlides/${theme}/${subject}`)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("slides").innerHTML = data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function generarSlides(subject, quantity, details) {
  const slideResultsContainer = document.getElementById("slide-results");
  slideResultsContainer.innerHTML = "Generando, espera un momento por favor...";
  fetch(`/generateSlidesv2/${subject}/${quantity}/${details}`)
    .then((response) => response.json())
    .then((slides) => {
      slides = JSON.parse(slides);
      if (!Array.isArray(slides)) {
        console.log("El objeto JSON no es un array");
      } else {
        console.log("Si es un array");
      }
      console.log(slides);
      slideResultsContainer.innerHTML = "Contenido generado: ";
      slides.forEach((slide) => {
        // Crear una nueva etiqueta <div> para el slide
        const slideDiv = document.createElement("div");

        // Crear contenido HTML con la información del slide
        slideDiv.innerHTML = `
          <p>Slide: ${slide.Slide}</p>
          <p>Titulo: ${slide.Titulo}</p>
          <p>Contenido: ${slide.Contenido}</p>
        `;

        // Agregar el nuevo <div> al contenedor de resultados de slides
        slideResultsContainer.appendChild(slideDiv);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
