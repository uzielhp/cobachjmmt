const CONEXION = 'https://script.google.com/macros/s/AKfycbxFXPyv_Cs7ffiYMhiy5OE7ymTTx_F2TE1jOXHQ7jc2_Xplur8u_qbSACY0adrvpqDi/exec';
let mnExamenes = sessionStorage.getItem('mnExamenes') || null;

async function mostrarMenu() {
  document.getElementById('app-cargando').innerHTML = `
  <div class="w-100 text-center placeholder-glow">      
    <div class="placeholder bg-secondary py-3 mb-3 col-12">&nbsp;</div>      
  </div>

  <div class="container text-center placeholder-glow">    
    <div class="row mb-3">
      <div class="col-12 col-md-8">
      <span class="placeholder bg-secondary py-3 col-12"></span>
      </div>
      <div class="col-12 col-md-4">
      <span class="placeholder bg-secondary py-3 col-12"></span>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12 col-md-4">
      <span class="placeholder bg-secondary py-3 col-12"></span>
      </div>
      <div class="col-12 col-md-4">
      <span class="placeholder bg-secondary py-3 col-12"></span>
      </div>
      <div class="col-12 col-md-4">
      <span class="placeholder bg-secondary py-3 col-12"></span>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12 col-md-6">
      <span class="placeholder bg-secondary py-3 col-12"></span>
      </div>
      <div class="col-12 col-md-6">
      <span class="placeholder bg-secondary py-3 col-12"></span>
      </div>
    </div>    
  </div>
  `;

  document.querySelector('header').innerHTML = `  
  <!-- Modals.ini -->
  <div class="modal fade" id="adminModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Administración</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Administración</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="formAdminCfgs">
            <div class="container-fluid">
              <div class="row mb-3">
                <label for="primero" class="col-2 col-form-label">Primero</label>
                <div class="col-10">
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
  <!-- Modals.fin -->
  
  <nav class="navbar navbar-expand-md fixed-top">
    <div class="container">
      <!-- Logotipo Izquierdo -->
      <a class="d-flex align-items-center">
        <img class="logo" src="imgs/logo.png" alt="Logo">
      </a>

      <!-- Acciones rápidas a la derecha -->
      <div class="d-flex align-items-center order-md-last gap-3">

        <!-- Logotipo Derecho -->
        <div class="d-flex align-items-center">
          <a href="#" data-bs-toggle="modal" data-bs-target="#adminModal"><img class="logo" src="imgs/adm.png" alt="ADM"></a>
        </div>

        <!-- Botón de Menú Móvil Personalizado -->
        <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <i class="bi bi-grid-fill"></i>
        </button>
      </div>

      <!-- Enlaces del Menú Centralizados y Elegantes -->
      <div class="collapse navbar-collapse justify-content-center" id="navbarContent">
        <ul class="navbar-nav gap-2 mt-3 mt-md-0">
          <li class="nav-item">
            <a class="nav-link" href="index.html" id="nav-inicio">Inicio</a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link inline-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Acts. 200s <i class="bi bi-chevron-down custom-arrow"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="200_Act10.html">Act. Contaminación digital</a>
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown" id="dropdownExamenes">
            <a class="nav-link inline-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Examenes <i class="bi bi-chevron-down custom-arrow"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="Examen400.html">400s</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div id="msgCargando1" class="placeholder-glow m-0 p-0" style="line-height: 0; visibility: hidden;">
    <span class="placeholder col-12 d-block"
      style="background-color: var(--bg-titulo); padding: 0 !important; margin: 0 !important;"></span>
  </div>
  `;

  document.querySelector('footer').innerHTML = `
  <div id="msgCargando"
  class="text-center py-3 position-fixed bottom-0 fw-bold"
  style="z-index: 1092; display: none; background-color: var(--bg-titulo); padding-left: 10px; padding-right: 10px;">
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Cargando...</span>
  </div>  
  <div id="msgError"
  class="text-center py-3 position-fixed bottom-0 w-100 fw-bold"
  style="display: none; background-color: var(--bg-titulo);">
    Hola
  </div>
  `;

  msgCargando(true);
  try {
    if (mnExamenes === null) {
      mnExamenes = String(await obtenerUrlSem('Menu')).toLowerCase();
      sessionStorage.setItem('mnExamenes', mnExamenes);
    }
    if (mnExamenes === "true") { document.getElementById('dropdownExamenes').classList.remove('d-none'); }
    document.getElementById('app-cargando').style.display = 'none';
    document.getElementById('app-content').style.display = 'block';
  }
  catch (e) { msgError("Error al validar el menú de exámenes:", e); }
  msgCargando(false);
}

// ==========================================
// CONTROLADORES DE EVENTOS DEL DOM
// ==========================================
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
      e.preventDefault(); // Evita recarga de página por comportamiento nativo submit
      msgCargando(true);

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

          // Cerramos el modal de autenticación de forma segura
          const modalActual = bootstrap.Modal.getInstance(htmlAdminModal) || new bootstrap.Modal(htmlAdminModal);
          modalActual.hide();

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
      msgCargando(false);
    });
  }

  // 4. Guardar Configuraciones del Segundo Modal (adminModalCfgs)
  if (btnGuardarCfgs) {
    btnGuardarCfgs.addEventListener('click', async function (e) {
      e.preventDefault();
      msgCargando(true);
      await guardarUrlSemestres();
      adminModalCfgs.hide();
      msgCargando(false);
      msgAlerta("Configuraciones guardadas exitosamente");
    });
  }
});

// ==========================================
// FUNCIONES DE UTILIDAD Y COMPLEMENTOS
// ==========================================
function msgAlerta(message, delay = 3000) {
  let contenedor = document.getElementById('alerta-container');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.id = 'alerta-container';
    contenedor.className = 'position-fixed top-0 end-0 p-3 fw-bold';
    contenedor.style.zIndex = '1100';
    contenedor.style.marginTop = '45px';
    contenedor.style.marginRight = '-12px';
    document.body.appendChild(contenedor);
  }

  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert border-0 text-white alert-dismissible fade show" style="background-color: var(--bg-titulo);" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

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
  const loader = document.getElementById('msgCargando');
  const loader1 = document.getElementById('msgCargando1');

  // Verificamos que el contenedor exista para evitar errores si en alguna página no lo pusiste
  if (!loader) return;

  if (b) {
    peticionesActivas++; // Un proceso (como el examen o el menú) pide encender el letrero (+1)
    loader.style.display = 'block';
    loader1.style.visibility = 'visible';
  }
  else {
    peticionesActivas--; // Un proceso avisa que ya terminó su descarga (-1)

    // Solo apagamos el letrero naranja si YA NO HAY ningún proceso pendiente
    if (peticionesActivas <= 0) {
      peticionesActivas = 0; // Lo mantenemos en 0 por seguridad
      loader.style.display = 'none'; // Ahora sí, ocultamos el letrero de la pantalla
      loader1.style.visibility = 'hidden';
    }
  }
}

// ==========================================
// INTERACCIONES CON LA API (GOOGLE SHEETS)
// ==========================================
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
    msgError("Error al conectarse con Hoja ADM:", e);
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