import { Form } from "@remix-run/react";
import type { FunctionComponent } from "react";
import type { ContactRecord } from "~/data";


export default function Contact() {
    const contact = {
        first: "Your",
        last: "Name",
        avatar: "https://placekitten.com/200/200",
        twitter: "Your Handle",
        notes: "Some Notes",
        favorite: true,
    };
    return (
        <div id="contact">
            <div>
                <img 
                    alt={`${contact.first} ${contact.last} avatar`}
                    key={contact.avatar}
                    src={contact.avatar}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i> No Name</i>
                    )} {" "}
                    <Favorite contact = {contact} />
                </h1>

                (contact.twitter ? (
                    <p>
                        <a href={`https://twitter.com/ ${contact.twitter}`}>
                            { contact.twitter }
                        </a>
                    </p>
                ): null) 

                (contact.notes ? <p>{contact.notes}</p> : null)
            </div>
            <div>
                <Form action="edit">
                    <button type="submit"> Edit </button>
                </Form>

                <Form
                    action="destroy"
                    method="post"
                    onSubmit={(event) => {
                        const response = confirm( "Please confirm you want to delete this record." ) 
                        if(!response) {
                            event.preventDefault()
                        }
                    }}
                >
                  <button type="submit"> Delete </button>
                </Form>
            </div>
        </div>
    )
}

const Favorite: FunctionComponent<{
    contact: Pick<ContactRecord, "favorite">
}> = ({contact}) => {
    const favorite = contact.favorite;

    return (
        <Form method="post">
            <button 
                aria-label= {
                    favorite
                    ? "Remove from favorite"
                    : "Add to favorites"
                }
                name="favorite"
                value={favorite ? "false" : "true"}
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    )
}

