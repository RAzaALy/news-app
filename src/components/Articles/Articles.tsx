import { Article } from "../../services/articles"
import Loading from '../elements/Loading/Loading'
import ArticleCard from '../ArticleCard/ArticleCard'
import { useArticles } from '../../context/ArticlesContext'
import Error from "../elements/Error/Error"


const Articles = () => {
    const { articles, loading, error } = useArticles()

    
    if (loading) {
        return <Loading />
    }

    if(error) {
        return <Error error={"Something Went Wrong. Try Later"} />
    }

    return (
        <>


            {
                articles && !articles.length ? (
                    <div className="flex w-full min-h-[400px] justify-center items-center" >
                        <h1 className="text-2xl">No Data Found</h1>
                    </div>
                ) : (
                    <>
                        {

                            articles?.map(((article: Article, i) => (<ArticleCard key={i} article={article} />)))
                        }
                    </>
                )
            }



        </>
    )
}

export default Articles