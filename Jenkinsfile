pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                // Build Docker image using batch command for Windows
                bat 'docker-compose build'
            }
        }
        stage('Push Docker Image to Docker Hub') {
            steps {
                // Log in to Docker Hub with 'diya26' credentials
                withCredentials([
                    usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')
                ]) {
                    bat 'docker login --username %USERNAME% --password %PASSWORD%'
                    // Tag the image with diya26's Docker Hub repository
                    bat 'docker tag diya26/taskify diya26/taskify:latest'
                    // Push the image to Docker Hub
                    bat 'docker push diya26/taskify:latest'
                }
            }
        }
    }
    post {
        success {
            // Clean up unused Docker resources
            bat 'docker system prune -a --filter until=20s'
        }
    }
}
