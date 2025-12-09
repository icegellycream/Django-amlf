import Image from "next/image";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";

import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const PropertyDetailPage = async ({params}: {params: Promise<{id: string}>}) => {
    const { id } = await params;
    const userId = await getUserId();
    console.log('userId', userId);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/properties/${id}`, {
        cache: 'no-store'
    });

    const { data: property } = await response.json();
    

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src="/beach_1.jpg"
                    className="object-cover w-full h-full"
                    alt="Beach house"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{property.title}</h1>

                    <span className="mb-6 block text-lg text-gray-600">
                        {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
                    </span>
                    <hr />

                    <div className="py-6 flex items-center space-x-4">
                        {property.landlord?.avatar_url && (
                        <Image          
                                src={property.landlord.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="the landlord name"
                            />
                        )}

                        <p><strong>{property.landlord?.name}</strong> is your host</p>
                        
                    </div>
                    <hr />

                    <p className="mt-6 text-lg">
                        {property.description}
                    </p>
                </div>

                <ReservationSidebar
                    property={property}
                    userId={userId}
                />
            </div>
        </main>
    )
}

export default PropertyDetailPage;