# Create image based on the official Node 9.3 image from dockerhub
FROM node:9.3-alpine as node

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

RUN npm install @angular/cli -g

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

RUN ng build --prod

RUN ls

# Stage 2
FROM nginx:1.13.12-alpine

# Copy our built app to our nginx folder
COPY --from=node /usr/src/app/dist/mobileversion /usr/share/nginx/html

# Copy our nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the app runs in
EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
