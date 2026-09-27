pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t dhruvddu/node-products-api:latest .'
            }
        }

        stage('Docker Hub Login') {
            steps {
                echo 'Logging in to Docker Hub...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    bat '''
                    echo %DOCKER_TOKEN% | docker login -u %DOCKER_USERNAME% --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                bat 'docker push dhruvddu/node-products-api:latest'
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deploying Docker container...'

                bat '''
                docker rm -f products-api >NUL 2>&1 || echo No existing container found
                docker run -d -p 3000:3000 --name products-api dhruvddu/node-products-api:latest
                '''
            }
        }

        stage('Verify API') {
            steps {
                echo 'Verifying Product API...'

                bat '''
                for /L %%i in (1,1,10) do (
                    curl --fail http://localhost:3000/products && exit /B 0
                    echo API not ready, retrying...
                    timeout /t 2 /nobreak >NUL
                )

                echo API failed to become ready
                exit /B 1
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }

        success {
            echo 'CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD pipeline failed!'
        }
    }
}