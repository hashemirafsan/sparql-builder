"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from 'react';
import "sparnatural"
import "sparnatural/dist/sparnatural.css"
import config from "./config.json"

export default function Home() {
    const sparnaturalRef = useRef(null);
    const [queryString, setQueryString] = useState(null);

    useEffect(
        () => {
            sparnaturalRef?.current?.addEventListener("queryUpdated", (event) => {
                setQueryString(event.detail)
                // console.log(event?.detail?.queryJson);
                // console.log(event?.detail?.querySparqlJs);
                // here : don't forget to call expandSparql so that core:sparqlString annotation is taken into account
            });
            sparnaturalRef?.current?.addEventListener("submit", (event) => {
                console.log(queryString);
                // console.log(event?.detail?.queryString);
                // console.log(event?.detail?.queryJson);
                // console.log(event?.detail?.querySparqlJs);
                // here : don't forget to call expandSparql so that core:sparqlString annotation is taken into account
            });
        },
        [queryString],
    );
  return (
      <div className="App">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"  />
        <div id="ui-search">
          <spar-natural
              ref={sparnaturalRef}
              src={'https://raw.githubusercontent.com/hashemirafsan/sparql-builder/refs/heads/main/config-v5.ttl'}
              lang={'en'}
              defaultLang={'en'}
              endpoint={'http://localhost:8080/sparql'}
              distinct={'true'}
              limit={'100'}
              debug={"false"}
              submitButton={true}
          />
        </div>
      </div>
  );
}
