//@desc Create Contact
//@ get contact
const express = require('express');
const app = express();
const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts)
});
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Not found");
    }
    res.json(contact)
})

const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updateContact)
    
    res.json({"message" : `Update contact by ${req.params.id}`})
})
const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Not found");
    }
    
    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).json({"message" : `Deleted ${contact}`})
})
const addContact = asyncHandler(async(req, res) => {
    console.log(req.body)
    const {name, email, phone} = req.body;
    if( !name || !email || !phone){
        
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json(contact)
})
module.exports = {getContact, getContacts, updateContact, deleteContact, addContact}