# Server
- *What is this server?*

## How to init this server?
- *Create app with TS*  
    1. Create app and install dependencies
        ```powershell
            npm init -y
            npm i express dotenv
            npm i -D typescript ts-node @types/node @types/express nodemon

        ```
    2. Configure Typescript  
        * Create tsconfig.json either using `npx tsc --init` or manually. 

- *Configure middlewares*
    1. Install the dependencies.
        ```powershell
            npm i body-parser cookie-parser express-session
            npm i -D @types/cookie-parser @types/express-session
        ```
    2. Configure and define the type for `req.session.user` in types/express-session.d.ts
    
## Routers
    - *Kanban router*

        
        
