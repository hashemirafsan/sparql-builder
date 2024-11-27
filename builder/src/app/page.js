"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from 'react';
import "sparnatural"
import "sparnatural/dist/sparnatural.css"
import config from "./config.json"
import YASQE from 'yasgui-yasqe';
import 'yasgui-yasqe/dist/yasqe.min.css';

export default function Home() {
    const sparnaturalRef = useRef(null);
    const editorRef = useRef(null);
    const yasqeRef = useRef(null);
    const [queryString, setQueryString] = useState(null);

    useEffect(
        () => {
            sparnaturalRef?.current?.addEventListener("queryUpdated", (event) => {
                setQueryString(event.detail)
                yasqeRef.current.setValue(event.detail.queryString || 'SELECT * WHERE { ?s ?p ?o } LIMIT 10');
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

            // Initialize YASQE when the component mounts
            if (editorRef.current && !yasqeRef?.current) {
                yasqeRef.current = YASQE(editorRef.current, {
                    sparql: {
                        endpoint: 'https://dbpedia.org/sparql', // Set your SPARQL endpoint here
                    },
                });
            }
        },
        [queryString],
    );
  return (
      <div className="App">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"/>
          <div id="ui-search">
              <spar-natural
                  ref={sparnaturalRef}
                  src={'https://raw.githubusercontent.com/hashemirafsan/sparql-builder/refs/heads/main/config-v6.ttl'}
                  lang={'en'}
                  defaultLang={'en'}
                  endpoint={'https://dbpedia.org/sparql'}
                  limit={'100'}
                  debug={"true"}
                  submitButton={true}
                  distinct={false}
              />
          </div>
          <div ref={editorRef} style={{height: '500px'}}/>
      </div>
  );
}
