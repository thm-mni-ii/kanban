# API

## Docker

### building the image
After each change to the source code, it is necessary to rebuild the application image. Otherwise the changes will not be applied.

To build a new image after doing some changes: go to `kanban/backend/api/` insite your terminal and execute:

```
docker build -t api-image .
```

the resulting docker image will be named `api-image`

### Running the container

#### Single use Container - (for debugging and frequent changes)
A single-use container is automatically deleted when it is stopped. Normally, Docker would save it for later, leaving it to the developer to remove the pile of once-created and now unwanted containers after debugging or development. In such cases, a single use container is very useful because it is automatically removed after use.

To create and run a single-use container use the command:

```
docker run -d -p 3000:3000 --rm --name api-container api-image
```

The resulting docker container will be named `api-container`.

To stop and remove it use:

```
docker stop api-container
```

#### 'Normal' Container
When there is no need to recreate a container very often it is easier to just create a container that can be stopped and restarted multiple times.

To create a container use:
```
docker run -d -p 3000:3000 --name api-container api-image
```

The resulting docker container will be named `api-container`.

To stop the running container use:
```
docker stop api-container
```

To restart the stopped container use:
```
docker start api-container
```

### accessing the api
When accessing http://localhost:3000/ with your web browser hello world should be displayed
