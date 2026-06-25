const CONEXION = 'https://script.google.com/macros/s/AKfycbxFXPyv_Cs7ffiYMhiy5OE7ymTTx_F2TE1jOXHQ7jc2_Xplur8u_qbSACY0adrvpqDi/exec';
let mnExamenes = sessionStorage.getItem('mnExamenes') || null;

async function mostrarMenu() {

  document.getElementById('app-cargando').innerHTML = `  
  <div aria-hidden="true" class="placeholder-glow d-flex flex-column bg-dark min-vh-100 m-0 p-0">

    <div class="navbar" style="height: 50px;">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3 col-4 col-md-2">        
          <span class="placeholder col-3 py-3 bg-secondary bg-opacity-70 rounded-circle"
            style="width: 40px; height: 40px;"></span>
          <span class="contenedor-logo is-loading placeholder col-8 py-3 rounded" 
            style="width: 65px; height: 40px; background: rgba(var(--bs-secondary-rgb), 0.5) !important;">
          </span>
        </div>

        <div class="d-flex align-items-center justify-content-end gap-3 col-4 col-md-2">          
          <span class="placeholder p-3 bg-secondary bg-opacity-70 rounded-circle"
            style="width: 40px; height: 40px;"></span>
        </div>
      </div>
    </div>

    <div class="container-fluid p-2 flex-grow-1 d-flex flex-column">

      <div class="row g-2 flex-grow-1">

        <div class="col-12 col-md-6 d-flex">
          <div
            class="w-100 placeholder bg-secondary bg-opacity-25 rounded d-flex flex-column p-3 justify-content-between">
            <div class="row w-100 m-0">
              <span class="placeholder col-4 py-3 bg-secondary bg-opacity-50 rounded"></span>
            </div>
            <div class="row w-100 m-0 justify-content-center">
              <span class="placeholder col-6 py-5 bg-secondary bg-opacity-50 rounded-3"></span>
            </div>
            <div class="row w-100 m-0">
              <span class="placeholder col-12 py-2 bg-secondary bg-opacity-50 rounded"></span>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 d-flex">
          <div
            class="w-100 placeholder bg-secondary bg-opacity-25 rounded d-flex flex-column p-3 justify-content-between">
            <div class="row w-100 m-0 gap-2">
              <span class="placeholder col-8 py-3 bg-secondary bg-opacity-50 rounded"></span>
              <span class="placeholder col-5 py-2 bg-secondary bg-opacity-50 rounded"></span>
            </div>
            <div class="row w-100 m-0 gap-2 justify-content-end">
              <span class="placeholder col-6 py-2 bg-secondary bg-opacity-50 rounded"></span>
              <span class="placeholder col-4 py-2 bg-secondary bg-opacity-50 rounded"></span>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 d-flex">
          <div
            class="w-100 placeholder bg-secondary bg-opacity-25 rounded d-flex flex-column p-3 justify-content-between">
            <div class="row w-100 m-0">
              <span class="placeholder col-5 py-3 bg-secondary bg-opacity-50 rounded"></span>
            </div>
            <div class="row w-100 m-0 justify-content-center">
              <span class="placeholder col-8 py-4 bg-secondary bg-opacity-50 rounded"></span>
            </div>
            <div class="row w-100 m-0">
              <span class="placeholder col-10 py-2 bg-secondary bg-opacity-50 rounded"></span>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 d-flex">
          <div
            class="w-100 placeholder bg-secondary bg-opacity-25 rounded d-flex flex-column p-3 justify-content-between">
            <div class="row w-100 m-0 gap-2">
              <span class="placeholder col-7 py-2 bg-secondary bg-opacity-50 rounded"></span>
              <span class="placeholder col-9 py-2 bg-secondary bg-opacity-50 rounded"></span>
              <span class="placeholder col-6 py-2 bg-secondary bg-opacity-50 rounded"></span>
            </div>
            <div class="row w-100 m-0 justify-content-end">
              <span class="placeholder col-4 py-3 bg-secondary bg-opacity-50 rounded"></span>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 d-flex">
          <div
            class="w-100 placeholder bg-secondary bg-opacity-25 rounded d-flex flex-column p-3 justify-content-between">
            <div class="row w-100 m-0 gap-2">
              <span class="placeholder col-7 py-2 bg-secondary bg-opacity-50 rounded"></span>
              <span class="placeholder col-9 py-2 bg-secondary bg-opacity-50 rounded"></span>
              <span class="placeholder col-6 py-2 bg-secondary bg-opacity-50 rounded"></span>
            </div>
            <div class="row w-100 m-0 justify-content-end">
              <span class="placeholder col-4 py-3 bg-secondary bg-opacity-50 rounded"></span>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 d-flex">
          <div
            class="w-100 placeholder bg-secondary bg-opacity-25 rounded d-flex flex-column p-3 justify-content-between">
            <div class="row w-100 m-0 gap-2">
              <span class="placeholder col-7 py-2 bg-secois-loadingndary bg-opacity-50 rounded"></span>
              <span class="placeholder col-9 py-2 bg-secondary bg-opacity-50 rounded"></span>
              <span class="placeholder col-6 py-2 bg-secondary bg-opacity-50 rounded"></span>
            </div>
            <div class="row w-100 m-0 justify-content-end">
              <span class="placeholder col-4 py-3 bg-secondary bg-opacity-50 rounded"></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  `;

  //Modals
  document.querySelector('header').innerHTML = `    
  <div class="modal fade" id="adminModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Administración</h1>
          <button type="button" class="btn-close btn-close-n" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="formAdmin">
          <div class="modal-body">
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Contraseña:</label>
              <input type="password" class="form-control" id="contra" required>
              <div class="invalid-feedback" id="contraerror">
                Por favor, escriba la contraseña correcta.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" id="btnGuardarAdmin">Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="modal fade" id="adminModalCfgs" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Administración</h1>
          <button type="button" class="btn-close btn-close-n" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="formAdminCfgs">
            <div class="container-fluid">
              <div class="row mb-3">
                <label for="primero" class="col-sm-2 col-form-label">Primero</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="primero">
                </div>
              </div>
              <div class="row mb-3">
                <label for="segundo" class="col-sm-2 col-form-label">Segundo</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="segundo">
                </div>
              </div>
              <div class="row mb-3">
                <label for="tercero" class="col-sm-2 col-form-label">Tercero</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="tercero">
                </div>
              </div>
              <div class="row mb-3">
                <label for="cuarto" class="col-sm-2 col-form-label">Cuarto</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="cuarto">
                </div>
              </div>
              <div class="row mb-3">
                <label for="quinto" class="col-sm-2 col-form-label">Quinto</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="quinto">
                </div>
              </div>
              <div class="row mb-3">
                <label for="sexto" class="col-sm-2 col-form-label">Sexto</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="sexto">
                </div>
              </div>
              <fieldset class="row mb-3">
                <legend class="col-form-label col-sm-2 pt-0">Menu Examenes</legend>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="menu">
                    <label class="form-check-label" for="menu">
                      Activar / desactivar
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" id="btnGuardarCfgs">Guardar</button>
        </div>
      </div>
    </div>
  </div>
  `;

  //Nav
  document.querySelector('header').innerHTML += `
  <div class="fixed-top" style="padding: 0 5px; background-color: var(--bg-obsidian); height: 50px;">
    <div class="d-flex align-items-center gap-2">
      <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" aria-label="Abrir menú">
        <i class="bi bi-grid-fill fs-1"></i>
      </button>

      <div class="position-relative">
        <div id="msgC1" class="contenedor-logo">
          <img class="logo" src="imgs/logo.png" alt="Logo" style="height: 40px; width: auto;">
        </div>        
        <span id="msgC2" style="color: var(--bg-titulo); visibility: hidden; font-weight: bold;">Espere...</span>
      </div>

      <a href="#" data-bs-toggle="modal" data-bs-target="#adminModal" class="ms-auto">
        <img class="logo" src="imgs/adm.png" alt="Administración" style="height: 40px; width: auto;">
      </a>
    </div>
  </div>

  <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <h1 class="h4 offcanvas-title" id="offcanvasWithBothOptionsLabel">COBACH JMMT</h1>
      <button type="button" class="btn-close btn-close-n" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link h6" href="index.html" id="nav-inicio">Inicio</a>
        </li>
        <li class="nav-item">
          <h2 class="h6 fw-bold" style="color: var(--bg-titulo);">Acts. 200s</h2>
          <a class="nav-link h6" href="200_Act10.html">Act. Contaminación digital</a>
        </li>        
        <li class="nav-item" id="mnExamenes1">
          <h2 class="h6 fw-bold" style="color: var(--bg-titulo);">Exámenes</h2>
          <a class="nav-link h6" href="Examen400.html">400s</a>
        </li>        
      </ul>
    </div>
  </div>
  `;

  document.querySelector('footer').innerHTML = `
  <div id="msgError"
  class="text-center py-2 position-fixed bottom-0 w-100"
  style="display: none; background-color: var(--bg-titulo);">
    Hola
  </div>
  `;

  try {
    //msgCargando(true);
    if (mnExamenes === null) {
      mnExamenes = String(await obtenerUrlSem('Menu')).toLowerCase();
      sessionStorage.setItem('mnExamenes', mnExamenes);
    }
    const mnExamenes1 = document.getElementById('mnExamenes1');
    if (mnExamenes1 && mnExamenes === "true") {
      mnExamenes1.style.visibility = 'visible';
    }
    else {
      mnExamenes1.style.visibility = 'hidden';
    }

    document.getElementById('app-cargando').style.display = 'none';
    document.getElementById('app-content').style.display = 'block';

    if (window.location.pathname.split('/').pop() == "Examen400.html" && mnExamenes === "false") {
      window.location.href = "index.html";
      return;
    }
  }
  catch (e) { msgError("Error al validar el menú (Examenes)", e); }
  //finally { msgCargando(false); }
}

