import { getUserId } from "../../lib/actions";
import React, {useState, useEffect } from 'react';
import apiService from "@/app/services/apiService";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { UserType } from "../page";
import { getAccessToken } from "../../lib/actions";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType
}

const ConversationPage = async ({ params }: { params: Promise<{id: string}> }) => {
    const { id } = await params;
    const userId = await getUserId();
    const token = await getAccessToken();

    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }

    try {
        const response = await apiService.get(`/api/chat/${id}/`)
        
        console.log('Conversation response:', response);

        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6"> 
                <ConversationDetail 
                    token={token}
                    userId={userId}
                    messages={response.messages || []}
                    conversation={response.conversation}
                />
            </main>
        )
    } catch (error) {
        console.error('Error loading conversation:', error);
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <p>Error loading conversation: {String(error)}</p>
            </main>
        )
    }
}

export default ConversationPage;