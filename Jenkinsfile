pipeline {
    agent {
        docker {
            image 'node:24-bookworm'
        }
    }

    stages {

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