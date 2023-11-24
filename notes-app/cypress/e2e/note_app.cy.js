describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Umesh Sharma',
      username: 'umeshds_',
      password: 'sdfjfkskooo',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    );
  });

  it('login form can be opened', function () {
    cy.contains('login').click();
    cy.get('#username').type('umeshds_');
    cy.get('#password').type('sdfjfkskooo');
    cy.get('#login-button').click();

    cy.contains('Umesh Sharma logged in');
  });
  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click();
      cy.get('#username').type('umeshds_');
      cy.get('#password').type('sdfjfkskooo');
      cy.get('#login-button').click();
    });
    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#noteinput').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click();
        cy.get('#noteinput').type('another note cypress');
        cy.contains('save').click();
      });
      it('it can be made not important', function () {
        cy.contains('another note cypress')
          .contains('make not important')
          .click();

        cy.contains('another note cypress').contains('make important');
      });
    });
  });
  it.only('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('umeshds_');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .should('have.css', 'border-style', 'solid')
      .should('have.css', 'color', 'rgb(255, 0, 0)');

    cy.contains('Umesh Sharma logged in').should('not.exist');
  });
});
