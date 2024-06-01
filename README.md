## Deployment
This appliaction is deployed via vercel
Here is the link: [https://llm-frontend-task.vercel.app/]

### Prerequisites
- Node.js and npm installed on your local machine.
- A Google Maps API key.

## Getting Started
1. First, clone the project to your local machine
2. Then, cd to the project root dir

3. run `npm install` to install all packages and libraries

4. Next, you need to apply for the maps key in order to use application. Below is the step by step guide to apply for the key.
Also I\'ve record a video to illustrate the application and applying the keys.
    - Video: www.111.com
    4.1- First, go to Google cloud console,
    4.2- Next, Click on the navigation bar toggle at the top left corner, and go to APIs & Services
    4.3- Then, Click on the ENABLE APIS AND SERVICES button at top left, and search for keyword 'Maps' in the search bar
    4.4- After that, find and enable 
        1. Places API, 
        2. Places API (New), 
        3. Maps JavaScript API, 
        4. Routes API, 
        5. Directions API
    4.5- Now, lick on the navigation bar toggle at the top left corner, and go to APIs & Services > Credentials
    4.6- Click on the CREATE CREDENTIALS > API key, at top left
    4.7- Copy the key and place it in .env.local file on both variables

5. Next, run the development server: `npm run dev`
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Build the project
1. To create an optimized production build, run the following command:
`npm run build`
This command will compile your application and generate static files for optimal performance.

2. After building the project, you can start the production server with the following command:
`npm start`
Open [http://localhost:3000](http://localhost:3000) in your browser to see the production version of your application.