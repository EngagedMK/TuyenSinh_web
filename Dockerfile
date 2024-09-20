FROM node:16.18.0-alpine

ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL $VITE_BASE_API_URL
# create destination directory
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}


COPY package*.json ${APP_ROOT}

RUN npm install

COPY . ${APP_ROOT}




RUN npm run build


# start the app
CMD [ "npm", "run", "preview" ]