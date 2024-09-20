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
      subject: "Código de Verificación en Dos Pasos",
      message: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
          <h2 style="background-color: #4CAF50; color: white; padding: 10px; text-align: center;">Verificación en Dos Pasos</h2>
          <p>Estimado/a Usuario/a,</p>
          <p>Para completar el proceso de verificación en dos pasos, utiliza el siguiente código:</p>
          <div style="background-color: #f2f2f2; padding: 10px; text-align: center; font-size: 24px; font-weight: bold;">
            ${code}
          </div>
          <p>Introduce este código en la pantalla de inicio de sesión para completar el proceso.</p>
          <p>Si no solicitaste este código, por favor ignora este correo o contacta con nuestro equipo de soporte.</p>
          <p>Atentamente,<br/>Tu equipo de soporte</p>
          <footer style="font-size: 12px; color: #888; text-align: center; padding: 10px; border-top: 1px solid #ddd;">
            <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
          </footer>
        </div>
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
};
