const CONEXION = 'proxy.php';
let ExamenesURLS = sessionStorage.getItem('ExamenesURLS') || null;
let peticionesActivas = 0;

class HCargando extends HTMLElement {
  connectedCallback() {
  this.innerHTML = `
  <div class="fixed-top d-flex align-items-center justify-content-between bg-white placeholder-wave" style="height: 50px; padding: 0 5px;">
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
  <div class="fixed-top d-flex align-items-center gap-2 justify-content-between bg-black" style="height: 50px; padding: 0 5px;">
    <button class="nav-link d-inline-flex gap-2 bg-transparent border-0" data-bs-toggle="menu">        
      <div id="msgC" class="contenedor-logo">
        <span class="d-inline-flex align-items-center">            
          <i class="bi bi-chevron-expand" style="font-size: 1.5rem;"></i>
          <img class="logo" src="imgs/logo.png" alt="Logo" style="height: 30px; width: auto;">          
        </span>
      </div>
    </button>
    <a href="#" id="btnAbrirAdmin">
      <img src="imgs/adm.png" alt="Admin" height="35">
    </a>
  </div>
  <div class="menu" id="mnExamenes">
    <div class="submenu">
      <button class="menu-item" type="button">Cultura Digital 1</button>
      <div class="menu">
        <a class="menu-item" href="200_Act10.html">Act Contaminación digital</a>     
      </div>
    </div>
    <hr class="menu-divider">
    <a class="menu-item" href="examen.html" data-hoja="s100">Examen 100s</a>
    <a class="menu-item" href="examen.html" data-hoja="s200">Examen 200s</a>
    <a class="menu-item" href="examen.html" data-hoja="s300">Examen 300s</a>
    <a class="menu-item" href="examen.html" data-hoja="s400">Examen 400s</a>
    <a class="menu-item" href="examen.html" data-hoja="s500">Examen 500s</a>
    <a class="menu-item" href="examen.html" data-hoja="s600">Examen 600s</a>
  </div>
  `;
  }
}
customElements.define('h-menu', HMenu);

