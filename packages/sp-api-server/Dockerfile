FROM streamplace/sp-node

# To be run from the apps directory.

RUN npm install --unsafe-perm -g kubectl-cli

WORKDIR /app
ADD package.json package.json
RUN npm install --production
ADD dist dist

ENV PORT 80
EXPOSE 80
CMD node /app/dist/sp-api-server.js
