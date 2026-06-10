const CONEXION = 'https://script.google.com/macros/s/AKfycbxFXPyv_Cs7ffiYMhiy5OE7ymTTx_F2TE1jOXHQ7jc2_Xplur8u_qbSACY0adrvpqDi/exec';
let mnExamenes = sessionStorage.getItem('mnExamenes') || null;

async function mostrarMenu(){  
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
  
  <div class="w-100 text-center placeholder-glow position-fixed bottom-0">      
    <div class="placeholder bg-primary py-3 col-12">&nbsp;</div>      
  </div>`;
  document.querySelector('header').innerHTML = `
  <nav class="navbar navbar-expand-lg border-bottom bg-body-tertiary">
    <div class="container-fluid">
      <img src="imgs/logo.png" alt="Logo" class="logo-overflow">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="index.html">Inicio</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Actividades 200s
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="200_Act10.html">Actividad 10 Contaminación digital</a></li>
            </ul>
          </li>

          <li class="nav-item dropdown d-none" id="dropdownExamenes">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Examenes
            </a>
            <ul class="dropdown-menu">                  
              <li><a class="dropdown-item" href="Examen400.html">400s</a></li>                  
            </ul>
          </li>

        </ul>
        <span class="navbar-text">
          <a data-bs-toggle="modal" data-bs-target="#adminModal"><img src="imgs/adm.png" alt="ADM" class="logo-overflow"></a>
        </span>
      </div>
    </div>
  </nav>`;  
  document.querySelector('footer').innerHTML =`
  <div id="msgCargando"
  class="glow bg-primary text-center py-3 position-fixed bottom-0 w-100 fw-bold"
  style="z-index: 1091; display: none;">
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Cargando...</span>
  </div>  
  <div id="msgError"
  class="glow bg-primary text-center py-3 position-fixed bottom-0 w-100 fw-bold"
  style="z-index: 1091; display: none;">
    Hola
  </div>`;
  msgCargando(true);
  try {    
    if(mnExamenes === null) { 
      mnExamenes = String(await obtenerUrlSem('Menu')).toLowerCase();      
      sessionStorage.setItem('mnExamenes', mnExamenes);
    }
    if(mnExamenes === "true") { document.getElementById('dropdownExamenes').classList.remove('d-none'); }
    document.getElementById('app-cargando').style.display = 'none';
    document.getElementById('app-content').style.display = 'block';
  } 
  catch (e) { msgError("Error al validar el menú de exámenes:", e); }  
  msgCargando(false);
}

document.addEventListener('DOMContentLoaded', () => {  
  mostrarMenu();  

  const btnGuardar = document.getElementById('btnGuardarAdmin');
  const btnGuardarCfgs = document.getElementById('btnGuardarCfgs');
  const adminModalCfgs = new bootstrap.Modal(document.getElementById('adminModalCfgs'));

  if (btnGuardar) {
    btnGuardar.addEventListener('click', async function(e) {
      e.preventDefault(); // Evita comportamientos extraños
      msgCargando(true);

      const formulario = document.getElementById('formAdmin');
      const contratxt = document.getElementById('contra');
      const contraerror = document.getElementById('contraerror');
      const contra = await obtenerUrlSem("Contra");

      // Forzamos a Bootstrap a mostrar los estilos visuales (rojo/verde)
      formulario.classList.add('was-validated');           

      // VALIDACIÓN: ¿El formulario es correcto?      
      if (formulario.checkValidity()) {                
        if (contratxt.value===contra.toString()) {                  
          formulario.classList.remove('was-validated');
          formulario.reset();
          contratxt.classList.remove('is-invalid');
          contratxt.classList.remove('is-valid');
          contraerror.style.display = 'none';
          
          // 1. Instanciamos y cerramos el modal actual (Administrador)
          const htmlModalActual = document.getElementById('adminModal');
          const modalActual = bootstrap.Modal.getInstance(htmlModalActual) || new bootstrap.Modal(htmlModalActual);
          modalActual.hide();

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

  if (btnGuardarCfgs) {
    btnGuardarCfgs.addEventListener('click', async function(e) {
      e.preventDefault(); 
      
      msgCargando(true);    
      await guardarUrlSemestres();
      adminModalCfgs.hide();
      msgCargando(false);
    });
  }
});

function msgError(mensaje) {  
  let me = document.getElementById('msgError');
  me.textContent = mensaje;  
  me.style.display = 'block'
}

function msgCargando(b) {
  b ? document.getElementById('msgCargando').style.display = 'block': document.getElementById('msgCargando').style.display = 'none';  
}

async function obtenerUrlSem(semestre){
  try {    
    const response = await fetch(CONEXION, {method: 'GET', redirect: 'follow', cache: 'no-store'});
    const data = await response.json();        
        
    for (let i = 0; i < data.length; i++) {
      if (data[i][0].toString().toLowerCase() === semestre.toLowerCase()) {        
        return data[i][1]; // Retorna la URL correspondiente
      }
    }    
    return null; 

  } catch (e) {     
    msgError("Error al conectarse con Hoja ADM:", e);    
    return null; 
  }
}

async function obtenerUrlSemestres(){
  try {
    const response = await fetch(CONEXION, {method: 'GET', redirect: 'follow', cache: 'no-store'});
    const data = await response.json();
    
    if (data && data.length >= 7) {
      document.getElementById('primero').value = data[0][1];
      document.getElementById('segundo').value = data[1][1];
      document.getElementById('tercero').value = data[2][1];
      document.getElementById('cuarto').value  = data[3][1];
      document.getElementById('quinto').value  = data[4][1];
      document.getElementById('sexto').value   = data[5][1];
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
    // 1. Recolectar los datos actuales de los inputs de tu HTML
    const datosAGuardar = {
      primero: document.getElementById('primero').value,
      segundo: document.getElementById('segundo').value,
      tercer:  document.getElementById('tercero').value,
      cuarto:  document.getElementById('cuarto').value,
      quinto:  document.getElementById('quinto').value,
      sexto:   document.getElementById('sexto').value,
      menu:    document.getElementById('menu').checked // Guarda true o false
    };

    // 2. Realizar la petición POST hacia Google Sheets
    const response = await fetch(CONEXION, {
      method: 'POST',
      redirect: 'follow',
      cache: 'no-store',      
      body: JSON.stringify(datosAGuardar) // Convertimos el objeto a texto JSON
    });

    // 3. Procesar la respuesta del servidor de Google
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