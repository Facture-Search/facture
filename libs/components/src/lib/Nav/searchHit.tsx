import { SearchHit as SearchHitType } from "@facture/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
    hit: SearchHitType;
}

export function SearchHit({ hit }: Props) {
    const logoWidth = 50;
    const logoHeight = 50;

    return (
        <Link href={`/manufacturers/${hit.manufacturer}`}>
            <a>
                <div className="p-3 hover:bg-gray-100 rounded-md space-y-3 mb-3">
                    <div className="flex items-center justify-between space-x-3">
                        <Image className="rounded-md" src={`${hit.logo.url}?size=${logoWidth}x${logoHeight}`} width={logoWidth} height={logoHeight} />
                        <div className="text-right">
                            <p className="text-right text-lg font-bold text-gray-900">{hit.name}</p>
                            {hit.slogan && <p className="text-md font-bold text-gray-700">{hit.slogan}</p>}
                        </div>
                    </div>
                    <p className="text-gray-700 text-md line-clamp-3">{hit.descriptionShort}</p>
                </div>
            </a>
        </Link>
    );
}

export default SearchHit;
