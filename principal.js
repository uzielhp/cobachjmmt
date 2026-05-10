class MyNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.html"><img src="logo.png" alt="Logo" height="26px"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="index.html">Inicio</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Actividades 200s
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="200s_Act10.html">Actividad 10 Contaminación digital</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Examenes
                </a>
                <ul class="dropdown-menu">                  
                  <li><a class="dropdown-item" href="400s_ExaP2.html">400s</a></li>                  
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }
}
customElements.define('my-navbar', MyNavbar);

// Función para obtener la URL dinámica desde el Sheet
const CONEXION = 'https://script.google.com/macros/s/AKfycbwhekogIPHfArkHFhHMtrTsKJBHwpYxaPcF7lsR6bPrrEslgngDiEn_83N1jpPIzTzU/exec';
async function obtenerUrlDinamica(grupo) {
  try {
    const response = await fetch(CONEXION, {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-store'
    });
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] == grupo) {
        return data[i][1];
      }
    }
  } catch (e) { return null; }
  return null;
}