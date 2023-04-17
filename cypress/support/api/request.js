class Request {

    getGrupo() {
        return cy.request({
            method: 'POST',
            url: '/koopon-produto-rest-api/grupos',
            body: {
                "propsPendenciasLista": [],
                "descricao": "Ferramentas",
                "imagem": "",
                "imagemMoldura": "",
                "nomeAgrupamento": ""
            }

        })
    }
    getDeleteGrupo(response) {
        const id = response.body.idGrupo
        return cy.request({
            method: 'DELETE',
            url: `/koopon-produto-rest-api/grupos/${id}`,

            failOnStatusCode: false

        })

    }
    getCriarAdmCartaoSemDados() {
        return cy.request({
            method: 'POST',
            url: 'koopon-financeiro-rest-api/commons/cartoes_operadora/',
            body: {

                "descricao": "Inter",
                "cnpj": "81.552.500/0001-38",

                failOnStatusCode: false

            }

        })
    }
    DeleteGrupoMovimentada(response) {
        return cy.request({
            method: 'DELETE',
            url: `/koopon-produto-rest-api/grupos/1`,

            failOnStatusCode: false

        })

    }
}
export default new Request();