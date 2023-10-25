import request from 'supertest';
import { app} from '../../app';

it('return a 201 on sucessfull signup' , async() => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password:'password'
        })
        .expect(201);
})

it('returns a 400 with invalid email or password' , async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'akhil',
            password:'password'
        })
        .expect(400);
    await request(app)
        .post('/api/users/signup')
        .send({
            email : 'test@gamil.com',
            password:'p'
        })
        .expect(400)
    
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'',
            password:''
        })
        .expect(400)
})

it('Disallows duplicated emails signup' , async()=> {
    await request(app)
        .post('/api/users/signup')
        .send({
            email : 'test@test.com',
            password:'password'
        })
        .expect(201);
    
    await request(app)
        .post('/api/users/signup')
        .send({
            email : 'test@test.com',
            password:'password'
        })
        .expect(400);
})

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    expect(response.get('Set-Cookie')).toBeDefined();
  });