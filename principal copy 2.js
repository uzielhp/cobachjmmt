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
    <a href="#" id="btnAbrirAdmin">
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
  await Dialogs();
  
  try {
    msgCargando(true);
    await llamarDatosAdm();
    const datosAdm = obtenerDatosAdm();
    mnExamenes.style.visibility = (datosAdm.Menu === true) ? 'visible' : 'hidden';
    if (window.location.pathname.split('/').pop() === "Examen.html" && datosAdm === "false") {
      window.location.href = "index.html";
      return;
    }
    //if(await verificarConexiónInternet()){ msgError("Hay conexión a internet"); }    
  }
  catch (e) { msgError(e); }
  finally {    
    msgCargando(false);

    toggleD('h-cargando', false);
    toggleD('h-menu', true);
    toggleD('main', true);    
  }  

  const dlgAdmin = document.getElementById('dialogAdmin');  
  const contra = document.getElementById('contra');
  const btnAbrirAdmin = document.getElementById('btnAbrirAdmin');
  const dlgAdminDetalles = document.getElementById('dialogAdminDetalles');
  
  const frmAdminContra = document.getElementById('frmAdmin');
  frmAdminContra.addEventListener('submit', async e => {      
    try {      
      e.preventDefault();
      msgCargando(true);

      if (!frmAdminContra.checkValidity()) { return; }
      const datosAdm = obtenerDatosAdm();
      if (contra.value === datosAdm.Contra.toString()) {              
        dlgAdmin.close();        

        document.getElementById('s100').value = datosAdm.s100;
        document.getElementById('s200').value = datosAdm.s200;
        document.getElementById('s300').value = datosAdm.s300;
        document.getElementById('s400').value = datosAdm.s400;
        document.getElementById('s500').value = datosAdm.s500;
        document.getElementById('s600').value = datosAdm.s600;
        document.getElementById('menu').checked = datosAdm.Menu;

        dlgAdminDetalles.showModal();
        frmAdminContra.reset();
        contra.classList.remove('is-invalid');
      }      
      else{
        contra.classList.add('is-invalid');
      }
    }
    catch (e) { msgError("Error al validar contraseña"); }
    finally { msgCargando(false); }
  });

  const frmAdminDetalles = document.getElementById('frmAdminDetalles');
  frmAdminDetalles.addEventListener('submit', async e => {      
    try {      
      e.preventDefault();
      msgCargando(true);

      const datosA = {
        primero: document.getElementById('s100').value,
        segundo: document.getElementById('s200').value,
        tercero: document.getElementById('s300').value,
        cuarto: document.getElementById('s400').value,
        quinto: document.getElementById('s500').value,
        sexto: document.getElementById('s600').value,
        menu: document.getElementById('menu').checked
      };      
      alert(datosA);
      const data = await llamarAppScript(null, 'POST', datosA);          
      if (data.status === 'yes') { 
        //await llamarDatosAdm();
        dlgAdminDetalles.close();
        msgAlerta("Configuraciones guardadas");        
      }      
    }
    catch (e) { msgError("Error al guardar información"); }
    //finally { dlgAdminDetalles.close(); msgCargando(false); }
  });

  btnAbrirAdmin.addEventListener('click', (e) => {
    e.preventDefault();

    dlgAdmin.showModal();
    setTimeout(() => { if (contra) { contra.focus(); } }, 50);
  });

  const menuExamenes = document.getElementById('mnExamenes');
  menuExamenes.addEventListener('click', (e) => {
    const enlace = e.target.closest('a[data-hoja]');
    if (!enlace) return; // Si no hizo clic en un enlace con data-hoja, no hacemos nada

    const hoja = enlace.dataset.hoja;
    sessionStorage.setItem('Examen', hoja);
  });
});

function toggleD(comp, show) {
  const loader = document.querySelector(comp);
  if (!loader) return;
  loader.style.display = show ? "block" : "none";
}

function generarSem() {
  const semestres = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto'];
  const ids = ['s100', 's200', 's300', 's400', 's500', 's600'];
  
  const contenedor = document.getElementById('contenedorSem');
  if (!contenedor) return;
    
  contenedor.innerHTML = semestres.map((sem, index) => `
    <div class="row mb-3">
      <label for="${ids[index]}" class="sm:col-2 col-form-label">${sem}</label>
      <div class="sm:col-10">
        <input type="text" class="form-control" id="${ids[index]}">
      </div>
    </div>
  `).join('');
}

async function Dialogs() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  footer.innerHTML = `
  <dialog class="dialog" id="dialogAdmin">
    <div class="dialog-header">
      <h1 class="dialog-title">Administración</h1>
      <button type="button" class="btn-close btn-close-n" data-bs-dismiss="dialog" aria-label="Close"></button>
    </div>    
    <form id="frmAdmin" class="vstack gap-3" data-bs-validate novalidate>
      <div class="dialog-body">      
        <label for="contra" class="col-form-label">Contraseña:</label>
        <input type="password" class="form-control" id="contra" required>
        <div class="invalid-feedback" id="contraerror">
          Por favor, escriba la contraseña correcta.
        </div>    
      </div>    
      <div class="dialog-footer">      
        <button type="submit" class="btn-solid theme-primary" id="btnAdmin">Guardar</button>
      </div>
    </form>    
  </dialog>

  <dialog class="dialog dialog-fullscreen dialog-scrollable" id="dialogAdminDetalles">
    <div class="dialog-header">
      <h1 class="dialog-title">Administración</h1>
      <button type="button" class="btn-close btn-close-n" data-bs-dismiss="dialog" aria-label="Close"></button>
    </div>
    <form id="frmAdminDetalles">
      <div class="dialog-body">      
        <div id="contenedorSem"></div>
        <div class="form-field">
          <input type="checkbox" id="menu" class="check" />
          <label for="menu">Menu Examen</label>
        </div>      
      </div>
      <div class="dialog-footer">
        <button type="submit" class="btn-solid theme-primary" id="btnAdminDetalles">Guardar</button>
      </div>
    </form>
  </dialog>
  `;
  generarSem();
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
    if (urlAppScript === null) { urlAppScript = "https://script.google.com/macros/s/AKfycbz0iGDEYGtfo4CPabcbB5WsOVEv40RbIVdz3aJ8ZFckHWVAEKMBb7Cd6YQVo3tMLLeU/exec"; }
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

// Verifica si el cliente tiene acceso real a internet.
async function verificarConexiónInternet() {  
  // Si el navegador ya detecta que está offline, ahorramos la petición
  if (!navigator.onLine) return false;

  const controller = new AbortController();
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => {
      controller.abort(); // Cancelamos el fetch pendiente para liberar recursos
      reject(new Error('Timeout de red'));
    }, 3000)
  );

  try {    
    // Opcional: puedes usar tu propio proxy o un archivo ligero de tu servidor 
    // en lugar de google.com para evitar bloqueos de red escolar.
    await Promise.race([
      fetch('https://www.google.com/favicon.ico', { 
        mode: 'no-cors', 
        cache: 'no-store', 
        signal: controller.signal 
      }), 
      timeoutPromise 
    ]);

    return true;  
  }
  catch (error) { 
    return false; 
  }
}