var formulario = document.getElementById("formulario-contacto");
var respuesta = document.getElementById("respuesta");
var urlDestino = "https://jsonplaceholder.typicode.com/posts";

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  var nombre = document.getElementById("nombre").value;
  var correo = document.getElementById("correo").value;
  var mensaje = document.getElementById("mensaje").value;

  if (nombre.trim() == "") {
    mostrarMensaje("Escribe tu nombre", "error");
    return;
  }

  if (correo.trim() == "") {
    mostrarMensaje("Escribe tu correo", "error");
    return;
  }

  var arroba = correo.indexOf("@");
  var punto = correo.lastIndexOf(".");
  if (arroba < 1 || punto < arroba + 2 || punto == correo.length - 1) {
    mostrarMensaje("El correo no es válido", "error");
    return;
  }

  if (mensaje.trim() == "") {
    mostrarMensaje("Escribe un mensaje", "error");
    return;
  }

  var datos = {
    nombre: nombre,
    correo: correo,
    mensaje: mensaje
  };

  fetch(urlDestino, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  })
    .then(function (resultado) {
      if (resultado.ok) {
        mostrarMensaje("¡Mensaje enviado! Gracias por escribirme.", "exito");
        formulario.reset();
      } else {
        mostrarMensaje("Hubo un problema, intenta otra vez", "error");
      }
    })
    .catch(function (error) {
      console.log(error);
      mostrarMensaje("No se pudo enviar el mensaje", "error");
    });
});

function mostrarMensaje(texto, tipo) {
  respuesta.textContent = texto;
  respuesta.className = tipo;
}
