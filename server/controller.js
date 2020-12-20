const express = require('express');
const { response } = require('./server');
const models = require('../server/Model.js')

const ticketController = {};

ticketController.setTicket = (req, res) => {
  const { header, status, student, fellow, expectations, tried, notWorking, zoom, requiredNotes } = req.body;

  models.TicketForm.create(
    { header, status, student, fellow, expectations, tried, notWorking, zoom, requiredNotes }, (err, result) => {
     
      if (err) {
        console.log('Error creating new ticket:', err);
        return res.status(400).json(err);
      }
      return res.status(200).json(result); //sam says return result? why? for now just send success
    }
  )
}

ticketController.getTickets = (req, res) => {
 
  models.TicketForm.find({}, (err, results) => {
    
      if (err) {
        console.log('Error finding tickets:', err);
        return res.status(500).json(err); //is this the right error code?
      }
      return res.status(200).json(results)
    }
  )
}

ticketController.reviewTicket = (req, res) => {
  const { id, status } = req.body;
  
  models.TicketForm.findOneAndUpdate( { id }, { status }, (err, result) => {
    
    if (err) {
      console.log('Error updating ticket', err);
      return res.status(500).json(err); //is this the right error code?
    }
    return res.status(200).json(result)
    }    
  )
}

ticketController.resolveTicket = (req, res) => {
  //will be given the id of the ticket
  //we are going to need : ticket ID , status, and resolvedNotes
  
  const { id , status, resolvedNotes } = req.body;
  
 models.TicketForm.findOneAndUpdate({id},{ status, resolvedNotes }, (err, result) =>{
 if(err){
     console.log('Could not update the Ticket ', err);
     return res.status(500).send(err);
 }
 return res.status(200).send(`Ticket ${id} has been resolved`)
 })
  
}

ticketController.deleteTicket = (req, res) => {
  
  const id = req.params.id //???

  models.TicketForm.findOneAndDelete( { id }, (err, result) => {
    
    if (err) {
      console.log('Error deleting the ticket:', err);
      return res.status(500).send(err);
    }
    if (result.deletedCount === 0) {
      return res.status(404).send('No ticket with this ID exists.');
    }
    return res.status(200).send(`Ticket ${id} deleted.`)
  }
    )
}

module.exports = ticketController;
