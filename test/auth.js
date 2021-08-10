const server = require('../routes/auth')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)


describe('Test signup function', () => {
    it('should add a new user', (done) => {
        chai.request(server)
            .post('/signup')
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNywiZW1haWwiOiJib2JAZ21haWwuY29tIn0sImlhdCI6MTYyODI1MTMwMH0.3ApQkfbxyh_Iu11ks8p61rKxC0-tHYoAi0mkdm8UaLM')
            .send({
                email: 'test@example.com',
                password: 'password'
            })
            .end((err, response) => {
                response.should.have.status(201)
            })
            done()
    })
})

