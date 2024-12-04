const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private 
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

/* 
    @desc Create new contact
    @route POST /api/contacts
    @access private
*/
const createContact = asyncHandler(async (req,res)=>{
    console.log("Request body is :", req.body);
    const {name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('All fields are required');
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});
/*
    @desc GET contact with id
    @route GET /api/contact/:id
    @access private
*/
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
/*
    @desc Update contact
    @route PUT /api/contact/:id
    @access private
*/
const updateContact = asyncHandler(async (req,res)=>{
   const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);//forbidden
        throw new Error("Action not permitted");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});
/*
    @desc Delete contact
    @route DELETE /api/contact/:id
    @access private
*/
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403); //forbidden
        throw new Error("Action not permitted");
    }
    await Contact.findByIdAndDelete(contact);
    res.status(200).json({message:`Deleted contact of id ${req.params.id}`});
});
module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};