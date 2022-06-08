import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image' up
import styles from '../styles/Home.module.css'

interface DataStructureDescriptor {
  name: string,
  description: string,
  alternateName?: string,
  alsoKnownAs?: string[],
}

const dataStructureData: DataStructureDescriptor[] = [
    {
	name: "Arranjo",
	alternateName: "Array",
	description: "Itens do mesmo tipo em um bloco de comprimento definido",
	alsoKnownAs: ["Vetor"]
    },
    {
	name: "Registro",
	alternateName: "Record",
	description: "Itens de tipos possivelmente diferentes em um bloco estruturado",
	alsoKnownAs: ["Struct", "Structure", "Estrutura"]
    },
    {
	name: "Lista encadeada",
	description: "Sequência de nós estruturados que pode crescer dinamicamente"
    }
];

interface DataStructureCardProps {
  descriptor: DataStructureDescriptor,
}

const renderDataStructureName = (descriptor: DataStructureDescriptor): string => {
    const suffix = descriptor.alternateName ? ` (${descriptor.alternateName})` : "";
    return `${descriptor.name}${suffix}`;
}

const DataStructureCard = ({ descriptor }: DataStructureCardProps) => (
    <a href="#" className={styles.card}>
      <h2>{renderDataStructureName(descriptor)}</h2>
      <p>{descriptor.description}</p>
    </a>     
)

const Home: NextPage = () => {
	return (
	    <div className={styles.container}>
	      <Head>
		<title>Zoológico de Estruturas de Dados</title>
		<meta name="description" content="Aprenda estruturas de dados interativamente" />
		<link rel="icon" href="/favicon.ico" />
	      </Head>

	      <main className={styles.main}>
		<h1 className={styles.title}>
		  Zoológico de Estruturas de Dados
		</h1>

		<p className={styles.description}>
		  Aprenda estruturas de dados interativamente
		</p>

		<div className={styles.list}>
		  {dataStructureData.map((descriptor) => <DataStructureCard descriptor={descriptor} />)}
		</div>
	      </main>

	      <footer className={styles.footer}>
		<p>
		  <span>Feito com ☕ por{' '}<a href="https://twitter.com/coproduto" target="_blank">coproduto</a></span>
		</p>
	      </footer>
	    </div>
	)
}

export default Home
