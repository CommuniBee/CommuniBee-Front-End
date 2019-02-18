FROM node:10-alpine as builder
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/
COPY dockerfile-cmd.sh /

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 443
CMD [ "sh", "dockerfile-cmd.sh" ]
