# SweetBlu app
MEAN application for SweetBlu

### Start Webapi server
* Local - `npm start` - Starts server with config local.config.js and nodemon.
* Production - `npm run prod` - Starts server with pm2 and config prod.config.js.
* Dev Server - `npm run dev` - Starts server with pm2 and config dev.config.js.

If you do not start server with one of these commands, correct configs will not be loaded and base urls and email functionality may not work properly.
Please run `ng build --prod` before starting Webapi server. This will build client webapp which can then be accessed at the same url and port as the Webapi server.

### Start client server
If you need to start client's angular dev server, please run `ng serve`.

### References

PM2 - http://pm2.keymetrics.io/docs/usage/quick-start/#cheat-sheet

