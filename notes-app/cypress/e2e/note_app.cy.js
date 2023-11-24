describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Umesh Sharma',
      username: 'umeshds_',
      password: 'sdfjfkskooo',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);
    cy.visit('');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    );
  });

  it('login form can be opened', function () {
    cy.login({
      username: 'umeshds_',
      password: 'sdfjfkskooo',
    });
    cy.contains('Umesh Sharma logged in');
  });
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'umeshds_',
        password: 'sdfjfkskooo',
      });
      cy.createNote({ content: 'first note', important: false });
      cy.createNote({ content: 'second note', important: false });
      cy.createNote({ content: 'third note', important: false });
    });
    it('one of those can be made important', function () {
      cy.contains('second note').parent().find('button').click();

      cy.contains('second note')
        .parent()
        .find('button')
        .should('contain', 'make not important');
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#noteinput').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: true,
        });
      });
      it('it can be made not important', function () {
        cy.contains('another note cypress').parent().find('button').click();

        cy.contains('another note cypress')
          .parent()
          .find('button')
          .should('contain', 'make important');
      });
    });
  });
  // it.only('login fails with wrong password', function () {
  //   cy.contains('login').click();
  //   cy.get('#username').type('umeshds_');
  //   cy.get('#password').type('wrong');
  //   cy.get('#login-button').click();

  //   cy.get('.error')
  //     .should('contain', 'Wrong credentials')
  //     .should('have.css', 'border-style', 'solid')
  //     .should('have.css', 'color', 'rgb(255, 0, 0)');

  //   cy.contains('Umesh Sharma logged in').should('not.exist');
  // });
});
