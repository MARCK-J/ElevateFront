pipeline {
    agent any
    environment {
        // Puedes definir variables de entorno aquí, si es necesario.
        // Por ejemplo: MY_VAR = 'valor'
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Clonando el repositorio desde GitHub...'
                git url: 'https://github.com/MARCK-J/ElevateFront.git', branch: 'main'
            }
        }
        stage('Build') {
            steps {
                echo 'Iniciando la fase de construcción...'
                // Agrega el comando para construir tu proyecto, por ejemplo:
                sh 'npm install'  // Comando para instalar dependencias
                sh 'npm run build'  // Comando para construir el proyecto
            }
        }
        stage('Test') {
            steps {
                echo 'Iniciando la fase de pruebas...'
                // Agrega los comandos para ejecutar pruebas, por ejemplo:
                sh 'npm test'  // Comando para ejecutar pruebas
            }
        }
        stage('Deploy') {
            steps {
                echo 'Desplegando la aplicación...'
                // Agrega los comandos necesarios para desplegar tu aplicación.
                // Ejemplo: copiar archivos a un servidor remoto o ejecutar un script de despliegue
                echo 'Despliegue completado.'
            }
        }
    }
    post {
        success {
            echo 'Pipeline completado exitosamente.'
        }
        failure {
            echo 'Pipeline falló. Revisa los errores.'
        }
    }
}