// CONTROLADORES DE EVENTOS DEL DOM
document.addEventListener('DOMContentLoaded', () => {
  mostrarMenu();

  // 1. Referencias seguras a los elementos del DOM
  const htmlAdminModal = document.getElementById('adminModal');
  const formulario = document.getElementById('formAdmin');
  const btnGuardarCfgs = document.getElementById('btnGuardarCfgs');
  const adminModalCfgs = new bootstrap.Modal(document.getElementById('adminModalCfgs'));
  const contratxt = document.getElementById('contra');

  // 2. Dar Foco automático al Input de Contraseña al abrir el primer Modal
  if (htmlAdminModal) {
    htmlAdminModal.addEventListener('shown.bs.modal', () => {
      if (contratxt) contratxt.focus();
    });
  }

  // 3. Envío y validación del formulario (Responde a Enter y a Click en Guardar)
  if (formulario) {
    formulario.addEventListener('submit', async e => {
      try {
        e.preventDefault();
        msgCargando(true);

        // Cerramos el modal de autenticación de forma segura
        const modalActual = bootstrap.Modal.getInstance(htmlAdminModal) || new bootstrap.Modal(htmlAdminModal);
        modalActual.hide();

        const contraerror = document.getElementById('contraerror');
        const contra = await obtenerUrlSem("Contra");

        // Añadimos estilos de validación visual de Bootstrap
        formulario.classList.add('was-validated');

        if (formulario.checkValidity()) {
          if (contratxt.value === contra.toString()) {
            formulario.classList.remove('was-validated');
            formulario.reset();
            contratxt.classList.remove('is-invalid');
            contratxt.classList.remove('is-valid');
            contraerror.style.display = 'none';

            // Cargamos configuraciones y abrimos el segundo modal de pantalla completa
            await obtenerUrlSemestres();
            adminModalCfgs.show();
          }
          else {
            contratxt.classList.remove('is-valid');
            contratxt.classList.add('is-invalid');
            contraerror.style.display = 'block';
          }
        }
      }
      catch (e) { msgError("Error al validar contraseña", e); }
      finally { msgCargando(false); }
    });
  }

  // 4. Guardar Configuraciones del Segundo Modal (adminModalCfgs)
  if (btnGuardarCfgs) {
    btnGuardarCfgs.addEventListener('click', async function (e) {
      try {
        e.preventDefault();
        msgCargando(true);

        adminModalCfgs.hide();
        await guardarUrlSemestres();
        msgAlerta("Configuraciones guardadas");
      }
      catch (e) { msgError("Error al guardar configuraciones ADM", e); }
      finally { msgCargando(false); }
    });
  }
});

