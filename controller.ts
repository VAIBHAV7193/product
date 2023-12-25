import { Request,Response } from "express";
import  Product  from "./model";
import { count } from "console";

const all_Book =async(req: Request, res: Response)=>{
    try{
        
       const Book = await Product.find();
        res.status(200).send({
            success:true,
            message:'All The Book Present in library',
            Book,
            count:  Book.length
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Getting  Info of all Book',
            error
        })
    }
    
};

const create_Book =async (req:Request,res:Response) => {
    try{
        const { name, description,author, price } = req.body;
        if(!name || !description || !author || !price){
            res.status(400)
            throw new Error("All fields mandatory")
           }

           const available_Book = await Product.findOne({name:name});

           if(available_Book){
            return res.status(201).send({
                success:false,
                messgae:'Book is already existing in Database'
            })
           }

           const new_Book  = await Product.create({name:name,description:description,author:author,price:price})
           new_Book.save();
           res.status(201).send({
            success:true,
            messgae:' New Book created ',
            book:new_Book
        })

    }
    catch(err){
        console.log(err)
        res.status(400).send({
            success:false,
            message:'Error in creting book',
            err
        })

    }
       
}

const getById_Book =async (req:Request,res:Response) => {
    try{
        
        const Book = await Product.findById({_id:req.params.id})
        if(Book == null){
            res.status(200).send({
                success:true,
                message:'Book is not Present',
            })

        }
        res.status(200).send({
            success:true,
            message:'Book Shown Successfully',
            Book
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Getting info of sigle Book',
            error
        })
    }
    
}

const delete_Book = async(req:Request,res:Response)=>{
    try{

        await Product.findByIdAndDelete({_id:req.params.id})

        res.status(200).send({
            success:true,
            message:'Book Deleted Successfully'
        })
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:'Error in delte Book'
        })
    }
}

const update_Book =  async(req:Request,res:Response)=>{
    try{
       
        
        
    const Book = await Product.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});

    
   
if(Book){
    res.status(200).send({
        success:true,
        messgae:'Info Updated Successfully',
        Book

    })

}
else{
    res.send({
        success:false,
        messgae:'Book is not found',
    })
    

  
    }

}
    
    catch(err){
        
            console.log(err);
            res.status(500).send({
                success:false,
                messgae:'Error in Updating Book',
                err
            })}
    
}


export {all_Book,create_Book,getById_Book,delete_Book,update_Book};