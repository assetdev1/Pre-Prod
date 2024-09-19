import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from '../../aws-exports';

import { generateClient } from 'aws-amplify/api';
import { createTodo, updateTodo } from '../../graphql/mutations';
import { listTodos, getTodo, listHEALTH, getHEALTH } from '../../graphql/queries';

Amplify.configure(awsExports);
const client = generateClient();

const ListHealth = `
  query {
    listHEALTH {
      items {
        SAP_BACKGROUND_FREE
        SAP_BACKGROUND_TOTAL
        SAP_BACKGROUND_USAGE
        SAP_DIALOG_FREE
        SAP_DIALOG_TOTAL
        SAP_DIALOG_USAGE
        SAP_DIALOG_USER
      }
    }
  }
`

const Test = () => {
  const [data, setData] = useState({ total: 100, free: 50 }); // default values for demo
  const [hover, setHover] = useState(false);

  const [sortedItems, setSortedItems] = useState([]);
  const [health, setHealth] = useState([]);

  // const dialog = health.map(health => health.SAP_DIALOG_FREE)

  async function fetchHealth() {
     const result = await client.graphql({
      query: ListHealth,
    })
    console.log(result.data.listHEALTH.items)
    setHealth(result.data.listHEALTH.items)
  }

  // async function storeTodo() {
  //   const result = await client.graphql({
  //     query: createTodo,
  //     variables: {
  //       input: {
  //         name:"Dump1",
  //         description:"29/08/2024",
  //       }
  //     }
  //   });
  //   console.log(result)
  // }
  
  // async function changeTodo() {
  //   const result = await client.graphql({
  //     query: updateTodo,
  //     variables: {
  //       input: {
  //         id: "4c4c35e2-ab77-4e9c-aa0a-ca55ada16170",
  //         name:"Dump11",
  //       }
  //     }
  //   });
  //   console.log(result)
  // }

  async function fetchTodos() {
    const result = await client.graphql({
      query: listTodos,
    });
    // console.log(result.data.listTodos.items)
    // sorted items return as per description
    const sortedNames = result.data.listTodos.items
    .sort((a, b) => a.description.localeCompare(b.description))
    .map(item => {
      return { 
        id: item.id, name: item.name, description: item.description
      }
    });
    console.log(sortedNames);
    setSortedItems(sortedNames);
  }

  async function fetchTodo() {
    const result = await client.graphql({
      query: getTodo,
      variables: { id:"6dd10ceb-f482-404b-bbcc-f762694f102f" }
    });
    console.log(result);
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Welcome {user.username}</h1>
          <button onClick={signOut}>Sign Out</button>
          {/* <button onClick={storeTodo}>New Todo</button> */}
          <button onClick={fetchTodos}>Fetch Todos</button>
          <button onClick={fetchTodo}>Fetch Todo - test</button>
          {/* <button onClick={changeTodo}>Change Todo - test</button> */}
          <button onClick={fetchHealth}>Fetch Health</button>
        </main>
      )}
    </Authenticator>
  );
}

export default Test
