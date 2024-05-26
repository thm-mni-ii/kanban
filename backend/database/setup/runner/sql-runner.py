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


def extract_sql_stmts_from_file(path: PathLike):
    try:
        with open(path, 'r') as file:
            # clean up each statement
            statements = [stmt.strip() for stmt in file.read().split(';') if stmt.strip()]
            
            # return remaining statements
            return statements
    except Exception as e:
        logger.error(f"Error processing file {path}: {e}")
        raise
    
    
def execute_stmt(stmt: str, cur: Cursor):
    try:
        logger.info(f"Executing Statement: \n {stmt}")
        cur.execute(stmt, prepare=True)
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise

def execute_sql_script(file: PathLike, cur: Cursor):
    try:
        logger.info(f"beginning to execute SQL from file {file}")
        statements = extract_sql_stmts_from_file(file)
        for stmt in statements:
            execute_stmt(stmt, cur)
        logger.info(f"finished executing SQL from file {file}")
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise
        
    
    
def main():
    logger.info("SQL-Runner started.")
    # get sql script files
    
    scripts = get_paths_to_sql_scripts(getenv("PATH_TO_SQL", "./scripts"))

    try:
        # Conntect to database
        logger.info("Trying to Connect to the Database")
        with connect("host=kandb port=5432 dbname=kandb user=kanuser password=secret") as conn:
            logger.info("Connection successful")
        
            with conn.cursor() as cur:
                # execute each script
                for path in scripts:
                    execute_sql_script(path, conn.cursor())
                    conn.commit()
        logger.info("SQL-Runner finished.")
        exit(0)
        
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        exit(1)

if __name__ == "__main__":
    main()