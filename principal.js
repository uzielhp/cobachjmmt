const CONEXION = 'proxy.php';
let ExamenesURLS = sessionStorage.getItem('ExamenesURLS') || null;
let peticionesActivas = 0;

class HCargando extends HTMLElement {
  connectedCallback() {
  this.innerHTML = `
  <div class="fixed-top d-flex align-items-center gap-2 justify-content-between w-100 bg-white placeholder-wave" style="height: 50px; padding: 0 5px;">
    <div class="nav-link d-inline-flex gap-2 bg-transparent border-0" data-bs-toggle="menu">        
      <div class="contenedor-logo is-loading">
        <span class="d-inline-flex align-items-center">            
          <span style="height: 30px; width: 54px;"></span>
          <i class="bi bi-chevron-expand" style="font-size: 1.5rem;"></i>
        </span>
      </div>
    </div>
    <span class="contenedor-logo is-loading d-inline-block bg-secondary rounded" style="height: 33px; width: 33px;" aria-hidden="true"></span>
  </div>
  `;
  }
}
customElements.define('h-cargando', HCargando);

class HMenu extends HTMLElement {
  connectedCallback() {
  this.innerHTML = `
  <div class="fixed-top d-flex align-items-center gap-2 justify-content-between w-100 bg-black" style="height: 50px; padding: 0 5px;">
    <button class="nav-link d-inline-flex gap-2 bg-transparent border-0" data-bs-toggle="menu">        
      <div id="msgC" class="contenedor-logo">
        <span class="d-inline-flex align-items-center">            
          <img class="logo" src="imgs/logo.png" alt="Logo" style="height: 30px; width: auto;">
          <i class="bi bi-chevron-expand" style="font-size: 1.5rem;"></i>
        </span>
      </div>
    </button>
    <a href="#" data-bs-toggle="dialog" data-bs-target="#adminModal">
      <img src="imgs/adm.png" alt="Admin" height="35">
    </a>
  </div>
  <div class="menu">
    <a class="menu-item" href="200_Act10.html">Actividad 10 Contaminación digital</a>     
    <hr class="menu-divider">
    <a class="menu-item" href="examen.html" data-hoja="s100">Examen 100s</a>
    <a class="menu-item" href="examen.html" data-hoja="s200">Examen 200s</a>
    <a class="menu-item" href="examen.html" data-hoja="s300">Examen 300s</a>
    <a class="menu-item" href="examen.html" data-hoja="s400">Examen 400s</a>
    <a class="menu-item" href="examen.html" data-hoja="s500">Examen 500s</a>
    <a id="mnExamenes" class="menu-item" href="examen.html" data-hoja="s600">Examen 600s</a>
  </div>
  `;
  }
}
customElements.define('h-menu', HMenu);

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
    if (window.location.pathname.split('/').pop() === "Examen.html" && datosAdm === "false") {
      window.location.href = "index.html";
      return;
    }   
   if(await verificarConexiónInternet()){ msgError("Hay conexión a internet"); }
  }
  catch (e) { msgError(e); }
  finally {    
    msgCargando(false);

    toggleD('h-cargando', false);
    toggleD('h-menu', true);
    toggleD('main', true);
  }
});

function toggleD(comp, show) {
  const loader = document.querySelector(comp);
  if (!loader) return;
  loader.style.display = show ? "block" : "none";
}

async function Modals() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  footer.innerHTML = `    
  <dialog class="dialog" id="adminModal">
    <div class="dialog-header">
      <h1 class="dialog-title">Administración</h1>
      <button type="button" class="btn-close btn-close-n" data-bs-dismiss="dialog" aria-label="Close"></button>
    </div>
    <div class="dialog-body">
      <label for="contra" class="col-form-label">Contraseña:</label>
      <input type="password" class="form-control" id="contra" required>
      <div class="invalid-feedback" id="contraerror">
        Por favor, escriba la contraseña correcta.
      </div>
    </div>
    <div class="dialog-footer">      
      <button id="btnGuardarAdmin" type="button" class="btn-solid theme-primary">Save changes</button>
    </div>
  </dialog>  
  `;
}

function msgCargando(b) {
  const msgC = document.getElementById('msgC');

  // Verificamos que el contenedor exista para evitar errores si en alguna página no lo pusiste
  if (!msgC) return;

  if (b) {
    peticionesActivas++; // Un proceso pide encender el letrero (+1)
    msgC.classList.add('is-loading');    
  }
  else {
    peticionesActivas--; // Un proceso avisa que ya terminó su descarga (-1)

    // Solo apagamos ningún proceso pendiente
    if (peticionesActivas <= 0) {
      peticionesActivas = 0; // Lo mantenemos en 0 por seguridad        
      msgC.classList.remove('is-loading');
    }
  }
}

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