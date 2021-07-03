# Docker Test

Follow along from: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

## Great explanation of why Docker is useful

https://blog.atulr.com/docker-local-environment/

## Commands

`docker help`

**Create a container**
`docker run --name nodetest -p 47800:8080 -d richardaspinall/node-web-app`

**View images**
`docker images`

**View container**
`docker container ls`

**Stop container**
`docker stop X`

**Delete container**
`docker container rm X`
