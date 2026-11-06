<?php
  // proxy.php - Recibe la URL del Apps Script directamente desde el cliente

  function ejecutarProxyDinamico() {
      header('Content-Type: application/json; charset=utf-8');

      // Capturamos la URL que viene en el parámetro ?target= desde JavaScript
      $googleScriptUrl = $_GET['target'] ?? '';

      if (empty($googleScriptUrl)) {
          echo json_encode(['status' => 'error', 'message' => 'No se proporcionó la URL de Google Apps Script']);
          return;
      }

      // Excluimos 'target' de los parámetros que se van a reenviar a Google
      $params = $_GET;
      unset($params['target']);
      $queryString = http_build_query($params);
      
      $urlDestino = $queryString ? $googleScriptUrl . '?' . $queryString : $googleScriptUrl;

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $urlDestino);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
          curl_setopt($ch, CURLOPT_POST, true);
          $postData = file_get_contents('php://input');
          
          if (!empty($_POST)) {
              curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($_POST));
          } else {
              curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
              curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
          }
      }

      $response = curl_exec($ch);

      if (curl_errno($ch)) {
          echo json_encode(['status' => 'error', 'message' => 'Error de conexión en el servidor']);
      } else {
          echo $response;
      }

      curl_close($ch);
  }

  ejecutarProxyDinamico();
?>