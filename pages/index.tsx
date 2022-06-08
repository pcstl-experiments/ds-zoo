import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image' up
import styles from '../styles/Home.module.css'

interface DataStructureDescriptor {
  id: string, 
  name: string,
  description: string,
  alternateName?: string,
  alsoKnownAs?: string[],
  searchKeywords?: string[] 
}

const dataStructureData: DataStructureDescriptor[] = [
    {
	id: "array",
	name: "Arranjo",
	alternateName: "Array",
	description: "Itens do mesmo tipo em um bloco de comprimento definido",
	alsoKnownAs: ["Vetor", "Lista"]
    },
    {
	id: "record",
	name: "Registro",
	alternateName: "Record",
	description: "Itens de tipos possivelmente diferentes em um bloco estruturado",
	alsoKnownAs: ["Struct", "Structure", "Estrutura"]
    },
    {
	id: "linked-list",
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

const getDescriptorSearchKeywords = (descriptor: DataStructureDescriptor): string[] => {
    const mainAlternateName = descriptor.alternateName ? [descriptor.alternateName.toLowerCase()] : [];
    const otherAlternateNames = descriptor.alsoKnownAs?.map((name) => name.toLowerCase()) || [];
    const searchKeywords = descriptor.searchKeywords?.map((name) => name.toLowerCase()) || [];

    return [descriptor.name.toLowerCase()]
	.concat(mainAlternateName)
	.concat(otherAlternateNames)
	.concat(searchKeywords);
}

interface DataStructureSearchData {
    keywords: string[],
    descriptor: DataStructureDescriptor,
}

const descriptorToSearchData = (descriptor: DataStructureDescriptor): DataStructureSearchData => ({
    keywords: getDescriptorSearchKeywords(descriptor),
    descriptor,
});

interface SearchCache {
    keys: string[],
    map: Map<string, DataStructureDescriptor[]>,
}

const descriptorsToSearchCache = (descriptors: DataStructureDescriptor[]): SearchCache => {
    const searchData = descriptors.map(descriptorToSearchData);

    let setMap = new Map<string, Set<DataStructureDescriptor>>();
    searchData.forEach((searchEntry) => {
	searchEntry.keywords.forEach((keyword) => {
	    let keywordSet;
	    if (setMap.has(keyword)) {
		keywordSet = setMap.get(keyword)!;
	    } else {
		keywordSet = new Set<DataStructureDescriptor>();
		setMap.set(keyword, keywordSet);
	    }
	    keywordSet.add(searchEntry.descriptor);
	})
    });

    let searchMap = new Map<string, DataStructureDescriptor[]>();
    for (const [key, value] of setMap.entries()) {
	searchMap.set(key, [...value]);
    }

    return {
	keys: [...searchMap.keys()],
	map: searchMap,
    };
}

const getSearchResults = (query: string, searchCache: SearchCache): DataStructureDescriptor[] => {
    const applicableKeys = searchCache.keys.filter((key) => key.includes(query));
    let resultSet = new Set<DataStructureDescriptor>();

    applicableKeys.forEach((key) => {
	const descriptors = searchCache.map.get(key);
	descriptors?.forEach((descriptor) => {
	    resultSet.add(descriptor);
	});
    });

    return [...resultSet];
}

/* Teste da busca */
const searchCache = descriptorsToSearchCache(dataStructureData);
const results = getSearchResults("lista", searchCache).map((d) => d.id);
console.log(results);

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
		  {dataStructureData.map((descriptor) =>
		      <DataStructureCard key={descriptor.id} descriptor={descriptor} />
		  )}
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
