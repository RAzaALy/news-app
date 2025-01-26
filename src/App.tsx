
import Articles from "./components/Articles/Articles"
import FilterAction from "./components/FilterAction/FilterAction"
import Header from "./components/Header/Header"
import SearchBar from "./components/SearchBar/SearchBar"
import { useArticles } from "./context/ArticlesContext"

// const article: Article = {
//   title: "Overlooked No More: Ellen ArmstrongEllen ArmstrongEllen ArmstrongEllen Armstrong Ellen Armstrong, ‘Marvelous, Mystifying’ Magician of Mirth",
//   description: "This article is part of Overlooked, a series of obituaries about remarkable people whose deaths, beginning in 1851, went unreported in The Times.",
//   urlToImage: "https://static01.nyt.com/images/2024/12/19/multimedia/19dc-factcheck-jmpl/19dc-factcheck-jmpl-articleLarge.jpg",
//   url: "https://static01.nyt.com/images/2024/09/23/multimedia/19Overlooked-Armstrong-01-bcvw-print1/19Overlooked-Armstrong-01-bcvw-articleLarge.jpg",
//   publishedAt: "2024-09-21",
//   source: {
//     name: "The NEw York Times"
//   }

// }

function App() {

  const {filters} = useArticles()

  return (
    <div className="max-w-[1800px] w-full mx-auto px-2">
      <Header />
      <div className="my-5 flex justify-center items-center">
        <SearchBar />
        <FilterAction />
      </div>
      <div className={`flex mt-5 justify-center items-center`}>
        <p className="text-sm lora" >{filters.keyword && `Search Results for : ${filters.keyword} `}</p>
      </div>
      <div className="flex justify-between items-center flex-wrap my-5">
        <Articles />
      </div>

    </div>

  )
}

export default App
