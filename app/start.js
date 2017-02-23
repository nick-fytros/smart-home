import { app } from './app';

app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'), function() {
    console.info('Express server listening on port ' + server.address().port);
});