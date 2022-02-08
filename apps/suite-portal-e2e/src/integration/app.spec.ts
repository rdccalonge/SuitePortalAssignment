import { getGreeting } from '../support/app.po';

describe('suite-portal', () => {
  beforeEach(() => cy.visit('/'));

  it('has a title', () => {
    cy.contains('Resident Portal');
  });

  it('has buttons', () => {
    cy.contains('Home');
    cy.contains('Admin');
  });

  it('has a complete form', () => {
    cy.get('[formcontrolname="unitNumber"]').should('exist');
    cy.get('[formcontrolname="name"]').should('exist');
    cy.get('[formcontrolname="email"]').should('exist');
    cy.get('[formcontrolname="serviceType"]').should('exist');
    cy.get('[formcontrolname="summary"]').should('exist');
    cy.get('[formcontrolname="details"]').should('exist');
    cy.get('button.mat-raised-button.mat-accent').should('be.disabled')
  });

  it('blocks protected routes', () => {
    cy.visit('http://localhost:4200/maintenance-list')
    cy.location('pathname').should('eq', '/admin')
  });
  
  it('should navigate to home page', () => {
    cy.get('.home-btn').click();
    cy.location('pathname').should('eq', '/home')
  });

  it('should navigate to login page', () => {
    cy.get('.admin-btn').click();
    cy.location('pathname').should('eq', '/admin')
    cy.get('[formcontrolname="username"]').should('exist');
    cy.get('[formcontrolname="password"]').should('exist');
    cy.get('button.mat-raised-button').should('exist');
    cy.contains('Admin Login');
  });

  it('shows error on invalid credentials', () => {
    cy.get('.admin-btn').click();
    cy.get('[formcontrolname="username"]').type('testusername');
    cy.get('[formcontrolname="password"]').type('testpassword');
    cy.get('button.mat-raised-button').click();
    cy.contains('The username and password were not recognized');
  });


  it('submits a maintenance request form', () => {
    const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const testname = `testname${id}`
    // fill up a form
    cy.get('[formcontrolname="unitNumber"]').type('4A');
    cy.get('[formcontrolname="name"]').type(testname);
    cy.get('[formcontrolname="email"]').type('rdccalonge@gmail.com');
    cy.get('[formcontrolname="serviceType"]').click().get('mat-option').contains('general').click();
    cy.get('[formcontrolname="summary"]').type('Test Summary');
    cy.get('[formcontrolname="details"]').type('Test Details');
    cy.get('button.mat-raised-button.mat-accent').should('not.be.disabled');
    cy.get('button.mat-raised-button.mat-accent').click();
    // login as admin
    cy.get('.admin-btn').click();
    cy.get('[formcontrolname="username"]').type('superadmin');
    cy.get('[formcontrolname="password"]').type('123456');
    cy.get('button.mat-raised-button').click();
    cy.location('pathname').should('eq', '/maintenance-list')
    // maintenance list headers
      cy.contains('Name');
      cy.contains('Email Address');
      cy.contains('Unit No.');
      cy.contains('Type');
      cy.contains('Summary');
      cy.contains('Details');
      cy.contains('Date');
      cy.contains('Done');
      // check submitted detail
      cy.contains('4A');
      cy.contains(testname);
      cy.contains('rdccalonge@gmail.com');
      cy.contains('general');
      cy.contains('Test Summary');
      cy.contains('Test Details');
      cy.get('.complete-btn').should('exist');
      // show dialog
      cy.get('.complete-btn:first').click();
      cy.contains('Close this request?')
      cy.get('.cancel-btn').should('exist');
      cy.get('.ok-btn').should('exist');
      // cancel dialog
      cy.get('.cancel-btn').click();
      cy.contains(testname);
      // complete request
      cy.get('.complete-btn:first').click();
      cy.contains('Close this request?')
      cy.get('.ok-btn').click();
      // record should be removed
      cy.contains(testname).should('not.exist');
  });
  
});
