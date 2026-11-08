const CONEXION = 'proxy.php';
let ExamenesURLS = sessionStorage.getItem('ExamenesURLS') || null;
let peticionesActivas = 0;

class HCargando extends HTMLElement {
  connectedCallback() {
  this.innerHTML = `
  <div aria-hidden="true" class="placeholder-glow d-flex flex-column bg-dark min-vh-100 m-0 p-0">
      <div class="navbar" style="height: 50px;">
        <div class="container-fluid d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3 col-4 col-md-2">        
            <span class="placeholder col-3 py-3 bg-secondary bg-opacity-70 rounded-circle" style="width: 40px; height: 40px;"></span>
            <span class="contenedor-logo is-loading placeholder col-8 py-3 rounded" style="width: 65px; height: 40px; background: rgba(var(--bs-secondary-rgb), 0.5) !important;"></span>
          </div>
          <div class="d-flex align-items-center justify-content-end gap-3 col-4 col-md-2">          
            <span class="placeholder p-3 bg-secondary bg-opacity-70 rounded-circle" style="width: 40px; height: 40px;"></span>
          </div>
        </div>
      </div>
      </div>`;
  }
}
customElements.define('h-cargando', HCargando);

class HMenu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="fixed-top" style="padding: 0 5px; background-color: var(--bg-obsidian); height: 50px;">
      <div class="d-flex align-items-center gap-2">
        <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"><i class="bi bi-grid-fill fs-1"></i></button>
        <div class="position-relative">
          <div id="msgC1" class="contenedor-logo"><img class="logo" src="imgs/logo.png" alt="Logo" style="height: 40px; width: auto;"></div>        
          <span id="msgC2" style="color: var(--bg-titulo); visibility: hidden; font-weight: bold;">Espere...</span>
        </div>
        <a href="#" data-bs-toggle="modal" data-bs-target="#adminModal" class="ms-auto"><img class="logo" src="imgs/adm.png" alt="Administración" style="height: 40px; width: auto;"></a>
      </div>
    </div>
    
    <div class="offcanvas offcanvas-start bg-dark text-light" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions">
      <div class="offcanvas-header border-bottom border-secondary">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">COBACH JMMT</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <nav class="navbar navbar-dark p-0">
          <ul class="navbar-nav w-100 gap-2">
            <li class="nav-item">
              <a class="nav-link text-white-50 fs-6 py-2" href="index.html">
                <i class="bi bi-house-door me-2"></i>Inicio
              </a>
            </li>
            <li class="nav-item">
              <h2 class="h6 fw-bold mt-2 mb-1" style="color: var(--bg-titulo);">Acts. 200s</h2>
              <a class="nav-link text-white-50 fs-6 py-1 ps-2" href="200_Act10.html">Act. Contaminación digital</a>
            </li>        
            <li class="nav-item" id="mnExamenes">
              <h2 class="h6 fw-bold mt-2 mb-1" style="color: var(--bg-titulo);">Exámenes</h2>
              <a class="nav-link text-white-50 fs-6 py-1 ps-2" href="Examen.html" data-hoja="s100">100s</a>
              <a class="nav-link text-white-50 fs-6 py-1 ps-2" href="Examen.html" data-hoja="s200">200s</a>
              <a class="nav-link text-white-50 fs-6 py-1 ps-2" href="Examen.html" data-hoja="s300">300s</a><br/>
              <a class="nav-link text-white-50 fs-6 py-1 ps-2" href="Examen.html" data-hoja="s400">400s</a>         
              <a class="nav-link text-white-50 fs-6 py-1 ps-2" href="Examen.html" data-hoja="s500">500s</a>
              <a class="nav-link text-white-50 fs-6 py-1 ps-2" href="Examen.html" data-hoja="s600">600s</a>
            </li>        
          </ul>
        </nav>
      </div>
    </div>`;
  }
}
customElements.define('h-menu', HMenu);

// CONTROLADORES DE EVENTOS DEL DOM
document.addEventListener('DOMContentLoaded', async () => {
  Modals();
  const menuExamenes = document.getElementById('mnExamenes');
  menuExamenes.addEventListener('click', (e) => {
    const enlace = e.target.closest('a[data-hoja]');
    if (!enlace) return; // Si no hizo clic en un enlace con data-hoja, no hacemos nada

    const hoja = enlace.dataset.hoja;
    sessionStorage.setItem('Examen', hoja);
  });
  
  try {        
    msgCargando(true);    
    await llamarDatosAdm();
    const datosAdm = obtenerDatosAdm();
    mnExamenes.style.visibility = (datosAdm.Menu === true) ? 'visible' : 'hidden';
    /*if (window.location.pathname.split('/').pop() === "Examen400.html" && ExamenesURLS === "false") {
      window.location.href = "index.html";
      return;
    }*/   
  } 
  catch (e) { msgError(e); } 
  finally {
    msgCargando(false);

    // El DOM está completamente estructurado y los datos listos. Apagamos el esqueleto con seguridad.
    toggleD('h-cargando', false);
    toggleD('h-menu', true);
    toggleD('main', true); // Asegúrate de tener la etiqueta <main> en tus archivos HTML
  }  
  // Referencias seguras a los elementos del DOM
  const htmlAdminModal = document.getElementById('adminModal');
  const formulario = document.getElementById('formAdmin');
  const btnGuardarCfgs = document.getElementById('btnGuardarCfgs');
  const adminModalCfgs = new bootstrap.Modal(document.getElementById('adminModalCfgs'));

  // Dar Foco automático al Input de Contraseña al abrir el primer Modal
  if (htmlAdminModal) {
    htmlAdminModal.addEventListener('shown.bs.modal', () => {
      if (contratxt) { contratxt.focus(); }
    });
  }

  // Envío y validación del formulario (Responde a Enter y a Click en Guardar)

  if (formulario) {
    formulario.addEventListener('submit', async e => {
      try {
        e.preventDefault();
        msgCargando(true);

        // Cerramos el modal de autenticación de forma segura
        const modalActual = bootstrap.Modal.getInstance(htmlAdminModal) || new bootstrap.Modal(htmlAdminModal);
        const contraerror = document.getElementById('contraerror');
        const datosAdm = obtenerDatosAdm();        

        // Añadimos estilos de validación visual de Bootstrap
        formulario.classList.add('was-validated');

        if (formulario.checkValidity()) {
          if (document.getElementById('contra').value === datosAdm.Contra.toString()) {
            formulario.classList.remove('was-validated');
            formulario.reset();

            // Cargamos configuraciones y abrimos el segundo modal de pantalla completa
            modalActual.hide();
            document.getElementById('primero').value = datosAdm.s100;
            document.getElementById('segundo').value = datosAdm.s200;
            document.getElementById('tercero').value = datosAdm.s300;
            document.getElementById('cuarto').value = datosAdm.s400;
            document.getElementById('quinto').value = datosAdm.s500;
            document.getElementById('sexto').value = datosAdm.s600;
            document.getElementById('menu').checked = datosAdm.Menu;
            adminModalCfgs.show();
          }
          else {
            formulario.reset();
          }
        }
      }
      catch (e) { msgError("Error al validar contraseña"); }
      finally { msgCargando(false); }
    });
  }

  // Guardar Configuraciones del Segundo Modal (adminModalCfgs)
  if (btnGuardarCfgs) {
    btnGuardarCfgs.addEventListener('click', async function (e) {
      try {
        e.preventDefault();
        msgCargando(true);

        adminModalCfgs.hide();
        const datosA = {
          primero: document.getElementById('primero').value,
          segundo: document.getElementById('segundo').value,
          tercer: document.getElementById('tercero').value,
          cuarto: document.getElementById('cuarto').value,
          quinto: document.getElementById('quinto').value,
          sexto: document.getElementById('sexto').value,
          menu: document.getElementById('menu').checked
        };      
        const data = await llamarAppScript(null, 'POST', datosA);          
        if (data.status === 'yes') { 
          llamarDatosAdm(); // Actualizamos los datos en sessionStorage después de guardar
          msgAlerta("Configuraciones guardadas"); 
        }
      }
      catch (e) { msgError("Error al guardar configuraciones ADM"); }
      finally { msgCargando(false); }
    });
  }
});

function obtenerDatosAdm() {
  const datos = sessionStorage.getItem('ExamenesURLS');
  return datos ? JSON.parse(datos) : null;
}

async function llamarDatosAdm() {
  const respuesta = await llamarAppScript();
  if (respuesta) {
    sessionStorage.setItem('ExamenesURLS', JSON.stringify(respuesta));
  }
}

async function Modals() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  footer.innerHTML = `    
  <div class="modal fade" id="adminModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Administración</h1>
          <button type="button" class="btn-close btn-close-n" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="formAdmin">
          <div class="modal-body">
            <div class="mb-3">
              <label for="contra" class="col-form-label">Contraseña:</label>
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
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Configuraciones de Ciclo</h1>
          <button type="button" class="btn-close btn-close-n" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="formAdminCfgs">
            <div class="container-fluid p-0">
              ${['primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto'].map(sem => `
                <div class="row mb-3 align-items-center">
                  <label for="${sem}" class="col-sm-3 col-form-label text-capitalize">${sem}</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" id="${sem}">
                  </div>
                </div>
              `).join('')}
              <fieldset class="row mb-3">
                <legend class="col-form-label col-sm-3 pt-0">Exámenes</legend>
                <div class="col-sm-9">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="menu">
                    <label class="form-check-label" for="menu">Visibilidad de menú activa</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary w-100" id="btnGuardarCfgs">Guardar Configuraciones</button>
        </div>
      </div>
    </div>
  </div>

  <div id="modalSaliste" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Te saliste de la página</h1>
          <button type="button" class="btn-close btn-close-n" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Detectamos que saliste del formulario. Por favor, mantente en esta pantalla.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning w-100" data-bs-dismiss="modal">Entendido y Regresar</button>
        </div>
      </div>
    </div>
  </div>

  <div id="msgError" class="text-center py-2 position-fixed bottom-0 start-0 w-100 text-white fw-medium shadow" style="display: none; background-color: var(--bg-titulo); z-index: 1060;"></div>
  `;
}

// CONTROLADOR DE VISIBILIDAD OPTIMIZADO
function toggleD(comp, show) {
  const loader = document.querySelector(comp);
  if (!loader) return;
  loader.style.display = show ? "block" : "none";
}

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

async function llamarAppScript(urlAppScript = null, metodo = 'GET', datosA = null){
  try {
    // Codificamos directamente la URL del Apps Script para enviarla de forma segura por GET
    if (urlAppScript === null) { urlAppScript = "https://script.google.com/macros/s/AKfycbwcZfTNSKYeIWWR1xdeavEMyejaI-YXOP2-Y_pdnTG7RYjbFSgKo4zqLVSNIEjmQ9an/exec"; }
    let url = `${CONEXION}?target=${encodeURIComponent(urlAppScript)}`;
    
    const opciones = { method: metodo, cache: 'no-store' };

    if (metodo === 'POST' && datosA) {
      opciones.headers = { 'Content-Type': 'application/json' };
      opciones.body = JSON.stringify(datosA);
    }

    const response = await fetch(url, opciones);
    const data = await response.json(); 
    return data; 
  } catch (e) {
    msgError("Error al conectarse con el servidor");
    return null;
  }
}