# Step 1: Use an official Node.js image as the base image
FROM node:18 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Step 4: Install dependencies using `npm ci` for deterministic builds
RUN npm ci

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Set environment variables for Next.js
# Replace "http://example.com" with your actual API endpoint
ENV NEXT_PUBLIC_API_URL=http://example.com

# Step 7: Build the Next.js application
RUN npm run build

# Step 8: Use a minimal Node.js runtime for the final image
FROM node:18-alpine AS runtime

# Step 9: Set the working directory inside the runtime container
WORKDIR /app

# Step 10: Copy the built files from the build stage
COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Step 11: Expose the port Next.js will run on
EXPOSE 3000

# Step 12: Start the Next.js application
CMD ["npm", "run", "start"]