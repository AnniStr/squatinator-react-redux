var expect = require('chai').expect;
var User = require('../../models/User');

describe('User Schema', function() {


    it('should be valid if all fields are existing', function(done) {
        var newUser = new User( 
            {
                firstName: 'Max',
                lastName: 'Müller',
                email: 'test@mail.com',
                password: '123456',
                date: 22-10-2001
            }
        );
        newUser.validate(function() {
            expect(newUser.firstName).to.exist;
            expect(newUser.lastName).to.exist;
            expect(newUser.email).to.exist;
            expect(newUser.password).to.exist;
            expect(newUser.date).to.exist;
            done();
        });
    });

    it('should be invalid if one field is missing', function(done) {
        var newUser = new User( 
            {
                firstName: '',
                lastName: 'Müller',
                email: 'test@mail.com',
                password: '123456',
                date: 22-10-2001
            }
        );
        newUser.validate(function(err) {
            expect(err.errors.firstName).to.be.not.empty;
            expect(newUser.lastName).to.exist;
            expect(newUser.email).to.exist;
            expect(newUser.password).to.exist;
            expect(newUser.date).to.exist;
            done();
        });
    });


});