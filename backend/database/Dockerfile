FROM postgres

WORKDIR /app

# files docker-entrypoint-initdb.d are executed on building the database 

ADD init.sql /docker-entrypoint-initdb.d/

# To init the database with test data uncomment the next line
# ADD testdata.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=dbuser

ENV POSTGRES_DB=kanbandb

ENV POSTGRES_PASSWORD=secret

EXPOSE 5432

# Build and run the container
# docker build -t kanbandb-img backend/database/
# docker run -p 5432:5432 --rm -v kanbandata:/var/lib/postgresql/data -d --name kanbanbd kanbandb-img

# Connect to database
# psql -h localhost -p 5432 -U dbuser -d kanbandb

# Reset Database to Factory settings (warning all stored data will be removed)
# docker volume rm kanbandata