# Getting Started

## Installation
- install `NodeJS`
- install dependencies inside the project folder
    ```sh
    npm install
    ```

## Backend Configuration
- specify the endpoint to your backend in [endpoint.ts](../src/lib/core/api/endpoint.ts)

## Developing
- adjust the product to your likings
- live-preview your changes on your local machine
    ```sh
    npm run dev
    ```

## Deploying
- check you are using the correct adapter for SvelteKit
- build the product
    ```sh
    npm run build
    ```
- preview the production ready website on your machine
    ```sh
    npm run preview
    ```
- deploy from `build` folder to your hosting instance