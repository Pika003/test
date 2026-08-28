pipeline {
    agent {
        docker {
            image 'node:22-bookworm'
        }
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'React application built successfully!'
        }

        failure {
            echo 'React build failed!'
        }
    }
}