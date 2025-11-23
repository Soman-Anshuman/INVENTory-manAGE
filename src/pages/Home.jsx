import { useContext, useEffect, useRef, useState } from "react";
import heroImg from "../assets/products-removebg-preview.png";
import loadGif from "../assets/loader-9184_256.gif";
import bgImg from "../assets/squiggles_and_doodles_background.jpg";
import useApiCall from "../hooks/useApiCall";
import Card from "../components/Card";
import { DarkModeContext } from "../context/DarkModeContext";

const Home = (logged) => {
  const nameRef = useRef(null);
  const [allProds, setAllProds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { allData, loading, fetchData, addData, deleteData, modifyData } =
    useApiCall();
  const { darkMode } = useContext(DarkModeContext);

  async function handleAddProd(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    // console.log(...formData);
    for (const value of formData.values()) {
      //checking if any of form's field is empty
      if (value === "") {
        console.log("fill the form completely");
        return;
      }
    }

    const path = "https://dummyjson.com/products/add";
    // const data = {
    //     title: 'abs',
    //     stock: 8,
    //     price: 69.99,
    // };

    let d = await addData(path, formData);
    setAllProds((allProds) => [d, ...allProds]);
  }

  async function handleDelete(id) {
    const path = `https://dummyjson.com/products/${id}`;

    let d = await deleteData(path);
    setAllProds((allProds) => allProds.filter((e) => e.id != d.id));
  }

  async function handleModify(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    // console.log(formData.get("id"));
    const id = formData.get("id");

    const path = `https://dummyjson.com/products/${id}`;
    let d = await modifyData(path, formData);
    setAllProds((prevProds) =>
      prevProds.map((prod) => {
        if (prod.id === d.id) return d;
        return prod;
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value;

    const path = "https://dummyjson.com/products/search";
    const params = {
      q: name,
      select: "title,stock,price,thumbnail",
      limit: 10,
    };

    fetchData(path, params);
  }
  useEffect(() => {
    setAllProds(allData?.products);
  }, [allData]);

  console.log(allProds);

  return (
    <div
      className={darkMode ? `bg-slate-900 text-white min-h-[100vh] pb-10` : ``}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <img src={bgImg} alt="" className="fixed -z-10 w-full opacity-5" />

        {/* hero panel */}
        <div className="w-full flex flex-wrap-reverse p-10">
          {/* left side */}
          <div className="flex flex-col justify-evenly gap-2 w-full md:w-[50%]">
            <h2 className="text-4xl font-bold">
              Want to find about your favourite product?
            </h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequuntur eligendi est ipsum? Eius nesciunt architecto qui
              explicabo? Ea beatae ex perferendis recusandae. Enim eos nemo ut
              sed minus voluptatem ab.
            </p>
            {/* search bar */}
            <form className="mx-2 flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Search here"
                ref={nameRef}
                className={`rounded-lg p-1 border-2 text-gray-400 border-slate-500 outline-offset-2 outline-slate-400 focus:outline-2 ${
                  darkMode ? `focus:bg-slate-600` : `focus:bg-slate-100`
                } `}
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="border-2 border-green-400 rounded-lg px-1.5 font-medium self-center cursor-pointer hover:bg-green-400 hover:text-white"
              >
                Submit
              </button>
              {allProds && !showForm && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!logged) {
                      alert("Log in to use this feature");
                      return;
                    }
                    setShowForm(true);
                  }}
                  className="rounded-lg px-2 font-medium self-center cursor-pointer bg-green-400 hover:bg-yellow-400 hover:text-white"
                >
                  Add Product <span className="text-xl">↴</span>
                </button>
              )}
            </form>

            {/* add product form */}
            {showForm && logged && (
              <form
                onSubmit={handleAddProd}
                className="flex flex-col border border-amber-200 p-3 gap-2 bg-amber-50 rounded-lg shadow-lg w-full sm:w-[70%] md:w-[50%]"
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Product name"
                  className={`p-1 border rounded-lg border-amber-400 focus:outline-amber-400 focus:bg-white ${
                    darkMode ? `text-gray-400` : ``
                  }`}
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  className={`p-1 border rounded-lg border-amber-400 focus:outline-amber-400 focus:bg-white ${
                    darkMode ? `text-gray-400` : ``
                  }`}
                />
                <input
                  type="text"
                  name="stock"
                  placeholder="Quantity left"
                  className={`p-1 border rounded-lg border-amber-400 focus:outline-amber-400 focus:bg-white ${
                    darkMode ? `text-gray-400` : ``
                  }`}
                />
                <div className="self-start space-x-1">
                  <button
                    type="submit"
                    // onClick={handleAddProd}
                    className="py-1 px-3 rounded-lg bg-amber-400 text-white cursor-pointer"
                  >
                    Add
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowForm(false);
                    }}
                    className="py-1 px-3 rounded-lg bg-red-400 text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* right side/image */}
          <div className="w-full md:w-[50%]">
            <img src={heroImg} alt="" className="" />
          </div>
        </div>

        {/* Cards space */}
        <div className="flex flex-wrap m-10 gap-10 justify-center">
          {loading && <img src={loadGif} alt="loading..." />}
          {!loading &&
            allProds?.map((element) => (
              <Card
                key={element.id}
                props={element}
                logged={logged}
                handleDelete={handleDelete}
                handleModify={handleModify}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
