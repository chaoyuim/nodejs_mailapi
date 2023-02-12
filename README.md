# nodejs_mailapi
To Test / try , remeber to change the Dockerfile 
  
    ENTRYPOINT cd /usr/src/app && \
               export MAIL_SERVER=mail.yourdomain.nl && \ 
               export MAIL_USER=youruser@yourdomain.nl && \
               export MAIL_USER_PWD=youruserpassword && \
               export API_AUTH=yourpassforauth && \
               nodemon index.js

    MAIL_SERVER, MAIL_USER , MAIL_USER_PWD are used to connect to your mail server

    API_AUTH is used when you do REST call, the values of API_AUTH needs to be in the REST call header. 
    
 two endpoints are used. 
 
        1. https://node.chaoyu.nl/newmails
        2. https://node.chaoyu.nl/downloadmail
        
        Both require Header key "authorization", values is what you put in API_AUTH
        
        To download mail, you need two additional header key value pairs. 
        uid and bodypart, both can be found in the json result of the first endpoint 
 
 
https://wordpress.chaoyu.nl/?p=1103
