
export const ListTodo = `
  query {
    listTodos {
      items {
        description
        id
        name
      }
    }
  }
`

export const ListHealth = `
  query {
    listHEALTH(limit: 25) {
      items {
        SAP_BACKGROUND_FREE
        SAP_BACKGROUND_TOTAL
        SAP_BACKGROUND_USAGE
        SAP_DIALOG_FREE
        SAP_DIALOG_TOTAL
        SAP_DIALOG_USAGE
        SAP_SPOOL_FREE
        SAP_SPOOL_TOTAL
        SAP_SPOOL_USAGE
        SAP_UPDATE_FREE
        SAP_UPDATE_TOTAL
        SAP_UPDATE_USAGE
      }
    }
  }
`

export const ListSmlg = `
query {  
  listSMlGS {
    items {
      SAP_RESPONSE_TIME
      TIME
    }
  }
}
`

export const ListHealthDialog = `
  query {
    listHEALTH(filter: {id: {between: ["2024-09-20T06:36:35.912042", "2024-10-30T23:59:59.000000"]}}, limit: 31) {
      items {
        id
        SAP_DIALOG_FREE
        SAP_DIALOG_TOTAL
        SAP_DIALOG_USAGE
      }
    }
  }
`
