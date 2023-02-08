import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResult] = useState(null);
  const [searchedTimeout, setSearchedTimeout] = useState(null);
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setSearchedTimeout(
      setTimeout(() => {
        const searchResults = allPost.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResult(searchResults);
      }, 500)
    );
  };
  return (
    <section className="max-w-7x1 mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Lokale kunstere:
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">
          Søk gjennom alle bildene generert på denne siden. Alle kunsterne her
          gir oss automatisk rett til å bruke bildene i denne sammenheng. Dette
          ai'et er basert på OpenAI.
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Søk i bildene"
          type="text"
          name="text"
          placeholder="Søk.."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Viser resultater av:
                <span className="text[#222328]"> {searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="Ingen søkeresultater funnet"
                />
              ) : (
                <RenderCards
                  data={allPost}
                  title="Ingen bilder er laget enda."
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
