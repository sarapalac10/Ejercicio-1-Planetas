const objPlanetas = {
  mercurio: {
    distancia: 0.39,
    tamano: 0.39,
  },
  venus: {
    distancia: 0.725,
    tamano: 0.95,
  },
  tierra: {
    distancia: 1,
    tamano: 1,
  },
  marte: {
    distancia: 1.52,
    tamano: 0.53,
  },
  jupiter: {
    distancia: 5.2,
    tamano: 11.21,
  },
  saturno: {
    distancia: 9.54,
    tamano: 9.41,
  },
  urano: {
    distancia: 19.22,
    tamano: 3.98,
  },
  neptuno: {
    distancia: 30.06,
    tamano: 3.81,
  },
};

//Botón enviar //

var btn_enviar = document.querySelector("#btn_enviar_evaluacion");

function registraPlaneta() {
  let planeticas = [];

  for (let i = 1; i < 6; i++) {
    let objectPlaneta = {
      numero: +document.querySelector(`#n_planeta_${i}`)?.value,
      nombre: document.querySelector(`#np_planeta_${i}`)?.value,
      distancia: +document.querySelector(`#d_planeta_${i}`)?.value,
      tamano: +document.querySelector(`#t_planeta_${i}`)?.value,
    };
    if (
      !Object.values(objectPlaneta).every((item) => item === 0 || item === "")
    ) {
      planeticas.push(objectPlaneta);
    }
  }

  //Guardar en localStorage (Convertir a un formato Json, castear el objeto) El objeto se llama "Planetas"
  localStorage.setItem("planetas", JSON.stringify(planeticas));

  alert("su registro ha sido enviado :D ");
}

//Botón buscar //

var btn_buscar = document.querySelector("#btn_buscar_planetas");

function buscarPlaneta() {
  for (let i = 1; i < 6; i++) {
    var nombrePlaneta = document.querySelector(`#np_planeta_${i}`)?.value;
    if (nombrePlaneta !== "") {
      if (Object.keys(objPlanetas).includes(nombrePlaneta)) {
        alert(`el nombre del planeta: ${nombrePlaneta} sí existe`);
      } else {
        alert(`el nombre del planeta: ${nombrePlaneta} no existe`);
      }
    }
  }
}

//Botón ordenar //

var btn_ordenar = document.querySelector("#btn_ordenar_valores");
let ordenar = false;
function ordenarPlaneta() {
  ordenar = !ordenar;
  console.log(ordenar);
  let planetas = JSON.parse(localStorage.getItem("planetas"));

  let planetasOrdenados = planetas.sort((a, b) => {
    if (ordenar) {
      if (a.numero > b.numero) return 1;
      if (a.numero < b.numero) return -1;
      return 0;
    } else {
      if (a.numero > b.numero) return -1;
      if (a.numero < b.numero) return 1;
      return 0;
    }
  });

  console.log(planetasOrdenados);

  // sobreescribir las filas
  planetasOrdenados.forEach((planeta, index) => {
    console.log(document.getElementById(`n_planeta_${index + 1}`));
    document.querySelector(`#n_planeta_${index + 1}`).value = planeta.numero;
    document.querySelector(`#np_planeta_${index + 1}`).value = planeta.nombre;
    document.querySelector(`#d_planeta_${index + 1}`).value = planeta.distancia;
    document.querySelector(`#t_planeta_${index + 1}`).value = planeta.tamano;
  });

  localStorage.setItem("planetas", JSON.stringify(planetasOrdenados));
}

//Botón filtrar //
var btn_filtrar = document.querySelector("#btn_filtrar_distancia");

function filtrarPlaneta() {
  let planetas = JSON.parse(localStorage.getItem("planetas"));

  planetas.forEach((planeta, index) => {
    if (!Object.keys(objPlanetas).includes(planeta.nombre)) {
      return;
    }
    if (planeta.distancia === objPlanetas[planeta.nombre].distancia) {
      return;
    }
    console.log(planeta.distancia);
    planeta.distancia = 0;
    document.querySelector(`#d_planeta_${index + 1}`).value = "";
    planeta.numero = 0;
    document.querySelector(`#n_planeta_${index + 1}`).value = "";
    planeta.nombre = "";
    document.querySelector(`#np_planeta_${index + 1}`).value = "";
    planeta.tamano = 0;
    document.querySelector(`#t_planeta_${index + 1}`).value = "";
  });

  console.log(planetas);
  localStorage.setItem("planetas", JSON.stringify(planetas));
}

