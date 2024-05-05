FROM postgres

WORKDIR /app

COPY init.sql /docker-entrypoint-initdb.d/

COPY testdata.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=dbuser

ENV POSTGRES_DB=kanbandb

ENV POSTGRES_PASSWORD=secret

EXPOSE 5432

# Build and run the container
# docker build -t kanbandb-img backend/database/
# docker run -p 5432:5432 --rm -d --name kanbanbd kanbandb-img

# Connect to database
# psql -h localhost -p 5432 -U dbuser -d kanbandb