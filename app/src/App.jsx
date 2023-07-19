import { useState, useEffect } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";
export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();

        // console.log(json);
        setData(json);
        setFilterData(json);
        setLoading(false);
      } catch (error) {
        setError("Something went wrong");
      }
    };
    fetchData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue == "") {
      setFilterData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilterData(filter);
  };

  const filteredFood = (type) => {
    if (type == "all") {
      setFilterData(data);
      setSelectedButton("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );

    setFilterData(filter);
    setSelectedButton(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  console.log(data);
  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/assets/logo_1.png" alt="logo" width={160} height={100} />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder="Search food" />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((value) => (
            <Button key={value.name} onClick={() => filteredFood(value.type)}>
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filterData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  background-color: #323334;
  max-width: 12000px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 180px;

    .logo{
      width:{140};
      height:{90};
    }
  }


`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

const Button = styled.button`
  border-radius: 5px;
  background: #ff4343;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
`;
