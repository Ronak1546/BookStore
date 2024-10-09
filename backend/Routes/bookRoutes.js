import express from "express";
import { 
    addBook, 
    getAllBooks, 
    getBook, 
    removeBook, 
    updateBook 
}
     from "../controllers/bookController.js";
    
     const bookRoutes=express.Router();

    //bookRoutes.get("/",getAllBooks);
    //bookRoutes.post("/",addBook);

    bookRoutes.route("/").get(getAllBooks).post(addBook);

    //bookRoutes.put("/:id",updateBook);
    //bookRoutes.get("/:id",getBook);
    //bookRoutes.delete("/:id",removeBook);
//this is short method......

    bookRoutes.route("/:id").get(getBook).put(updateBook).delete(removeBook);
    export default bookRoutes;