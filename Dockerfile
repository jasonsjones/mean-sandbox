# built from local image. Any nodejs image would work
FROM jasonsjones/nodejs

WORKDIR /home/mean-sandbox

RUN apt-get update && \
    apt-get install -y build-essential gcc make git && \
    npm install -g gulp bower

COPY package.json /home/mean-sandbox/package.json
COPY .bowerrc /home/mean-sandbox/.bowerrc
COPY bower.json /home/mean-sandbox/bower.json
COPY gulp.config.js /home/mean-sandbox/gulp.config.js
COPY gulpfile.js /home/mean-sandbox/gulpfile.js

RUN npm install && bower install --config.interactive=false --allow-root

COPY . /home/mean-sandbox

EXPOSE 7401

CMD ["gulp", "serve-dev", "--nosync"]
