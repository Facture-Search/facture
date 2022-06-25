import { EmailDisplay, PhoneNoDisplay, OpeningTimeDisplay, SocialDisplay, FaxDisplay } from "@facture/types";

import { Email } from "./email";
import { Fax } from "./fax";
import { OpeningTime } from "./openingTime";
import { Phone } from "./phone";
import { Social } from "./social";

interface Props {
    email: EmailDisplay[];
    phone: PhoneNoDisplay[];
    openingTime: OpeningTimeDisplay[];
    social: SocialDisplay[];
    fax: FaxDisplay[];
}

export function Contact({ email, phone, openingTime, social, fax }: Props) {
    return (
        <div className="p-6 shadow-md rounded-md bg-white">
            <div className="space-y-6">
                <h2 className="font-bold text-gray-900 text-xl">Contact</h2>
                <Email email={email} />
                <Phone phone={phone} />
                <Fax fax={fax} />
                <OpeningTime openingTime={openingTime} />
            </div>

            <Social social={social} />
        </div>
    );
}

export default Contact;
