FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 
COPY *.js ./
EXPOSE 5000
RUN npm i -g nodemon

ENTRYPOINT cd /usr/src/app && \
           export MAIL_SERVER=mail.yourdomain.nl && \ 
           export MAIL_USER=youruser@yourdomain.nl && \
           export MAIL_USER_PWD=youruserpassword && \
           export API_AUTH=yourpassforauth && \
           nodemon index.js
