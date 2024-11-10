import axios from "axios";
import { useAppStore } from "@/stores"; 

export const AuthService = {
  // Función de inicio de sesión
  async login(email, password) {
    const response = await axios.post("http://localhost:9999/api/v1/user/login", {
      email,
      password,
    });
    return response;
  },

  // Función para generar código aleatorio de verificación
  generateCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  },

  // Función para enviar el correo con el código
  async sendMail(email, code) {
    const url = `http://localhost:9999/api/v1/mail/send/${email}`;
    const data = {
        subject: "Código de Verificación - Autenticación en Dos Pasos",
        message: `
        Estimado/a Cliente,

        Le informamos que hemos generado un código de verificación para completar su proceso de autenticación en dos pasos en Elevate. Este método de seguridad añade una capa adicional de protección a su cuenta, asegurando que solo usted pueda acceder a ella.

        Código de Verificación:

        Su código de verificación es: ${code}

        Por favor, introduzca este código en la pantalla de inicio de sesión para completar el proceso.

        Importante:

        Si no solicitó este código, le recomendamos que cambie su contraseña de inmediato y se comunique con nuestro equipo de soporte.
        No comparta su código de verificación con nadie. Es exclusivo para su uso y no debe ser revelado a terceros.
        Agradecemos su atención a esta medida de seguridad. Si tiene alguna pregunta o necesita asistencia adicional, no dude en ponerse en contacto con nuestro servicio de atención al cliente.

        Atentamente,

        El equipo de soporte de Elevate
        Marco Reynolds
        `,
      };
      

    try {
      await axios.post(url, data);
      
      // Guarda el código en Pinia
      const authStore = useAppStore();
      authStore.setVerificationCode(code);
      
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  },
  // Función para enviar el correo de activación de cuenta
async sendActivation(email) {
  const url = `http://localhost:9999/api/v1/mail/send/${email}`;
  const data = {
    subject: "Activación de Cuenta - Elevate",
    message: `
    Estimado/a Cliente,

    Nos complace informarle que su cuenta en Elevate ha sido activada correctamente. A partir de este momento, podrá acceder a su cuenta y disfrutar de todas las funcionalidades de nuestra plataforma.

    Si tiene alguna pregunta o necesita asistencia adicional, no dude en ponerse en contacto con nuestro servicio de atención al cliente.

    Atentamente,

    El equipo de soporte de Elevate
    Marco Reynolds
    `,
  };

  try {
    await axios.post(url, data);

    console.log("Correo de activación enviado exitosamente.");
    
  } catch (error) {
    console.error("Error al enviar el correo:", error.response?.data || error.message);
  }
},
// Función para enviar el correo de confirmación de inscripción de curso
async sendConfirmation(email, course, fecha,duracion) {
  const url = `http://localhost:9999/api/v1/mail/send/${email}`;
  const data = {
    subject: `Confirmación de Inscripción de Curso - Elevate`,
    message: `
    Estimado/a Cliente,

    Nos complace informarle que su inscripción al curso "${course}" en Elevate ha sido confirmada correctamente. A partir de este momento, podrá acceder a su cuenta y disfrutar de todas las funcionalidades de nuestra plataforma, así como del contenido y recursos del curso.

    Detalles del Curso:
    - Nombre del Curso: ${course}
    - Fecha de Inicio: ${fecha}
    - Duración: ${duracion} horas

    Si tiene alguna pregunta o necesita asistencia adicional, no dude en ponerse en contacto con nuestro servicio de atención al cliente.

    Atentamente,

    El equipo de soporte de Elevate
    Marco Reynolds
    `,
  };

  try {
    await axios.post(url, data);

    console.log("Correo de confirmación de inscripción enviado exitosamente.");
    
  } catch (error) {
    console.error("Error al enviar el correo:", error.response?.data || error.message);
  }
}

};
