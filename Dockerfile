# FROM node:18-alpine as builder

# COPY package.json package.json

# RUN npm --force install

# WORKDIR /code

# COPY .next /code/.next
# COPY public /code/public
# COPY package.json /code/
# COPY tsconfig.json /code/

# #RUN npm install next@latest react@latest react-dom@latest

# EXPOSE 3000

# CMD ["npx","next","start"]

# ====== Build Stage ======
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /code

# Copy package.json and package-lock.json first for caching dependencies
COPY package.json package-lock.json ./

# Install only production dependencies to reduce size
RUN npm install --force --omit=dev

# Copy all source files
COPY . .

# Build Next.js application
RUN npm run build

# ====== Final Stage (Smaller Runtime Image) ======
FROM node:18-alpine

# Set working directory
WORKDIR /code

# Copy only necessary built files from builder stage
COPY --from=builder /code/.next .next
COPY --from=builder /code/public public
COPY --from=builder /code/package.json package.json
COPY --from=builder /code/node_modules node_modules

# Expose the required port
EXPOSE 3000

# Run Next.js server
CMD ["npx", "next", "start"]
