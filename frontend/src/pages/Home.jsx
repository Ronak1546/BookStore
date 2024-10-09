import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { SERVER_URL } from "../../serverURL";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [countBook, setCountBook] = useState();
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(SERVER_URL);
      console.log(resp.data);
      setCountBook(resp.data.length);
      setBooks(resp.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div className="p-4 ">
        <div className="flex justify-between items-center bg-red-300 p-4 rounded-md">
          <h1 className="text-3xl my-8">Book List</h1>
          <Link to="/books/add">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full border-spacing-2">
            <thead>
              <tr className="border rounded-md border-slate-600">
                <th>No.</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className="h-5 border border-slate-700 rounded-md text-center">
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.year}</td>
                  <td>
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/${book._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>
                      <Link to={`/books/update/${book._id}`}>
                        <AiOutlineEdit className="text-2xl text-blue-800" />
                      </Link>
                      <Link to={`/books/remove/${book._id}`}>
                       <MdOutlineDelete className="text-2xl text-red-800" />
                     </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default Home;