from os import listdir, PathLike, getenv
from os.path import join
from psycopg import Cursor, connect, Connection
from logging import basicConfig as loggingBasicConfig, INFO, FileHandler, StreamHandler, getLogger

loggingBasicConfig(level=INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    handlers=[FileHandler("script.log"), StreamHandler()])

logger = getLogger(__name__)


def get_paths_to_sql_scripts(path_to_directory: str) -> list[str]:
    try:
        # get scripts in specified path
        scripts = listdir(path_to_directory)
        logger.info(f"Found {len(scripts)} script(s) in {path_to_directory}.")
        
        # create a list of the paths to all found scripts
        return [join(path_to_directory, script) for script in scripts]
    except Exception as e:
        # on error: log on which path the error is raised
        logger.error(f"Error accessing directory {path_to_directory}: {e}")
        raise


def execute_sql_script(path: PathLike, cur: Cursor):
    try:
        logger.info(f"Trying to run SQL from file {path}")
        logger.info(f"Trying to read file")
        sql = open(path, 'r').read()
        logger.info(f"Trying to execute SQL")
        cur.execute(sql, prepare=False)
        logger.info(f"Successfully executed SQL from {path}")
    except Exception as e:
        logger.info(f"An error occured when trying to run SQL from file {path}")
        logger.error(f"{e}\n")
        raise
        


def create_migration_table(conn: Connection):
    '''Creates the table migration. It is used to run already executed setup scripts on every restart.
    The migration table is used to store the name of all executed setup scripts.
    Scripts with the same name can't be stored as separete files.
    '''
    with conn.cursor() as cur:
        statement:str = """
            CREATE TABLE IF NOT EXISTS migration (
                file_name VARCHAR(255) PRIMARY KEY
            );
            """
        try:
            logger.info(f"try to create migration table, if not existst")
            cur.execute(statement)
            logger.info(f"finished creation of migration table")
        except Exception as e:
            logger.error(f"An error occurred while creating migration table: {e}")
            raise

def store_script_in_migration(script_name: str, conn: Connection):
    '''Stores the name of each setup script after successful execution.'''
    
    with conn.cursor() as cur:
        try:
            logger.info(f"beginn storing script {script_name} in mirgration table")
            cur.execute("INSERT INTO migration VALUES (%s);", (script_name,))
            logger.info(f"finished storing script {script_name} in mirgration table")
        except Exception as e:
            logger.error(f"An error occurred while storing the script {script_name} in the migration table: {e}")
            raise

def is_new_script(script_name, conn: Connection):
    '''returns true if the script was not sucessfully executed before. 
    The Database must operate in a way that no two files with equal names can be stored.'''

    with conn.cursor() as cur:

        try:
            cur.execute("SELECT * FROM migration WHERE file_name = %s;", (script_name,))
            results = cur.fetchall()
            return len(results) == 0
                
        except Exception as e:
            logger.error(f"An error occurred while checking if this script was executed before {script_name}: {e}")
            raise

    
def main():
    logger.info("SQL-Runner started.")
    
    # get sql script files
    scripts: list[str] = get_paths_to_sql_scripts(getenv("PATH_TO_SQL_SCRIPTS", "./scripts"))

    try:
        # get Connection details
        dbname: str = getenv("POSTGRES_DB")
        port: str = getenv("KANDB_PORT")
        user: str = getenv("POSTGRES_USER")
        password: str = getenv("POSTGRES_PASSWORD")

        # Conntect to database
        logger.info("Trying to Connect to the Database")
        with connect(f"host=kandb port={port} dbname={dbname} user={user} password={password}") as conn:
            logger.info("Connection successful")

            # create migration table, if not exists, to remember which scripts are already executed
            create_migration_table(conn)

            # filter for scripts which aren't already executed in the past
            scripts = list(filter(lambda s: is_new_script(s, conn), scripts))
            logger.info(f"{len(scripts)} new scripts are to be executed.")

            # the scripts should be executed in alphabetical order, so they need to be sorted
            scripts.sort()

            with conn.cursor() as cur:
                counter: int = 1
                for script in scripts:
                    logger.info(f"Script {counter}/{len(scripts)}")
                    try:
                        # execute script
                        execute_sql_script(script, conn.cursor())
                        conn.commit()

                        # remember the script so it won't be executed twice
                        store_script_in_migration(script, conn) 
                    except Exception as e:
                        logger.info(f"rolling back changes made by file {script}.")
                        conn.rollback()
                    finally:
                        counter += 1
                    
        logger.info("SQL-Runner finished.")
        exit(0)
        
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        exit(1)

if __name__ == "__main__":
    main()