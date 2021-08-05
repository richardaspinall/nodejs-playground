# Readme

FROM: https://dev.to/frasnym/how-to-create-dockerized-nodejs-with-mysql-database-1o44

## Description

This is a simple node app connecting to a MySQL DB.

It show cases docker-compose with building both images (MySQL and the Node app) and then connects them.

## Commands

- Docker compose. Building the images and running them in detached mode:
  `docker-compose up --detach`
- Connecting directly to mysql container:
  `mysql -uroot -p -h 127.0.0.1 -P 3307 --protocol=tcp`
- See running containers:
  `docker container ls`
- See images on system:
  `docker images`
- Remove specific image (forced):
  `docker images rm IMAGE_ID -f`
- Stop containers (for docker compose):
  `docker-compose down`
- Specific container:
  `docker stop CONTAINER_ID`
- View Volumes (for managing data ) https://docs.docker.com/storage/volumes/:
  `docker volume ls`

## Issues I ran into:

1. Connecting to MySQL port (I already have MySQL installed locally) which was taking up the default port 3306 so I changed docker to listen on `localhost:3307` (forwarding to 3306 internally)
2. On fresh creation through `docker-compose up`, the MySQL image hasn't finished before the app tries to connect so it fails. Restarting the app image works. This is fixed by adding a script to wait for the MySQL image to finish: https://docs.docker.com/compose/startup-order/. After a lot of messing about, I realized that addressing this through the docker scripts isn't best practice and I should have just implemented it in the application logic (retry) which is highlighted in the documentation.. https://docs.docker.com/compose/startup-order/.

## References:

https://medium.com/swlh/retrying-and-exponential-backoff-with-promises-1486d3c259
