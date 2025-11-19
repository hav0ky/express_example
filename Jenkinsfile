pipeline {
    agent any

    environment {
        APP_PORT = "3000"
        APP_NAME = "express-app"
        WORK_DIR = "${env.WORKSPACE}"
        ENTRY_FILE = "index.js"
    }

    stages {
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Stop existing app') {
            steps {
                sh """
                if pgrep -f "${WORK_DIR}/${ENTRY_FILE}"; then
                    echo "Stopping existing running process..."
                    pkill -f "${WORK_DIR}/${ENTRY_FILE}"
                fi
                """
            }
        }

        stage('Start app') {
            steps {
                sh """
                echo "Starting Express app on port ${APP_PORT}…"
                nohup node ${WORK_DIR}/${ENTRY_FILE} > app.log 2>&1 &
                """
            }
        }
    }

    post {
        success {
            echo "Express app deployed! Running on port ${APP_PORT}"
        }
        failure {
            echo "Deployment failed."
        }
    }
}
