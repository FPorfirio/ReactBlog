
describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.request('POST','http://localhost:3001/api/users', {name: 'james', username: 'monte', password: 'parrot'})
  })

  it('login form is show after clicking login button', function() {
    cy.contains('Login').click()
    cy.get('html')
      .should('contain', 'username')
      .and('contain', 'password')
  })

  it('login succeeds with right credentials', function(){
    cy.contains('Login').click()
    cy.get('#loginForm').find('input:first').type('monte')
    cy.get('#loginForm').find('input:last').type('parrot')
    cy.get('#loginForm').find('button').click()
    cy.contains('monte is loged in')
  })

  it('login fails with wrong credentials', function(){
    cy.contains('Login').click()
    cy.get('label[for=username]').find('input').type('sadadasd')
    cy.get('label[for=password]').find('input').type('dsadasd')
    cy.get('#loginForm').find('button').click()
    cy.get('html').should('not.contain','monte is loged in')
  })
 
  describe('when logged in', function(){
    beforeEach(function(){
      cy.login({username: 'monte', password: 'parrot'})
    })
    
    it('A new blog post can be created', function(){
      const post = {
        title: 'a new blog',
        author: 'james',
        url: 'www.blogs.com'
      }

      cy.createPost(post)

      cy.contains('a new blog')
    })

    describe('and a post exist', function(){
      beforeEach(function(){
        const post = {
          title: 'a new blog',
          author: 'james',
          url: 'www.blogs.com',
        }
  
        cy.createPost(post)
      })

      it('user can like a post', function(){
        cy.contains('show').click()
        cy.contains('Like').click()
        cy.contains('1')
      })

      it('user who created the post can delete it', function(){
        cy.contains('show').click()
        cy.contains('Delete').click()
        cy.on('window:confirm', (str) => {
          return true
        })
        cy.get('html').should('not.contain', 'a new blog')
      })

      it('user who didn not create the post cant delete it', function(){
        cy.request('POST','http://localhost:3001/api/users', {name: 'willy', username: 'willyx', password: 'pass23'})
        cy.login({username: 'willyx', password: 'pass23'})
        cy.contains('show').click()
        cy.contains('Delete').click()
        cy.on('window:confirm', (str) => {
          return true
        })
        cy.get('html').should('contain', 'a new blog')
      })
    })

    describe.only('and multiple post exists', function(){
      beforeEach(function(){
        const post = {
          title: 'a new blog1',
          author: 'james',
          url: 'www.blogs.com',
          likes:4
        }
        const post2 = {
          title: 'a new blog2',
          author: 'james',
          url: 'www.blogs.com',
          likes: 6
        }
        const post3 = {
          title: 'a new blog3',
          author: 'james',
          url: 'www.blogs.com',
          likes: 1
        }
  
        cy.createPost(post)
        cy.createPost(post2)
        cy.createPost(post3)
      })

      
      it('post with most likes are first', function(){
        /*
        cy.get('div')
          cy.contains('a new blog')
          .find('button')
          .each( button => {
          console.log(button)
          if(button.text() == 'show'){
            cy.wrap(button).click()
          }
        })

        cy.get('button').then( likeElement => {
          if(likeElement.text() == 'show'){
           console.log(likeElement)
           cy.wrap(likeElement[0]).should('contain', 4)
          }
        })*/
        cy.get('div').find('[data-cy=blog]')
          .each($blog => {
            cy.wrap($blog).contains('show').click()
          })
          
        cy.get('[data-cy=blog]')
          .should(($blogs) => {
            expect($blogs.first()).to.contain(6)
            expect($blogs.last()).to.contain(1)
          })
      })
    })

  })
})