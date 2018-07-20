FROM node:8-slim

# Expose port 3000
ENV PORT=3000
EXPOSE 3000

# Copy code
RUN mkdir -p /opt/apps/server
WORKDIR /opt/apps/server

COPY ./entrypoint.sh /server-entrypoint.sh
RUN chmod +x /server-entrypoint.sh

ENTRYPOINT ["/server-entrypoint.sh"]

CMD ["yarn", "dev"]
