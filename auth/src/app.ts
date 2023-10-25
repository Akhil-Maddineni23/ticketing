import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler , NotFoundError } from '@mac-tickets/common';


const app = express();
app.set('trust proxy', true);
app.use(json());

//secure : true means that cookies are only going to be shared when 
//someone is making a request to our server over an HTTPS connection.
//When we make use of supertest we are not making an HTTPS connection, we 
//are making plain HTTP requests.
//change the secure property to false in our test environment that weill
//allow cookie session to set that cookie even if the request is not secure.

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
