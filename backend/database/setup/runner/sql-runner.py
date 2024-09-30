from os import listdir, PathLike, getenv
from os.path import join
from psycopg import Cursor, connect
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
        
    
    
def main():
    logger.info("SQL-Runner started.")
    
    # get sql script files
    scripts = get_paths_to_sql_scripts(getenv("PATH_TO_SQL", "./scripts"))

    # the scripts should be executed in alphabetical order, so they need to be sorted
    scripts.sort()

    try:
        # Conntect to database
        logger.info("Trying to Connect to the Database")
        with connect("host=kandb port=5432 dbname=kandb user=kanuser password=secret") as conn:
            logger.info("Connection successful")
        
            with conn.cursor() as cur:
                # execute each script
                counter: int = 1
                for path in scripts:
                    logger.info(f"Script {counter}/{len(scripts)}")
                    try:
                        execute_sql_script(path, conn.cursor())
                        conn.commit()
                    except Exception as e:
                        logger.info(f"rolling back changes made by file {path}")
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