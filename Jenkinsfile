pipeline {
    agent any
    stages {
        stage('Checkout SCM'){
            git branch: 'production', url: 'git@github.com:RemyWitlox/DreamBike2.git'
        }
        stage('Build') {
            steps {
                sh 'echo "Hello world!"'
            }
        }
    }
}
