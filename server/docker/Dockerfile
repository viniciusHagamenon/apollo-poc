FROM node:8-slim

# Expose port 4000
ENV PORT=4000
EXPOSE 4000

# Copy code
RUN mkdir -p /opt/apps/server
WORKDIR /opt/apps/server

COPY ./entrypoint.sh /server-entrypoint.sh
RUN chmod +x /server-entrypoint.sh

ENTRYPOINT ["/server-entrypoint.sh"]

CMD ["yarn", "dev"]
