FROM docker.elastic.co/elasticsearch/elasticsearch:7.13.3

RUN mkdir /data  &&  echo 'path.data: /data' >> config/elasticsearch.yml && echo 'discovery.type: single-node' >> config/elasticsearch.yml &&  echo 'node.max_local_storage_nodes: 20' >> config/elasticsearch.yml
COPY data /data
RUN chown -R elasticsearch:elasticsearch /data
EXPOSE 9200
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/e1f115e4ca285c3c24e847c4dd4be955e0ed51c2/wait-for-it.sh /utils/wait-for-it.sh
