import Image from "next/image";
import Link from "next/link";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";

import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const PropertyDetailPage = async ({params}: {params: Promise<{id: string}>}) => {
    const paramsValue = await params;
    const { id } = paramsValue;
    let property;
    let userId;

    try {
        const response = await apiService.get(`/api/properties/${id}`);
        property = response.data;
        userId = await getUserId();
        
        console.log('userId', userId);
    } catch (error) {
        console.error('Failed to load property:', error);
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Property</h1>
                    <p className="text-gray-600">Unable to load property details. Please try again later.</p>
                </div>
            </main>
        );
    }
    

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src={property.image_url || '/default-property.jpg'}
                    className="object-cover w-full h-full"
                    alt={property.title || "Property"}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{property.title}</h1>

                    <span className="mb-6 block text-lg text-gray-600">
                        {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
                    </span>
                    <hr />

                    <Link 
                        href = {`/Landlords/${property.landlord.id}`}
                        className="py-6 flex items-center space-x-4"
                    >
                        {property.landlord?.avatar_url && (
                        <Image          
                                src={property.landlord.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="the landlord name"
                            />
                        )}

                        <p><strong>{property.landlord.name}</strong> is your host</p>  
                    </Link>

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