document.addEventListener('DOMContentLoaded', async () => {
  await Dialogs();
  //verificarInternetMonitoreo();
  
  try {    
    msgCargando(true);        
    await llamarDatosAdm();    
    const datosAdm = obtenerDatosAdm();    
    mnExamenes.style.visibility = (datosAdm.Menu === true) ? 'visible' : 'hidden';
    if (window.location.pathname.split('/').pop() === "Examen.html" && datosAdm === "false") {
      window.location.href = "index.html";
      return;
    }

    msgCargando(false);
    toggleD('h-cargando', false);
    toggleD('h-menu', true);
    toggleD('main', true);
  }
  catch (e) { msgError("Error en cargar Página"); }

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
    catch (e) { msgError("Error al validar Contraseña"); }
    finally { msgCargando(false); }
  });

  //const frmAdminDetalles = document.getElementById('frmAdminDetalles');
  //frmAdminDetalles.addEventListener('submit', async e => {      
  const btnAdminDetallesAction = document.getElementById('btnAdminDetalles');
  btnAdminDetallesAction.addEventListener('click', async e => {
    try {      
      e.preventDefault();
      msgCargando(true);
      dlgAdminDetalles.close();

      const datosA = {
        primero: document.getElementById('s100').value,
        segundo: document.getElementById('s200').value,
        tercero: document.getElementById('s300').value,
        cuarto: document.getElementById('s400').value,
        quinto: document.getElementById('s500').value,
        sexto: document.getElementById('s600').value,
        menu: document.getElementById('menu').checked
      };            
      const data = await llamarAppScript('POST', datosA);
      if (data.status === 'yes') { 
        await llamarDatosAdm();
        msgAlerta("Configuraciones guardadas");        
      }      
    }
    catch (e) { msgError("Error al guardar Información"); }
    finally { msgCargando(false); }
  });

  btnAbrirAdmin.addEventListener('click', (e) => {
    e.preventDefault();

    dlgAdmin.showModal();
    setTimeout(() => { if (contra) { contra.focus(); } }, 50);
  });

  const enlaceExamen = document.querySelectorAll('#mnExamenes a[data-hoja]');
  enlaceExamen.forEach(enlace => {
    enlace.addEventListener('click', function(evento) {
      evento.preventDefault();

      const hoja = this.dataset.hoja;
      sessionStorage.setItem('Examen', hoja);

      const destino = this.getAttribute('href');
      window.location.href = destino;
    });
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
        <input type="text" class="form-control" id="${ids[index]}" autocomplete="off">
      </div>
    </div>
  `).join('');
}

async function Dialogs() {
  if (document.getElementById('dialogAdmin')) return;

  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = `
  <dialog class="dialog" id="dialogAdmin" style="display: none;">
    <div class="dialog-header">
      <h1 class="dialog-title">Administración</h1>
      <button type="button" class="btn-close btn-close-n" data-bs-dismiss="dialog" aria-label="Close"></button>
    </div>    
    <form id="frmAdmin" class="vstack gap-3" autocomplete="off" data-bs-validate novalidate>
      <div class="dialog-body">      
        <label for="contra" class="col-form-label">Contraseña:</label>
        <input type="password" class="form-control" id="contra" autocomplete="off" required>
        <div class="invalid-feedback" id="contraerror">
          Por favor, escriba la contraseña correcta.
        </div>    
      </div>    
      <div class="dialog-footer">      
        <button type="submit" class="btn-solid theme-primary" id="btnAdmin">Guardar</button>
      </div>
    </form>    
  </dialog>

  <dialog class="dialog dialog-fullscreen dialog-scrollable" id="dialogAdminDetalles" style="display: none;">
    <div class="dialog-header">
      <h1 class="dialog-title">Administración</h1>
      <button type="button" class="btn-close btn-close-n" data-bs-dismiss="dialog" aria-label="Close"></button>
    </div>
    <form id="frmAdminDetalles" autocomplete="off">
      <!-- TRUCO: Campos trampa ocultos para despistar al administrador de contraseñas del navegador -->
      <input type="text" name="user_dummy" style="display:none" autocomplete="username">
      <input type="password" name="password_dummy" style="display:none" autocomplete="current-password">

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

  document.body.appendChild(modalContainer);
  generarSem();

  // Forzamos a que el navegador quite el display: none en cuanto se abran con .showModal()
  const dialogs = modalContainer.querySelectorAll('dialog');
  dialogs.forEach(dlg => {
    // Al usar showModal(), el navegador los pasa automáticamente a la capa superior
    const originalShowModal = dlg.showModal;
    dlg.showModal = function() {
      dlg.style.display = 'block';
      originalShowModal.call(dlg);
    };
    
    // Al cerrar, volvemos a ocultarlos del flujo
    dlg.addEventListener('close', () => {
      dlg.style.display = 'none';
    });
  });
  
  const footer = document.querySelector('footer');
  if (!footer) return;

  document.body.style.paddingBottom = '40px';
  footer.innerHTML = `
  <div id="msgError" class="text-center py-2 position-fixed bottom-0 start-0 w-100 text-white fw-medium shadow" style="display: none; background-color: var(--bg-titulo); z-index: 1060;"></div>
  `;
}

function msgAlerta(message, delay = 3000) {
  let contenedor = document.getElementById('alerta-container');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.id = 'alerta-container';
    contenedor.className = 'position-fixed top-0 end-0 p-3';
    contenedor.style.zIndex = '1100';
    contenedor.style.marginTop = '50px';
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

  setTimeout(() => {
    const alertEl = wrapper.querySelector('.alert');
    if (alertEl) {
      alertEl.classList.remove('show');
      setTimeout(() => { wrapper.remove(); }, 150);
    } else {
      wrapper.remove();
    }
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

async function llamarAppScript(metodo = 'GET', datosA = null){
  try {    
    // Codificamos directamente la URL del Apps Script para enviarla de forma segura por GET
    const urlAppScript = "https://script.google.com/macros/s/AKfycbz0iGDEYGtfo4CPabcbB5WsOVEv40RbIVdz3aJ8ZFckHWVAEKMBb7Cd6YQVo3tMLLeU/exec";
    let url = `${CONEXION}?target=${encodeURIComponent(urlAppScript)}`;    
    const opciones = { method: metodo, cache: 'no-store' };
    
    if (metodo === 'POST' && datosA) {
      opciones.headers = { 'Content-Type': 'application/json' };
      opciones.body = JSON.stringify(datosA);
    }        
    const response = await fetch(url, opciones);
    return await response.json();    
  } 
  catch (e) {
    msgError("Error al conectarse Servidor");
    return null;
  }
}

async function llamarHojaExamen(hoja, metodo = 'GET', datosA = null) {
  try {
    const urlAppScript = 
    "https://script.google.com/macros/s/AKfycby7jvY9ZAsahskk-BcM9LB5IEiSQ_RecDTks_eVEXsNqX-qIz59UX41sBt0vPfoJQbv/exec";
    
    let url = `${CONEXION}?target=${encodeURIComponent(urlAppScript)}`;
    url += `&spreadsheetId=${encodeURIComponent(hoja)}`;
    const opciones = { method: metodo, cache: 'no-store' };
    if (metodo === 'POST') {
      opciones.headers = { 'Content-Type': 'application/json' };
      if (datosA) {
        opciones.body = JSON.stringify(datosA);
      }
    }

    const response = await fetch(url, opciones);
    return await response.json();    
  } 
  catch (e) {
    msgError("Error al conectarse Hoja");
    return null;
  }
}

async function verificarInternet() {
  // Si el navegador ya detecta que está offline, ahorramos la petición
  if (!navigator.onLine) return false;  

  const controller = new AbortController();
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => {
      controller.abort(); reject(new Error('Timeout de red')); 
    }, 3000)
  );

  try {    
    await Promise.race([
      fetch('https://www.google.com/favicon.ico', { 
        mode: 'no-cors', cache: 'no-store', signal: controller.signal 
      }), timeoutPromise
    ]);

    return true;  
  }
  catch (error) { return false; }
}

function verificarInternetMonitoreo() {  
  async function cicloVerificacion() {
    let bol = false;
    if (await verificarInternet()) {      
      msgError("Desconecta los datos con internet...");
      bol = true;
    } 
    toggleD('h-cargando', bol);
    toggleD('h-menu', !bol);
    toggleD('main', !bol);
    // Espera 5 segundos que termine para volver a verificar
    setTimeout(cicloVerificacion, 5000);    
  }

  // Arrancar el primer ciclo
  cicloVerificacion();
}