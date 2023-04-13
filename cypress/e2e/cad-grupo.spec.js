/// <reference types="cypress"/> 
import reg from '../support/api/request'
import assert from '../support/api/asserts'
describe('Cadastro de Grupo', () => {
    beforeEach(() => {
        cy.login()
    
    });
    Cypress._.times(1, () => {
        it('Quando realizar uma busca, então a busca deve ser realizada com suceso', () => {
            cy.intercept({
                method: 'GET',
                path: '/koopon-produto-rest-api/grupos',

            }, {

                statusCode: 200,
                fixture: 'dados'

            }).as('dados-grupo')

            cy.AcessarGrupo()
            cy.get('.alt-container-centralizado [placeholder*="pesquisa"]').type('Eletronicos {enter}')
            cy.get('#koopon-produto-listagem-grupos tbody  tr')
                .contains('Eletronicos')
                .should('have.text', 'Eletronicos')

        });

    });
    it('Ao realizar uma localização de Grupo, o grupo deve ser localizado e não deve exibir que o Grupo não foi localizado', () => {
        cy.AcessarGrupo()
        cy.intercept({
            method: 'GET',
            path: '/koopon-produto-rest-api/grupos',

        }, {

            statusCode: 200,
            fixture: 'dados'

        }).as('dados-grupo')
        cy.get('.alt-container-centralizado > .row > .col-sm-5 > .form-control').type('Eletronicos')
        cy.get('body main [ng-show="textoCardFiltro"]')
            .should('not.be.visible')


    });
    it('Quando não existir Grupos cadastrado na base, então o botão criar Grupo deve ser exibido', () => {
        cy.intercept('GET', '/koopon-produto-rest-api/grupos',
            { fixture: 'vazio' }
        ).as('dados-grupo')

        cy.AcessarGrupo()
        cy.get('.botoes-flex-container > .btn')
            .should('be.visible')

    });
    it('Quando criar um Grupo via API, então o cadastro deve ser criado com sucesso e excluido', () => {
        cy.visit('/')
        reg.getGrupo().then(getCriarGrupoResponse => {
            expect(getCriarGrupoResponse.body.descricao).to.equal('Ferramentas')
            reg.getDeleteGrupo(getCriarGrupoResponse).then(getDeleteGrupoResponse => {
            })

        })

    })
    it('Quando excluir um Grupo já movimentado via API, então o cadastro não deve ser excluido e deve ocorrer validação - Não foi possível excluir, pois a informação está sendo utilizada em outra parte do sistema.', () => {
        cy.visit('/')
        reg.DeleteGrupoMovimentada().then(DeleteGrupoMovimentadaResponse => {
            assert.validaStatus(DeleteGrupoMovimentadaResponse, 400)
        })

    })
    Cypress._.times(1, () => {
        it('Quando criar um Grupo via tela e Gravar sem preencher dados, então não deve permitir gravar e deve ocorrer validação - Informe a Descrição.', () => {
            cy.AcessarGrupo()
            cy.wait(300)
            cy.get('#koopon-produto-grupos-btn-novo').click()
            cy.get('#gravar-modal-novo-grupo-especifico').click()
            cy.get('.has-error > .text-danger > b')
                .should('be.visible')
        })

    })
    Cypress._.times(1, () => {
        it('Quando criar um Grupo via tela com o checkbox (Criar outro) marcado e Gravar, então tela deve permanecer aberto para criar um novo grupo', () => {
            cy.AcessarGrupo()
            cy.get('#koopon-produto-grupos-btn-novo').click()
            cy.get('#koopon-produto-input-descricao-grupo-especifico').type('Informática')
            cy.get('#koopon-produto-input-criar-outro-grupo-especifico').check({ force: true })
            cy.get('#gravar-modal-novo-grupo-especifico').click()
            cy.contains('Novo Grupo')
                .should('be.visible')
            cy.get('#koopon-produto-cancelar-modal-grupo-especifico').click()
            cy.get('#koopon-produto-listagem-grupos tbody  tr')
                .contains('Informática')
                .siblings()
                .children()
                .find('[title="Excluir"]').click()
            cy.get('#confirmar-exclusao-modal-generico').click()
        })


    })
})

























