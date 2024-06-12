FROM python:3.12.3

WORKDIR /app

ADD ./runner/requirements.txt .

RUN pip install -r requirements.txt

ADD ./runner .

ADD ./scripts ./scripts

CMD [ "python3", "sql-runner.py" ]