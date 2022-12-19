FROM node:10-alpine

WORKDIR home/node/app
COPY . . 

EXPOSE 3000
CMD ["npm", "start"]