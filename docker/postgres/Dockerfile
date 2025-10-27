FROM postgres:17

RUN apt-get update && apt-get install -y wget git make

# pgmq
RUN git clone https://github.com/pgmq/pgmq.git && \
    cd pgmq/pgmq-extension && \
    make && make install

# clean up
RUN apt-get remove -y wget git make

