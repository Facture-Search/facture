import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { fetchData, findManufacturer, findManufacturers } from "@facture/graphql";
import { FindManufacturerQuery, FindManufacturersQuery } from "@facture/types";
import { Contact, Content, Display, Info, Location } from "@facture/components";

interface Props {
    manufacturer: FindManufacturerQuery["manufacturers"]["data"][number]["attributes"];
}

export const Manufacturer: NextPage<Props> = ({ manufacturer }) => {
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    return (
        <div className="flex space-x-14 items-start">
            <div className="space-y-7 w-4/5">
                <Info
                    name={manufacturer.name}
                    slogan={manufacturer.slogan}
                    dateEstablished={manufacturer.dateEstablished}
                    logo={manufacturer.logo}
                    description={manufacturer.descriptionShort}
                    type={manufacturer.type}
                    color={manufacturer.color}
                />
                <Contact email={manufacturer.email} phone={manufacturer.phoneNo} openingTime={manufacturer.openingTime} social={manufacturer.social} />
                <Location location={manufacturer.location} googleApiKey={googleApiKey} />
            </div>
            <div className="space-y-7">
                <Content description={manufacturer.descriptionLong} thumbnail={manufacturer.thumbnail} />
                <Display display={manufacturer.display} />
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    const {
        manufacturers: { data },
    } = await fetchData<FindManufacturersQuery>(process.env.NEXT_PUBLIC_API_ENDPOINT, { query: findManufacturers }, process.env.NEXT_PUBLIC_STRAPI_API_KEY);

    const paths = data.map((manufacturer) => {
        return {
            params: {
                slug: manufacturer.attributes.manufacturer,
            },
        };
    });

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const {
        manufacturers: {
            data: {
                0: { attributes },
            },
        },
    } = await fetchData<FindManufacturerQuery>(
        process.env.NEXT_PUBLIC_API_ENDPOINT,
        { query: findManufacturer, variables: { manufacturer: params.slug } },
        process.env.NEXT_PUBLIC_STRAPI_API_KEY
    );

    return { props: { manufacturer: attributes } };
};

export default Manufacturer;
