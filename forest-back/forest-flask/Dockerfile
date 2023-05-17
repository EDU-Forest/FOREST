FROM python:3.11.1

WORKDIR /test
COPY . .
RUN pip install -r requirements.txt

EXPOSE 5000

CMD python ./app.py