"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef } from 'react';
import "sparnatural"
import "sparnatural/dist/sparnatural.css"
import config from "./config.json"

export default function Home() {
    const sparnaturalRef = useRef(null);
    useEffect(
        () => {
            sparnaturalRef?.current?.addEventListener("queryUpdated", (event) => {
                console.log('Hello')
                // console.log(event?.detail?.queryString);
                // console.log(event?.detail?.queryJson);
                // console.log(event?.detail?.querySparqlJs);
                // here : don't forget to call expandSparql so that core:sparqlString annotation is taken into account
            });
        },
        [],
    );
  return (
      <div className="App">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"  />
        <div id="ui-search">
          <spar-natural
              ref={sparnaturalRef}
              src={'https://raw.githubusercontent.com/sparna-git/Sparnatural/refs/heads/master/hello-sparnatural/config.ttl'}
              lang={'en'}
              defaultLang={'en'}
              endpoint={'https://dbpedia.org/sparql'}
              distinct={'true'}
              limit={'100'}
              debug={"false"}
              submitButton={false}
          />
        </div>
      </div>
  );
}
