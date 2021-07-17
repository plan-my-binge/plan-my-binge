FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=binge.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk update && apk add python3-dev gcc libc-dev g++
COPY server/binge.py /code/binge.py
COPY server/requirements.txt /code/requirements.txt
COPY server/settings.py /code/settings.py
COPY server/wsgi.py /code/wsgi.py

RUN pip3 install -r requirements.txt
EXPOSE 5000
