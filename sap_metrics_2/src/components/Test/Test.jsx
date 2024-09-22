import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from '../../aws-exports';

import { generateClient } from 'aws-amplify/api';
import { getTodo } from '../../graphql/queries';
import { ListTodo, ListHealth, ListSmlg } from '../../graphql/manipulated_queries';

Amplify.configure(awsExports);
const client = generateClient();

const Test = () => {
  const [data, setData] = useState({ total: 100, free: 50 }); // default values for demo
  const [hover, setHover] = useState(false);

  const [sortedItems, setSortedItems] = useState([]);
  const [health, setHealth] = useState([]);

  // const dialog = health.map(health => health.SAP_DIALOG_FREE)

  async function fetchSmlg() {
    const result = await client.graphql({
    query: ListSmlg,
  })
  // console.log(result.data.listSMlGS.items)
  const sortedNames = result.data.listSMlGS.items
    .sort((a, b) => a.TIME.localeCompare(b.TIME))
    .map(item => {
      return { 
        sap_response_time: item.SAP_RESPONSE_TIME, time: item.TIME
      }
    });
    console.log(sortedNames);
    setSortedItems(sortedNames);
  }

  async function fetchHealth() {
      const result = await client.graphql({
      query: ListHealth,
    })
    console.log(result.data.listHEALTH.items[0].SAP_DIALOG_FREE)
    console.log(result.data.listHEALTH)
    setHealth(result.data.listHEALTH.items)
  }

  async function fetchTodos() {
    const result = await client.graphql({
      query: ListTodo,
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
          <button onClick={fetchTodos}>Fetch Todos</button>
          <button onClick={fetchTodo}>Fetch Todo - test</button>
          <button onClick={fetchHealth}>Fetch Health</button>
          <button onClick={fetchSmlg}>Fetch SMLG</button>
        </main>
      )}
    </Authenticator>
  );
}

export default Test
