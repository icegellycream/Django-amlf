'use client';

import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignupModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import { handleLogin } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

const SignupModal = () => {
    const router = useRouter();
    const signupModal = useSignupModal();
    const loginModal = useLoginModal();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const submitSignup = async () => {
        if (password1 !== password2) {
            setErrors(['Passwords do not match']);
            return;
        }

        const formData = {
            email: email,
            password1: password1,
            password2: password2,
        };

        try {
            const response = await apiService.postWithoutToken('/api/auth/register/', formData);
            
            if (response.access) {
                handleLogin(response.user.pk, response.access, response.refresh);
                signupModal.close();
                router.push('/');
            } else {
                const errorList = [];
                if (response.email) errorList.push(response.email[0]);
                if (response.password1) errorList.push(response.password1[0]);
                if (response.non_field_errors) errorList.push(...response.non_field_errors);
                setErrors(errorList);
            }
        } catch (error) {
            console.error('Signup error:', error);
            setErrors(['An error occurred during signup. Please try again.']);
        }
    };

    const content = (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Create an account</h2>
            <input 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Your e-mail address" 
                type="email" 
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
            />
            <input 
                onChange={(e) => setPassword1(e.target.value)} 
                placeholder="Create a password" 
                type="password" 
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
            />
            <input 
                onChange={(e) => setPassword2(e.target.value)} 
                placeholder="Confirm password" 
                type="password" 
                className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" 
            />

            {errors.length > 0 && (
                <div className="space-y-2">
                    {errors.map((error, index) => (
                        <div 
                            key={`error_${index}`}
                            className="p-3 bg-red-100 text-red-700 rounded-lg text-sm"
                        >
                            {error}
                        </div>
                    ))}
                </div>
            )}

            <CustomButton
                label="Sign up"
                onClick={submitSignup}
                className="w-full"
            />
        </div>
    );

    return (
        <Modal
            isOpen={signupModal.isOpen}
            close={signupModal.close}
            label="Sign up"
            content={content}
        />
    );
};

export default SignupModal;