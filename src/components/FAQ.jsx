import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
const FAQ = () => {
    return (
        <div>
            <h2 className='font-bold text-4xl'>Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full p-5">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How can I list my car for sale?</AccordionTrigger>
                    <AccordionContent>
                        To list your car for sale, simply create an account or log in if you already have one. Navigate to the "inventory" , fill in the details of your car in add car , upload photos, and submit the listing then click on manage car then add for sale. Once approved by our admin team, your car will be listed on our site.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger> What services do you offer for car maintenance?</AccordionTrigger>
                    <AccordionContent>
                        We offer a wide range of maintenance services, including oil changes, tire change, brake pads change. You can book an appointment through our " Services" section.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>How do I schedule a repair service?</AccordionTrigger>
                    <AccordionContent>
                        To schedule a repair service, go to the "Services" section, select the type of repair you need, and choose a convenient time slot. A mechanic will be assigned to you, and you will receive a confirmation in *Appointments* once the booking is complete.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default FAQ