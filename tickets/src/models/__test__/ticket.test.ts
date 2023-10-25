import { Ticket } from "../ticket";
it('Implements optimistic concurrency control' , async() => {
    //Create an instance of a ticket
    const ticket = Ticket.build({
        title : 'cricket',
        price : 5,
        userId : '123'
    })
    await ticket.save();

    const i1 = await Ticket.findById(ticket.id);
    const i2 = await Ticket.findById(ticket.id);

    i1!.set({price : 10});
    i2!.set({price : 25});

    await i1!.save();
    
    //save the second instance of the ticket and expect an error
    try{
        await i2!.save();
    }catch(err){
        return;
    }
    throw new Error('Should not reach this point');
})

it('increments the version number on multiple saves' , async() => {
    const ticket = Ticket.build({
        title : 'cricket',
        price : 25,
        userId : '123',
    })
    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save()
    expect(ticket.version).toEqual(2);
})