// FUNCIONES DE UTILIDAD Y COMPLEMENTOS
function msgAlerta(message, delay = 3000) {
  let contenedor = document.getElementById('alerta-container');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.id = 'alerta-container';
    contenedor.className = 'position-fixed top-0 end-0 p-3';
    contenedor.style.zIndex = '1100';
    contenedor.style.marginTop = '30px';
    contenedor.style.marginRight = '-12px';
    document.body.appendChild(contenedor);
  }

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
  <div class="alert alert-dismissible fade show d-inline-flex align-items-center py-1 pe-2 small"
    style="background-color: var(--bg-titulo);" role="alert">
    <div class="me-3">${message}</div>
    <button type="button" class="btn-close" style="position: relative !important; margin-left: auto; padding: 0.5rem;"
      data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;

  contenedor.appendChild(wrapper);
  const alertaBootstrap = new bootstrap.Alert(wrapper.querySelector('.alert'));

  setTimeout(() => {
    alertaBootstrap.close();
    setTimeout(() => { wrapper.remove(); }, 150);
  }, delay);
}

function msgError(mensaje) {
  let me = document.getElementById('msgError');
  me.textContent = mensaje;
  me.style.display = 'block';
}

// Variable global para llevar el conteo de procesos asíncronos en el COBACH
let peticionesActivas = 0;
function msgCargando(b) {
  const loaderNode1 = document.getElementById('msgC1');
  const loaderNode2 = document.getElementById('msgC2');

  // Verificamos que el contenedor exista para evitar errores si en alguna página no lo pusiste
  if (!loaderNode1) return;

  if (b) {
    peticionesActivas++; // Un proceso (como el examen o el menú) pide encender el letrero (+1)
    loaderNode1.classList.add('is-loading');
    loaderNode2.style.visibility = "visible";
  }
  else {
    peticionesActivas--; // Un proceso avisa que ya terminó su descarga (-1)

    // Solo apagamos el letrero naranja si YA NO HAY ningún proceso pendiente
    if (peticionesActivas <= 0) {
      peticionesActivas = 0; // Lo mantenemos en 0 por seguridad        
      loaderNode1.classList.remove('is-loading');
      loaderNode2.style.visibility = "hidden";
    }
  }
}

