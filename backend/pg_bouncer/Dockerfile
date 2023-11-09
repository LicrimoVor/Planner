FROM alpine:3.17

RUN apk add pgbouncer

COPY ./pgbouncer.ini /etc/pgbouncer/
COPY ./userlist.txt /etc/pgbouncer/
  
CMD ["pgbouncer", "/etc/pgbouncer/pgbouncer.ini"]
