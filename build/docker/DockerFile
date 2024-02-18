### compilation stage
FROM node:latest AS build

RUN mkdir /build
WORKDIR /build

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

### prepare go embedding of SPA server
FROM milung/spa-server as spa-build

COPY --from=build /build/www public
RUN ./build.sh

### scratch image - no additional dependencies only server process
FROM scratch
ENV CSP_HEADER=false

COPY --from=spa-build /app/server /server
CMD ["/server"]
EXPOSE 8080