// INTERACCIONES CON LA API (GOOGLE SHEETS)
async function obtenerUrlSem(semestre) {
  try {
    const response = await fetch(CONEXION, { method: 'GET', redirect: 'follow', cache: 'no-store' });
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      if (data[i][0].toString().toLowerCase() === semestre.toLowerCase()) {
        return data[i][1];
      }
    }
    return null;
  } catch (e) {
    msgError("Error Hoja ADM", e);
    return null;
  }
}

async function obtenerUrlSemestres() {
  try {
    const response = await fetch(CONEXION, { method: 'GET', redirect: 'follow', cache: 'no-store' });
    const data = await response.json();

    if (data && data.length >= 7) {
      document.getElementById('primero').value = data[0][1];
      document.getElementById('segundo').value = data[1][1];
      document.getElementById('tercero').value = data[2][1];
      document.getElementById('cuarto').value = data[3][1];
      document.getElementById('quinto').value = data[4][1];
      document.getElementById('sexto').value = data[5][1];
      document.getElementById('menu').checked = data[6][1];
    }
    else {
      msgError("La hoja ADM no contiene las 7 filas necesarias.");
    }
  }
  catch (e) {
    msgError("Error al conectarse con Hoja ADM:", e);
    return null;
  }
}

async function guardarUrlSemestres() {
  try {
    const datosAGuardar = {
      primero: document.getElementById('primero').value,
      segundo: document.getElementById('segundo').value,
      tercer: document.getElementById('tercero').value,
      cuarto: document.getElementById('cuarto').value,
      quinto: document.getElementById('quinto').value,
      sexto: document.getElementById('sexto').value,
      menu: document.getElementById('menu').checked
    };

    const response = await fetch(CONEXION, {
      method: 'POST',
      redirect: 'follow',
      cache: 'no-store',
      body: JSON.stringify(datosAGuardar)
    });

    const data = await response.json();

    if (data && data.status === 'yes') { return true; }
    else {
      msgError("Error al guardar en la hoja ADM: " + (data.message || "Error desconocido"));
      return false;
    }
  }
  catch (e) {
    msgError("Error al conectarse con Hoja ADM:", e);
    return false;
  }
}