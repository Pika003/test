pipeline {
    agent {
        docker {
            image 'node:24-bookworm'
        }
    }

    stages {
        stage('Environment') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm config list'
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
}