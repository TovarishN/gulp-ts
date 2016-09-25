/// <reference path="../typings/index.d.ts"/>

import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router'
//import * as history from 'history';

import routes from './app/routes';

let app = express();
let memoryHistory = createMemoryHistory();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

var min = '';

// development only
if ('development' == app.get('env')) {
    //app.use(express.errorHandler());
}

app.use(express.static(path.join(__dirname, '.')));

app.get('/help', function (req : any, res : any) {
    res.render('help', { title: 'Help', min: min });
})

app.use((req : any, res : any, next : any) => {
    const location = memoryHistory.createLocation(req.url);
    
    match({ routes, location }, (error : any, redirectLocation : any, renderProps: any) => {
        var html = ReactDOMServer.renderToString(<RouterContext {...renderProps} />)
        return res.render('main', { content: html, title: 'Home', min: min });
    });
});

http.createServer(app)
	.listen(app.get('port'),  () => {
   		console.log('Express server listening on port ' + app.get('port'));
});