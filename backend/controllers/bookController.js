import { bookModel } from "../models/bookModel.js";
import {StatusCodes} from 'http-status-codes';

export const getAllBooks=async(req,res)=>
{
    try {
        const books = await bookModel.find();
        return res.status(StatusCodes.OK).json({length:books.length,data:books});
    } catch (error) {
        res.status(500).json({msg:error})
    }
    
};
//function addBooks(req,res)
//{
 //   res.send('Add a Book');
//}
export const removeBook=async(req,res)=>
{
    try {
        //console.log(req.params)
        const{id}= req.params;
       // const deletedBook =await bookModel.findByIdAndDelete(id);
        const deletedBook=await bookModel.deleteOne({_id:id});
        //we can delete by id and name also.
        //find by id and delete will return deleted record as json object 
        //deleteone will return json object  with {acknowledged :true/false,deletedCount}

        if(deletedBook.deletedCount) return res.status(200).json({msg:"book deleted successfully",deletedBook});
        res.status(404).json({msg:`book with id: ${id} not found`});
    } catch (error) {
        res.status(500).json({error});
        
    }
    
};
export const updateBook= async(req,res)=>
{
    try {
        const {id}=req.params;
        const newBook=await bookModel.findByIdAndUpdate(id,req.body,{returnDocument:"after"});
        res.status(200).json({msg:"book update successfully!",newBook});
    } catch (error) {
        res.status(500).json({error});

        
    }
    //{new:true};
    //res.send("update a book");
};
export const getBook= async (req,res)=>
{
    //here param is using as a array.
    const {id} =req.params;
    const book = await bookModel.findById(id);
    if(book) return res.status(StatusCodes.OK).json(book);
    return res.status(StatusCodes.NOT_FOUND)
    .json({msg:`No book found with id ${id}`});

    //res.send("show a book");

};
export const addBook=async(req,res) =>
{
    try {
        await bookModel.create(req.body);
        return res.status(StatusCodes.OK).json({msg:"book added successfully"});
    
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"error in server"});
        
    }
};