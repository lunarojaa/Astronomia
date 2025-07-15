// Créditos oficiales de cada ramo
const creditos = {
  'Filosofia': 6,
  'Calculo_dif': 20,
  'Algebra': 20,
  'Modelos_fism': 8,
  'Programacion': 12,
  'Epistemologia': 4,
  'Calculo_int': 18,
  'Algebra_lin': 20,
  'Mecanica_par': 15,
  'Habilidades': 8,
  'Calculo_var': 21,
  'Ecuaciones_dif': 20,
  'Mecanica_sol': 15,
  'Ingles1': 12,
  'Metodos_mat': 18,
  'Fisica_mod': 10,
  'Electromagnetismo': 15,
  'Modelos_com': 10,
  'Ingles2': 12,
  'Modelos_cont': 8,
  'Termodinamica': 15,
  'Mecanica_cla': 15,
  'Astronomia': 13,
  'Ingles3': 12,
  'Mecanica_cuan': 15,
  'Electrodinamica': 15,
  'Astrofisica': 13,
  'Laboratorio_as1': 12,
  'Ingles4': 12,
  'Laboratorio_op': 8,
  'Astrofisica_gal': 13,
  'Introduccion_cos': 13,
  'Astroestadistica': 13,
  'Laboratorio_as2': 8,
  'Electivo1': 12,
  'Electivo2': 12,
  'Practica': 51,
  'Responsabilidad': 6,
};

// Prerrequisitos de cada ramo (ramos que deben estar aprobados para desbloquear este)
const prerequisitos = {
  'Epistemologia': [],
  'Calculo_int': ['Calculo_dif', 'Programacion'],
  'Algebra_lin': ['Algebra', 'Programacion'],
  'Mecanica_par': ['Calculo_dif'],
  'Habilidades': [],
  'Calculo_var': ['Calculo_int'],
  'Ecuaciones_dif': ['Calculo_int', 'Algebra_lin'],
  'Mecanica_sol': ['Mecanica_par'],
  'Ingles1': [],
  'Ingles2':['Ingles1'],
  'Modelos_com': ['Programacion', 'Mecanica_sol'],
  'Metodos_mat': ['Calculo_var', 'Ecuaciones_dif'],
  'Fisica_mod': ['Ecuaciones_dif'],
  'Electromagnetismo': ['Calculo_var'],
  'Ingles3': ['Ingles2'],
  'Modelos_cont': ['Modelos_fism', 'Habilidades'],
  'Termodinamica': ['Calculo_var', 'Mecanica_par'],
  'Mecanica_cla': ['Mecanica_sol'],
  'Astronomia': ['Mecanica_par', 'Fisica_mod'],
  'Ingles4': ['Ingles3'],
  'Mecanica_cuan': ['Mecanica_cla'],
  'Electrodinamica': ['Electromagnetismo', 'Metodos_mat'],
  'Astrofisica': ['Astronomia', 'Termodinamica'],
  'Laboratorio_as1': ['Astronomia', 'Programacion', 'Modelos_cont'],
  'Astroestadistica': ['Metodos_mat'],
  'Astrofisica_gal': ['Astrofisica'],
  'Laboratorio_op': ['Fisica_mod'],
  'Introduccion_cos': ['Electrodinamica', 'Astronomia'],
  'Laboratorio_as2': ['Laboratorio_as1'],
  'Electivo1': ['Astronomia'],
  'Practica': ['Astroestadistica', 'Astrofisica_gal', 'Laboratorio_as2'],
  'Electivo2': ['Astronomia'],
  'Responsabilidad': ['Laboratorio_as2']
};

// Funciones para guardar y cargar progreso en localStorage
function obtenerAprobados() {
  const data = localStorage.getItem('mallaAprobados');
  return data ? JSON.parse(data) : [];
}

function guardarAprobados(aprobados) {
  localStorage.setItem('mallaAprobados', JSON.stringify(aprobados));
}

// Calcula el total de créditos de ramos aprobados
function calcularCreditosAprobados() {
  const aprobados = obtenerAprobados();
  return aprobados.reduce((sum, ramo) => sum + (creditos[ramo] || 0), 0);
}

// Desbloquear ramos con requisitos cumplidos
function actualizarDesbloqueos() {
  const aprobados = obtenerAprobados();

  for (const [ramo, requisitos] of Object.entries(prerequisitos)) {
    const elem = document.getElementById(ramo);
    if (!elem) continue;

    const cumplidos = requisitos.every(req => aprobados.includes(req));

    if (elem.classList.contains('aprobado')) {
      elem.classList.remove('bloqueado');
    } else {
      if (cumplidos) {
        elem.classList.remove('bloqueado');
      } else {
        elem.classList.add('bloqueado');
      }
    }
  }
}


// Manejar clic en ramo
function aprobar(evento) {
  const ramo = evento.currentTarget;
  if (ramo.classList.contains('bloqueado')) return;

  ramo.classList.toggle('aprobado');

  const aprobados = obtenerAprobados();
  if (ramo.classList.contains('aprobado')) {
    if (!aprobados.includes(ramo.id)) aprobados.push(ramo.id);
  } else {
    const index = aprobados.indexOf(ramo.id);
    if (index !== -1) aprobados.splice(index, 1);
  }

  guardarAprobados(aprobados);
  actualizarDesbloqueos();
}

// Iniciar al cargar
window.addEventListener('DOMContentLoaded', () => {
  const todos = document.querySelectorAll('.ramo');
  const aprobados = obtenerAprobados();

  todos.forEach(ramo => {
    if (aprobados.includes(ramo.id)) {
      ramo.classList.add('aprobado');
    }
    ramo.addEventListener('click', aprobar);
  });

  actualizarDesbloqueos();
});
