import React from "react";
import Heading from "../elements/Heading/Heading";
import { Article } from "../../services/articles";
import { convertToDateFormat } from "../../utils/dataTime";

// export interface Article {
//   title: string;
//   description: string;
//   urlToImage?: string;
//   url: string;
//   publishedAt: string;
//   source?: {
//     name: string;
//   };
// }

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { title, description, urlToImage, url, publishedAt, source } = article;

  return (
    <div className="p-2 sm:p-4 w-full min600:w-1/2 lg:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <div className="flex justify-center items-center">
          <a
            href={url}
            target="_blank">
            <img
              className="h-72 min600:h-72 lg:h-auto object-cover object-center"
              src={
                urlToImage ??
                "https://answers-afd.microsoft.com/static/images/image-not-found.jpg"
              }
              alt="image"
            />
          </a>

        </div>
        <div className="p-2 sm:p-3">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {source?.name}
          </h2>
          <a
            href={url}
            target="_blank">

            <Heading
              text={title}
              className="text-xl line-clamp-2 cursor-pointer hover:underline"
            />
          </a>
          <p className="leading-relaxed mb-3 lora min600:line-clamp-4">{description}</p>
          <div className="flex items-center justify-between">
            <a
              className="text-indigo-500 lora inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <span className="text-gray-400 lora mr-3 inline-flex items-center">
              {convertToDateFormat(publishedAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
