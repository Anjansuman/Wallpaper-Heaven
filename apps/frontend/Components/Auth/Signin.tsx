"use client";

import { signIn } from "next-auth/react";

interface SigninProps {
    handleClick: () => void;
}

export default function SignIn({ handleClick }: SigninProps) {
    return (
        <div className="flex justify-center items-center min-h-screen w-full px-4 sm:px-6">
            <div className="bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md space-y-6 text-white text-center">

                {/* Header */}
                <div className="space-y-2">
                    <div className="flex justify-end">
                        <span
                            onClick={handleClick}
                            className="w-4 h-4 bg-red-500 text-white font-bold flex justify-center items-center rounded-full text-[15px] hover:bg-red-600 hover:text-black cursor-pointer transition-colors duration-150"
                        >
                            ×
                        </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-wide">Welcome to Wallpaper Heaven</h1>
                    <p className="text-sm text-neutral-400">Only for Admin</p>
                </div>

                {/* Google Button */}
                <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="flex items-center justify-center gap-3 bg-neutral-200 hover:bg-neutral-300 text-black w-full py-3 rounded-md text-base font-medium transition duration-200 cursor-pointer"
                >
                    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.261 7.30904H8.93404V10.76H13.726C13.28 12.953 11.413 14.213 8.93404 14.213C8.24038 14.2142 7.5533 14.0785 6.91222 13.8135C6.27114 13.5486 5.68868 13.1597 5.19823 12.6691C4.70778 12.1786 4.31899 11.5961 4.05418 10.9549C3.78936 10.3138 3.65372 9.6267 3.65504 8.93304C3.65386 8.23946 3.78959 7.55246 4.05447 6.91145C4.31934 6.27044 4.70814 5.68801 5.19858 5.19758C5.68902 4.70714 6.27144 4.31834 6.91245 4.05346C7.55347 3.78859 8.24046 3.65285 8.93404 3.65404C10.193 3.65404 11.331 4.10104 12.224 4.83204L14.824 2.23304C13.24 0.852038 11.209 3.80581e-05 8.93404 3.80581e-05C7.75985 -0.00339412 6.59656 0.225348 5.51109 0.673108C4.42562 1.12087 3.43938 1.77881 2.6091 2.60909C1.77881 3.43938 1.12087 4.42562 0.673111 5.51109C0.225351 6.59656 -0.00339112 7.75985 4.10512e-05 8.93404C-0.00352385 10.1083 0.225128 11.2716 0.67284 12.3571C1.12055 13.4427 1.77849 14.429 2.6088 15.2593C3.43911 16.0896 4.4254 16.7475 5.51093 17.1952C6.59647 17.643 7.75981 17.8716 8.93404 17.868C13.401 17.868 17.463 14.619 17.463 8.93404C17.463 8.40604 17.382 7.83704 17.261 7.30904Z"
                            fill="black"
                        />
                    </svg>
                    <span>Continue with Google</span>
                </button>

                {/* Terms */}
                <p className="text-xs text-neutral-400">
                    By continuing, you agree to our{" "}
                    <span className="underline underline-offset-2 cursor-pointer hover:text-neutral-200 transition-colors duration-200">
                        Terms and Conditions
                    </span>
                    .
                </p>
            </div>
        </div>
    );
}
